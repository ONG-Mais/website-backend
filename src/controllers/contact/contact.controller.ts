import { Request, Response } from "express";
import { IContact } from "../../interfaces/contact";
import sendContactEmail from "../../services/contact/contact.service";

const sendEmailController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data: IContact = req.body;

    const newContact = await sendContactEmail(data);

    return res.status(201).json(newContact);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
export default sendEmailController;
