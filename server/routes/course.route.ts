import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const courseRouter = express.Router();
import { uploadCourse } from '../controllers/course.controller';

courseRouter.post(
    '/create-course',
    isAuthenticated,
    authorizeRoles('admin'),
    uploadCourse
);

export default courseRouter;