"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserLoged = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthenticatedComponent: React.FC<P> = (props) => {
        const router = useRouter();

        useEffect(() => {
        // Verificar si hay un token de autenticación en el localStorage
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            // Redirigir al usuario a la página de inicio de sesión si no está autenticado
            router.push('/login');
        }

        // Opcional: Agregar una validación de token en el backend si es necesario

        }, [router]);

        // Renderizar el componente envuelto solo si hay un token válido
        return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default UserLoged;