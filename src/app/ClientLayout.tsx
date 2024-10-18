"use client"; // Este componente será del cliente

import { usePathname } from "next/navigation";
import UseHeader from "@/Components/Header/Header";
// import HeaderMobile from "@/Components/Header/HeaderMobile";
// import UseSideBar from "../Components/Sidebar/Sidebar";
import PageWrapper from "../Components/Pagewrap/Wrapper";
import MarginWidthWrapper from "../Components/Pagewrap/MarginWrapper";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // Hook para obtener la ruta actual

  // Verifica si es la página de login o signup
  const isAuthPage = pathname === "/login" || pathname === "/signUp" || pathname === "/login/forgotPassword" || pathname === "/login/resetPassword";

  if (isAuthPage) {
    // Para las páginas de login y signup, no se muestran ni el header ni el sidebar, y se usa una estructura diferente
    return <>{children}</>;
  }

  // Estructura estándar para otras páginas
  return (
    <div className="flex">
      {/* <UseSideBar /> */}
      <main className="flex-1">
        <MarginWidthWrapper>
          <UseHeader />
          {/* <HeaderMobile /> */}
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
};

export default ClientWrapper;