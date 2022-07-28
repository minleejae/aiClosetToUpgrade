import { Router } from 'express';
import * as example from './example.routes.js';

const router = Router();

router.use(example.path, example.router);


export default router;