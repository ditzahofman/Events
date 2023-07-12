import mongoose from "mongoose";

export interface IEventTypeModel extends mongoose.Document{
    eventTypeName:string
}

export const EventTypeSchema = new mongoose.Schema<IEventTypeModel>({
    eventTypeName:{
        type:String,
        required:[true , "Missing name"]
    }
})

export const EventTypeModel = mongoose.model<IEventTypeModel>("EventTypeModel",EventTypeSchema ,"eventsTypes")