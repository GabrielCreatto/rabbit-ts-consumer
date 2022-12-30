import { read } from '../service/consumer';
import { Request, Response } from 'express';

// export function sendMessage(req: Request, res: Response) {

//     const fila = req.query.queue ? req.query.queue.toString() : 'info';

//     const teste_erro: boolean = req.query.teste_erro === 'true' ? true : false;
//     send(fila, teste_erro);

//     res.send(`Mensagem enviada! Fila: ${fila}`);
// }

export function readMessage(req: Request, res: Response) {
    if (req.query.queue) {
        read(req.query.queue.toString());
        res.send(`Mensagem Lida! Fila: ${req.query.queue.toString()}`);
    }
}