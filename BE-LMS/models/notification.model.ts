import mongoose,{Document,Model,Schema} from "mongoose";

export interface INotification extends Document{
    title:string;
    userId: string;
    message:string;
    status:string;
}

const notificationSchema = new Schema<INotification>({
    title: {type:String,required:true},
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"unread",
        require:true
    }

},{timestamps:true});

const NotificationModel: Model<INotification> = mongoose.model('Notification',notificationSchema);
export default NotificationModel;
