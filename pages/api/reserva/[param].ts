import { acomodacao, PrismaClient, reserva } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { IAtualizaAvaliacao } from './../acomodacoes/atualiza-avaliacao';

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
    const reservaFeita = await prisma.reserva.findFirst({
      where : {
        id : param?.toString()
      }
    })

    const avaliado = reservaFeita?.avalidado;

    if(!reservaFeita?.idAcomodacao) return;

    let dados : IAtualizaAvaliacao = {
      id : reservaFeita.idAcomodacao,
      avaliacao : req.body.avaliacao,
      incremento : 1
    }

    if(avaliado == true) {
      dados.incremento = 0;
    }

    let acomodacao: acomodacao | null = await prisma.acomodacao.findFirst({
      where : {
        id : dados.id
      }
    });

    if(acomodacao == undefined || acomodacao.avaliation == undefined || acomodacao.qtAvaliation == undefined) return;
    
    let avaliacaoDb = acomodacao.avaliation;
    console.log(avaliacaoDb)
    let quantidadeAvaliacaoDb = acomodacao.qtAvaliation;

    let avaliacaoUsuario = dados.avaliacao;
    let incrementa = dados.incremento;

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

    await prisma.reserva.update({
      where: {
        id: param?.toString(),
      },
      data: {
        avaliacao: req.body.avaliacao,
        avalidado : true
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
