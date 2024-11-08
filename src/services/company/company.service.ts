import { prisma } from "../../app";
import { ICompanyRequest, ICompanyResponse } from "../../interfaces/company";
import { AppError } from "../../middlewares/hanlerError";
import sendEmail from "../../utils/emailSender";

const createCompanyService = async (
  data: ICompanyRequest
): Promise<ICompanyResponse> => {
  const emailAreadyExists = await prisma.company.findUnique({
    where: {
      email: data.email,
    },
  });

  if (emailAreadyExists) {
    throw new AppError("Empresa ja cadastrada!");
  }

  try {
    const company = await prisma.$transaction(async (prisma) => {
      const newCompany = await prisma.company.create({
        data: {
          name: data.name,
          email: data.email,
          telefone: data.telefone,
          state: data.state,
          city: data.city,
        },
      });

      try {
        await sendEmail(newCompany);
      } catch (emailError) {
        throw new AppError("Erro ao enviar e-mail", 500);
      }

      return newCompany;
    });

    return company;
  } catch (error) {
    console.error("Erro no serviço de criação de empresa:", error);
    throw new AppError("Erro ao criar empresa ou enviar e-mail", 500);
  }
};
export default createCompanyService;
