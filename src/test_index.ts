import client, { Connection, Channel } from 'amqplib';
import * as dotenv from 'dotenv';
dotenv.config();

function connectAmqp() {
    return client.connect('amqp://username:password@localhost:5672');
}

const sendMessages = (channel: Channel) => {
    for (let i = 0; i < 10; i++) {
        //channel.sendToQueue("myQueue", Buffer.from(`message ${i}`));
        channel.publish('direct_logs', 'error', Buffer.from(`message ${i}`));
        console.log(`Publicado mensagem: "mensagem ${i}"`);
    }
};

const read = async () => {
    const connection: Connection = await connectAmqp();
    const channel: Channel = await connection.createChannel();
    await channel.assertQueue('myQueue');
    channel.consume('myQueue', (msg) => { 
        console.log(msg?.content.toString());
    }, {
        noAck: true
    });
};

const isntall = async () => {
    const connection: Connection = await connectAmqp();
    const channel: Channel = await connection.createChannel();

    // ## conecta/cria uma fila específica
    await channel.assertQueue('myQueue');
    await channel.assertQueue('infoQueue');
    await channel.assertQueue('errorQueue');

    // ## conecta/cria uma fila temporária, quando é desconectado, a fila é deletada
    // channel.assertQueue('', {
    //     exclusive: true
    // });

    // ## cria uma exchange com do tipo fanout com o nome logs
    // channel.assertExchange('logs', 'fanout', {durable: false});
    // channel.bindQueue('myQueue', 'logs', '');
    await channel.assertExchange('direct_logs', 'direct', {durable: false});
    await channel.bindQueue('infoQueue', 'direct_logs', 'info');
    await channel.bindQueue('errorQueue', 'direct_logs', 'error');

    channel.publish('direct_logs', 'error', Buffer.from('message}'));

    // sendMessages(channel);
};

// isntall().then((channel: Channel) => {
//     sendMessages(channel);
// });
isntall();
//read();

