import { acomodacao, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export interface IAtualizaAvaliacao {
  id : string;
  incremento : number;
  avaliacao : number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAtualizaAvaliacao>
) {
  let data : IAtualizaAvaliacao = req.body;
  
  let prisma = new PrismaClient();
  let acomodacoes: acomodacao[] = await prisma.acomodacao.findMany();

  let acomodacao = acomodacoes.find((item) => {
    if (item.id == data.id) {
      return item;
    }
  });

  if(!acomodacao|| !acomodacao.avaliation || !acomodacao.qtAvaliation) return;

  let avaliacaoDb = acomodacao.avaliation;
  let quantidadeAvaliacaoDb = acomodacao.qtAvaliation;

  let avaliacaoUsuario = data.avaliacao;
  let incrementa = data.incremento;

  let totalNota = avaliacaoDb * quantidadeAvaliacaoDb;

  let total = totalNota + avaliacaoUsuario;
  let quantidadeTotalAvaliacao = quantidadeAvaliacaoDb + incrementa;

  let mediaAvaliacao = total / quantidadeTotalAvaliacao;

  await prisma.acomodacao.update({
    where : {
      id : acomodacao.id,
    }, 
    data : {
      avaliation : mediaAvaliacao,
      qtAvaliation : quantidadeTotalAvaliacao
    }
  })

  if (acomodacao) {
    return res.status(200);
  }

  res.status(401);
}
