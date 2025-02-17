import { ICompany } from "../../interfaces/company";
import { AppError } from "../../middlewares/hanlerError";
import sendEmail from "../../utils/emailSender";

const createCompanyService = async (data: ICompany): Promise<ICompany> => {
  const company = {
    name: data.name,
    email: data.email,
    telefone: data.telefone,
    state: data.state,
    city: data.city,
    type: data.type,
  };

  try {
    await sendEmail(company);
  } catch (emailError) {
    throw new AppError("Erro ao enviar e-mail", 500);
  }

  return company;
};

export default createCompanyService;
