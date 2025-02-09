require('dotenv').config();
import express from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleWare } from "./middleware/error"; 
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import folderRouter from "./routes/folder.route";
import setRouter from "./routes/set.routes";
import categoryRouter from "./routes/category.route";
import flashcardRouter from "./routes/flashcard.route";
import studySessionRouter from "./routes/studysession.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
import aiRouter from "./routes/ai.route";

// body parser
app.use(express.json({limit: "50mb"}));


// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing 
app.use(cors({
    origin:['http://localhost:3001'],
    credentials:true,
}))

// routes
app.use("/api/v1",userRouter)
app.use("/api/v1",courseRouter)
app.use("/api/v1",orderRouter)
app.use("/api/v1",folderRouter)
app.use("/api/v1",setRouter)
app.use("/api/v1",categoryRouter)
app.use("/api/v1",flashcardRouter)
app.use("/api/v1",studySessionRouter)
app.use("/api/v1",notificationRouter)
app.use("/api/v1",analyticsRouter)
app.use("/api/v1",layoutRouter)
app.use("/api/v1",aiRouter)




app.get("/test",(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"API is working"
    });

});

app.all("*",(req,res,next)=>{
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
})

app.use(ErrorMiddleWare)
