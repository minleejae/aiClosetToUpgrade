import { Router } from 'express';
// import * as example from './example.routes.js';
import * as users from './users.routes.js';

const router = Router();

// router.use(example.path, example.router);
router.use(users.path, users.router);

export default router;