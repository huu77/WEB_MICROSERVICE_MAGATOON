const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// Hàm mã hóa JWT sử dụng private key
const encodeToken = (payload) => {
  const privateKeyPath = path.join(__dirname, "key", "private.key");

  // Đọc private key từ file
  const privateKey = fs.readFileSync(privateKeyPath);

  // Mã hóa JWT bằng RSA private key
  const encodedJWT = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
  return encodedJWT;
};

// Hàm mã hóa refresh token sử dụng private key
const encodeRefreshToken = (payload) => {

  const privateKeyPath = path.join(__dirname, "key", "private.key");

  // Đọc private key từ file
  const privateKey = fs.readFileSync(privateKeyPath);
  // Mã hóa JWT bằng RSA private key
  const encodedJWT = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "2h",
  });
  return encodedJWT;
};

// In ra mã JWT được mã hóa bằng hàm encodeToken
// console.log(encodeToken({ X: "hello" }));

// Xuất hai hàm encodeToken và encodeRefreshToken để sử dụng ở các module khác
module.exports = { encodeToken, encodeRefreshToken };
