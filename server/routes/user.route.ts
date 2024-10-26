import { activateUser, loginUser, logoutUser, registrationUser } from '../controllers/user.controller';
import express from 'express';
const router = express.Router();

router.post('/registration', registrationUser);
router.post('/activate-user', activateUser);
router.post('/login-user', loginUser);
router.post('/logout', logoutUser);



export default router;
