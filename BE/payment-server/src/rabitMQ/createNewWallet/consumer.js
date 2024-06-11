const amqp = require('amqplib');
const { createNewWallet } = require('../../api/wallet/service');
 
 
require("dotenv").config();
const url = process.env.URL_CONNECT;

async function consumer() {
    try {
        
        // Connect to RabbitMQ server
        const connection = await amqp.connect(url);
        
        // Create a channel
        const channel = await connection.createChannel();
        
        // Declare a queue
        const queueName = 'CreateNewWallet';
        await channel.assertQueue(queueName, { durable: false });

        return new Promise((resolve, reject) => {
            // Consume messages from the queue
            channel.consume(queueName, async(msg) => {
                const rs = JSON.parse(msg.content.toString());
                if (rs) {
                    await createNewWallet(rs);
                  }
                // Resolve the Promise with the received message
                resolve(rs);
            }, { noAck: true }); // noAck: true means automatic acknowledgment
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

 
module.exports = consumer
