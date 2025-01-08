/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


type FormData = { 
    fullName: string;
	password: string;
	email: string;
};

const registerLogic = () => {

    const [handlePasswordView, setHandlePasswordView] = useState<boolean>(false)
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    
    const onSubmit = async (data: FormData) => {
        // Expresiones regulares
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        const nameRegex = /^[A-Za-zÁ-Úá-ú\s]+$/;
    
        if (!emailRegex.test(data.email)) {
            toast.error('El email no es válido.');
            return;
        }
    
        if (!passwordRegex.test(data.password)) {
            toast.error('La contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial.');
            return;
        }
    
        if (!nameRegex.test(data.fullName)) {
            toast.error('El nombre solo puede contener letras.');
            return;
        }
        // Preparar datos para enviar al backend para crear la organización
        const usuData = {
            fullName: data.fullName,
            email: data.email,
            password: data.password
        };
    
        try {
            const usuResponse = await fetch('http://localhost:3003/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuData),
            });
    
            if (!usuResponse.ok) {
                throw new Error('Error al crear la organización');
            }
        
            toast.success('Usuario creado con éxito');
            setTimeout(() => {
                router.push('/login');
            }, 1500);
            
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al crear al usuario, puede que el email ya esté registrado.');
        }
    };


    const handlePassword = () => {
        setHandlePasswordView(!handlePasswordView)
    };


    return {
        register,
        errors,
        handleSubmit,
        onSubmit,
        handlePassword,
        handlePasswordView
    }

}

export default registerLogic;