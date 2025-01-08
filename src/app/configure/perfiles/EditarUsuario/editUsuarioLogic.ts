/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import {  useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'

type FormData = {
    fullName: string;
    rol: string;
    email: string;
    password: string
};

const editUsuarioLogic = (selectedUserId: string | null) => {

    const [handlePasswordView, setHandlePasswordView] = useState<boolean>(false)
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<FormData>()

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = event.target.value;  // El nuevo valor seleccionado
        setValue("rol", newRole);  // Estableces el nuevo valor en el formulario
    };

    useEffect(() => {
        if (selectedUserId) {
          fetchUserData(selectedUserId);
        }
      }, [selectedUserId]);
    
      const fetchUserData = async (id: string) => {
        try {
          const response = await fetch(`http://localhost:3003/api/usuarios/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error("Error al obtener datos del usuario");
          }
    
          const userData = await response.json();
          setValue("fullName", userData.fullName);
          setValue("email", userData.email);
          setValue("rol", userData.rol);
        } catch (error) {
          console.error("Error:", error);
          toast.error("No se pudo cargar la información del usuario.");
        }
      };

    const onSubmit = async (data: FormData) => {

        //Expresiones regulares 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        const nameRegex = /^[A-Za-zÁ-Úá-ú\s]+$/;

        if (!emailRegex.test(data.email)) {
            toast.error('El email no es válido.')
            return;
        }

        // if (!passwordRegex.test(data.password)) {
        //     toast.error('La contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial.');
        //     return;
        // }

        if (!nameRegex.test(data.fullName)) {
            toast.error('El nombre solo puede contener letras.');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:3003/api/usuarios/actualizar/${selectedUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al crear al usuario')
            }
            toast.success('Usuario editado con éxito')
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al editar al usuario, puede que el email ya esté registrado.')
        }
    }

    const handlePassword = () => {
        setHandlePasswordView(!handlePasswordView)
    };


    return {
        register,
        errors,
        handleSubmit,
        onSubmit,
        handlePassword,
        handlePasswordView,
        handleSelectChange,
        control
    }

}

export default editUsuarioLogic;