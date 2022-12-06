import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export interface IEmailReserva {
  email: string;
  mensagem: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IEmailReserva>
) {
  let body = req.body;

  let transporter = await nodemailer.createTransport({
    host: "mail.daikokurh.com.br",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_PASS,
    },
  });

  let mensagem = req.body.mensagem;
  let destinatario = req.body.email;

  await transporter.sendMail({
    from: "servico@daikokurh.com.br",
    to: [destinatario],
    subject: "Acomodação reservada",
    text: mensagem,
    html: mensagem,
  });

  res.status(200).json(body);
}
