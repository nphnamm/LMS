import { activateUser, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updateUserInfo } from '../controllers/user.controller';
import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const router = express.Router();

router.post('/registration', registrationUser);
router.post('/activate-user', activateUser);
router.post('/login-user', loginUser);
router.get('/logout', isAuthenticated,logoutUser);
router.get('/refresh',updateAccessToken);
router.get('/me',isAuthenticated,getUserInfo);
router.get('/social-auth',socialAuth);
router.put('/update-user-info',isAuthenticated,updateUserInfo);




export default router;
