import { acomodacao, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export type IAcomodacao = {
  id?: string;
  idUsuario: string;
  name: string;
  value: string;
  type: string;
  country: string;
  image: string;
  description: string;
  avaliation:number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<acomodacao[]>
) {
  let prisma = new PrismaClient();
  const response = await prisma.acomodacao.findMany();
  prisma.$disconnect();

  res.status(200).json(response);
}
