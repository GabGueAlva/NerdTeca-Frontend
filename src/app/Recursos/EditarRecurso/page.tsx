/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import editResourceLogic from "./editRecursoLogic";
import { Icon } from '@iconify/react';
import { Controller } from 'react-hook-form';


const UseEditarRecurso = ({ selectedResourceId }: { selectedResourceId: string | null }) => {
    const {
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
    } = editResourceLogic(selectedResourceId);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5 flex flex-col items-center gap-5 bg-slate-100 shadow-md rounded-md max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#091057] text-white p-4 rounded-md w-full max-w-lg">
                <Icon icon="mdi:clipboard-plus-outline" className="text-3xl" />
                <h2 className="text-xl font-bold">Editar Recurso</h2>
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

                    <Controller
                        name="sede"
                        control={control}  // Use control from react-hook-form
                        render={({ field }) => (
                            <select
                                {...field}  // Spread the field to bind it with react-hook-form
                                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={handleSelectChange} // Optional: if you need to handle custom logic
                            >
                                <option value="">Seleccione una sede</option>
                                {sedes.map((sede) => (
                                    <option key={sede.id} value={sede.id}>
                                        {sede.nombre}
                                    </option>
                                ))}
                            </select>
                        )}
                    />


                    {/* Horarios */}
                    <div className="flex flex-col mt-5">
                        <label className="flex items-center gap-1 text-gray-700">
                            <span>Seleccione los horarios</span>
                            <span className="text-red-700">*</span>
                        </label>
                        {horarios.map((horario, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <select
                                    value={horario.dia}
                                    onChange={(e) => handleHorarioChange(index, "dia", e.target.value)}
                                    className="border rounded-md p-2 w-1/3"
                                >
                                    <option value="">Seleccionar día</option>
                                    <option value="Lunes">Lunes</option>
                                    <option value="Martes">Martes</option>
                                    <option value="Miércoles">Miércoles</option>
                                    <option value="Jueves">Jueves</option>
                                    <option value="Viernes">Viernes</option>
                                    <option value="Sábado">Sábado</option>
                                    <option value="Domingo">Domingo</option>
                                </select>
                                <input
                                    type="time"
                                    value={horario.horaInicio}
                                    onChange={(e) => handleHorarioChange(index, "horaInicio", e.target.value)}
                                    placeholder="Hora inicio"
                                    className="border rounded-md p-2 w-1/3"
                                />
                                <input
                                    type="time"
                                    value={horario.horaFin}
                                    onChange={(e) => handleHorarioChange(index, "horaFin", e.target.value)}
                                    placeholder="Hora fin"
                                    className="border rounded-md p-2 w-1/3"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeHorario(index)}
                                    className="text-red-500 font-bold"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addHorario}
                            className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md"
                        >
                            Agregar Horario
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-5">
                        <button
                            type="submit"
                            className="w-full bg-[#091057] text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Editar recurso
                        </button>
                    </div>
                </div>

                {/* Toast Notifications */}
                <ToastContainer />
            </div>
        </form>
    );
};

export default UseEditarRecurso;