const ResponseFactory = require("../../response_design");
const {
    CreatePackageTransactionServer
  } = require("./server");
  
  const CreatServiceTransaction = async (req, res) => {
    const idUser = req.idUser
    const {servicePackageId}= req.body
 
    const result = await CreatePackageTransactionServer(servicePackageId,idUser);
    return res.json(result);
  };

  //  buy service success and it will run post create new service transaction
 const returnThank =(req,res)=>{
 return res.json(ResponseFactory.createResponse(201,"Thanh toan thanh cong!"))
 }
  module.exports = {
    CreatServiceTransaction,
    returnThank
  };
  