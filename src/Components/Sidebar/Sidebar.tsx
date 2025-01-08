/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SIDENAV_ITEMS } from '../../styles/constants';
import { SideNavItem } from '../../styles/types';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  rol: string; // Agrega aquí cualquier otra propiedad específica que tengas en tu JWT
}

const UseSideBar = () => {

  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
        const token = localStorage.getItem("authToken");
  
        if (token) {
          try {
            const decodedToken = jwtDecode<CustomJwtPayload>(token); 
            setUserRole(decodedToken.rol);
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        }
    }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    router.push('/login');
  }

  const filterMenuItems = (item: SideNavItem) => {
    if (item.title === 'Recursos' && userRole !== 'Admin') {
      return false; // Oculta 'Recursos' si el rol no es 'Admin'
    }
    return true; // Muestra el item si no hay restricciones
  };
  
  const filterSubMenuItems = (subMenuItems: SideNavItem[] = []) => {
    return subMenuItems.filter(subItem => {
      // Aquí puedes definir la lógica para mostrar u ocultar elementos
      if (subItem.title === 'Perfiles' && userRole !== 'Admin') {
        return false; // Oculta 'Perfiles' si el rol no es 'Admin'
      }
      return true; // Muestra el subitem si no hay restricciones
    });
  };


  return (
    <div className="md:w-64 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className='flex flex-col space-y-6 w-full '>
        <div className="flex flex-col space-y-6 w-full">
          <Link
            href="/inicio"
            className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl hidden md:flex">NERDTECA</span>
          </Link>

          <div className="flex flex-col space-y-2 md:px-3 w-full ">
          {SIDENAV_ITEMS.filter(filterMenuItems).map((item, idx) => {
            if (item.submenu) {
              return (
                <MenuItem key={idx} item={{ ...item, subMenuItems: filterSubMenuItems(item.subMenuItems) }} />
              );
            }
            return <MenuItem key={idx} item={item} />;
          })}
          </div>
        </div>
        <div className='flex justify-center'>
          <button onClick={handleLogout} className='bg-[#ff5232] rounded-md w-[200px]'>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default UseSideBar;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? 'bg-zinc-100' : ''
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="text-lg flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? 'font-bold' : ''
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? 'bg-zinc-100' : ''
          }`}
        >
          {item.icon}
          <span className=" text-lg flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};