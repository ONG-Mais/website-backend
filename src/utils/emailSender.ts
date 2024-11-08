import nodemailer from "nodemailer";
import { AppError } from "../middlewares/hanlerError";
import { IEmailRecipient } from "../interfaces/emailsender";

const sendEmail = async (recipient: IEmailRecipient) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptionsAdmin = {
    from: process.env.EMAIL_USER,
    to: "anthonifelipi@gmail.com",
    subject: `Novo ${
      recipient.type === "volunteer" ? "Voluntário" : "Empresa"
    } Cadastrado`,
    text: `Novo ${
      recipient.type === "volunteer" ? "voluntário" : "Empresa"
    } cadastrado:
           Nome: ${recipient.name}
           E-mail: ${recipient.email}
           Telefone: ${recipient.telefone || "Não informado"}
           Localização: ${recipient.city || "Não informada"}, ${
      recipient.state || "Não informada"
    }`,
  };

  const mailOptionsRecipient = {
    from: process.env.EMAIL_USER,
    to: recipient.email,
    subject: "Cadastro realizado com sucesso",
    text: `Olá, ${recipient.name}! Seu cadastro foi realizado com sucesso. ${
      recipient.type === "volunteer"
        ? "Agora você pode ajudar a nossa causa!"
        : "Estamos felizes em contar com sua empresa em nossa rede."
    }`,
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
