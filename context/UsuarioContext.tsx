import axios from "axios";
import Router from "next/router";
import { createContext, PropsWithChildren, useState } from "react";

export const UsuarioContext = createContext<IUsuarioContext>(
  {} as IUsuarioContext
);

export const UsuarioProvider = ({ children }: PropsWithChildren) => {
  const [usuario, setUsuario] = useState<IUsuario>();

  async function logaUsuario(dadosLogin: IUsuarioLogin) {
    let usuarioDB = await axios.post("/api/usuario/login", dadosLogin);

    if (usuarioDB.status == 200) {
      setUsuario(usuarioDB.data);
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

  function resgataUsuarioLogado() {
    return localStorage.getItem("usuario");
  }

  return (
    <UsuarioContext.Provider
      value={{ usuario, logaUsuario, resgataUsuarioLogado }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export interface IUsuarioContext {
  usuario: IUsuario | undefined;
  logaUsuario: (dadosUsuario: IUsuarioLogin) => Promise<void>;
  resgataUsuarioLogado: () => string | null;
}

export interface IUsuario {
  nome: string;
  email: string;
}

export interface IUsuarioLogin {
  email: string;
  senha: string;
}