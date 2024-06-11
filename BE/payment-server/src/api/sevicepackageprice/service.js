const ResponseFactory = require("../../response_design");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getOneServer = async ({ id }) => {
  try {
    await prisma.$connect();

    const price = await prisma.sevicepackageprice.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!price) {
      return ResponseFactory.createResponse(
        404,
        "Service package price not found"
      );
    }

    return ResponseFactory.createResponse(200, price);
  } catch (error) {
    return ResponseFactory.createResponse(500, error);
  } finally {
    await prisma.$disconnect();
  }
};

const getAllOfIdService = async ({ servicePackageID }) => {
  try {
    await prisma.$connect();

    const prices = await prisma.sevicepackageprice.findMany({
      where: {
        servicePackageID: parseInt(servicePackageID),
      },
    });

    return ResponseFactory.createResponse(200, prices);
  } catch (error) {
    return ResponseFactory.createResponse(500, error);
  } finally {
    await prisma.$disconnect();
  }
};

const createNewService = async ({
  price,
  startTime,
  servicePackageID,
}) => {
  try {
    await prisma.$connect();
   
   const rs= await prisma.$transaction(async (prisma) => {
      // Create a new record using the specified parameters
      const newRecord = await prisma.sevicepackageprice.create({
        data: {
          price,
          startTime,
          servicePackageID: parseInt(servicePackageID)
         },
      });

      return ResponseFactory.createResponse(201, newRecord);
    });
    return rs;
  } catch (error) {
    
    return ResponseFactory.createResponse(500, error);
  } finally {
    await prisma.$disconnect();
  }
};

const updatePrice = async ({ id, price, startTime, createAt }) => {
  try {
    await prisma.$connect();

    // Find the record to update
    const recordToUpdate = await prisma.sevicepackageprice.findUnique({
      where: {
        id,
      },
    });

    // If record with provided ID does not exist, return early
    if (!recordToUpdate) {
      throw new Error("Record not found");
    }

    // Update the fields with provided values
    const dataToUpdate = {};
    if (price !== undefined) {
      dataToUpdate.price = price;
    }
    if (startTime !== undefined) {
      dataToUpdate.startTime = startTime;
    }
    if (createAt !== undefined) {
      dataToUpdate.createAt = createAt;
    }

    // Update the record
    const updatedRecord = await prisma.sevicepackageprice.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });

    return ResponseFactory.createResponse(201, updatedRecord);
  } catch (error) {
    if (error.message === "Record not found") {
      return ResponseFactory.createResponse(404, "Record not found");
    } else {
      return ResponseFactory.createResponse(500, error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
};


const deleteService = async ({ id }) => {
  try {
    await prisma.$connect();

    // Find the service to delete
    const serviceToDelete = await prisma.sevicepackageprice.findUnique({
      where: {
        id:parseInt(id),
      },
    });

    // If service with provided ID does not exist, return early
    if (!serviceToDelete) {
      return ResponseFactory.createResponse(404, "Service package not found");
    }

    // Delete the service
    await prisma.sevicepackageprice.delete({
      where: {
        id:parseInt(id),
      },
    });

    return ResponseFactory.createResponse(201, serviceToDelete);
  } catch (error) {
    return ResponseFactory.createResponse(500, error);
  } finally {
    await prisma.$disconnect();
  }
};


module.exports = {
  getOneServer,
  getAllOfIdService,
  createNewService,
  updatePrice,
  deleteService,
};
