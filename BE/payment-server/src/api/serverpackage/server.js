const ResponseFactory = require("../../response_design");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ServicePackageProducer = require("../../rabitMQ/producers/servicePackage")
 
const createServicePackageService = async ({
  name,
  description,
  expiration,
  
}) => {
   
  try {
    await prisma.$connect();
   
     const rs=await prisma.$transaction(async (prisma) => {
      const service = await prisma.sevicepackage.create({
        data: {
          name,
          description,
          expiration:expiration
        },
      });

      await ServicePackageProducer({
        id: service.id,
        expireIn: expiration
      })

      return service;
    });

    return ResponseFactory.createResponse(
      201,
      rs
    );
  } catch (error) {
    return ResponseFactory.createResponse(500, error);
  } finally {
    await prisma.$disconnect();
  }
};

const updateServicePackage = async ({ id, description, name, expiration }) => {
  try {
    
    await prisma.$connect();

    const rs= await prisma.$transaction(async (Prisma) => {
    const existingPackage = await Prisma.sevicepackage.findUnique({
      where: {
        id: parseInt(id),
      },
      
    });

    // If service package with provided ID does not exist, return early
    if (!existingPackage) {
      throw Error("Server package not found")
       
    }

    // Update fields if provided
    if (description !== null) {
      existingPackage.description = description;
    }
    if (name !== null) {
      existingPackage.name = name;
    }
    if (expiration !== null) {
      existingPackage.expiration = new Date(expiration);
    }

    const updatedPackage = await Prisma.sevicepackage.update({
      where: {
        id: parseInt(id),
      },
      data: {
        description: existingPackage.description,
        name: existingPackage.name,
        expiration: existingPackage.expiration,
      },
    });

    return ResponseFactory.createResponse(201, updatedPackage);
  })
   
    return rs
  } catch (error) {
    if (error.message === "Server package not found") {
      return ResponseFactory.createResponse(404, "Server package not found");
    } else {
      return ResponseFactory.createResponse(500, error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
};

const getOneServicePackage = async ({ id }) => {
  try {
    await prisma.$connect();

    const servicePackage = await prisma.sevicepackage.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!servicePackage) {
      return ResponseFactory.createResponse(404, "Service package not found");
    }

    return ResponseFactory.createResponse(200, servicePackage);
  } catch (error) {
    return ResponseFactory.createResponse(500, error);
  } finally {
    await prisma.$disconnect();
  }
};


const getListServicePackagePrice = async () => {
  try {
    await prisma.$connect();

    const servicePackages = await prisma.sevicepackage.findMany({
      orderBy: {
        name: 'asc', // Sử dụng chuỗi cho cú pháp sắp xếp
      },
    });

    if (!servicePackages || servicePackages.length === 0) {
      return ResponseFactory.createResponse(404, "Service packages not found");
    }

    return ResponseFactory.createResponse(200, servicePackages);
  } catch (error) {
    
    return ResponseFactory.createResponse(500, error);
  } finally {
    await prisma.$disconnect();
  }
};

const Delete = async({id})=>{
  try {
    
    await prisma.$connect();

    const rs= await prisma.$transaction(async (Prisma) => {
    const existingPackage = await Prisma.sevicepackage.findUnique({
      where: {
        id: parseInt(id),
      },
      
    });

    // If service package with provided ID does not exist, return early
    if (!existingPackage) {
      throw Error("Server package not found")
       
    }

    const kq =  await Prisma.sevicepackage.delete({
      where: {
        id: parseInt(id.toString()),
      },
    });

     

    return ResponseFactory.createResponse(201, kq);
  })
   
    return rs
  } catch (error) {
    if (error.message === "Server package not found") {
      return ResponseFactory.createResponse(404, "Server package not found");
    } else {
      return ResponseFactory.createResponse(500, error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}
module.exports = {
  createServicePackageService,
  getListServicePackagePrice,
  updateServicePackage,
  getOneServicePackage,
  Delete
};
