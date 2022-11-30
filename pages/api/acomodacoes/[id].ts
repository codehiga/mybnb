import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { IAcomodacao } from "./lista";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAcomodacao>
) {
  let { id } = req.query;
  let prisma = new PrismaClient();
  let acomodacoes: IAcomodacao[] = await prisma.acomodacao.findMany();

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
