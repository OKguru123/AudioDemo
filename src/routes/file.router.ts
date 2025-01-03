import { Router } from 'express';
import {
  CreateAdmin,
  createUserController,
  demoController,
  getUserData,
} from '../controllers/file.controllers';
import { createUser, getUsersall } from '../controllers/User';
import { createPost, getPostsByUser } from '../controllers/Post';
import { sendEmailOTP } from '../controllers/userRegistercontroller';
import { varifyOTP } from '../controllers/varifyOtp';

const router = Router();
console.log('comes to roter demomessage ');

router.get('/demomessage', demoController);
router.post('/createuser', createUserController);
router.post('/createAdmin', CreateAdmin);
router.get('/getUser/:userId', getUserData);
//

router.post('/relation/user', createUser);
router.get('/relation/allusers', getUsersall);

//
router.post('/relation/createpost', createPost);
router.get('/relation/getpost/:userId', getPostsByUser);
router.post('/relation/sendEmail', sendEmailOTP);
router.post('/relation/verifyotp', varifyOTP);

export default router;
