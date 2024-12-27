import { Router } from 'express';
import {
  CreateAdmin,
  createUserController,
  demoController,
  getUserData,
} from '../controllers/file.controllers';

const router = Router();
console.log('comes to roter demomessage ');

router.get('/demomessage', demoController);
router.post('/createuser', createUserController);
router.post('/createAdmin', CreateAdmin);
router.get('/getUser/:userId', getUserData);

export default router;
