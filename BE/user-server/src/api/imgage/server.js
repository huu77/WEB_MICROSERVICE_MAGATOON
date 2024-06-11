// uploadServer.js
const cloudinary = require("cloudinary").v2;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ResponseFactory = require("../../response_design");
const uploadServer = async (file, id) => {
   
  try {
    await prisma.$connect();
    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // Extract public ID from the photoURL
    const publicId = user.photoURL.split("/").slice(-2).join("/").split(".")[0]
      ? user.photoURL.split("/").slice(-2).join("/").split(".")[0]
      : null;
    console.log(publicId);
    // If there's a previous photoURL and public ID, delete the old image from Cloudinary
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // Update the user's photoURL with the new file path
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        photoURL: file.path,
      },
    });

    // Return the updated photoURL
    return ResponseFactory.createResponse(201, {
      photoURL: updatedUser.photoURL,
    });
  } catch (error) {
    // Handle error
    return ResponseFactory.createResponse(500, error);
  } finally {
    // Đóng kết nối Prisma Client
    await prisma.$disconnect();
  }
};

module.exports = { uploadServer };
