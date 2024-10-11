import { prisma } from "../../app";
import {
  IVolunteerRequest,
  IVolunteerResponse,
} from "../../interfaces/volunteer";
import { AppError } from "../../middlewares/hanlerError";

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

  const volunteer = await prisma.volunteer.create({
    data: {
      name: data.name,
      email: data.email,
      telefone: data.telefone,
      state: data.state,
      city: data.city,
    },
  });

  console.log(volunteer);
  return volunteer;
};
export default volunteerService;
