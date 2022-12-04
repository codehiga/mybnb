import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export interface IReserva {
  id?: string;
  idAcomodacao: string;
  idUsuario: string;
  checkin: string;
  checkout: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IReserva>
) {
  let body = req.body;
  let prisma = new PrismaClient();
  const response = await prisma.reserva.create({
    data: body,
  });
  prisma.$disconnect();
  res.status(200).json(response);
}
