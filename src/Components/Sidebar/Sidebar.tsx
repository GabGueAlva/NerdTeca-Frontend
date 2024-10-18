'use client';

// import React, { useEffect, useState } from 'react';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// import { SIDENAV_ITEMS } from '../../styles/constants';
// import { SideNavItem } from '../../styles/types';
// import { Icon } from '@iconify/react';
// import { useRouter } from 'next/navigation';
// import { jwtDecode,  } from "jwt-decode";


// interface TokenPayload {
//   pef_id_fk: number;
// }

// const getUserProfileFromToken = (token: string): number | null => {
//   try {
//     const decoded: TokenPayload = jwtDecode(token);
//     return decoded.pef_id_fk || null;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };

// const UseSideBar = () => {
//   const router = useRouter();
//   const [userProfile, setUserProfile] = useState<number | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken'); // O como estés manejando el token
//     if (token) {
//       const profile = getUserProfileFromToken(token);
//       setUserProfile(profile);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     router.push('/login');
//   };

//   // Función para filtrar los items del menú según el perfil del usuario
//   const filterSideNavItems = (items: typeof SIDENAV_ITEMS, profile: number | null) => {
//     return items.filter(item => {
//       if (item.title === 'Clientes gestores' && profile !== 1) {
//         return false;
//       }
//       if (item.title === 'Clientes' && profile !== 2) {
//         return false;
//       }
//       return true;
//     }).map(item => ({
//       ...item,
//       subMenuItems: item.subMenuItems?.filter(subItem => {
//         if (item.title === 'Clientes gestores' && profile !== 1) {
//           return false;
//         }
//         if (item.title === 'Clientes' &&  profile !== 2) {
//           return false;
//         }
//         return true;
//       }) || []
//     }));
//   };

//   const filteredItems = filterSideNavItems(SIDENAV_ITEMS, userProfile);

//   return (
//     <div className="md:w-64 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
//       <div className='flex flex-col space-y-6 w-full'>
//         <div className="flex flex-col space-y-6 w-full">
//           <Link
//             href="/inicio"
//             className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
//           >
//             <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
//             <span className="font-bold text-xl hidden md:flex">IDARA</span>
//           </Link>

//           <div className="flex flex-col space-y-2 md:px-3 w-full">
//             {filteredItems.map((item, idx) => (
//               <MenuItem key={idx} item={item} />
//             ))}
//           </div>
//         </div>
//         <div className='flex justify-center'>
//           <button onClick={handleLogout} className='bg-[#ff5232] rounded-md w-[200px]'>Cerrar sesión</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UseSideBar;

// const MenuItem = ({ item }: { item: SideNavItem }) => {
//   const pathname = usePathname();
//   const [subMenuOpen, setSubMenuOpen] = useState(false);
//   const toggleSubMenu = () => {
//     setSubMenuOpen(!subMenuOpen);
//   };

//   return (
//     <div className="">
//       {item.submenu ? (
//         <>
//           <button
//             onClick={toggleSubMenu}
//             className={`flex flex-row items-center p-2 rounded-lg w-full justify-between hover:bg-zinc-100 ${
//               pathname.includes(item.path) ? 'bg-zinc-100' : ''
//             }`}
//           >
//             <div className="flex flex-row space-x-4 items-center">
//               {item.icon}
//               <span className="text-lg flex">{item.title}</span>
//             </div>

//             <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
//               <Icon icon="lucide:chevron-down" width="24" height="24" />
//             </div>
//           </button>

//           {subMenuOpen && (
//             <div className="my-2 ml-12 flex flex-col space-y-4">
//               {item.subMenuItems?.map((subItem, idx) => (
//                 <Link
//                   key={idx}
//                   href={subItem.path}
//                   className={`${
//                     subItem.path === pathname ? 'font-bold' : ''
//                   }`}
//                 >
//                   <span>{subItem.title}</span>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </>
//       ) : (
//         <Link
//           href={item.path}
//           className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
//             item.path === pathname ? 'bg-zinc-100' : ''
//           }`}
//         >
//           {item.icon}
//           <span className=" text-lg flex">{item.title}</span>
//         </Link>
//       )}
//     </div>
//   );
// };