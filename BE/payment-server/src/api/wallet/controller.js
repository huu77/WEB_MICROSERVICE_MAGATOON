const { getWalletServer, updateBalanceServer } = require("./service");

const getWallerController = async (req, res) => {
  const id = req.idUser;
  const result = await getWalletServer(id);
  return res.json(result);
};
const getOneWallerController = async (req, res) => {
  const id = req.params.id;
  const result = await getWalletServer(id);
  return res.json(result);
};
const updateBalance = async (req, res) => {
  const id = req.idUser;
  const { balance } = req.query;
  console.log(balance, id);

  const result = await updateBalanceServer({ id, balance });

  return res.json(result);
};


module.exports = { getWallerController, updateBalance, getOneWallerController };
