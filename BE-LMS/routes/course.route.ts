import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const courseRouter = express.Router();
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, getAllCourses, getAllCoursesAdmin, getCourseByUser, getSingleCourse, updateCourse, uploadCourse } from '../controllers/course.controller';

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
courseRouter.put(
    '/add-question',
    isAuthenticated,
    addQuestion
);
courseRouter.put(
    '/add-answer',
    isAuthenticated,
    addAnswer
);
courseRouter.post(
    '/add-review/:id',
    isAuthenticated,
    addReview
);
courseRouter.post(
    '/add-reply',
    isAuthenticated,
    authorizeRoles("admin"),
    addReplyToReview
);

courseRouter.get(
    '/get-all-courses',
    isAuthenticated,
    authorizeRoles("admin"),
    getAllCoursesAdmin
);

courseRouter.delete(
    '/delete-user', 
    isAuthenticated, 
    authorizeRoles("admin"), 
    deleteCourse
);





export default courseRouter;