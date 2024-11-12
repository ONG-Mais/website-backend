import { Router } from "express";
import getStatesController from "../controllers/location/getState.controller";
import getCitysController from "../controllers/location/getCity.controller";

export const locationRouter = Router();

locationRouter.get("/states", getStatesController);
locationRouter.get("/states/:stateId/citys", getCitysController);
