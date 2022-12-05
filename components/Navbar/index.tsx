import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { IUsuario, UsuarioContext } from "../../context/UsuarioContext";

export const Navbar = () => {
  const [menuMobile, setMenuMobile] = useState(false);
  const { resgataUsuarioLogado, logoff, usuario } = useContext(UsuarioContext);
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuario>();
  const [logado, setLogado] = useState<boolean>(false);

  useEffect(() => {
    const response = resgataUsuarioLogado();
    if (response && !usuarioLogado) {
      setUsuarioLogado(JSON.parse(response));
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, [usuario]);

  const [itensMenu] = useState<any[]>([
    {
      nome: "Anunciar acomodação",
      path: "/anunciar",
      logado: true,
    },
    // {
    //   nome: "Ajuda",
    //   path: "/ajuda",
    // },
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
          {/* {itensMenu.map((item) => {
            return (
              <Link key={item.nome} href={item.path}>
                {item.nome}
              </Link>
            );
          })} */}
          {!usuarioLogado && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/cadastro">Cadastrar</Link>
            </>
          )}
          {usuarioLogado && (
            <>
              <Link href="/anunciar">Anunciar</Link>
              <Link href="/minhas-reservas">Minhas reservas</Link>
              <li className="cursor-pointer" onClick={logoff}>
                Sair
              </li>
            </>
          )}
        </ul>
        <b
          className="flex md:hidden"
          onClick={() => setMenuMobile(!menuMobile)}
        >
          Abrir
        </b>
      </div>
      <div className={`${menuMobile ? "flex" : "hidden"} p-4 transition-all `}>
        <ul
          onClick={() => setMenuMobile(!menuMobile)}
          className="flex flex-col gap-4"
        >
          {/* {itensMenu.map((item) => {
            return (
              <Link key={item.nome} href={item.path}>
                {item.nome}
              </Link>
            );
          })} */}
          {!usuarioLogado && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/cadastro">Cadastrar</Link>
            </>
          )}
          {usuarioLogado && (
            <>
              <Link href="/anunciar">Anunciar</Link>
              <Link href="/minhas-reservas">Minhas reservas</Link>
              <li className="cursor-pointer" onClick={logoff}>
                Sair
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
