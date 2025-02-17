import getStatesService from "../../services/location/getStates.service";
import { Request, Response } from "express";

const getStatesController = async (req: Request, res: Response): Promise<any> => {
  try {
    const states = await getStatesService();
    return res.status(200).json(states);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
export default getStatesController;
