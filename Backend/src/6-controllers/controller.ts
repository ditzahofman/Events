import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/logic";
import { EventModel } from "../4-models/event-model";


const router = express.Router(); // Capital R

// GET http://localhost:3001/api/types
router.get("/types", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const types = await logic.getAllEventTypes()
        response.json(types)
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/events/:eventTypeId
router.get("/events/:eventTypeId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const eventTypeId = request.params.eventTypeId
        const events = await logic.getAllEventsByTypes(eventTypeId)
        response.json(events)
    }
    catch (err: any) {
        next(err);
    }
});

// post http://localhost:3001/api/events/
router.post("/events", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const newEvent = new EventModel(request.body)
        const events = await logic.addEvent(newEvent)
        response.status(201).json(events)
    }
    catch (err: any) {
        next(err);
    }
});

// post http://localhost:3001/api/events/
router.delete("/events/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id
        await logic.deleteEvent(_id)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
