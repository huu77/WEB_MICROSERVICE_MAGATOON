const { loginServer,refreshTokenServer,loginGoogleServer } = require("./server");


const loginController = async (req, res) => {
    const response = await loginServer(req.body);
      
    // Trả về response từ loginServer
    return res.json(response);
};


const refreshTokenController = async(req,res)=>{
    
        const token = req.headers['authorization'].split(' ')[1]; // Giả sử token được lưu trong header Authorization
        // Gọi hàm refreshTokenServer và truyền token
        
        const response = await refreshTokenServer(token);
 
        // Trả về response từ refreshTokenServer
        return res.json(response);
    
}
 
const loginGoogleController = async(req,res)=>{
     
    const result = await loginGoogleServer(req.body);

        // Trả về response từ loginGoogleServer
        return res.json(result);
}


module.exports= {loginController,refreshTokenController,loginGoogleController}