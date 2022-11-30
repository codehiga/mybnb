import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function Anunciar() {
  const [paises, setPaises] = useState<any[]>([]);

  const [dadosFormulario, setDadosFormulario] = useState<any>();

  useEffect(() => {
    resgataPaises();
  }, []);

  async function resgataPaises() {
    const response = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/paises/"
    );
    setPaises(response.data);
  }

  async function enviarAcomodacao(e: any) {
    e.preventDefault();
    console.log(dadosFormulario);
    const response = await axios.post("/api/acomodacoes/nova", dadosFormulario);
    if (response.status == 200) {
      Router.push("/");
    }
  }

  function handleCampos(e: any) {
    setDadosFormulario({
      ...dadosFormulario,
      [e.name]: e.value,
    });
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <form
        onSubmit={(e) => enviarAcomodacao(e)}
        className="grid grid-cols-1 gap-4"
      >
        <input
          onChange={(e) => handleCampos(e.currentTarget)}
          type="text"
          name="name"
          placeholder="Nome"
        />
        <input
          onChange={(e) => handleCampos(e.currentTarget)}
          type="text"
          name="type"
          placeholder="Tipo"
        />
        <input
          type="text"
          onChange={(e) => handleCampos(e.currentTarget)}
          name="value"
          placeholder="Valor por noite"
        />
        <select name="country" onChange={(e) => handleCampos(e.currentTarget)}>
          {paises.map((pais, i) => {
            return (
              <option key={i} value={pais.nome.abreviado}>
                {pais.nome.abreviado}
              </option>
            );
          })}
        </select>
        <input
          onChange={(e) => handleCampos(e.currentTarget)}
          type="text"
          name="image"
          placeholder="URL Imagem"
        />
        <textarea
          onChange={(e) => handleCampos(e.currentTarget)}
          name="description"
          placeholder="Digite a descrição"
        ></textarea>
        <button className="p-4 border bg-sky-600 text-white rounded-md">
          Enviar
        </button>
      </form>
    </div>
  );
}
