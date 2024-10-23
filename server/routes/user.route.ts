import { activateUser, loginUser, registrationUser } from '../controllers/user.controller';
import express from 'express';
const router = express.Router();

router.post('/registration', registrationUser);
router.post('/activate-user', activateUser);
router.post('/login-user', loginUser);



export default router;
