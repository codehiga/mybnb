import { PrismaClient, reserva } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<reserva[]>
) {
  let { emailUsuario } = req.query;
  let body = req.body;
  let prisma = new PrismaClient();
  const response = await prisma.reserva.findMany();
  const reservas: reserva[] = [];
  response.find((reserva) => {
    if (reserva.idUsuario == emailUsuario) {
      reservas.push(reserva);
    }
  });
  prisma.$disconnect();
  res.status(200).json(reservas);
}
