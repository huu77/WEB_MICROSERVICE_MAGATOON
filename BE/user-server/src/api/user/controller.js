const { getUserServer, getAllUsersServer } = require("./server");

const getUserController = async (req, res) => {
 
    const {id} = req.query
    const result = await getUserServer(id);

    return res
      .json(result);
   
};

const getAllUsersController = async(req,res)=>{

    const result = await getAllUsersServer(req.query);

    return res
      .json(result);
 
}

const getProfileController = async(req,res)=>{
  const idUser = req.idUser
  const rs = await getUserServer(idUser)
  return res
  .json(rs);
}

module.exports = { getUserController,getAllUsersController ,getProfileController};
