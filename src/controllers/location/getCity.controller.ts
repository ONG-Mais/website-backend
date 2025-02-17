import getCitysService from "../../services/location/getCity.service";
import { Request, Response } from "express";

const getCitysController = async (req: Request, res: Response): Promise<any> => {
  try {
    const stateId = req.params.stateId;
    const citys = await getCitysService(stateId);
    return res.status(200).json(citys);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
export default getCitysController;
