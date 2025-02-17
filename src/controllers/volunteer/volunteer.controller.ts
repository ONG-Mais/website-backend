import volunteerService from "../../services/volunteer/volunteer.service";
import { IVolunteer } from "../../interfaces/volunteer";
import { Request, Response } from "express";

const volunteerController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data: IVolunteer = req.body;
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
