import nodemailer from "nodemailer";
import { AppError } from "../middlewares/hanlerError";
import { IEmailData, IEmailRecipient } from "../interfaces/emailsender";
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

  const recipientTypes: IEmailData = {
    volunteer: {
      title: "volunteer",
      subject: "Novo Voluntário Cadastrado!",
      message: "Seu cadastro foi realizado com sucesso e agora você pode ajudar a nossa causa!",
      info: "Dados do voluntário cadastrado",
      data: {
        name: recipient.name,
        telefone: recipient.telefone!,
        email: recipient.email,
        city: recipient.city!,
        state: recipient.state!,
        type: "volunteer",
      },
    },
    company: {
      title: "company",
      subject: "Nova Empresa Cadastrada!",
      message: "Seu cadastro foi realizado com sucesso e estamos felizes em contar com sua empresa em nossa rede.",
      info: "Dados da empresa cadastrada",
      data: {
        name: recipient.name,
        email: recipient.email,
        telefone: recipient.telefone!,
        city: recipient.city!,
        state: recipient.state!,
        type: "company",
      },
    },
    contact: {
      title: "contact",
      subject: recipient.subject!,
      message: recipient.message!,
      info: "Dados do contato",
      data: {
        name: recipient.name,
        email: recipient.email,
        subject: recipient.subject!,
        message: recipient.message!,
        type: "contact",
      },
    },
  };

  function checkRecipientType(data: IEmailRecipient) {
    switch (data.type) {
      case "volunteer":
        return recipientTypes.volunteer;
      case "company":
        return recipientTypes.company;
      case "contact":
        return recipientTypes.contact;
      default:
        throw new AppError("Erro ao enviar e-mail", 500);
    }
  }

  const emailRecipient = checkRecipientType(recipient);

  const mailOptionsAdmin = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Alerta website ONG Mais: ${emailRecipient.subject}!`,
    text: `
${emailRecipient.info}:
Nome: ${emailRecipient.data.name}
E-mail: ${emailRecipient.data.email}
  ${
    emailRecipient.data.type === "company" || emailRecipient.data.type === "volunteer"
      ? `
Telefone: ${emailRecipient.data.telefone}
Localização: ${emailRecipient.data.city}, ${emailRecipient.data.state}
Data de cadastro: ${currentDate()}`
      : `
Mensagem: ${emailRecipient.data.message}
Data de envio: ${currentDate()}`
  }
  `,
  };

  const mailOptionsRecipient = {
    from: process.env.EMAIL_USER,
    to: emailRecipient.data.email,
    subject: "ONG Mais - Cadastro realizado com sucesso!",
    text:
      emailRecipient.data.type === "volunteer"
        ? `Olá, ${emailRecipient.data.name}!
Seu cadastro como voluntário foi realizado com sucesso! Agora você pode ajudar a nossa causa e contribuir ativamente.
  
Em breve entraremos em contato com mais informações.
  
Continue acompanhando o nosso trabalho: https://ong-mais.vercel.app`
        : emailRecipient.data.type === "company"
          ? `Olá, ${emailRecipient.data.name}!
Ficamos felizes em contar com sua empresa em nossa rede! Seu cadastro foi realizado com sucesso e em breve entraremos em contato.
  
Acompanhe nosso trabalho: https://ong-mais.vercel.app`
          : `Olá, ${emailRecipient.data.name}!
A sua mensagem: \n"${emailRecipient.message}"\nFoi recebida por nós com sucesso. Levaremos os seus pontos em consideração e, caso necessário, entraremos em contato com você.
  
Continue acompanhando o nosso trabalho: https://ong-mais.vercel.app`,
  };

  try {
    await transporter.sendMail(mailOptionsAdmin);
    await transporter.sendMail(mailOptionsRecipient);
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw new AppError("Erro ao enviar e-mail", 500);
  }
};

export default sendEmail;
