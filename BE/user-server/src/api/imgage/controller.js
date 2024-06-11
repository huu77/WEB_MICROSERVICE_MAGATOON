const { uploadServer } = require("./server");

const uploadController = async (req, res) => {
  const file  = req.file;
 
  const rs = await uploadServer(file, req.idUser);

  return res
    .json(rs);
};

module.exports = { uploadController };
