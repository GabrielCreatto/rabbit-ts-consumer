import { Connection, Channel } from 'amqplib';
import { Amqp } from '../controllers/amqp';

const amqp = new Amqp();

export const read = async (queue: string) => {
    const connection: Connection = await amqp.connectAmqp();
    const channel: Channel = await connection.createChannel();
    await channel.assertQueue(queue);
    channel.consume(queue, (msg) => { 
        console.log(msg?.content.toString());
    }, {
        noAck: true
    });
};



// async function read(req: Request, res: Response) {
//     try {
//         const connection: Connection = await createAmqpConnection();
//         const channel: Channel = await createAmqpChannel(connection);
//         if (req.query.queue) {
//             await channel.consume(req.query.queue.toString(), (msg: ConsumeMessage | null) => {
//                 if (msg)
//                     channel.ack(msg);
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
//     res.send('Read message');
// }