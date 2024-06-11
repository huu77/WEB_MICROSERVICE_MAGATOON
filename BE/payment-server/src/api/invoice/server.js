 
 
const ResponseFactory = require("../../response_design");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const InvoiceProducer = require("../../rabitMQ/producers/invoice")

const getAllListStoryOfUserServer = async ({ id }) => {
  try {
    await prisma.$connect()
    const result = await prisma.invoice.findMany({
      select: {
        id: true,
        storyId: true,
      },
      where: {
        id: parseInt(id), // Assuming id is an integer
      },
    });
    return ResponseFactory.createResponse(200, result);
  } catch (error) {
    return ResponseFactory.createResponse(500, error);
  }
  finally{
    await prisma.$disconnect()
  }
};

const getAllServer = async () => {
  try {
    await prisma.$connect()
    const result = await prisma.invoice.findMany();
    return ResponseFactory.createResponse(200, result);
  } catch (error) {
 
    return ResponseFactory.createResponse(500, error);
  }
  finally{
    await prisma.$disconnect()
  }
};


const buyServer = async (storyId, userId) => {
  try {
    await prisma.$connect();

    const rs = await prisma.$transaction(async (Prisma) => {
      // Kiểm tra xem câu chuyện đã được mua chưa
      

      // Mua câu chuyện mới
      const buyNewStory = await Prisma.invoice.create({
        data: {
          storyId: parseInt(storyId),
          id: parseInt(userId) // Sử dụng userId thay vì id
        }
      });
      
      await InvoiceProducer({
        userId: parseInt(userId),
        storyId: parseInt(storyId)
      })
    
      return ResponseFactory.createResponse(201, buyNewStory);
    });

    return rs;
  } catch (error) {
 
      return ResponseFactory.createResponse(500, error);
   
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  getAllListStoryOfUserServer,
  getAllServer,buyServer
};
