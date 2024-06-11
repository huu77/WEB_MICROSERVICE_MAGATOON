const sendMail = require("../../gmail");
const { encodeToken, encodeRefreshToken } = require("../../jwt/encode");
const { isPassword } = require("../../utils/bcrypt");
const { decode, isTokenExpired } = require("../../jwt/decode");
const decodeFirebaseToken = require("../../jwt/decodeGG");
const producer = require("../../rabitMQ/createNewWallet/producer");
const ResponseFactory = require("../../response_design");
const UserProducer = require("../../rabitMQ/userProducer")
const TokenProducer = require("../../rabitMQ/tokenProducer")
const RefreshTokenProducer = require("../../rabitMQ/refreshTokenProducer")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const loginServer = async ({ email, password }) => {
  try {
    // Mở kết nối đến cơ sở dữ liệu
    await prisma.$connect();

    // Bắt đầu transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Tìm tài khoản có email tương ứng trong cơ sở dữ liệu
      const existingAccount = await prisma.account.findUnique({
        where: { email, provider: "email_password" },
      });

      if (!existingAccount) {
        throw new Error("Email not found");
      }

      if (existingAccount.veryfied === 0) {
        throw new Error("Email not verified");
      }

      // So sánh mật khẩu đã hash với hash lưu trữ
      const isPasswordCorrect = await isPassword(
        password,
        existingAccount.password
      );

      if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
      }


      const user = await prisma.user.findUnique({
        where: { accountId: existingAccount.id },
      });

      // Tạo access token và refresh token
      const tokenPayload = {
        idUser: user.id,
        accountId: existingAccount.id,
        role: existingAccount.role,
        status: existingAccount.veryfied === 1,
        iat: Date.now(),
        userId: user.id
      };
      const token = encodeToken(tokenPayload);
      const refreshToken = encodeRefreshToken(tokenPayload);

      // Cập nhật tài khoản với tokens
      await prisma.account.update({
        where: { id: existingAccount.id },
        data: {
          accessToken: token,
          refreshToken: refreshToken,
        },
      });

      await TokenProducer({
        accessToken: token
      })

      return ResponseFactory.createResponse(200, {
        accessToken: token,
        refreshToken,
      });
    });

    return result;
  } catch (error) {
    if (error.message === "Email not found") {
      return ResponseFactory.createResponse(404, "Email not found");
    } else if (error.message === "Email not verified") {
      return ResponseFactory.createResponse(400, "Email not verified");
    } else if (error.message === "Incorrect password") {
      return ResponseFactory.createResponse(404, "Incorrect password");
    } else {
      return ResponseFactory.createResponse(500, error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
};

const refreshTokenServer = async (token) => {
  try {
    // Giải mã token để trích xuất thông tin người dùng
    const decodedToken = decode(token);

    // Kiểm tra xem token có hết hạn không
    if (isTokenExpired(decodedToken)) {
      // Tạo một access token và refresh token mới
      const tokenPayload = {
        idUser: decodedToken.idUser,
        accountId: decodedToken.accountId,
        role: decodedToken.role,
        status: decodedToken.status,
      };

      const newAccessToken = encodeToken(tokenPayload);
      const newRefreshToken = encodeRefreshToken(tokenPayload);

      // Cập nhật tokens trong cơ sở dữ liệu
      const existingAccount = await prisma.account.findUnique({
        where: { id: decodedToken.accountId },
      });

      if (!existingAccount) {
        // Nếu không tìm thấy tài khoản, ném lỗi và trả về dạng lỗi
        throw new Error("Account not found");
      }

      await prisma.account.update({
        where: { id: decodedToken.accountId },
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      });

      await RefreshTokenProducer({
        oldAccessToken: token,
        newAccessToken
      })

      // Trả về access token và refresh token mới
      return ResponseFactory.createResponse(201, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } else {
      // Nếu token không hết hạn, trả về null
      return ResponseFactory.createResponse(200, "Token is not expired! ");
    }
  } catch (error) {
    // Xử lý lỗi và trả về dạng lỗi
    if (error.message === "Account not found") {
      return ResponseFactory.createResponse(404, "Account not found");
    } else {
      return ResponseFactory.createResponse(500, error.message);
    }
  }
};

const loginGoogleServer = async ({ accessToken }) => {
  try {
    const rs = await decodeFirebaseToken(accessToken);

    // Tìm tài khoản có uid tương ứng trong cơ sở dữ liệu
    const existingAccount = await prisma.account.findUnique({
      where: { uid: rs.uid, provider: "google" },
    });

    let token, refreshToken;

    if (existingAccount) {
      // Nếu tài khoản đã tồn tại, tạo token mới và cập nhật tài khoản
      const user = await prisma.user.findFirst({
        where: {
          accountId: existingAccount.id,
        },
      });
      const tokenPayload = {
        idUser: user.id,
        accountId: existingAccount.id,
        role: existingAccount.role,
        status: existingAccount.veryfied === 1,
        iat: Date.now(),
        userId: user.id
      };
      token = encodeToken(tokenPayload);
      refreshToken = encodeRefreshToken(tokenPayload);

      await prisma.account.update({
        where: { id: existingAccount.id },
        data: {
          accessToken: token,
          refreshToken: refreshToken,
        },
      });
    } else {
      // Nếu tài khoản chưa tồn tại, tạo mới tài khoản và người dùng
      const newAccount = await prisma.account.create({
        data: {
          uid: rs.uid,
          veryfied: 1,
          provider: "google"

        },
      });

      const newUser = await prisma.user.create({
        data: {
          displayName: rs.name,
          photoURL: rs.picture,
          accountId: newAccount.id,
        },
      });

      const tokenPayload = {
        idUser: newUser.id,
        accountId: newAccount.id,
        role: newAccount.role,
        status: newAccount.veryfied === 1,
        iat: Date.now(),
        userId: newUser.id
      };

      token = encodeToken(tokenPayload);
      refreshToken = encodeRefreshToken(tokenPayload);

      await prisma.account.update({
        where: { id: newAccount.id },
        data: {
          accessToken: token,
          refreshToken: refreshToken,
        },
      });
      await sendMail(rs.email, null);
      await producer({ data: newUser.id });
      await UserProducer({
        id: newAccount.id
      })
    }

    await TokenProducer({
      accessToken: token
    })

    return ResponseFactory.createResponse(200, {
      accessToken: token,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return ResponseFactory.createResponse(500, error);
  }
};


module.exports = { loginServer, refreshTokenServer, loginGoogleServer };
