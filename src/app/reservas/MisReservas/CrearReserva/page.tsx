/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from '@iconify/react';
import reservaRegisterLogic from './crearReservaLogic';

const UseRegisterReserva = () => {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    recursosDisponibles,
    horariosDisponibles,
    horarioSeleccionado,
    handleRecursoChange,
    handleHorarioSeleccionado,
  } = reservaRegisterLogic();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-5 flex flex-col items-center gap-5 bg-slate-100 shadow-md rounded-md max-h-[80vh] overflow-y-auto"
    >
      <div className="flex items-center gap-3 bg-[#091057] text-white p-4 rounded-md w-full max-w-lg">
        <Icon icon="mdi:clipboard-plus-outline" className="text-3xl" />
        <h2 className="text-xl font-bold">Realizar una reserva</h2>
      </div>

      <div className="w-full max-w-lg grid grid-cols-1 gap-5">
        {/* Input Fecha */}
        <div>
          <label className="text-gray-700">Seleccione una fecha</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2"
            {...register("fecha", { required: "La fecha es obligatoria" })}
          />
          {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha.message}</p>}
        </div>

        {/* Select Recursos */}
        <div>
          <label className="text-gray-700">Seleccione un recurso</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => handleRecursoChange(e.target.value)}
          >
            <option value="">Seleccione un recurso</option>
            {recursosDisponibles.map((recurso) => (
              <option key={recurso.id.toString()} value={recurso.nombre}>
                {recurso.tipoRecurso} - {recurso.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Horarios Disponibles */}
        <div>
          <label className="text-gray-700">Horarios disponibles</label>
          <div className="grid grid-cols-3 gap-4">
            {horariosDisponibles.map((horario, index) => {
              const isSelected =
                horarioSeleccionado === `${horario.dia}-${horario.horaInicio}-${horario.horaFin}`;
              return (
                <label
                  key={index}
                  className={`p-4 border rounded-md shadow-md flex flex-col items-center cursor-pointer ${isSelected ? "bg-[#091057] text-white" : "bg-white text-gray-700"
                    }`}
                  onClick={() =>
                    handleHorarioSeleccionado(horario.dia, horario.horaInicio, horario.horaFin)
                  }
                >
                  <p className="font-bold">{horario.dia}</p>
                  <p>
                    {horario.horaInicio} - {horario.horaFin}
                  </p>
                </label>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#091057] text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
        >
          Realizar Reserva
        </button>
      </div>

      <ToastContainer />
    </form>
  );
};

export default UseRegisterReserva;