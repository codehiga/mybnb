import axios from "axios";
import { useEffect, useState } from "react";
import { IAcomodacao } from "../pages/api/acomodacoes/lista";

export const useAcomodacoes = () => {
  const [acomodacoes, setAcomodacoes] = useState<IAcomodacao[]>([]);

  useEffect(() => {
    resgataAcomodacoes();
  }, []);

  async function resgataAcomodacoes() {
    const response = await axios.get("/api/acomodacoes/lista");
    setAcomodacoes(response.data);
  }

  async function resgataAcomodacao(id: string | string[] | undefined) {
    const response = await axios.get("/api/acomodacoes/" + id);
    return response.data;
  }

  return {
    acomodacoes,
    resgataAcomodacao,
  };
};
