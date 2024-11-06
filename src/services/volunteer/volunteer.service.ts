import { prisma } from "../../app";
import {
  IVolunteerRequest,
  IVolunteerResponse,
} from "../../interfaces/volunteer";
import { AppError } from "../../middlewares/hanlerError";
import sendEmail from "../../utils/emailSender";

const volunteerService = async (
  data: IVolunteerRequest
): Promise<IVolunteerResponse> => {
  const emailAreadyExists = await prisma.volunteer.findUnique({
    where: {
      email: data.email,
    },
  });

  if (emailAreadyExists) {
    throw new AppError("Email already exists", 400);
  }

  try {
    const volunteer = await prisma.$transaction(async (prisma) => {
      const newVolunteer = await prisma.volunteer.create({
        data: {
          name: data.name,
          email: data.email,
          telefone: data.telefone,
          state: data.state,
          city: data.city,
        },
      });

      try {
        await sendEmail(newVolunteer);
      } catch (emailError) {
        throw new AppError("Erro ao enviar e-mail", 500);
      }

      return newVolunteer;
    });

    return volunteer;
  } catch (error) {
    console.error("Erro no serviço de criação de voluntário:", error);
    throw new AppError("Erro ao criar voluntário ou enviar e-mail", 500);
  }
};

export default volunteerService;
