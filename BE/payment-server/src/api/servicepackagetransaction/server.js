const ResponseFactory = require("../../response_design");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ServicePackageTransactionProducer = require("../../rabitMQ/producers/servicePackageTransaction")

const CreatePackageTransactionServer = async (servicePackageId, userId) => {
  try {
    await prisma.$connect();

    // Kiểm tra xem giao dịch đã tồn tại chưa
    const isCheck = await prisma.sevicepackagetransaction.findUnique({
      where: {
        SevicePackageId_userId: {
          SevicePackageId: parseInt(servicePackageId),
          userId: parseInt(userId),
        },
      },
    });

    if (isCheck) {
      throw new Error("Service package transaction is exist!");
    }

    // Tìm gói dịch vụ
    const servicePackage = await prisma.sevicepackage.findUnique({
      where: {
        id: parseInt(servicePackageId),
      },
    });

    const time = new Date().getTime() + servicePackage.expiration * 1000;
    const newDate = new Date(time);

    // Tạo giao dịch mới
    const createNew = await prisma.sevicepackagetransaction.create({
      data: {
        SevicePackageId: parseInt(servicePackageId),
        userId: parseInt(userId),
        createAt: newDate,
      },
    });

    if (!createNew) {
      throw new Error("Failed to create new service package transaction");
    }

    await ServicePackageTransactionProducer({
      id: createNew.id,
      createdAt: newDate,
      servicePackageId: parseInt(servicePackageId),
      userId: parseInt(userId)
    })

    return ResponseFactory.createResponse(201, createNew);
  } catch (error) {
    return handleErrorResponse(error);
  } finally {
    await prisma.$disconnect();
  }
};

const handleErrorResponse = (error) => {
  if (error.message === "Failed to create new service package transaction") {
    return ResponseFactory.createResponse(
      400,
      "Failed to create new service package transaction"
    );
  } else if (error.message === "Service package transaction is exist!") {
    return ResponseFactory.createResponse(
      400,
      "Service package transaction is exist!"
    );
  } else {
    return ResponseFactory.createResponse(500, error.message);
  }
};

  
module.exports = { CreatePackageTransactionServer };
