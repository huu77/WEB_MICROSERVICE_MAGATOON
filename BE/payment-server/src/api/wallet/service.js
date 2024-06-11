 
const ResponseFactory = require("../../response_design");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getWalletServer = async (id) => {
  try {
    await prisma.$connect();

    const getOneWallet = await prisma.wallet.findUnique({
      where: { id:parseInt(id) },
    });
 
    if (getOneWallet) {
      return ResponseFactory.createResponse(200, getOneWallet);
    } else {
      return ResponseFactory.createResponse(404, "Wallet not found");
    }
  } catch (error) {
    return ResponseFactory.createResponse(500, error);
  }
  finally{
    await prisma.$disconnect();

  }
};


const updateBalanceServer = async ({ id, balance }) => {
 
  try {
    await prisma.$connect();
    const rs=  await prisma.$transaction(async (prisma) => {
      // Find the wallet to update
      const walletToUpdate = await prisma.wallet.findUnique({
        where: {
          id:parseInt(id),
        },
      });

      // If wallet with provided ID does not exist, return early
      if (!walletToUpdate) {
        throw Error("Not found wallet!")
      }

      // Update the balance
      walletToUpdate.balance += parseFloat(balance);

      // Save the updated wallet
      const updatedWallet = await prisma.wallet.update({
        where: {
          id:parseInt(id),
        },
        data: {
          balance: walletToUpdate.balance,
        },
      });

     return ResponseFactory.createResponse(201, updatedWallet);
    });

    return rs
  } catch (error) {
    if (error.message === "Not found wallet!") {
      return ResponseFactory.createResponse(404, "Not found wallet!");
    } else {
      return ResponseFactory.createResponse(500, error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
};


const createNewWallet = async (id) => {
 console.log("id:::::",id)
  try {
    // Bắt đầu một giao dịch
    const createdWallet = await prisma.$transaction(async (prisma) => {
      // Tạo một bản ghi mới trong bảng wallet với id và balance được cung cấp
      const newWallet = await prisma.wallet.create({
        data: {
          id: parseInt(id),
          balance: 0
        }
      });
      // Trả về bản ghi mới được tạo
      return newWallet;
    });
     
    // Trả về phản hồi thành công với mã trạng thái 201 và dữ liệu của bản ghi mới
    return ResponseFactory.createResponse(201, createdWallet);
  } catch (error) {
    // Trong trường hợp có lỗi, trả về phản hồi lỗi với mã trạng thái 500 và thông điệp lỗi tương ứng
    return ResponseFactory.createResponse(500, error);
  } finally {
    // Đảm bảo rằng kết nối với cơ sở dữ liệu được đóng
    await prisma.$disconnect();
  }
}

module.exports = { getWalletServer, updateBalanceServer,createNewWallet };
