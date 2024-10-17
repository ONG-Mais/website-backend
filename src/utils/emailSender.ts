import nodemailer from 'nodemailer';
import { AppError } from "../middlewares/hanlerError";

const sendEmail = async (volunteer: any) => {
  const transporter = nodemailer.createTransport({
    service: 'outlook',  
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'anthonifelipi@gmail.com',
    subject: 'Novo Voluntário Cadastrado',
    text: `Novo voluntário cadastrado:
           Nome: ${volunteer.name}
           E-mail: ${volunteer.email}
           Telefone: ${volunteer.telefone}
           Localização: ${volunteer.city}, ${volunteer.state}`,
  };
  console.log(mailOptions)
  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new AppError('Erro ao enviar e-mail', 500);
  }
};

export default  sendEmail;
