import createCompanyService from "../../services/company/company.service";
import { ICompany } from "../../interfaces/company";
import { Request, Response } from "express";

const createCompanyController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data: ICompany = req.body;

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
