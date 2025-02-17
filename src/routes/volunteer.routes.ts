import volunteerController from "../controllers/volunteer/volunteer.controller";
import { Router } from "express";

const volunteerRouter = Router();

volunteerRouter.post("", volunteerController);

export default volunteerRouter;
