import { Request, Response } from "express";
import { IVolunteerRequest } from "../../interfaces/volunteer";
import volunteerService from "../../services/volunteer/volunteer.service";

const volunteerController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data: IVolunteerRequest = req.body;
    const volunteer = await volunteerService(data);
    return res.status(201).json(volunteer);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
export default volunteerController;
