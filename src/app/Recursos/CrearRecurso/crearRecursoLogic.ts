/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'

type FormData = {
    tipoRecurso: string;
    nombre: string;
    sede: string;
    horarios: Array<{ dia: string; horaInicio: string; horaFin: string }>;
    imagen: File | null;
};

type Horario = {
    dia: string;
    horaInicio: string;
    horaFin: string;
};

const recursoRegisterLogic = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const [sedes, setSedes] = useState<{ id: string, nombre: string }[]>([])
    const [horarios, setHorarios] = useState<{ dia: string; horaInicio: string; horaFin: string }[]>([])
    const [imagen, setImagen] = useState<File | null>(null)

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

    const onSubmit = async (data: FormData) => {
        const token = localStorage.getItem('authToken');

        const formData = new FormData();
        formData.append("tipoRecurso", data.tipoRecurso);
        formData.append("nombre", data.nombre);
        formData.append("sede", data.sede);
        formData.append("horarios", JSON.stringify(horarios));
        if (imagen) formData.append('imagen', imagen);
        try {
            const response = await fetch('http://localhost:3003/api/recursos/registrar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Error al crear el nuevo recurso')
            }
            toast.success('Recurso creado con éxito')
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al crear el nuevo recurso, contacte con soporte.')
        }
    }

    const addHorario = () => {
        setHorarios([...horarios, { dia: "", horaInicio: "", horaFin: "" }]);
    };

    const handleHorarioChange = (index: number, field: 'dia' | 'horaInicio' | 'horaFin', value: string) => {
        const updatedHorarios = [...horarios];

        if (field === 'horaFin' && value < updatedHorarios[index].horaInicio) {
            toast.error("La hora final no puede ser anterior a la hora de inicio.");
            return; 
        }

        updatedHorarios[index][field] = value;
        setHorarios(updatedHorarios);
    };

    return {
        register,
        errors,
        handleSubmit,
        onSubmit,
        sedes,
        horarios,
        addHorario,
        handleHorarioChange,
        setImagen 
    }

}

export default recursoRegisterLogic;