import { MenuItem } from "./menu";

export const menuItem: MenuItem[] = [
  {
    icon: 'public',
    label: 'Dashboard',
    route: '/dashboard',
  },
  {
    icon: 'video_label',
    label: 'Monitoreo plantas',
    route: 'dashboard',
  },
  {
    icon: 'sensors',
    label: 'Monitoreo sensores',
    route: '/sensors',
  },
  {
    icon: 'recycling',
    label: 'Historico plantas',
    route: 'dashboard',
  },
  {
    icon: 'logout',
    label: 'Cerrar sesion',
    route: '/home',
  }
]