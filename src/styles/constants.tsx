import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Inicio',
    path: '/inicio',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Recursos',
    path: '/recursos',
    icon: <Icon icon="lucide:monitor-smartphone" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Gestionar recursos', path: '/Recursos' },
    ],
  },
  {
    title: 'Reservas',
    path: '/reservas',
    icon: <Icon icon="lucide:calendar-clock" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Gestionar reservas', path: '/reservas/GestionarReservas' },
      { title: 'Mis reservas', path: '/reservas/MisReservas'},
    ],
  },
  {
    title: 'Configuración',
    path: '/configuracion',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Cuenta', path: '/configure/account' },
      { title: 'Perfiles', path: '/configure/perfiles'},
    ],
  },
  {
    title: 'Ayuda',
    path: '/help',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];