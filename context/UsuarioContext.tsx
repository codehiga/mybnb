import axios from "axios";
import Router from "next/router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const UsuarioContext = createContext<IUsuarioContext>(
  {} as IUsuarioContext
);

export const UsuarioProvider = ({ children }: PropsWithChildren) => {
  const [usuario, setUsuario] = useState<IUsuario>();

  useEffect(() => {
    let ususarioFromStorage = localStorage.getItem("usuario");

    if (ususarioFromStorage) {
      let usuarioLogado = JSON.parse(ususarioFromStorage);
      setUsuario(usuarioLogado);
    }
  }, []);

  async function logaUsuario(dadosLogin: IUsuarioLogin) {
    let usuarioDB = await axios.post("/api/usuario/login", dadosLogin);

    if (usuarioDB.status == 200) {
      setUsuario(usuarioDB.data);
      console.log(usuarioDB.data);
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          nome: usuarioDB.data.nome,
          email: usuarioDB.data.email,
        })
      );
      Router.push("/");
    } else {
      alert("Erro ao logar! Verifique os dados informados.");
    }
  }

  function logoff() {
    localStorage.removeItem("usuario");
    Router.reload();
  }

  function resgataUsuarioLogado() {
    return localStorage.getItem("usuario");
  }

  return (
    <UsuarioContext.Provider
      value={{ usuario, logaUsuario, resgataUsuarioLogado, logoff }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export interface IUsuarioContext {
  usuario: IUsuario | undefined;
  logaUsuario: (dadosUsuario: IUsuarioLogin) => Promise<void>;
  resgataUsuarioLogado: () => string | null;
  logoff: () => void;
}

export interface IUsuario {
  nome: string;
  username: string;
  email: string;
}

export interface IUsuarioLogin {
  email: string;
  senha: string;
}
