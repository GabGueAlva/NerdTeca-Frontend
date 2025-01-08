/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react";
import ReusableTable from "../../../Components/Table/ReusableTable";
import { Icon } from '@iconify/react';
import { TableColumn } from "react-data-table-component";
import { Usuario } from "../../../Components/Table/types";
import UserLoged from "../../../Components/AuthToken/UserLoged";
import useModal from "@/Components/Modal/Modal";
import UseEditarUsuario from "./EditarUsuario/page";
import UseEditarPassword from "./EditarPassword/page";

const HomeClients = () => {
    
  const [dataTablePromotores, setDataTablePromotores] = useState<Usuario[]>([])
  const [dataTablePromotoresUnfiltered, setDataTablePromotoresUnfiltered] = useState<Usuario[]>([])
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const {
    toggleModal: ToggleModalEditUser,
    Render: ModalEditUser,
  } = useModal({title: ""})

  const editClientButton = (id: string) => {
    setSelectedClientId(id);
    ToggleModalEditUser()
  }

  const {
    toggleModal: ToggleModalEditPassword,
    Render: ModalEditPassword,
  } = useModal({title: ""})

  const editPasswordButton = (id: string) => {
    setSelectedClientId(id);
    ToggleModalEditPassword()
  }

  const columns: TableColumn<Usuario>[] = [
    {
      name: "ID",
      selector: (row: Usuario) => row.id.toString(),
      sortable: true,
    },
    {
        name: "Rol",
        selector: (row: Usuario) => row.rol,
        sortable: true,
      },
    {
      name: "Nombre Completo",
      selector: (row: Usuario) => row.fullName, // Concatenar Nombre y Apellido
      sortable: true,
    },
    {
        name: "Email",
        selector: (row: Usuario) => row.email,
        sortable: true,
      },
      {
        name: "Acciones",
        cell: (row: Usuario) => (
          <div className="flex justify-center gap-2">
            {/* Ícono de edición */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
              onClick={() => editClientButton(row.id.toString())}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            {/* Ícono de candado */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
              onClick={() => editPasswordButton(row.id.toString())}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2a4 4 0 0 0-4 4v4H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4zm-2 4a2 2 0 1 1 4 0v4h-4zM12 14a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                />
            </svg>
          </div>
        ),
      },
  ]

  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {
    //   const token = localStorage.getItem('authToken');
      try {
        const response = await fetch('http://localhost:3003/api/usuarios', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}` // Enviar el token en el encabezado Authorization
          }
        });
    
        if (!response.ok) {
          throw new Error("Error al obtener datos");
        }
    
        const result = await response.json();
        setDataTablePromotores(result); // Actualizar el estado con los clientes obtenidos
        setDataTablePromotoresUnfiltered(result); 
      } catch (error) {
        console.log(error)
      }
    }

  const handleChangeFilter = (event: any) => {
    const value = event.target.value
    if (value == "") {
        setDataTablePromotores(dataTablePromotoresUnfiltered)
    } else {
      const filteredData = dataTablePromotores.filter((dataTablePromotores) => {
        return dataTablePromotores.id.toString().includes(event.target.value)
      });
      setDataTablePromotores(filteredData)
    }
  } 

  return (
    <div className="w-full h-full p-5 flex flex-col gap-5">
    {/* Header */}
    <div className="w-full flex items-center gap-3 bg-[#091057] text-white p-4 rounded-md">
      <Icon icon="mdi:account-multiple" className="text-4xl" />
      <h1 className="text-3xl font-bold">Usuarios registrados</h1>
    </div>

    {/* Filter Section */}
    <div className="flex flex-col gap-3 bg-slate-100 shadow-md p-5 rounded-md">
      <div className="flex items-center gap-3">
        <Icon icon="mdi:filter" className="text-2xl text-gray-600" />
        <p className="text-lg font-medium text-gray-700">Filtrar por Id:</p>
      </div>
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Escribe el Id aquí..."
        onChange={handleChangeFilter}
      />
    </div>

    {/* Table Section */}
    <div className="bg-slate-100 shadow-md p-5 rounded-md">
      <ReusableTable
        columns={columns}
        data={dataTablePromotores}
        paginationPerPage={8}
      />

      <ModalEditUser>
        <UseEditarUsuario selectedUserId={selectedClientId} />
       </ModalEditUser>

       <ModalEditPassword>
        <UseEditarPassword selectedUserId={selectedClientId} />
       </ModalEditPassword>
    </div>
  </div>
  )
}

export default UserLoged(HomeClients);