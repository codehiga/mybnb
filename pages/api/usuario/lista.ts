import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export interface IUsuario {
  id?: string;
  nome: string;
  email: string;
  senha: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUsuario[]>
) {
  let prisma = new PrismaClient();
  const response = await prisma.usuario.findMany();
  prisma.$disconnect();
  res.status(200).json(response);
}
