/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import {  useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'

type FormData = {
    tipoRecurso: string;
    nombre: string;
    sede: string;
    horarios: Array<{ dia: string; horaInicio: string ;horaFin: string }>;
};

type Horario = {
    dia: string;
    horaInicio: string;
    horaFin: string;
};

const editResourceLogic = (selectedResourceId: string | null) => {

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<FormData>()

    const [sedes, setSedes] = useState<{ id: string, nombre: string }[]>([]);
    const [horarios, setHorarios] = useState<{ dia: string; horaInicio: string; horaFin: string }[]>([]);

    useEffect(() => {
        const fetchSedes = async () => {
          try {
            const response = await fetch('http://localhost:3003/api/sedes');
            if (!response.ok) {
              throw new Error("Error al obtener las sedes");
            }
            const sedesData = await response.json();
            setSedes(sedesData);
          } catch (error) {
            console.error("Error:", error);
          }
        };
    
        fetchSedes();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSede = event.target.value;  // El nuevo valor seleccionado
        setValue("sede", newSede);  // Estableces el nuevo valor en el formulario
    };

    useEffect(() => {
        if (selectedResourceId) {
          fetchResourceData(selectedResourceId);
        }
    }, [selectedResourceId]);
    
      const fetchResourceData = async (id: string) => {
        try {
          const response = await fetch(`http://localhost:3003/api/recursos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error("Error al obtener datos del usuario");
          }
    
          const resourceData = await response.json();
          setValue("tipoRecurso", resourceData.tipoRecurso);
          setValue("nombre", resourceData.nombre);
          setValue("sede", resourceData.sede);
          setHorarios(resourceData.horarios || []);
        } catch (error) {
          console.error("Error:", error);
          toast.error("No se pudo cargar la información del usuario.");
        }
      }

      const addHorario = () => {
        setHorarios([...horarios, { dia: "", horaInicio: "", horaFin: "" }]);
      }
    
      const handleHorarioChange = (index: number, field: keyof Horario, value: string) => {
        const updatedHorarios = [...horarios];
        updatedHorarios[index][field] = value;
        setHorarios(updatedHorarios);
      }
    
      const removeHorario = (index: number) => {
        const updatedHorarios = horarios.filter((_, i) => i !== index);
        setHorarios(updatedHorarios);
      }

    const onSubmit = async (data: FormData) => {

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:3003/api/recursos/${selectedResourceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...data, horarios }),
            });
            if (!response.ok) {
                throw new Error('Error al editar el recurso')
            }
            toast.success('Recurso editado con éxito')
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al editar al recurso.')
        }
    }

    return {
        register,
        errors,
        handleSubmit,
        onSubmit,
        handleSelectChange,
        control,
        sedes,
        horarios,
        addHorario,
        handleHorarioChange,
        removeHorario,
    }

}

export default editResourceLogic;