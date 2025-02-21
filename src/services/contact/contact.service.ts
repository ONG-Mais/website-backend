import { IContact } from "../../interfaces/contact";
import { AppError } from "../../middlewares/hanlerError";
import sendEmail from "../../utils/emailSender";

export default async function sendContactEmail(contact: IContact): Promise<IContact> {
  try {
    await sendEmail(contact);
  } catch (emailError) {
    throw new AppError("Erro ao enviar e-mail", 500);
  }

  return contact;
}
