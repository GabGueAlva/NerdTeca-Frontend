/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'

type FormData = {
    password: string
    confirmedPassword: string
};

const editPasswordLogic = (selectedUserId: string | null) => {

    const [handlePasswordView, setHandlePasswordView] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {

        //Expresiones regulares 
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

        if (data.password !== data.confirmedPassword) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }

        if (!passwordRegex.test(data.password)) {
            toast.error('La contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial.');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:3003/api/usuarios/actualizar-clave/${selectedUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password: data.password })
            });
            if (!response.ok) {
                throw new Error('Error al editar la contraseña')
            }
            toast.success('Contraseña editada con éxito')
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al editar la contraseña, puede que el token haya expirado.')
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
    }

}

export default editPasswordLogic;