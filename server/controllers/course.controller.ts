import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/cacthAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";


// upload course
export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        createCourse(data, res, next);

    } catch (error: any) {
        next(new ErrorHandler(error.message, 500))
    }
})




export const updateCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            await cloudinary.v2.uploader.destroy(thumbnail.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        }
        const courseId = req.params.id;
        const course = await CourseModel.findByIdAndUpdate(
            courseId,
            {
                $set: data,
            },
            { new: true }
        );
        res.status(200).json({
            success: true,
            course
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))

    }
});

// get single course -- without purchasing 
// export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const course = await CourseModel.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links");

//         res.status(200).json({
//             success: true,
//             course
//         })
//     } catch (error: any) {
//         return next(new ErrorHandler(error.message, 400))

//     }
// });

export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;
        const isCachedExist = await redis.get(courseId);

        if (isCachedExist) {
            console.log('get from redis ')
            const course = JSON.parse(isCachedExist);
            res.status(200).json({
                success: true,
                course
            })

        } else {
            const course = await CourseModel.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links");

            console.log('get from mongoDB')
            await redis.set(courseId, JSON.stringify(course));
            res.status(200).json({
                success: true,
                course
            })

        }



    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))

    }
});

// get all courses --without purchasing 
export const getAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isCachedExist = await redis.get("allCourses");
        if (isCachedExist) {
            console.log('get from redis ')

            const courses = JSON.parse(isCachedExist);
            res.status(200).json({
                success: true,
                courses
            });
        } else {
            const course = await CourseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links");
            console.log('get from mongoDB')


            res.status(200).json({
                success: true,
                course
            })
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))

    }
});

// get course content -- only for valid user

export const getCourseByUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userCourseList = req.user?.courses;
        const courseId = req.params.id;

        const courseExists = userCourseList?.find(
            (course:any) => course._id.toString() === courseId
        );
        if(!courseExists){
            return next(new ErrorHandler("You are not eligible to access this course", 404));
        }
        const course = await CourseModel.findById(courseId);
        const content = course?.courseData;
        res.status(200).json({
            success: true,
            content
        })


    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))

    }
});


//add question in course
interface IAddQuestionData{
    question: string;
    courseId: string; 
    contentId:string;
}

export const template = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {





    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))

    }
});


export const template = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {





    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))

    }
});