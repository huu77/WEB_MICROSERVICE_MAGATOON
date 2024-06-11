const {
  getAllListStoryOfUserServer,
  getAllServer,
  buyServer,
} = require("./server");

const getAllListStoryOfUser = async (req, res) => {
  const rs = await getAllListStoryOfUserServer(req.query);

  return res.json(rs);
};

const getAll = async (req, res) => {
  const rs = await getAllServer();
  return res.json(rs);
};

const buyController =async(req, res) =>{
  const {storyId} =req.query
  const userId = req.idUser
 
  const rs = await buyServer(storyId,userId);
  return res.json(rs);
}
module.exports = {
  getAllListStoryOfUser,
  buyController,
  getAll,
};
