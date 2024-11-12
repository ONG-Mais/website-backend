import { Request, Response } from "express";
import getStatesService from "../../services/location/getStates.service";

const getStatesController = async (req: Request, res: Response):Promise<any> => {
  try {
    console.log("iuuu")
    const states = await getStatesService();
    console.log(states, "AQUI")
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
