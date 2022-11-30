import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [menuMobile, setMenuMobile] = useState(false);

  const [itensMenu] = useState<any[]>([
    {
      nome: "Anunciar acomodação",
      path: "/anunciar",
    },
    {
      nome: "Ajuda",
      path: "/ajuda",
    },
  ]);

  return (
    <div className="w-full min-h-20">
      <div className="flex w-full h-full justify-between items-center p-4">
        <Link href="/" className="font-thin text-3xl">
          bñb
        </Link>
        <ul className="hidden md:flex gap-4">
          {itensMenu.map((item) => {
            return (
              <Link key={item.nome} href={item.path}>
                {item.nome}
              </Link>
            );
          })}
        </ul>
        <b
          className="flex md:hidden"
          onClick={() => setMenuMobile(!menuMobile)}
        >
          Abrir
        </b>
      </div>
      <div className={`${menuMobile ? "flex" : "hidden"} p-4 transition-all `}>
        <ul className="flex flex-col gap-4">
          {itensMenu.map((item) => {
            return (
              <Link key={item.nome} href={item.path}>
                {item.nome}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
