import nodemailer from "nodemailer";
import { AppError } from "../middlewares/hanlerError";
import { IEmailRecipient } from "../interfaces/emailsender";
import currentDate from "./currentDate";

const sendEmail = async (recipient: IEmailRecipient) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptionsAdmin = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Alerta website ONG Mais: ${recipient.type === "volunteer" ? "Novo Voluntário Cadastrado" : "Nova Empresa Cadastrada"}!`,
    text: `
Dados do ${recipient.type === "volunteer" ? "voluntário cadastrado" : "Empresa cadastrada"}:
Nome: ${recipient.name}
E-mail: ${recipient.email}
Telefone: ${recipient.telefone ?? "Não informado"}
Localização: ${recipient.city ?? "Não informada"}, ${recipient.state ?? "Não informada"}

Data de cadastro: ${currentDate()}
           `,
  };

  const mailOptionsRecipient = {
    from: process.env.EMAIL_USER,
    to: recipient.email,
    subject: "ONG Mais - Cadastro realizado com sucesso!",
    text: `Olá, ${recipient.name}!
Seu cadastro foi realizado com sucesso! 
${
  recipient.type === "volunteer"
    ? "Agora você pode ajudar a nossa causa!"
    : "Estamos felizes em contar com sua empresa em nossa rede."
}
Em breve entraremos em contato com você. 
Obriagdo pelo seu cadastro!
  
Continue acompanhando o nosso trabalho: https://ong-mais.vercel.app
    `,
  };

  try {
    await transporter.sendMail(mailOptionsAdmin);
    await transporter.sendMail(mailOptionsRecipient);
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:2", error);
    throw new AppError("Erro ao enviar e-mail", 500);
  }
};

export default sendEmail;
