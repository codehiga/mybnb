import { reserva } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUsuario } from "../hooks/useUsuario";

function MinhasReservas() {
  const { usuario } = useUsuario();
  const [reservas, setReservas] = useState<reserva[]>();

  useEffect(() => {
    if (usuario) {
      resgataReservas();
    }
  }, [usuario]);

  async function resgataReservas() {
    const response = await axios.get("/api/reserva/" + usuario?.email);
    setReservas(response.data);
  }

  return (
    <div>
      <div>
        {reservas?.map((reserva) => {
          return reserva.id;
        })}
      </div>
    </div>
  );
}

export default MinhasReservas;
