import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAcomodacoes } from "../../hooks/useAcomodacoes";
import { useUsuario } from "../../hooks/useUsuario";
import { IAcomodacao } from "../api/acomodacoes/lista";

const Acomodacao = () => {
  const router = useRouter();
  const { id } = router.query;
  const { resgataAcomodacao } = useAcomodacoes();
  const { usuario } = useUsuario();
  const [acomodacao, setAcomodacao] = useState<IAcomodacao>();
  const [dataAtual] = useState<Date>(new Date());

  useEffect(() => {
    resgata();
    console.log(usuario);
  }, [id]);

  function converteData(data: Date) {
    return data.toISOString().split("T")[0];
  }

  async function resgata() {
    if (id) {
      let response = await resgataAcomodacao(id);
      setAcomodacao(response);
    }
  }

  async function reservaAcomodacao() {}

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
                  <input min={converteData(dataAtual)} type="date" />
                </span>
                <span className="flex flex-col w-full md:border md:p-2">
                  <b>Checkout</b>
                  <input min={converteData(dataAtual)} type="date" />
                </span>
              </div>
            </div>
            <button className="bg-sky-600 p-2 rounded-md text-white font-semibold">
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acomodacao;
