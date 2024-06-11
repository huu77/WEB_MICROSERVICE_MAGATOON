const { getRevenuesServer ,getAllHistoryTransaction} = require("./server");

const getRevenues = async (req, res) => {
  const result = await getRevenuesServer();
  return res.json(result);
};
 

const getAllController = async(req,res)=>{
  const rs = await getAllHistoryTransaction(req.query)
  return res.json(rs)
}
module.exports = { getRevenues ,getAllController};
