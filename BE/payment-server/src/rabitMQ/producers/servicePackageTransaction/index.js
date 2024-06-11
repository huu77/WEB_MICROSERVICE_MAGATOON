const amqp = require("amqplib");
require("dotenv").config();
const url = process.env.URL_CONNECT;
async function ServicePackageTransactionProducer(data) {
  try {
    // Kết nối tới RabbitMQ server
    const connection = await amqp.connect(url);

    // Tạo kênh kết nối
    const channel = await connection.createChannel();

    const exchange = 'servicePackageTransaction';
    await channel.assertExchange(exchange, 'direct', {
        durable: true
    });
    channel.publish(exchange, 'servicePackageTransaction.create', Buffer.from(JSON.stringify(data)), {
        persistent: true
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
module.exports = ServicePackageTransactionProducer;
