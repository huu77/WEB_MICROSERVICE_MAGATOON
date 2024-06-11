const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const ResponseFactory = require('../response_design');
// Read the public key from file and cache it
  // Đường dẫn tuyệt đối đến private key
  const publicKeyPath = path.join(__dirname, "key", "public.pem");
  const publicKey = fs.readFileSync(publicKeyPath);

const decode = async(encodedJWT) => {
  try {

    // Giải mã JWT sử dụng khóa công khai đã đọc từ file
    const decodedJWT = jwt.verify(encodedJWT, publicKey);
    return decodedJWT;
    
  } catch (error) {
    // Xử lý lỗi khi giải mã JWT không thành công
   return ResponseFactory.createResponse(401,error)
  }
};

const isTokenExpired = (decodedToken) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Lấy timestamp hiện tại (đơn vị: giây)
  return decodedToken.exp < currentTimestamp;
};
  module.exports = { decode, isTokenExpired };
