import { SidebarLink } from "@/types/sidebar";
import { IconFileSpreadsheet } from "@tabler/icons-react";
import { IconAddressBook, IconClock, IconLayoutDashboard } from "@tabler/icons-react";

// NAVBAR
export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    href: '/',
    key: 'back-office',
    label: 'BackOffice',
    icon: IconClock,
    links: [
      { subcategory: 'home', label: 'Inicio', route: '/academies/' },
      { subcategory: 'messages', label: 'Mensajes', route: '/academies/' }
    ]
  },
  {
    href: '/',
    key: 'dashboard',
    label: 'Dashboard',
    icon: IconLayoutDashboard,
    links: [
      { subcategory: 'home', label: 'Inicio', route: '/academies/' },
      { subcategory: 'messages', label: 'Mensajes', route: '/academies/' }
    ]
  },
  {
    href: '/',
    key: 'help',
    label: 'ContactUs',
    icon: IconAddressBook,
    links: [
      { subcategory: 'home', label: 'Inicio', route: '/academies/' },
      { subcategory: 'messages', label: 'Mensajes', route: '/academies/' }
    ]
  },
  {
    href: '/',
    key: 'courses',
    label: 'Cursos',
    icon: IconFileSpreadsheet,
    links: [
      { subcategory: 'content', label: 'Contenido', route: '/academies/' },
      { subcategory: 'students', label: 'Estudiantes', route: '/academies/' },
      { subcategory: 'evaluation', label: 'Evaluacion', route: '/academies/' },
      { subcategory: 'certificade', label: 'Certificado', route: '/academies/' },
    ]
  },
];

export const IMAGEMIMETYPE = /image\/(jpg|png|)/i;
