"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import recursoRegisterLogic from "./crearRecursoLogic";
import { Icon } from '@iconify/react';



const UseRegisterRecurso = () => {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    sedes,
    horarios,
    addHorario,
    handleHorarioChange,
    setImagen
  } = recursoRegisterLogic();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5 flex flex-col items-center gap-5 bg-slate-100 shadow-md rounded-md max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#091057] text-white p-4 rounded-md w-full max-w-lg">
        <Icon icon="mdi:clipboard-plus-outline" className="text-3xl" />
        <h2 className="text-xl font-bold">Registrar Nuevo Recurso</h2>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700">Sube una imagen del recurso</label>
        <input
          type="file"
          accept="image/*"
          className="border border-gray-300 rounded-md p-2"
          onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
        />
      </div>
  
      {/* Form Fields */}
      <div className="w-full max-w-lg grid grid-cols-1 gap-5">
        {/* Tipo de Recurso */}
        <div className="flex flex-col">
          <label className="flex items-center gap-1 text-gray-700">
            <span>Ingrese el tipo de recurso que desea registrar</span>
            <span className="text-red-700">*</span>
          </label>
          <input
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#024CAA] focus:outline-none"
            type="text"
            {...register("tipoRecurso", { required: true })}
          />
          {errors.tipoRecurso && (
            <span className="text-red-600 text-sm">Este campo es obligatorio</span>
          )}
        </div>
  
        {/* Nombre del Salón */}
        <div className="flex flex-col">
          <label className="flex items-center gap-1 text-gray-700">
            <span>Ingrese el nombre del salón</span>
            <span className="text-red-700">*</span>
          </label>
          <input
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="text"
            {...register("nombre", { required: true })}
          />
          {errors.nombre && (
            <span className="text-red-600 text-sm">Este campo es obligatorio</span>
          )}
        </div>
  
        {/* Sede */}
        <div className="flex flex-col">
          <label className="flex items-center gap-1 text-gray-700">
            <span>Seleccione la sede</span>
            <span className="text-red-700">*</span>
          </label>
          <select
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("sede", { required: true })}
          >
            <option value="">Seleccione una sede</option>
            {sedes.map((sede) => (
              <option key={sede.id} value={sede.id}>
                {sede.nombre}
              </option>
            ))}
          </select>
          {errors.sede && (
            <span className="text-red-600 text-sm">Este campo es obligatorio</span>
          )}
        </div>


  
        {/* Horarios */}
        <div className="w-full max-w-lg flex flex-col gap-3">
          <label className="text-gray-700">Ingrese los horarios de disponibilidad</label>
          <div className="overflow-auto max-h-[300px]"> {/* Scroll en el contenedor de horarios */}
            {horarios.map((horario, index) => (
              <div key={index} className="flex gap-3 mb-3">
                {/* Select para el Día */}
                <select
                  className="border border-gray-300 rounded-md p-2"
                  value={horario.dia}
                  onChange={(e) => handleHorarioChange(index, 'dia', e.target.value)}
                >
                  <option value="">Selecciona un día</option>
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia) => (
                    <option key={dia} value={dia}>{dia}</option>
                  ))}
                </select>
                
                {/* Input para Hora de Inicio */}
                <input
                  className="border border-gray-300 rounded-md p-2"
                  type="time"
                  value={horario.horaInicio}
                  onChange={(e) => handleHorarioChange(index, 'horaInicio', e.target.value)}
                />
                
                {/* Input para Hora de Fin */}
                <input
                  className="border border-gray-300 rounded-md p-2"
                  type="time"
                  value={horario.horaFin}
                  onChange={(e) => handleHorarioChange(index, 'horaFin', e.target.value)}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addHorario}
            className="w-full bg-[#091057] text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            Agregar otro horario
          </button>
        </div>
  
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-[#091057] text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            Crear nuevo recurso
          </button>
        </div>
      </div>
  
      {/* Toast Notifications */}
      <ToastContainer />
    </form>
  );
};

export default UseRegisterRecurso;