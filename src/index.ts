import express from 'express';
import router from './app/routes/route';
import { Amqp } from './app/controllers/amqp';

const app = express();

app.use('/', router);

async function init() {
    await new Amqp().install();
    console.log('Iniciado RabbitMQ!');

    await app.listen(3000);
    console.log('App startup! Listening on Port 3000!');
}

init();