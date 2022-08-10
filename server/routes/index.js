import { Router } from 'express';
// import * as example from './example.routes.js';
import * as users from './users.routes.js';
import * as closet from './closet.routes.js';
import * as posts from './posts.routes.js';
import * as market from './market.routes.js';
import * as like from './like.routes.js';

import authmiddleware from '../util/authmiddleware.js';

const router = Router();

// router.use(example.path, example.router);
router.use(users.path, users.router);
router.use(closet.path, authmiddleware, closet.router);
router.use(posts.path, posts.router);
router.use(market.path, authmiddleware, market.router);
router.use(like.path, authmiddleware, market.router);



export default router;