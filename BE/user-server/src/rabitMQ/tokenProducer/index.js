const amqp = require("amqplib");
require("dotenv").config();
const url = process.env.URL_CONNECT1;
async function TokenProducer(data) {
  try {
    // Kết nối tới RabbitMQ server
    const connection = await amqp.connect(url);

    // Tạo kênh kết nối
    const channel = await connection.createChannel();

    const exchange = 'user';
    await channel.assertExchange(exchange, 'direct', {
      durable: true
    });
    channel.publish(exchange, 'user.signIn.saveToken', Buffer.from(JSON.stringify(data)), {
      persistent: true
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
module.exports = TokenProducer;
