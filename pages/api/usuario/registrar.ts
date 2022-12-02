import { PrismaClient } from "@prisma/client";
import bc from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export interface IUsuario {
  id?: string;
  nome: string;
  email: string;
  senha: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUsuario>
) {
  let body = req.body;
  let prisma = new PrismaClient();
  const { senha } = body;
  const senhaCriptografada = retornaSenhaCriptografada(senha);
  body.senha = senhaCriptografada;
  const response = await prisma.usuario.create({
    data: body,
  });
  prisma.$disconnect();
  res.status(200).json(response);
}

function retornaSenhaCriptografada(senha: string) {
  senha = senha + process.env.NEXT_PUBLIC_CRIPTO_PASS;
  const salt = bc.genSaltSync(5);
  const hash = bc.hashSync(senha, salt);
  return hash;
}
