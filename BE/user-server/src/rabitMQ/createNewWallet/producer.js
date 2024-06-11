const amqp = require("amqplib");
require("dotenv").config();
const url = process.env.URL_CONNECT;
async function producer(message) {
  try {
    // Kết nối tới RabbitMQ server
    const connection = await amqp.connect(url);

    // Tạo kênh kết nối
    const channel = await connection.createChannel();

    // Khai báo một hàng đợi
    const queueName = "CreateNewWallet";
    await channel.assertQueue(queueName, { durable: false }); // set lai thanh true khi use docker

    channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(message), "utf8"),
      {
        persistent: true,
      }
    );

    // // Đóng kết nối
    // setTimeout(() => {
    //     connection.close();
    //     process.exit(0);
    // }, 1000);
  } catch (error) {
    console.error("Error:", error);
  }
}
module.exports = producer;
