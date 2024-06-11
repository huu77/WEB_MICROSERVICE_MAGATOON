const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();
const UserProducer = require("../../rabitMQ/userProducer")

require("dotenv").config();
const sendMail = require("../../gmail");
const ResponseFactory = require("../../response_design");
const { hashPassword } = require("../../utils/bcrypt");

const registerServer = async ({ email, password, displayName }) => {
  try {
    // Mở kết nối đến cơ sở dữ liệu
    await prismaClient.$connect();

    // Bắt đầu transaction
    const result = await prismaClient.$transaction(async (prisma) => {
      // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
      const existingAccount = await prisma.account.findUnique({
        where: {
          email,
        },
      });

      // Nếu email đã tồn tại, ném ra lỗi và trả về phản hồi lỗi
      if (existingAccount) {
        throw new Error("Email already exists");
      }


      // Băm mật khẩu trước khi thêm tài khoản vào cơ sở dữ liệu
      const hashed = await hashPassword(password);

      // // Tạo tài khoản mới
      const newAccount = await prisma.account.create({
        data: {
          email,
          password: hashed,
        },
      });

      await UserProducer({
        id: newAccount.id
      })

      // // Tạo user mới
      const newUser = await prisma.user.create({
        data: {
          displayName:displayName,
          photoURL: "https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png",
          accountId: newAccount.id,
        },
      });

      // // Trả về tài khoản mới tạo
      return ResponseFactory.createResponse(201, {
        email: newAccount.email,
        id: newAccount.id,
      });
    });

    await sendMail(result.data.email, result.data.id);

    return result;
  } catch (error) {
    if (error.message.includes("Email already exists")) {
      // Nếu có, trả về mã lỗi 400
      return ResponseFactory.createResponse(400, error.message);
    } else {
      // Nếu không, trả về mã lỗi 500
      return ResponseFactory.createResponse(500, error.message);
    }
  } finally {
    // Đóng kết nối Prisma Client
    await prismaClient.$disconnect();
  }
};

const verifiedServer = async ({ idAccount }) => {
  try {
    // Mở kết nối đến cơ sở dữ liệu
    await prismaClient.$connect();

    // Bắt đầu transaction
    const result = await prismaClient.$transaction(async (prisma) => {
      // Tìm tài khoản trong cơ sở dữ liệu
      const existingAccount = await prisma.account.findUnique({
        where: {
          id: parseInt(idAccount),
        },
      });

      // Nếu không tìm thấy tài khoản, ném lỗi và trả về phản hồi lỗi
      if (!existingAccount) {
        throw new Error("Account not found");
      }

      // Cập nhật trạng thái xác nhận của tài khoản
      const updatedAccount = await prisma.account.update({
        where: {
          id: parseInt(idAccount),
        },
        data: {
          veryfied: 1,
        },
      });

      // Trả về phản hồi thành công
      return ResponseFactory.createResponse(
        200,
        "Account verified successfully"
      );
    });

    // Trả về kết quả thành công
    return result;
  } catch (error) {
    if (error.message.includes("Account not found")) {
      // Nếu có, trả về mã lỗi 404
      return ResponseFactory.createResponse(404, error.message);
    } else {
      // Nếu không, trả về mã lỗi 500
      return ResponseFactory.createResponse(500, error.message);
    }
  } finally {
    // Đóng kết nối Prisma Client
    await prismaClient.$disconnect();
  }
};

module.exports = { registerServer, verifiedServer };
