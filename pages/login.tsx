import { useContext, useState } from "react";
import { UsuarioContext } from "../context/UsuarioContext";

function Login() {
  const [dadosLogin, setDadosLogin] = useState<any>();
  const { logaUsuario } = useContext(UsuarioContext);

  function handleInputDadosLogin(e: any) {
    setDadosLogin({ ...dadosLogin, [e.name]: e.value });
  }

  return (
    <div className="w-full mx-auto max-w-7xl p-4 md:p-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logaUsuario(dadosLogin);
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
