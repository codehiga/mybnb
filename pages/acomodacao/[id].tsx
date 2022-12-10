import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useAcomodacoes } from "../../hooks/useAcomodacoes";
import { useUsuario } from "../../hooks/useUsuario";
import { IAcomodacao } from "../api/acomodacoes/lista";
import { IReserva } from "../api/reserva/nova";
const Acomodacao = () => {
  const router = useRouter();
  const { id } = router.query;
  const { resgataAcomodacao } = useAcomodacoes();
  const { usuario } = useUsuario();
  const [acomodacao, setAcomodacao] = useState<IAcomodacao>();
  const [dataAtual] = useState<Date>(new Date());
  const [checkin, setCheckin] = useState<string>();
  const [checkout, setCheckout] = useState<string>();

  useEffect(() => {
    resgata();
  }, [id]);


  function avaliaEstrela(){

 
    console.log(acomodacao?.avaliation)

    return (
      <div>
       <p>Avaliação média da acomodação</p>
        <ReactStars
          value={acomodacao?.avaliation}
          count={5}
          size={24}
          edit ={false}
          color2={'#ffd700'} />
      </div>
    )
  }
  
  function converteData(data: Date) {
    return data.toISOString().split("T")[0];
  }

  async function resgata() {
    if (id) {
      let response = await resgataAcomodacao(id);
      setAcomodacao(response);
    }
  }

  async function reservaAcomodacao(idAcomodacao?: string) {
    if (!usuario || !checkin || !checkout || !idAcomodacao || !acomodacao)
      return;

    let preco: string = "";

    let timestampCheckin = new Date(checkin);
    let timestampCheckout = new Date(checkout);
    let comparacao: number =
      timestampCheckout.getTime() - timestampCheckin.getTime();
    comparacao = comparacao / 1000;
    preco = (parseInt(acomodacao.value) * (comparacao / 86400)).toString();

    let reserva: IReserva = {
      idUsuario: usuario.email,
      donoAcomodacao: acomodacao.idUsuario,
      checkin,
      checkout,
      idAcomodacao,
      nomeAcomodacao: acomodacao.name,
      preco,
    };

    const response = await axios.post("/api/reserva/nova", reserva);

    const responseEmail = await axios.post("/api/email/envia", {
      email: reserva.idUsuario,
      mensagem: `<h1>Acomodação reservada: ${reserva.nomeAcomodacao},</h1> </br> <h2>com checkin programado para ${reserva.checkin} e checkout para ${reserva.checkout}.</h2> <h2>Valor total: R$${reserva.preco}</h2>`,
    });

    const responseEmailReservado = await axios.post("/api/email/envia", {
      email: reserva.donoAcomodacao,
      mensagem: `<h1>Sua acomodação foi reservada: ${reserva.nomeAcomodacao},</h1> </br> <h2>com checkin programado para ${reserva.checkin} e checkout para ${reserva.checkout}.</h2> <h2>Valor total: R$${reserva.preco}</h2>`,
    });

    if (response.status == 200) Router.push("/minhas-reservas");
  }

  return (
    <div className="w-full max-w-7xl mx-auto md:p-4 flex flex-col md:flex-row md:gap-4">
      <div className="flex w-full flex-col gap-4">
        <div className="p-4 md:p-0">
          <h1 className="text-3xl font-thin">
            {acomodacao?.name}, {acomodacao?.country}
          </h1>
          <h2>{acomodacao?.type}</h2>
        </div>

        <div className="w-full h-96">
          <Image
            className="w-full h-full object-cover md:rounded-md"
            src={acomodacao?.image ? acomodacao.image : ""}
            alt=""
            width={800}
            height={400}
          />
        </div>
        {avaliaEstrela()} 
        <div className="text-justify flex flex-col gap-4 px-4 md:px-0">
          <div>{acomodacao?.description}</div>
          <div>{acomodacao?.description}</div>
          <div>{acomodacao?.description}</div>
          <div>{acomodacao?.description}</div>
          <div>{acomodacao?.description}</div>
          <div>{acomodacao?.description}</div>
          <div>{acomodacao?.description}</div>
          <div>{acomodacao?.description}</div>
          <div>{acomodacao?.description}</div>
          <div>{acomodacao?.description}</div>
        </div>
      </div>

      <div className="flex gap-4 md:gap-10 flex-col-reverse md:flex-row p-4 md:p-0">
        <div>
          <div className="md:sticky top-5 border rounded-md p-4 flex flex-col gap-2 pt-2">
            <h2 className="text-2xl">
              {acomodacao?.name}, {acomodacao?.country}
            </h2>
            <div>
              <Image
                className="rounded-md"
                src={acomodacao?.image ? acomodacao?.image : ""}
                alt=""
                width={400}
                height={400}
              />
            </div>
            <div>
              <b className="text-2xl">R${acomodacao?.value}</b>{" "}
              <span className="font-thin">noite</span>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <div className="flex flex-col md:flex-row justify-between gap-2">
                <span className="flex flex-col w-full md:border md:p-2">
                  <b>Checkin</b>
                  <input
                    onChange={(e) => setCheckin(e.target.value)}
                    min={converteData(dataAtual)}
                    type="date"
                  />
                </span>
                <span className="flex flex-col w-full md:border md:p-2">
                  <b>Checkout</b>
                  <input
                    disabled={checkin ? false : true}
                    min={checkin}
                    onChange={(e) => setCheckout(e.target.value)}
                    type="date"
                  />
                </span>
              </div>
            </div>
            <button
              onClick={() => reservaAcomodacao(acomodacao?.id)}
              disabled={usuario && checkin && checkout ? false : true}
              className="bg-sky-600 p-2 rounded-md text-white font-semibold"
            >
              Reservar
            </button>
            {!usuario && (
              <span className="text-center">
                <Link href="/login">
                  <small className="uppercase font-bold">Faça login </small>{" "}
                </Link>
                <small>ou </small>
                <Link href="/cadastro">
                  <small className="uppercase font-bold">crie uma conta</small>{" "}
                </Link>
                <small>para reservar.</small>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acomodacao;
