const producer = require("../../rabitMQ/createNewWallet/producer");
const { registerServer, verifiedServer } = require("./server");

const register = async (req, res) => {
    const response = await registerServer(req.body);
      
    if(response.statusCode===201){
        const id = response.data.id
        await producer(id)
    }
    return res.json(response);
    
};
const verified = async(req,res)=>{

        const response = await verifiedServer(req.query);
        
        return res.json(response);
   
}
module.exports = {register,verified};
