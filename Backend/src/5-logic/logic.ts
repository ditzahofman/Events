import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import { EventModel, IEventModel } from "../4-models/event-model";
import { EventTypeModel, IEventTypeModel } from "../4-models/eventType-model";


function getAllEventTypes():Promise<IEventTypeModel[]> {
return EventTypeModel.find().exec()
}

 function getAllEventsByTypes(eventTypeId:string):Promise<IEventModel[]>{
    return EventModel.find({eventTypeId}).populate("eventsTypes").exec()
}

function addEvent(event:IEventModel):Promise<IEventModel>{
    const errors = event.validateSync()
    if(errors) throw new ValidationErrorModel(errors.message)
    return event.save()
}

async function deleteEvent(_id:string):Promise <void>{
    const deleteEvent = await EventModel.findByIdAndDelete(_id)
    if(!deleteEvent) throw new ResourceNotFoundErrorModel(_id)
}
export default {
    getAllEventTypes,
    getAllEventsByTypes,
    addEvent,
    deleteEvent
}