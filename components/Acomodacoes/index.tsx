import Image from "next/image";
import Link from "next/link";
import { useAcomodacoes } from "../../hooks/useAcomodacoes";

export const Acomodacoes = () => {
  const { acomodacoes } = useAcomodacoes();

  return (
    <div className="grid md:grid-cols-3 w-full gap-4 gap-y-8 pb-8">
      {acomodacoes?.map((acomodacao) => {
        return (
          <div key={acomodacao.id} className="flex flex-col">
            <Link href={"/acomodacoes/" + acomodacao.id}>
              <div className="w-full h-80 overflow-hidden rounded-md cursor-pointer">
                <Image
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-all"
                  src={acomodacao.image}
                  alt=""
                />
              </div>
            </Link>
            <span>
              {acomodacao.name}, <b>{acomodacao.country}</b>
            </span>
            <span>R$ {acomodacao.value}/noite</span>
          </div>
        );
      })}
    </div>
  );
};
