import { PrismaClient, reserva } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<reserva[]>
) {
  let body = req.body;
  let prisma = new PrismaClient();
  const response = await prisma.reserva.findMany();
  prisma.$disconnect();
  res.status(200).json(response);
}
