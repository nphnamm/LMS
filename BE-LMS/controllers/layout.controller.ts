import cloudinary from 'cloudinary';
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/cacthAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import LayoutModel from '../models/layout.model';

// create Layout
export const createLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;
        const isTypeExist = await LayoutModel.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler(`${type} already exist`, 400));

        }
        if (type === "Banner") {
            const { image, title, subTitle } = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "Layout",

            });
            const banner = {
                type: "Banner",
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                },
                title,
                subTitle
            };
            await LayoutModel.create(banner);

        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const FaqItem = await LayoutModel.findOne({ type: "FAQ" });
            const faqItems = await Promise.all(
                faq.map(async (item: any) => {
                    return {
                        question: item.question,
                        answer: item.answer
                    }
                })
            )
            await LayoutModel.findByIdAndUpdate(FaqItem?.id, { type: "FAQ", faq: faqItems });
        }
        if (type === "Categories") {
            const { categories } = req.body;
            const CategoriesItem = await LayoutModel.findOne({ type: "Categories" });

            const categoryItems = await Promise.all(
                categories.map(async (item: any) => {
                    return {
                        title: item.title
                    }
                })
            )
            await LayoutModel.findByIdAndUpdate(CategoriesItem, { type: "Categories", categories: categoryItems });
        }
        res.status(200).json({
            success: true,
            message: "Layout created successfully"
        })




    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))

    }
});


// edit Layout
export const editLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;
        if (type === "Banner") {
            const bannerData: any = await LayoutModel.findOne({ type: "Banner" });
            const { image, title, subTitle } = req.body;
            if (bannerData) {
                await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
            }
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "Layout",
            });
            const banner = {
                type :"Banner",
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                },
                title,
                subTitle
            };
            await LayoutModel.findByIdAndUpdate(bannerData.id, { banner });

        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const faqItems = await Promise.all(
                faq.map(async (item: any) => {
                    return {
                        question: item.question,
                        answer: item.answer
                    }
                })
            )
            await LayoutModel.create({ type: "FAQ", faq: faqItems });
        }
        if (type === "Categories") {
            const { categories } = req.body;
            const categoryItems = await Promise.all(
                categories.map(async (item: any) => {
                    return {
                        title: item.title
                    }
                })
            )
            await LayoutModel.create({ type: "Categories", categories: categoryItems });
        }
        res.status(200).json({
            success: true,
            message: "Layout created successfully"
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))

    }
});

// get layout by type 
export const getLayoutByType = CatchAsyncError(
    async(req:Request,res: Response, next:NextFunction)=>{
        try{
            const {type} = req.body;
            const layout = await LayoutModel.findOne(type);
            res.status(201).json({
                success:true,
                layout
            });

        }catch(error:any){
            return next(new ErrorHandler(error.message,500))
        }
    }
)