import { acomodacao, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<acomodacao>
) {
  let body = req.body;
  let prisma = new PrismaClient();
  const response = await prisma.acomodacao.create({
    data: body,
  });
  prisma.$disconnect();
  res.status(200).json(response);
}
