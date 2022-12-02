import axios from "axios";
import Router from "next/router";
import { useState } from "react";

function Cadastro() {
  const [dadosCadastro, setDadosCadastro] = useState<any>();

  function handleInputDadosCadastro(e: any) {
    setDadosCadastro({ ...dadosCadastro, [e.name]: e.value });
  }

  async function registraUsuario() {
    const usuario = {
      nome: dadosCadastro.nome,
      email: dadosCadastro.email,
      senha: dadosCadastro.senha,
    };

    const response = await axios.post("/api/usuario/registrar", usuario);

    if (response.status == 200) {
      alert("Registrado com sucesso!");
      Router.push("/login");
    }
  }

  return (
    <div className="w-full mx-auto max-w-7xl p-4 md:p-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registraUsuario();
        }}
        className="grid grid-cols-1 gap-2 max-w-xl mx-auto"
      >
        <input
          onChange={(e) => handleInputDadosCadastro(e.currentTarget)}
          type="text"
          placeholder="Nome"
          name="nome"
          required
        />
        <input
          onChange={(e) => handleInputDadosCadastro(e.currentTarget)}
          type="text"
          placeholder="E-mail"
          name="email"
          required
        />
        <input
          onChange={(e) => handleInputDadosCadastro(e.currentTarget)}
          type="text"
          placeholder="Senha"
          name="senha"
          required
        />
        <button>Registrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
