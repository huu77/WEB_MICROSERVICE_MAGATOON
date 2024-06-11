const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ResponseFactory = require("../../response_design");

const getRevenuesServer = async () => {
  await prisma.$connect();
  try {
    const totalAmount = await prisma.walletrechargetransaction.aggregate({
      _sum: {
        amount: true
      }
    });
    
    let total = totalAmount._sum.amount;
    const selectedProperties = await prisma.sevicepackagetransaction.findMany({
      select: {
        SevicePackageId: true,
        createAt: true
      }
    });
    
    for (const property of selectedProperties) {
      const aggregatedPrice = await prisma.sevicepackageprice.aggregate({
        _sum: {
          price: true
        },
        where: {
          servicePackageID: property.SevicePackageId,
          startTime: {
            lte: property.createAt
          }
        },
        orderBy: {
          price: 'desc' // Order by price in descending order
        },
        take: 1 // Take only the top 1 result
      });
      total += aggregatedPrice._sum.price;
    }
    

    // Trả về kết quả
    return ResponseFactory.createResponse(200, { totalAmount: total });
  } catch (error) {
    return ResponseFactory.createResponse(500, error);
  } finally {
    await prisma.$disconnect();
  }
};


 const getAllHistoryTransaction = async({limit,page,sortType})=>{
  await prisma.$connect();
  try {
    const rs = await prisma.walletrechargetransaction.findMany({
      orderBy: {
        createAt: sortType,
      },
      take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
    });
    const totalItem = await prisma.walletrechargetransaction.count()
    const data ={
      items:rs,
      paginations:{
        totalItem,
        currentPage: parseInt(page),
        limit,
        hasItem: (parseInt(page) - 1) * parseInt(limit) < totalItem,
      }
    }
    return ResponseFactory.createResponse(200, data);
  } catch (error) {
    return ResponseFactory.createResponse(500, error);
  } finally {
    await prisma.$disconnect();
  }

 }
module.exports = { getRevenuesServer ,getAllHistoryTransaction};
