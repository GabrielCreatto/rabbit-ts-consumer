import { Router } from 'express';
import { sendMessage, readMessage } from '../controllers/controller';

const routes = Router();

routes.get('/send', sendMessage);
routes.get('/read', readMessage);

export default routes;