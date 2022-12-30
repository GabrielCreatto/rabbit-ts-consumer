import { Router } from 'express';
import { readMessage } from '../controllers/controller';

const routes = Router();

routes.get('/read', readMessage);

export default routes;