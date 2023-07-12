import mongoose from "mongoose";
import { EventTypeModel } from "./eventType-model";

export interface IEventModel extends mongoose.Document{
    eventTypeId:mongoose.Schema.Types.ObjectId
    date:string
    description:string
    adress:string
    participants:number  
}

export const EventSchema = new mongoose.Schema<IEventModel>({
    eventTypeId:{
        type:mongoose.Schema.Types.ObjectId
    },
    date:{
        type:String,
        required:[true ,"Missing Date"]
    },
    description:{
        type:String,
        required:[true ,"Missing Discription"]
    },
    adress:{
        type:String,
        required:[true ,"Missing adress"]
    },
    participants:{
        type:Number,
        required:[true ,"Missing participants"]
    },
},
{
    versionKey:false,
    toJSON:{virtuals:true},
    id:false
})

EventSchema.virtual("eventsTypes",{
    ref:EventTypeModel,
    localField:"eventTypeId",
    foreignField:"_id",
    justOne:true
})

export const EventModel = mongoose.model<IEventModel>("EventModel" , EventSchema , "events")