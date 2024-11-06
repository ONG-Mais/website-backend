import nodemailer from "nodemailer";
import { AppError } from "../middlewares/hanlerError";

const sendEmail = async (volunteer: any) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "anthonifelipi@gmail.com",
    subject: "Novo Voluntário Cadastrado",
    text: `Novo voluntário cadastrado:
           Nome: ${volunteer.name}
           E-mail: ${volunteer.email}
           Telefone: ${volunteer.telefone}
           Localização: ${volunteer.city}, ${volunteer.state}`,
  };

  const mailOptions2 = {
    from: process.env.EMAIL_USER,
    to: volunteer.email,
    subject: "Cadastro realizado com sucesso",
    text: `Olá, ${volunteer.name} ! Seu cadastro foi realizado com sucesso. Agora você pode ajudar a nossa causa!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions2);
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:2", error);
    throw new AppError("Erro ao enviar e-mail", 500);
  }
};

export default sendEmail;
