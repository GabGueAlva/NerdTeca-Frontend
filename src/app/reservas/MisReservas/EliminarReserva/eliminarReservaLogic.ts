/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'

const deleteReservationLogic = (selectedReservationId: string | null) => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async () => {
    if (!selectedReservationId) {
      toast.error('No se ha seleccionado ningún recurso.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(`http://localhost:3003/api/reservas/cancelar/${selectedReservationId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la reserva');
      }

      toast.success('Reserva eliminada con éxito');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar la reserva');
    }
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
  }

}

export default deleteReservationLogic;