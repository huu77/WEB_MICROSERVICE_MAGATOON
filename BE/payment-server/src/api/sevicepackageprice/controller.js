const service = require("./service");

const getOne = async (req, res) => {
  const result = await service.getOneServer(req.query);
  return res.json(result);
};

const getAllOfIdService = async (req, res) => {
  const result = await service.getAllOfIdService(req.query);
  return res.json(result);
};

const CreateNew = async (req, res) => {
 
    const result = await service.createNewService(req.body);
    return res.json(result);
    
};

const Update = async (req, res) => {
 
    const result = await service.updatePrice(req.body);
    return res.json(result);
    
};

const deletePrice = async (req, res) => {
 
    const result = await service.deleteService(req.query);
    return res.json(result);
    
};

module.exports = { getOne, getAllOfIdService, CreateNew, Update, deletePrice };
