const bcrypt = require('bcrypt');

// Hash mật khẩu với bcrypt
const hashPassword = async (password) => {
    try {
        // Sử dụng hàm hash của bcrypt để tạo một hash từ mật khẩu
        return await bcrypt.hash(password, 10); // 10 là số vòng lặp để tạo salt
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

const isPassword= async(password,hashPassword)=>{
 return  await bcrypt.compare(password, hashPassword);
} 


 
// const password = 'your_password';
// hashPassword(password)
//     .then(hashedPassword => {
//         console.log('Hashed password:', hashedPassword);
//         // Ở đây bạn có thể lưu hashedPassword vào cơ sở dữ liệu hoặc thực hiện các thao tác khác
//     })
//     .catch(error => {
//         console.error('Error hashing password:', error);
//     });
 
module.exports = {hashPassword,isPassword}