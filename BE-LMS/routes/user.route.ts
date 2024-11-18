import { activateUser, deleteUser, forgotPassword, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole, verifyForgotPassword } from '../controllers/user.controller';
import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const router = express.Router();

router.post(
    '/registration',
    registrationUser
);
router.post(
    '/activate-user',
    activateUser
);
router.post(
    '/login-user',
    loginUser
);
router.get(
    '/logout',
    isAuthenticated,
    logoutUser
);
router.get(
    '/refresh',
    updateAccessToken
);
router.get(
    '/me',
    isAuthenticated,
    getUserInfo
);
router.get(
    '/me',
    isAuthenticated,
    getUserInfo
);

router.post(
    '/social-auth',
    socialAuth
);

router.put(
    '/update-user-info',
    isAuthenticated,
    updateUserInfo
);

router.put(
    '/update-user-password',
    isAuthenticated,
    updatePassword
);

router.put(
    '/update-user-avatar',
    isAuthenticated,
    updateProfilePicture
);

router.post(
    '/forgot-password',
    forgotPassword
);

router.post(
    '/verify-forgot-password',
    verifyForgotPassword
);

router.get(
    '/get-all-users',
    getAllUsers
);
//only -- admin
router.put(
    '/update-user-role',
    isAuthenticated,
    authorizeRoles("admin"),
    updateUserRole
);
//only -- admin
router.delete(
    '/delete-user',
    isAuthenticated,
    authorizeRoles("admin"),
    deleteUser
);



export default router;
