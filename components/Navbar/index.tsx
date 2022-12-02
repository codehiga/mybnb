import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { IUsuario, UsuarioContext } from "../../context/UsuarioContext";

export const Navbar = () => {
  const [menuMobile, setMenuMobile] = useState(false);
  const { resgataUsuarioLogado } = useContext(UsuarioContext);
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuario>();

  useEffect(() => {
    const response = resgataUsuarioLogado();
    if (response && !usuarioLogado) {
      setUsuarioLogado(JSON.parse(response));
    }
  }, [usuarioLogado]);

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
        <Link
          onClick={() => {
            if (menuMobile) {
              setMenuMobile(!menuMobile);
            }
          }}
          href="/"
          className="font-thin text-3xl"
        >
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
          {!usuarioLogado && <Link href="/login">Login</Link>}
          {!usuarioLogado && <Link href="/cadastro">Cadastrar</Link>}
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
              <Link
                onClick={() => setMenuMobile(!menuMobile)}
                key={item.nome}
                href={item.path}
              >
                {item.nome}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
