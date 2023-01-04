import { Connection, Channel } from 'amqplib';
import { Amqp } from '../controllers/amqp';

const amqp = new Amqp();

export const connectQueue = async () => {
    const connection: Connection = await amqp.connectAmqp();
    const channel: Channel = await connection.createChannel();
    await channel.assertQueue('info');
    await channel.assertQueue('info_dlq');
    setTimeout(function () {
        channel.consume('info', (msg) => { 
            console.log(`Read message from queue info: ${msg?.content.toString()}`);
        }, {
            noAck: true
        });
        channel.consume('info_dlq', (msg) => { 
            console.log(`Read message from queue info_dlq: ${msg?.content.toString()}`);
        }, {
            noAck: true
        });
    }, 500);
};