import { Router } from "express";
import { getEvents, getEventsByLocation } from "../controllers/events.js";

const router = Router();

router.get("/events", getEvents);
router.get("/location/:id", getEventsByLocation);

export default router;
