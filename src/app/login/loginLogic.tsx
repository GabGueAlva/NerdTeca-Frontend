/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const debounce = require('lodash.debounce');// Asegúrate de instalar lodash.debounce

type FormData = {
    email: string
    password: string
};


const loginLogic = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [handlePasswordView, setHandlePasswordView] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handlePassword = () => {
        setHandlePasswordView(!handlePasswordView)
    };

    const handleUserActivity = useCallback(debounce(() => {
        const now = new Date().getTime();
        const expirationTime = localStorage.getItem('expirationTime');
        const sessionEndTime = localStorage.getItem('sessionEndTime');
        const token = localStorage.getItem('authToken');
    
        if (!token || !expirationTime || !sessionEndTime) {
          router.push('/login');
          return;
        }
    
        if (now > parseInt(sessionEndTime)) {
          // Si la duración máxima de sesión ha expirado
          localStorage.removeItem('authToken');
          localStorage.removeItem('expirationTime');
          localStorage.removeItem('sessionEndTime');
          toast.error('La sesión ha expirado. Por favor, inicia sesión nuevamente.');
          router.push('/login');
          return;
        }
    
        if (now > parseInt(expirationTime)) {
          // Si la inactividad ha expirado
          localStorage.removeItem('authToken');
          localStorage.removeItem('expirationTime');
          localStorage.removeItem('sessionEndTime');
          toast.error('La sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente.');
          router.push('/login');
        }
      }, 300), [router]); // Debounce de 300 ms
    
      useEffect(() => {
        // Agregar eventos de actividad del usuario
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keypress', handleUserActivity);
    
        // Limpiar eventos al desmontar el componente
        return () => {
          window.removeEventListener('mousemove', handleUserActivity);
          window.removeEventListener('keypress', handleUserActivity);
          handleUserActivity.cancel(); // Cancelar el debounce al desmontar
        };
      }, [handleUserActivity]);
    
      const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:3003/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error('Error de inicio de sesión.');
          }
          const result = await response.json();
    
          if (!result.token) {
            throw new Error('Token de autenticación no encontrado en la respuesta del servidor.');
          }
    
          const now = new Date().getTime();
          const expirationTime = now + 2 * 60 * 60 * 1000; // 2 horas en milisegundos
          const sessionEndTime = now + 5 * 60 * 60 * 1000; // 5 horas en milisegundos
    
          // Guardar el token, la hora de expiración por inactividad y la hora de expiración de sesión en localStorage
          localStorage.setItem('authToken', result.token);
          localStorage.setItem('expirationTime', expirationTime.toString());
          localStorage.setItem('sessionEndTime', sessionEndTime.toString());
    
          toast.success('Inicio de sesión exitoso'); // Mostrar notificación de éxito
          router.push('/inicio');
        } catch (error) {
          console.error('Error:', error);
          toast.error('El correo electrónico o la contraseña son incorrectos o no coinciden.');
        } finally {
          setLoading(false);
        }
      };    

    const logout = () => {
        localStorage.removeItem('authToken'); // Eliminar el token de autenticación
    
        toast.success('Has cerrado sesión exitosamente.');
        router.push('/login');
    }

    return {
        register,
        errors,
        handleSubmit,
        handlePassword,
        handlePasswordView,
        onSubmit,
        logout
    }
}
 
export default loginLogic;