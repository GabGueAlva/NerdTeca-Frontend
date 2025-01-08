'use client'

// import Image from "next/image";
import Link from "next/link";
import loginLogic from "./loginLogic";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UseLogin = () => {

  const {
    register,
    errors,
    handlePassword,
    handlePasswordView,
    handleSubmit,
    onSubmit,
  } = loginLogic();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-screen flex flex-col p-10 ">
        <div className=" w-full h-1/6 p-3 md:block hidden">
          <div className="flex flex-row justify-end text-sm">
            <div className="mr-5 underline ">¿Aún no tiene una cuenta?</div>
            <Link
              href="/signUp"
              className="w-[150px] h-[20px] text-center text-white bg-[#113877] rounded-md text-sm  "
            >
              Registrarme
            </Link>
          </div>
        </div>
        <div className="w-full h-1/6 flex flex-col justify-center items-center">
          {/* <Image src={Logo} alt="" className="md:w-[500px] w-[250px]" /> */}
        </div>

        <p className="text-center text-3xl mb-10 mt-5">NERDTECA PORTAL</p>

        <div className="w-full flex flex-col h-4/6 items-center gap-4">
          <div className=" w-[300px] pl-6">
          <div className="flex flex-row gap-2">
                  <p className="">Ingrese su email</p>
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
          <div className=" w-[300px] pl-6">
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
          <div className=" text-sm ">
            <Link href="/login/forgotPassword" legacyBehavior>
              <a className="underline">¿Olvidó su contraseña?</a>
            </Link>
          </div>
          <button className="w-40 h-8 text-white bg-[#113877] rounded-md   ">Ingresar</button>

          <div className="w-full text-sm mt-5 block md:hidden">
            <div className="flex flex-row justify-between">
              <p className="underline">¿Aún no tiene cuenta?</p>
              <Link href="/signUp" legacyBehavior>
                <a className="w-[130px] h-[20px] text-center text-white bg-[#113877] rounded-md text-sm">
                  Registrarme
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default UseLogin;