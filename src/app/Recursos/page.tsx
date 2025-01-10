/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react";
import ReusableTable from "../../Components/Table/ReusableTable";
import { TableColumn } from "react-data-table-component";
import { Recurso } from "../../Components/Table/types";
import useModal from "../../Components/Modal/Modal";
import UserLoged from "../../Components/AuthToken/UserLoged";
import UseRegisterRecurso from "./CrearRecurso/page";
import { Icon } from '@iconify/react';
import UseEditarRecurso from "./EditarRecurso/page";

interface Sede {
  id: string;  
  nombre: string;
}

const HomeClients = () => {

  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const [dataTableRecursos, setDataTableRecursos] = useState<Recurso[]>([])
  const [dataTableRecursosUnfiltered, setDataTableRecursosUnfiltered] = useState<Recurso[]>([])
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loadingSedes, setLoadingSedes] = useState<boolean>(true);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/sedes');
        if (!response.ok) {
          throw new Error("Error al obtener las sedes");
        }
        const sedesData = await response.json();
        setSedes(sedesData);
        setLoadingSedes(false); // Cambiar el estado a false cuando las sedes se hayan cargado
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSedes();
  }, []);

  useEffect(() => {
    // Solo hacer el fetch de los recursos cuando las sedes estén cargadas
    if (loadingSedes) return;

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/recursos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error("Error al obtener datos");
        }

        const recursosData = await response.json();
        console.log("sede", sedes);

        const recursosConSede = recursosData.map((recurso: Recurso) => {
          const sede = sedes.find(sede => sede.id === recurso.sede);
          const nombreSede = sede ? sede.nombre.split(' - ')[1] || sede.nombre : "Sede no encontrada";

          return {
            ...recurso,
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
  }, [loadingSedes, sedes]);

  const {
    toggleModal: ToggleModalCreateRecurso,
    Render: ModalCreateRecurso,
  } = useModal({ title: "" })

  const createRecursoButton = () => {
    ToggleModalCreateRecurso()
  }

  const {
    toggleModal: ToggleModalEditResource,
    Render: ModalEditResource,
  } = useModal({title: ""})

  const editResourceButton = (id: string) => {
    setSelectedResourceId(id);
    ToggleModalEditResource()
  }


  const columns: TableColumn<Recurso>[] = [
    {
      name: "ID",
      selector: (row: Recurso) => row.id.toString(),
      sortable: true,
    },
    {
      name: "Tipo",
      selector: (row: Recurso) => row.tipoRecurso.toString(),
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row: Recurso) => row.nombre.toString(),
      sortable: true,
    },
    {
      name: "Sede",
      selector: (row: Recurso) => row.sede,
      sortable: true,
    },
    {
      name: "",
      cell: (row: Recurso) => (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
            onClick={() => editResourceButton(row.id.toString())}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>
      ),
    },
  ]

  const handleChangeFilter = (event: any) => {
    const value = event.target.value
    if (value == "") {
      setDataTableRecursos(dataTableRecursosUnfiltered)
    } else {
      const filteredData = dataTableRecursos.filter((dataTableRecursos) => {
        return dataTableRecursos.id.toString().includes(event.target.value)
      });
      setDataTableRecursos(filteredData)
    }
  }

  return (
    <div className="w-full h-full p-5 flex flex-col gap-5">
      <div className="w-full flex items-center gap-3 bg-[#091057] text-white p-4 rounded-md">
        <Icon icon="mdi:folder-open" className="text-4xl" />
        <h1 className="text-3xl font-bold">Recursos</h1>
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
            onClick={createRecursoButton}
          >
            <div className="flex items-center gap-2 justify-center">
              <Icon icon="mdi:plus-circle" className="text-2xl" />
              <span>Crear nuevo recurso</span>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-slate-100 shadow-md p-5 rounded-md">
        <ReusableTable
          columns={columns}
          data={dataTableRecursos}
          paginationPerPage={8}
        />
      </div>

      {/* Modal */}
      <ModalCreateRecurso>
        <UseRegisterRecurso />
      </ModalCreateRecurso>

      <ModalEditResource>
        <UseEditarRecurso selectedResourceId={selectedResourceId} />
       </ModalEditResource>
    </div>
  )
}

export default UserLoged(HomeClients);