import { Router } from "express";
import sendEmailController from "../controllers/contact/contact.controller";

const contactRouter = Router();

contactRouter.post("", sendEmailController);

export default contactRouter;
