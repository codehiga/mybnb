import { acomodacao, reserva } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useUsuario } from "../hooks/useUsuario";

function MinhasReservas() {
  const { usuario } = useUsuario();
  const [reservas, setReservas] = useState<reserva[]>([]);
  const [acomodacoes] = useState<acomodacao[]>();
  const [avaliacao] = useState();

  useEffect(() => {
    if (usuario && reservas.length < 1) {
      resgataReservas();
    }
  }, [usuario, reservas]);


  async function resgataReservas() {
    axios.get("/api/reserva/" + usuario?.email).then((reservas) => {
      setReservas(reservas.data);
    });
  }
  async function avaliaReserva(avaliacao:number,id: string) {
    const body={
      avalia: avaliacao.toString()
    }
    const response = await axios.patch("/api/reserva/" + id , body);
    Router.reload();
    };
  
  async function deletaReserva(id: string) {

    const response = await axios.delete("/api/reserva/" + id);
    Router.reload();
  }
const avaliacaoMudou =(novaAvaliacao: number) =>{
//  avaliaReserva(novaAvaliacao);
}

  
  function avaliaEstrela(nomeAcomodacao:string, avaliacao:string, id:string){
    var avalia: number = +avaliacao;
    console.log(avaliacaoMudou);
    return (
      <div>
       <p>Deixe sua avaliação para {nomeAcomodacao}</p>
        <ReactStars
          value={avalia}
          onChange={avaliacaoMudou => avaliaReserva(avaliacaoMudou, id)}
          count={5}
          size={24}
          color2={'#ffd700'} />
      </div>
    )
    
  }
  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col gap-4 overflow-auto">
      {reservas?.map((reserva) => {
        return (
          <div
            key={reserva.id}
            className="w-full border p-4 flex flex-col gap-2"
          >
            <div>ID da reserva: {reserva.id}</div>
            <div>
              <h2 className="text-2xl">
                <b>Reserva para:</b> {reserva.nomeAcomodacao}
              </h2>
            </div>
            <div>
              <p>Data de checkin: {reserva.checkin.replaceAll("-", "/")}</p>
              <p>Data de checkout: {reserva.checkout.replaceAll("-", "/")}</p>
            </div>
            <div>
              <b>Preço:</b>
              <p>R$ {reserva.preco}</p>
            </div>
            <div></div>
            {avaliaEstrela(reserva.nomeAcomodacao, reserva?.avaliacao||'0', reserva.id)}
            
            <div className="flex justify-end gap-4">
              <button
                onClick={(e) => deletaReserva(reserva.id)}
                className="bg-red-300 text-white border-red-300"
              >
                Cancelar
              </button>

              <Link href={`/acomodacao/${reserva.idAcomodacao}`}>
                <button>Visualizar</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MinhasReservas;
