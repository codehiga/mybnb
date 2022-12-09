import { PrismaClient, reserva } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<reserva[]>
) {
  let { param } = req.query;
  let body = req.body;
  let prisma = new PrismaClient();
  const reservas: reserva[] = [];

  if (req.method == "GET") {
    const response = await prisma.reserva.findMany();
    response.find((reserva) => {
      if (reserva.idUsuario == param) {
        reservas.push(reserva);
      }
    });
  }
  if (req.method == "PATCH") {
    const response = await prisma.reserva.update({
      where: {
        id: param?.toString(),
      },
      data: {
        avaliacao: req.body.avalia,
      },
    });
    
  
  }
  if (req.method == "DELETE") {
    await prisma.reserva.delete({
      where: {
        id: param?.toString(),
      },
    });
  }

  prisma.$disconnect();
  res.status(200).json(reservas);
}
