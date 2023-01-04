import { connectQueue } from './service/consumer'
import { Amqp } from './controllers/amqp';
import dotenv from 'dotenv';
dotenv.config();

async function init() {
    await new Amqp().install();
    console.log('Started RabbitMQ!');
}

init();
connectQueue();