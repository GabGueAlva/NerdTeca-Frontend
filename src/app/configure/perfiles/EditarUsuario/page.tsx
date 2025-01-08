/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import editUsuarioLogic from "./editUsuarioLogic";
import { Icon } from '@iconify/react';
import { use, useEffect } from 'react';
import { Controller } from 'react-hook-form';


const UseEditarUsuario = ({ selectedUserId }: { selectedUserId: string | null }) => {
    const {
        register,
        errors,
        handleSubmit,
        onSubmit,
        handlePassword,
        handlePasswordView,
        handleSelectChange,
        control
    } = editUsuarioLogic(selectedUserId);

    useEffect(() => {
        console.log(selectedUserId)
    }, [])


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5 flex flex-col items-center gap-5 bg-slate-100 shadow-md rounded-md">
            <div className="flex items-center gap-3 bg-[#091057] text-white p-4 rounded-md w-full max-w-lg">
                <Icon icon="mdi:clipboard-plus-outline" className="text-3xl" />
                <h2 className="text-xl font-bold"> Editar usuario</h2>
            </div>

            <div className="w-full max-w-lg grid grid-cols-1 gap-5">

                <div className="flex flex-col">
                    <label className="flex items-center gap-1 text-gray-700">
                        <span>Nombre:</span>
                        <span className="text-red-700">*</span>
                    </label>
                    <input
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#024CAA] focus:outline-none"
                        type="text"
                        {...register("fullName", { required: true })}
                    />
                    {errors.fullName && (
                        <span className="text-red-600 text-sm">Este campo es obligatorio</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="flex items-center gap-1 text-gray-700">
                        <span>Email:</span>
                        <span className="text-red-700">*</span>
                    </label>
                    <input
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        type="text"
                        {...register("email", { required: true })}
                    />
                    {errors.email && (
                        <span className="text-red-600 text-sm">Este campo es obligatorio</span>
                    )}
                </div>

                <Controller
                    name="rol"
                    control={control}  // Use control from react-hook-form
                    render={({ field }) => (
                        <select
                            {...field}  // Spread the field to bind it with react-hook-form
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            onChange={handleSelectChange} // Optional: if you need to handle custom logic
                        >
                            <option value="">Seleccione el rol</option>
                            <option value="Cliente">Cliente</option>
                            <option value="Admin">Admin</option>
                        </select>
                    )}
                />
                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full bg-[#091057] text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Editar
                    </button>
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </form>
    );
};

export default UseEditarUsuario;