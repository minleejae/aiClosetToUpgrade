import { Router } from 'express';
// import * as example from './example.routes.js';
import * as users from './users.routes.js';
import * as closet from './closet.routes.js';

const router = Router();

// router.use(example.path, example.router);
router.use(users.path, users.router);
router.use(closet.path, closet.router);


export default router;