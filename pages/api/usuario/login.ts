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
  body.senha = body.senha + process.env.NEXT_PUBLIC_CRIPTO_PASS;

  const response = await prisma.usuario.findFirst({
    where: {
      email: body.email,
    },
  });

  let senhaCoincide = false;

  if (response) {
    const senhaDB = response.senha;
    senhaCoincide = descriptografaSenha(body.senha, senhaDB);
  }

  prisma.$disconnect();

  if (!response) {
    res.status(505);
    return;
  }

  if (senhaCoincide == true) {
    res.status(200).json(response);
  } else {
    res.status(401);
  }
}

function descriptografaSenha(senha: string, senhaDB: string) {
  const response = bc.compareSync(senha, senhaDB);
  return response;
}
