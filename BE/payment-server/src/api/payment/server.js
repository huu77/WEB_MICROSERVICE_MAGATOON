
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ResponseFactory = require("../../response_design");

const  sortObject=(obj)=>{
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
function generateRandomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';

    // Thêm 6 chữ số ngẫu nhiên
    for (let i = 0; i < 6; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    // Thêm 4 ký tự ngẫu nhiên từ bảng chữ cái
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Trộn ngẫu nhiên chuỗi kết quả
    result = result.split('').sort(() => Math.random() - 0.5).join('');

    return result;
}

 
 
const createNewHistoryWallet = async (amount, userId) => {
  try {
    await prisma.$connect();
    const rs = await prisma.$transaction(async (Prisma) => {
      // Save the updated wallet
      const CreateNewHistory = await Prisma.walletrechargetransaction.create({
        data: { amount: parseFloat(amount), userId: parseInt(userId) },
      });
      
      if (!CreateNewHistory) {
        throw Error("Dont create hisory!");
      }
      return ResponseFactory.createResponse(201, CreateNewHistory);
    });
    return rs;
  } catch (error) {
    if (error.message === "Dont create hisory!") {
      return ResponseFactory.createResponse(400, error.message);
    } else {
      return ResponseFactory.createResponse(500, error);
    }
  } finally {
    await prisma.$disconnect();
  }
};



module.exports ={ sortObject,generateRandomString,createNewHistoryWallet}