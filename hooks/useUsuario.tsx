import { useContext } from "react";
import { IUsuarioContext, UsuarioContext } from "../context/UsuarioContext";

export const useUsuario = () => useContext<IUsuarioContext>(UsuarioContext);
