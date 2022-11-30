import { useEffect, useState } from "react";
import { useAcomodacoes } from "../../hooks/useAcomodacoes";

export const BarraTipoAcomodacao = () => {
  const [tiposAcomodacao, setTiposAcomodacao] = useState<string[]>([]);
  const { acomodacoes } = useAcomodacoes();

  useEffect(() => {
    if (acomodacoes.length > 0) {
      let tiposAcomodacaoLista: string[] = [];
      acomodacoes.map((acomodacao) => {
        if (!tiposAcomodacaoLista.includes(acomodacao.type)) {
          tiposAcomodacaoLista.push(acomodacao.type);
        }
      });
      setTiposAcomodacao(tiposAcomodacaoLista);
    }
  }, [acomodacoes]);

  return (
    <div className="w-full h-20">
      <div className="w-full flex h-full items-center p-4 gap-4 justify-center">
        {tiposAcomodacao?.map((tipoAcomodacao) => {
          return (
            <div
              className="rounded-md text-black cursor-pointer"
              key={tipoAcomodacao}
            >
              {tipoAcomodacao}
            </div>
          );
        })}
      </div>
    </div>
  );
};
