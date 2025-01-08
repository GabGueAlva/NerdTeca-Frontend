/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import UserLoged from "../../../Components/AuthToken/UserLoged";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Icon } from '@iconify/react';


interface CustomJwtPayload extends JwtPayload {
  id: number;
  username: string;
  rol: string;
  email: string;
}


const miCuentaHome = () => {

  const [id, setId] = useState<number>()
  const [fullName, setFullName] = useState<string>()
  const [rol, setRol] = useState<string>()
  const [email, setEmail] = useState<string>()

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        setId(decodedToken.id);
        setFullName(decodedToken.username)
        setRol(decodedToken.rol)
        setEmail(decodedToken.email)
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <div className="p-5 flex flex-col gap-5">
    <div className="w-full flex items-center gap-3 bg-[#091057] text-white p-4 rounded-md">
      <Icon icon="mdi:account-circle" className="text-4xl" />
      <h1 className="text-3xl font-bold">MI CUENTA</h1>
    </div>

    <div className="flex flex-col gap-4 bg-slate-100 shadow-md p-5 rounded-md">
      <h2 className="text-2xl font-semibold text-gray-700">Datos personales</h2>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <label className="text-lg font-medium text-gray-600">ID:</label>
          <span className="bg-[#091057] text-white text-sm px-3 py-1 rounded-full">{id}</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-lg font-medium text-gray-600">Nombre:</label>
          <span className="bg-[#091057] text-white text-sm px-3 py-1 rounded-full">{fullName}</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-lg font-medium text-gray-600">Tipo de perfil:</label>
          <span className="bg-[#091057] text-white text-sm px-3 py-1 rounded-full">{rol}</span>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-4 bg-slate-100 shadow-md p-5 rounded-md">
      <h2 className="text-2xl font-semibold text-gray-700">Dato de contacto</h2>

      <div className="flex items-center gap-3">
        <label className="text-lg font-medium text-gray-600">Email:</label>
        <span className="bg-[#091057] text-white text-sm px-3 py-1 rounded-full">{email}</span>
      </div>
    </div>
  </div>
  );
};

export default UserLoged(miCuentaHome);