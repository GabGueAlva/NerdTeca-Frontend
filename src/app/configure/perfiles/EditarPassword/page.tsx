/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import editPasswordLogic from "./editPasswordLogic";
import { Icon } from '@iconify/react';


const UseEditarPassword = ({ selectedUserId }: { selectedUserId: string | null }) => {
    const {
        register,
        errors,
        handleSubmit,
        onSubmit,
        handlePassword,
        handlePasswordView,
    } = editPasswordLogic(selectedUserId);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5 flex flex-col items-center gap-5 bg-slate-100 shadow-md rounded-md">
            <div className="flex items-center gap-3 bg-[#091057] text-white p-4 rounded-md w-full max-w-lg">
                <Icon icon="mdi:clipboard-plus-outline" className="text-3xl" />
                <h2 className="text-xl font-bold"> Editar contraseña</h2>
            </div>

            <div className="w-full max-w-lg grid grid-cols-1 gap-5">

                <div className="flex flex-col">
                    <label className="flex items-center gap-1 text-gray-700">
                        <span>Contraseña nueva:</span>
                        <span className="text-red-700">*</span>
                    </label>
                    <div className="relative w-64 ">
                        <input
                            className="rounded w-64 pl-2"
                            type={handlePasswordView ? "text" : "password"}
                            {...register("password", { required: true })}
                        />
                        <svg className="absolute right-2 top-1 w-4 h-4 cursor-pointer" onClick={handlePassword} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                        
                        </div>
                    {errors.password && (
                        <span className="text-red-600 text-sm">Este campo es obligatorio</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="flex items-center gap-1 text-gray-700">
                        <span>Confirmar contraseña nueva:</span>
                        <span className="text-red-700">*</span>
                    </label>
                    <div className="relative w-64 ">
                        <input
                            className="rounded w-64 pl-2"
                            type={handlePasswordView ? "text" : "password"}
                            {...register("confirmedPassword", { required: true })}
                        />
                        <svg className="absolute right-2 top-1 w-4 h-4 cursor-pointer" onClick={handlePassword} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                        
                        </div>
                    {errors.confirmedPassword && (
                        <span className="text-red-600 text-sm">Este campo es obligatorio</span>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full bg-[#091057] text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Confirmar edición
                    </button>
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </form>
    );
};

export default UseEditarPassword;