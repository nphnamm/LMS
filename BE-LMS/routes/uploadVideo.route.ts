import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { getAccessToken, publishVideo, uploadVideoToDailymotion } from '../daily';
const uploadRouter = express.Router();


uploadRouter.get(
    '/upload-video',
    getAccessToken
);
uploadRouter.post(
    '/upload-video',
    uploadVideoToDailymotion
);

uploadRouter.post(
    '/publish-video',
    publishVideo
);





export default uploadRouter;