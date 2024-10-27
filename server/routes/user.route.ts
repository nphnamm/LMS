import { activateUser, loginUser, logoutUser, registrationUser, updateAccessToken } from '../controllers/user.controller';
import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const router = express.Router();

router.post('/registration', registrationUser);
router.post('/activate-user', activateUser);
router.post('/login-user', loginUser);
router.get('/logout', isAuthenticated,logoutUser);
router.get('/refresh',updateAccessToken);




export default router;
