import { Request, Response } from "express";
import createCompanyService from "../../services/company/company.service";
import { ICompanyRequest } from "../../interfaces/company";

const createCompanyController = async (req: Request, res: Response) => {
  try {
    const data: ICompanyRequest = req.body;

    const newCompany = await createCompanyService(data);

    return res.status(201).json(newCompany);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
export default createCompanyController;
