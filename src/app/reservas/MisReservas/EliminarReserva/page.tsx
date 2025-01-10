/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import editResourceLogic from "./eliminarReservaLogic";
import { Icon } from '@iconify/react';

const EliminarReserva = ({ selectedReservationId }: { selectedReservationId: string | null }) => {
    const {
        handleSubmit,
        onSubmit,
    } = editResourceLogic(selectedReservationId);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5 flex flex-col items-center gap-5 bg-slate-100 shadow-md rounded-md max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#091057] text-white p-4 rounded-md w-full max-w-lg">
                <Icon icon="mdi:clipboard-plus-outline" className="text-3xl" />
                <h2 className="text-xl font-bold">Eliminar reserva</h2>
            </div>

            {/* Confirmation Label */}
            <div className="w-full max-w-lg mt-5">
                <label className="text-gray-700">
                    ¿Está seguro de eliminar esta reserva?
                </label>
            </div>

            {/* Form Fields */}
            <div className="w-full max-w-lg grid grid-cols-1 gap-5">
                <div className="flex flex-col">
                    {/* Submit Button */}
                    <div className="flex justify-center mt-5">
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white font-medium py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>

                {/* Toast Notifications */}
                <ToastContainer />
            </div>
        </form>
    );
};

export default EliminarReserva;