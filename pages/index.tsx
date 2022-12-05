import Image from "next/image";
import { useEffect, useState } from "react";

import { Acomodacoes } from "../components/Acomodacoes";
import { useUsuario } from "../hooks/useUsuario";
const Home = () => {
  const {usuario} = useUsuario()

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full h-96 flex">
        <Image
          width={800}
          height={400}
          className="object-cover w-full h-full"
          src="https://www.pixelstalk.net/wp-content/uploads/images6/4K-Travel-Wallpaper-HD-Free-download.jpg"
          alt=""
        />
      </div>
      {/* <BarraTipoAcomodacao /> */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-semibold">{usuario? 'Olá '+usuario?.nome : 'Olá'}, para onde vamos dessa vez?</h1>
        <Acomodacoes />
      </div>
    </div>
  );
};
export default Home
