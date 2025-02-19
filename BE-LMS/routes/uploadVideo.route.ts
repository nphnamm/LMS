import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { getAccessToken, uploadVideoToDailymotion } from '../daily';
const uploadRouter = express.Router();


uploadRouter.get(
    '/upload-video',
    getAccessToken
);
uploadRouter.post(
    '/upload-video',
    uploadVideoToDailymotion
);





export default uploadRouter;