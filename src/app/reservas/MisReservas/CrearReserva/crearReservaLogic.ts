/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { Types } from "mongoose";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'

type FormData = {
  id: Types.ObjectId | string;
  recurso: Types.ObjectId | string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
};

type Recurso = {
  id: Types.ObjectId | string;
  tipoRecurso: string;
  nombre: string;
  sede: string;
  horarios: Array<{ dia: string; horaInicio: string; horaFin: string }>;
};


const reservaRegisterLogic = () => {

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();

  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [recursosDisponibles, setRecursosDisponibles] = useState<Recurso[]>([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState<Array<{ dia: string; horaInicio: string; horaFin: string }>>([]);
  const [recursoSeleccionado, setRecursoSeleccionado] = useState<string | null>(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string | null>(null);
  const fechaSeleccionada = watch("fecha")


  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/recursos');
        if (!response.ok) {
          throw new Error('Error al obtener los recursos');
        }
        const recursosData: Recurso[] = await response.json();

        const responseReservas = await fetch('http://localhost:3003/api/reservas');
        if (!responseReservas.ok) {
          throw new Error('Error al obtener las reservas');
        }
        const reservasData: FormData[] = await responseReservas.json();


        // Filtrar recursos en base a horarios disponibles y reservas
        const recursosFiltrados = recursosData.map((recurso) => {
          console.log(`\n🟦 Analizando recurso: ${recurso.nombre} (ID: ${recurso.id})`);

          const horariosFiltrados = recurso.horarios.filter((horario) => {
            console.log(`\n  🔹 Analizando horario:`);
            console.log(`    - Inicio: ${horario.horaInicio}`);
            console.log(`    - Fin: ${horario.horaFin}`);

            const reservasEnHorario = reservasData.some((reserva) => {
              const recursoReservaID = typeof reserva.recurso === "object" ? reserva.recurso.id : reserva.recurso;

              const mismoRecurso = recursoReservaID.toString() === recurso.id.toString();
              const mismaFecha = reserva.fecha === fechaSeleccionada;

              // Revisamos si los horarios se solapan correctamente
              const horarioSeSolapa =
                (horario.horaInicio < reserva.horaFin && horario.horaFin > reserva.horaInicio); // Rango debe ser distinto al de la reserva

              const estadoValido =
                reserva.estado === "Reservado" || reserva.estado === "En uso" || reserva.estado === "Finalizado";

              console.log(`    ➡️ Comparando con reserva:`);
              console.log(`      - Recurso de la reserva ID: ${recursoReservaID}`);
              console.log(`      - Fecha de la reserva: ${reserva.fecha}`);
              console.log(`      - Horario de la reserva: ${reserva.horaInicio} - ${reserva.horaFin}`);
              console.log(`      - Estado de la reserva: ${reserva.estado}`);
              console.log(`      🔍 Comparaciones:`);
              console.log(`        - Mismo recurso: ${mismoRecurso}`);
              console.log(`        - Misma fecha: ${mismaFecha}`);
              console.log(`        - Horario se solapa: ${horarioSeSolapa}`);
              console.log(`        - Estado válido: ${estadoValido}`);

              // Aquí queremos que 'reservasEnHorario' sea 'true' si hay una reserva que ocupe ese horario, no al revés
              return mismoRecurso && mismaFecha && horarioSeSolapa && estadoValido;
            });

            console.log(`  🔍 Resultado para horario:`);
            console.log(`    - Reservas en conflicto: ${reservasEnHorario}`);
            // Si hay reservas en conflicto, no lo incluimos
            return !reservasEnHorario;
          });

          console.log(`\n🟩 Resultado para recurso "${recurso.nombre}"`);
          console.log(`  - Horarios disponibles:`, horariosFiltrados);

          return { ...recurso, horarios: horariosFiltrados };
        }).filter((recurso) => recurso.horarios.length > 0);

        console.log(recursosFiltrados)
        setRecursos(recursosData);
        setRecursosDisponibles(recursosFiltrados);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (fechaSeleccionada) {
      fetchRecursos();
    }
  }, [fechaSeleccionada]);

  const handleRecursoChange = (recursoNombre: string) => {
    const recurso = recursosDisponibles.find((r) => r.nombre === recursoNombre);
    if (recurso) {
      setRecursoSeleccionado(recurso.id.toString());
      setHorariosDisponibles(recurso.horarios); // Aquí asignamos los horarios filtrados

      // Limpiar campos de hora
      setValue("horaInicio", "");
      setValue("horaFin", "");
    }
  };

  const handleHorarioSeleccionado = (dia: string, horaInicio: string, horaFin: string) => {
    setHorarioSeleccionado(`${dia}-${horaInicio}-${horaFin}`)
    setValue("horaInicio", horaInicio);
    setValue("horaFin", horaFin);
  };


  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem('authToken');

    if (!data.fecha || !data.horaInicio || !data.horaFin) {
      toast.error("Por favor, selecciona un horario válido.");
      return;
    }

    const dataToSend = {
      ...data,
      recurso: recursoSeleccionado,
    }

    try {
      const response = await fetch('http://localhost:3003/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        throw new Error('Error al crear la reserva')
      }
      toast.success('Reserva creada con éxito')
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear la reserva, contacte con soporte.')
    }
  }
  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    recursosDisponibles,
    horariosDisponibles,
    horarioSeleccionado,
    handleRecursoChange,
    handleHorarioSeleccionado
  }

}

export default reservaRegisterLogic;