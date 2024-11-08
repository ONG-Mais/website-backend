import { Router } from "express";
import createCompanyController from "../controllers/company/company.controller";

const companyRouter = Router();

companyRouter.post("", createCompanyController);

export default companyRouter
