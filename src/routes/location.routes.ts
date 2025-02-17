import getStatesController from "../controllers/location/getState.controller";
import getCitysController from "../controllers/location/getCity.controller";
import { Router } from "express";

export const locationRouter = Router();

locationRouter.get("/states", getStatesController);
locationRouter.get("/states/:stateId/cities", getCitysController);
