"use client";

import Link from "next/link";
// import Image from "next/image";
// import Logo from "../../../public/assets/Logo.png";
import registerLogic from "./signUpLogic";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UseSignUpPage = () => {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    handlePassword,
    handlePasswordView
  } = registerLogic();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" bg-slate-200 w-full h-screen flex flex-col p-10">
        <div className=" w-full h-1/6 p-3 md:block hidden">
          <div className="flex flex-row justify-end text-sm">
            <div className="mr-5 underline ">Ya tengo una cuenta</div>
            <Link
              href="/login"
              className="w-[150px] h-[20px] text-center text-white bg-[#113877] rounded-md text-sm  "
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
        <div className="w-full h-1/6 flex flex-col justify-center items-center">
          {/* <Image src={Logo} alt="" className="md:w-[500px] w-[250px]" /> */}
        </div>
        <p className="text-center text-3xl mb-1 mt-1 md:mb-5 md:mt-5">
           Registrar nuevo usuario
        </p>

        <div className="w-full h-4/6 flex md:justify-center ">
          <div className="w-1/2 h-full grid md:grid-cols-2 md:ml-16 ml-5">
            <div className="">
              <div className="p-3 flex flex-col justify-center">
                <div className="flex flex-row gap-2">
                  <p className="">Ingrese su nombre completo</p>
                  <p className="text-red-700">*</p>
                </div>
                <input
                  className="rounded w-64 pl-2"
                  type="text"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <span className="text-red-600">
                    Este campo es obligatorio
                  </span>
                )}
              </div>
              <div className="p-3 flex flex-col justify-center">
                <div className="flex flex-row gap-2">
                  <p className="">Ingrese su correo electrónico</p>
                  <p className="text-red-700">*</p>
                </div>
                <input
                  className="rounded w-64 pl-2"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">
                    Este campo es obligatorio
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="p-3 flex flex-col justify-center">
                <div className="flex flex-row gap-2">
                  <p className="">Ingrese una contraseña</p>
                  <p className="text-red-700">*</p>
                </div>
                <div className="relative w-64 ">
                  <input
                    className="rounded w-64 pl-2"
                    type={handlePasswordView ? "text" : "password"}
                    {...register("password", { required: true })}
                  />
                   <svg className="absolute right-2 top-1 w-4 h-4 cursor-pointer" onClick={handlePassword} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                 
                </div>
                {errors.password && (
                  <span className="text-red-600">
                    Este campo es obligatorio
                  </span>
                )}
              </div>
              <div className="p-3">
                <button type="submit" className="text-white bg-[#113877] w-64 rounded-md">
                  Crear cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-sm mt-5 block md:hidden">
          <div className="flex flex-row justify-between">
            <p className="underline">Ya tengo una cuenta</p>
            <Link href="/login" legacyBehavior>
              <a className="w-[130px] h-[20px] text-center text-white bg-[#113877] rounded-md text-sm">
                Iniciar sesión
              </a>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default UseSignUpPage;