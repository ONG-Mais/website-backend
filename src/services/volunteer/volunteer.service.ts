import { IVolunteer } from "../../interfaces/volunteer";
import { AppError } from "../../middlewares/hanlerError";
import sendEmail from "../../utils/emailSender";

const volunteerService = async (data: IVolunteer): Promise<IVolunteer> => {
  const volunteer = {
    name: data.name,
    email: data.email,
    telefone: data.telefone,
    state: data.state,
    city: data.city,
    type: data.type,
  };

  try {
    await sendEmail(volunteer);
  } catch (emailError) {
    throw new AppError("Erro ao enviar e-mail", 500);
  }
  return volunteer;
};

export default volunteerService;
