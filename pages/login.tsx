import axios from "axios";
import Router from "next/router";
import { useState } from "react";

function Login() {
  const [dadosLogin, setDadosLogin] = useState<any>();

  function handleInputDadosLogin(e: any) {
    console.log(dadosLogin);
    setDadosLogin({ ...dadosLogin, [e.name]: e.value });
  }

  async function logaUsuario() {
    let usuario;
    if (dadosLogin.email)
      usuario = await axios.post("/api/usuario/login", dadosLogin);

    if (usuario?.status == 200) {
      localStorage.setItem("usuarioNome", usuario.data.nome);
      localStorage.setItem("emailUsuario", usuario.data.email);
      Router.push("/");
    } else {
      alert("Dados incorretos para login!");
    }
  }

  return (
    <div className="w-full mx-auto max-w-7xl p-4 md:p-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logaUsuario();
        }}
        className="grid grid-cols-1 gap-2 max-w-xl mx-auto"
      >
        <input
          onChange={(e) => handleInputDadosLogin(e.currentTarget)}
          type="text"
          placeholder="E-mail"
          name="email"
          required
        />
        <input
          onChange={(e) => handleInputDadosLogin(e.currentTarget)}
          type="text"
          placeholder="Senha"
          name="senha"
          required
        />
        <button>Entrar</button>
      </form>
    </div>
  );
}

export default Login;
