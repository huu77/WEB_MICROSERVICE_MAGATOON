const ResponseFactory = require("../../response_design");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getUserServer = async (id) => {
  try {
    // Kiểm tra id có tồn tại và có đúng kiểu dữ liệu không
    if (!id || isNaN(parseInt(id))) {
      throw Error("Invalid user id");
      // return ResponseFactory.createResponse(400, "Invalid user id");
    }

    // Mở kết nối đến cơ sở dữ liệu
    await prisma.$connect();

    // Tìm thông tin người dùng
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // Nếu không tìm thấy người dùng, trả về lỗi 404
    if (!user) {
      throw Error("User not found");
      // return ResponseFactory.createResponse(404, "User not found");
    }

    // Tìm thông tin tài khoản của người dùng
    const account = await prisma.account.findUnique({
      where: {
        id: user.accountId,
      },
      select: {
        email: true,
        role: true,
      },
    });

    // Nếu không tìm thấy tài khoản, trả về lỗi 404
    if (!account) {
      throw Error("Account not found");
      // return ResponseFactory.createResponse(404, "Account not found");
    }

    // Trả về thông tin người dùng và tài khoản
    return ResponseFactory.createResponse(200, {
      id: user.id,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: account.email,
    });
  } catch (error) {
    if (error.message.includes("Account not found")) {
      // Nếu có, trả về mã lỗi 400
      return ResponseFactory.createResponse(404, error.message);
    } else if (error.message.includes("User not found")) {
      return ResponseFactory.createResponse(404, error.message);
    } else if (error.message.includes("Invalid user id")) {
      return ResponseFactory.createResponse(404, error.message);
    } else {
      // Nếu không, trả về mã lỗi 500
      return ResponseFactory.createResponse(500, error.message);
    }
  } finally {
    // Đóng kết nối Prisma Client
    await prisma.$disconnect();
  }
};

const getAllUsersServer = async ({
  searchTerm,
  sortBy,
  sortType,
  page,
  limit,
}) => {
  try {
    await prisma.$connect();
    const where = {
      AND: [{ displayName: { contains: searchTerm } }],
    };

    const [totalItem, users] = await Promise.all([
      prisma.user.count({ where }), // Use prisma.user.count() if you want to count users
      prisma.user.findMany({
        where,
        orderBy: {
          [sortBy]: sortType,
        },
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        include: {
          account: {
            select: {
              email: true,
              role: true,
              veryfied: true,
            },
          },
        },
      }),
    ]);

    const response = {
      items: users,
      paginations: {
        totalItem,
        currentPage: parseInt(page),
        limit,
        hasItem: (parseInt(page) - 1) * parseInt(limit) < totalItem,
      },
    };

    return ResponseFactory.createResponse(200, response);
  } catch (error) {
    return ResponseFactory.createResponse(500, error);
  } finally {
    // Đóng kết nối Prisma Client
    await prisma.$disconnect();
  }
};

module.exports = { getUserServer, getAllUsersServer };
