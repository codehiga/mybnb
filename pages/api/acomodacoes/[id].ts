import { acomodacao, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<acomodacao>
) {
  let { id } = req.query;
  let prisma = new PrismaClient();
  let acomodacoes: acomodacao[] = await prisma.acomodacao.findMany();

  let acomodacao = acomodacoes.find((item) => {
    if (item.id == id) {
      return item;
    }
  });

  if (acomodacao) {
    return res.status(200).json(acomodacao);
  }

  res.status(401);
}
