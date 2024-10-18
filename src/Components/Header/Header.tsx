"use client"

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { jwtDecode, JwtPayload } from "jwt-decode";
import useScroll from '../../Hooks/use-scroll';
import { cn } from '../../Lib/utils';
import { useEffect, useState } from "react";

interface CustomJwtPayload extends JwtPayload {
  pro_nombre: string;
  pro_apellido: string; // Agrega aquí cualquier otra propiedad específica que tengas en tu JWT
}

const UseHeader = () => {

  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const [promotorName, setPromotorName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // O sessionStorage si es el caso
    if (token) {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      // Extrae nombre y apellido del payload
      const nombre = decodedToken.pro_nombre; // Reemplaza 'nombre' por el campo correcto
      const apellido = decodedToken.pro_apellido; // Reemplaza 'apellido' por el campo correcto
      setPromotorName(`${nombre} ${apellido}`);
    }
  }, []);


  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200': selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/inicio"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">IDARA</span>
          </Link>
        </div>

        <div className="hidden md:block">
        <div className="flex items-center justify-center bg-zinc-300 p-2 rounded-full text-center">
          <span className="font-semibold text-sm">{promotorName}</span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UseHeader;