import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const courseRouter = express.Router();
import { getAllCourses, getCourseByUser, getSingleCourse, updateCourse, uploadCourse } from '../controllers/course.controller';

courseRouter.post(
    '/create-course',
    isAuthenticated,
    authorizeRoles('admin'),
    uploadCourse
);

courseRouter.put(
    '/update-course/:id',
    isAuthenticated,
    authorizeRoles('admin'),
    updateCourse
);

courseRouter.get(
    '/get-course/:id',
    getSingleCourse
);

courseRouter.get(
    '/get-courses',
    getAllCourses
);

courseRouter.get(
    '/get-course-content/:id',
    isAuthenticated,
    getCourseByUser
);

export default courseRouter;