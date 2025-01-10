/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react";
import ReusableTable from "../../../Components/Table/ReusableTable";
import { TableColumn } from "react-data-table-component";
import { Reserva } from "../../../Components/Table/types";
import useModal from "../../../Components/Modal/Modal";
import UserLoged from "../../../Components/AuthToken/UserLoged";
// import UseRegisterRecurso from "./CrearRecurso/page";
import { Icon } from '@iconify/react';
// import UseEditarRecurso from "./EditarRecurso/page";

interface Usuario {
  id: string;
  fullName: string;
}

interface Sede {
  id: string;  // O `number` dependiendo del tipo del ID de las sedes en tu base de datos
  nombre: string;
}

const HomeClients = () => {

  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const [dataTableReservas, setDataTableRecursos] = useState<Reserva[]>([])
  const [dataTableReservasUnfiltered, setDataTableRecursosUnfiltered] = useState<Reserva[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsuarioySedes = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/usuarios');
        const response2 = await fetch('http://localhost:3003/api/sedes');

        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        if (!response2.ok) {
          throw new Error("Error al obtener las sedes");
        }
        const usuariosData = await response.json();
        setUsuarios(usuariosData);
        const sedesData = await response2.json();
        setSedes(sedesData);

        setLoading(false);

      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsuarioySedes();
  }, []);

  useEffect(() => {

    if (loading) return;

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/reservas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error("Error al obtener datos");
        }

        const reservasData = await response.json();

        const reservasConUsuario = reservasData.map((reserva: Reserva) => {
          const usuario = usuarios.find(usuario => usuario.id === reserva.usuario);
          const nombreUsuario = usuario ? usuario.fullName : "Usuario no encontrado";

          return {
            ...reserva,
            usuario: nombreUsuario, 
          };
        });

        console.log(reservasConUsuario)

        const recursosConSede = reservasConUsuario.map((reserva: Reserva) => {

          const sede = sedes.find(sede => sede.id ===  reserva.recurso.sede);
          const nombreSede = sede ? sede.nombre.split(' - ')[1] || sede.nombre : "Sede no encontrada";

          return {
            ...reserva,
            sede: nombreSede, 
          };
        });

        setDataTableRecursos(recursosConSede);
        setDataTableRecursosUnfiltered(recursosConSede);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [loading, usuarios, sedes]);


  const columns: TableColumn<Reserva>[] = [
    {
      name: "ID",
      selector: (row: Reserva) => row.id.toString(),
      sortable: true,
    },
    {
      name: "Salón reservado",
      selector: (row: Reserva) => row.recurso.nombre,
      sortable: true,
    },
    {
      name: "Usuario asignado",
      selector: (row: Reserva) => row.usuario.toString(),
      sortable: true,
    },
    {
      name: "Sede",
      selector: (row: Reserva) => row.sede,
      sortable: true,
    },
    {
      name: "Fecha y Hora",
      selector: (row: Reserva) => `${row.fecha} ${row.horaInicio} - ${row.horaFin}`,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row: Reserva) => row.estado,
      sortable: true,
      style: { width: "5%" },
      cell: (row: Reserva) => {

        const estadoColors: Record<string, string> = {
          "Reservado": "bg-yellow-500 text-black",
          "En uso": "bg-green-500 text-black",
          "Cancelada": "bg-red-500 text-black",
          "Finalizado": "bg-blue-500 text-black",
        };
  
        const estadoClass = estadoColors[row.estado] || "bg-gray-300 text-black"; 
  
        return (
          <div
            className={`rounded-full px-3 py-1 text-sm font-semibold ${estadoClass}`}
            style={{
              display: "inline-block",
              textAlign: "center",
              minWidth: "80px",
            }}
          >
            {row.estado}
          </div>
        );
      }
    },
  ];

  const handleChangeFilter = (event: any) => {
    const value = event.target.value
    if (value == "") {
      setDataTableRecursos(dataTableReservasUnfiltered)
    } else {
      const filteredData = dataTableReservas.filter((dataTableRecursos) => {
        return dataTableRecursos.id.toString().includes(event.target.value)
      });
      setDataTableRecursos(filteredData)
    }
  }

  return (
    <div className="w-full h-full p-5 flex flex-col gap-5">
      <div className="w-full flex items-center gap-3 bg-[#091057] text-white p-4 rounded-md">
        <Icon icon="mdi:folder-open" className="text-4xl" />
        <h1 className="text-3xl font-bold">Todas las reservas</h1>
      </div>

      <div className="flex flex-col gap-3 bg-slate-100 shadow-md p-5 rounded-md">
        <div className="flex items-center gap-3">
          <Icon icon="mdi:filter" className="text-2xl text-gray-600" />
          <p className="text-lg font-medium text-gray-700">
            Filtrar por Id de la reserva:
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3 mt-3">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe el Id del recurso aquí..."
            onChange={handleChangeFilter}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: "1090px" }}>
          <ReusableTable
            columns={columns}
            data={dataTableReservas}
            paginationPerPage={8}
          />
        </div>
      </div>
    </div>
  )
}

export default UserLoged(HomeClients);