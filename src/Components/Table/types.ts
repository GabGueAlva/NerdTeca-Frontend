import { Types } from 'mongoose';

export interface Usuario {
    id: Types.ObjectId | string;
    fullName: string;
    rol: string;
    email:string;
}

export interface Recurso {
    id: Types.ObjectId | string;
    nombre: string;
    tipoRecurso: string;
    sede:string;
}