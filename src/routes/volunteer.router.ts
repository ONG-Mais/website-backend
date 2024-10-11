import { Router } from "express";
import volunteerController from "../controllers/volunteer/volunteer.controller";

const volunteerRouter = Router();

volunteerRouter.post("", volunteerController);

export default volunteerRouter;
