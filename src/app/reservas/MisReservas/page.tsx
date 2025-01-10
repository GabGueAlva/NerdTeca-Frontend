/* eslint-disable react-hooks/exhaustive-deps */
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
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Types } from "mongoose";
import UseRegisterReserva from "./CrearReserva/page";
import EliminarReserva from "./EliminarReserva/page";

interface CustomJwtPayload extends JwtPayload {
  id: Types.ObjectId | string;
}

interface Sede {
  id: string;
  nombre: string;
}

const HomeClients = () => {

  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
  const [dataTableReservas, setDataTableReservas] = useState<Reserva[]>([])
  const [dataTableReservasUnfiltered, setDataTableReservasUnfiltered] = useState<Reserva[]>([])
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loadingSedes, setLoadingSedes] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  const {
    toggleModal: ToggleModalCreateReserva,
    Render: ModalCreateReserva,
  } = useModal({ title: "" })

  const createReservaButton = () => {
    ToggleModalCreateReserva()
  }

  const {
    toggleModal: ToggleModalDeleteReservation,
    Render: ModalDeleteReservation,
  } = useModal({ title: "" })

  const editDeleteButton = (id: string) => {
    setSelectedReservationId(id);
    ToggleModalDeleteReservation()
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        setUserId(decodedToken.id.toString());
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/sedes');
        if (!response.ok) {
          throw new Error("Error al obtener las sedes");
        }
        const sedesData = await response.json();
        setSedes(sedesData);
        setLoadingSedes(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSedes();
  }, []);

  useEffect(() => {
    if (loadingSedes) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/reservas/cliente/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error("Error al obtener datos");
        }

        const reservaData = await response.json();
        const reservaConSede = reservaData.map((reserva: Reserva) => {
          const sede = sedes.find(sede => sede.id === reserva.recurso.sede);
          const nombreSede = sede ? sede.nombre.split(' - ')[1] || sede.nombre : "Sede no encontrada";

          return {
            ...reserva,
            sede: nombreSede,
          };
        });

        setDataTableReservas(reservaConSede);
        setDataTableReservasUnfiltered(reservaConSede);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [loadingSedes, sedes]);

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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                className={`rounded-full px-3 py-1 text-sm font-semibold ${estadoClass}`}
                style={{
                  display: "inline-block",
                  textAlign: "center",
                  minWidth: "80px",
                  marginRight: '8px', // Espacio entre el estado y el ícono
                }}
              >
                {row.estado}
              </div>
              <Icon icon="mdi:trash-can" style={{ cursor: 'pointer' }} onClick={() => editDeleteButton(row.id.toString())}/>
            </div>
          );
        }
      },
  ];

  const handleChangeFilter = (event: any) => {
    const value = event.target.value
    if (value == "") {
      setDataTableReservas(dataTableReservasUnfiltered)
    } else {
      const filteredData = dataTableReservas.filter((dataTableRecursos) => {
        return dataTableRecursos.id.toString().includes(event.target.value)
      });
      setDataTableReservas(filteredData)
    }
  }

  return (
    <div className="w-full h-full p-5 flex flex-col gap-5">
      <div className="w-full flex items-center gap-3 bg-[#091057] text-white p-4 rounded-md">
        <Icon icon="mdi:folder-open" className="text-4xl" />
        <h1 className="text-3xl font-bold">Mis reservas</h1>
      </div>

      <div className="flex flex-col gap-3 bg-slate-100 shadow-md p-5 rounded-md">
        <div className="flex items-center gap-3">
          <Icon icon="mdi:filter" className="text-2xl text-gray-600" />
          <p className="text-lg font-medium text-gray-700">
            Filtrar por Id del recurso:
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3 mt-3">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe el Id del recurso aquí..."
            onChange={handleChangeFilter}
          />
          <button
            className="text-white bg-[#091057] hover:bg-blue-700 rounded-md p-2 w-full md:w-auto"
            onClick={createReservaButton}
          >
            <div className="flex items-center gap-2 justify-center">
              <Icon icon="mdi:plus-circle" className="text-2xl" />
              <span>Reservar</span>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-slate-100 shadow-md p-5 rounded-md">
        <ReusableTable
          columns={columns}
          data={dataTableReservas}
          paginationPerPage={8}
        />
      </div>

      {/* Modal */}
      <ModalCreateReserva>
        <UseRegisterReserva />
      </ModalCreateReserva>

      <ModalDeleteReservation>
        <EliminarReserva selectedReservationId={selectedReservationId} />
      </ModalDeleteReservation>
    </div>
  )
}

export default UserLoged(HomeClients);