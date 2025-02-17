import createCompanyController from "../controllers/company/company.controller";
import { Router } from "express";

const companyRouter = Router();

companyRouter.post("", createCompanyController);

export default companyRouter;
