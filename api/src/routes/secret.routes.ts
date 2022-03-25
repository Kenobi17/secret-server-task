import { Router, Request, Response } from 'express';
import { createSecret, getSecret } from '../controllers/secret.controllers';
const router: Router = Router();

router.post('/', createSecret);
router.get('/:hash', getSecret);

export default router;
