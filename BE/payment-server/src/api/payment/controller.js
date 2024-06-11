require("dotenv").config();
const moment = require("moment");
const querystring = require("qs");
const crypto = require("crypto");
const { sortObject, generateRandomString, createNewHistoryWallet } = require("./server");
const { updateBalanceServer } = require("../wallet/service");

// nap tien vao vi
const createPayment = async (req, res) => {
  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = process.env.VNP_TMNCODE;
  let secretKey = process.env.VNP_HASHSECRET;
  let vnpUrl = process.env.VNP_URL;
  let returnUrl = req.body.type === 1 ? process.env.VNP_RETURN_URL : process.env.VNP_RETURN_URL_BUYSERVICE;
  let orderId = generateRandomString(20);
  let amount = req.body.amount;
  let bankCode = req.body.bankCode;
  let locale = req.body.language || "vn";
  let vnp_OrderInfo = req.body.Billing_Information;

  let currCode = "VND";
  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: vnp_OrderInfo,
    vnp_OrderType: `orderby`,
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnp_Params["vnp_BankCode"] = bankCode;
  }
  vnp_Params = sortObject(vnp_Params);

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;

  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  res.json(vnpUrl);
  // res.redirect(vnpUrl)
};

const returnThanks = async (req, res) => {

  const { vnp_Amount, vnp_BankCode, vnp_TxnRef, vnp_OrderInfo } = req.query;

  if (!vnp_Amount || !vnp_BankCode || !vnp_TxnRef || !vnp_OrderInfo) {
    return ResponseFactory.createResponse(400, "Missing query parameters");
  }
  const MONEY = encodeURIComponent(vnp_Amount);
  const MANH = encodeURIComponent(vnp_BankCode);
  const MADH = encodeURIComponent(vnp_TxnRef);
  const INFO = encodeURIComponent(vnp_OrderInfo);
  const id = req.idUser
  console.log(id)
  const balance = parseInt(MONEY)
  const rs = await updateBalanceServer({ id, balance })
  const rsHistory = await createNewHistoryWallet(balance, id)

  return res.json({
    message: "thanh toan thanh cong",
    data: {
      MONEY: MONEY,
      MANH: MANH,
      MADH: MADH,
      INFO: INFO

    },
  });

};

module.exports = { createPayment, returnThanks };
