import { SidebarLink } from "@/types/sidebar";
import { IconRoute } from "@tabler/icons-react";
import { IconCamera, IconCertificate, IconFileSpreadsheet, IconSettings, IconSettings2, IconTrash, IconUser } from "@tabler/icons-react";
import { IconAddressBook, IconClock, IconLayoutDashboard } from "@tabler/icons-react";

//MimeTypes

export const IMAGEMIMETYPE = /image\/(jpg|png|)/i;

// NAVBAR
export const SUPER_ADMIN_SIDEBAR_LINKS: SidebarLink[] = [
  {
    category_key: 'superadmin-back-office',
    label: 'BackOffice',
    icon: IconClock,
    links: [
      { subcategory_key: 'home', label: 'Resumen' },
      { subcategory_key: 'courses', label: 'Cursos' },
      { subcategory_key: 'learning-routes', label: 'Rutas de aprendizaje' },
      { subcategory_key: 'academies', label: 'Academias' }
    ]
  }
];

export const ADMIN_SIDEBAR_LINKS: SidebarLink[] = [
  {
    category_key: 'admin-dashboard',
    label: 'Dashboard',
    icon: IconLayoutDashboard,
    links: [
      { subcategory_key: 'home', label: 'Resumen' },
      { subcategory_key: 'learning-routes', label: 'Rutas de Aprendizaje' },
      { subcategory_key: 'messages', label: 'Mensajes' }
    ]
  },
  {
    category_key: 'admin-get-learning-routes',
    label: 'Rutas de aprendizaje',
    icon: IconRoute,
    links: [
      { subcategory_key: 'content', label: 'Contenido' },
    ]
  },
  {
    category_key: 'admin-get-courses',
    label: 'Cursos',
    icon: IconFileSpreadsheet,
    links: [
      { subcategory_key: 'content', label: 'Contenido' },
      { subcategory_key: 'new-course', label: 'Crear Curso' },
    ]
  },
  {
    category_key: 'admin-configure',
    label: 'Configuración',
    icon: IconSettings,
    links: [
      { subcategory_key: 'configure-academy', label: 'Configurar academia' }
    ]
  },
  {
    category_key: 'admin-help',
    label: 'Contáctanos',
    icon: IconAddressBook,
    links: [
      { subcategory_key: 'home', label: 'Nuestro contacto' }
    ]
  }
];

export const TEACHER_SIDEBAR_LINKS: SidebarLink[] = [
  {
    category_key: 'teacher-courses',
    label: 'Mis Cursos',
    icon: IconFileSpreadsheet,
    links: [
      { subcategory_key: 'home', label: 'Inicio' },
      { subcategory_key: 'messages', label: 'Mensajes' }
    ]
  },
  {
    category_key: 'teacher-help',
    label: 'ContactUs',
    icon: IconAddressBook,
    links: [
      { subcategory_key: 'home', label: 'Inicio' },
      { subcategory_key: 'messages', label: 'Mensajes' }
    ]
  }
];

export const STUDENT_SIDEBAR_LINKS: SidebarLink[] = [
  {
    category_key: 'student-courses',
    label: 'Cursos',
    icon: IconFileSpreadsheet,
    links: [
      { subcategory_key: 'home', label: 'Resumen' },
      { subcategory_key: 'in_progress_courses', label: 'Cursos en progreso' },
      { subcategory_key: 'ended_courses', label: 'Cursos finalizados' },
      { subcategory_key: 'acquired_courses', label: 'Cursos de Interes' }
    ]
  },
  {
    category_key: 'student-certificates',
    label: 'Certificados',
    icon: IconCertificate,
    links: [
      { subcategory_key: 'home', label: 'Tus certificados' },
    ]
  },
  {
    category_key: 'student-help',
    label: 'Contáctanos',
    icon: IconAddressBook,
    links: [
      { subcategory_key: 'home', label: 'Nuestro contacto' }
    ]
  }
];

export const PROFILE_SIDEBAR_LINKS: SidebarLink[] = [
  {
    category_key: 'profile-info',
    label: 'Información',
    icon: IconFileSpreadsheet,
    links: [
      { subcategory_key: 'home', label: 'Editar Información' }
    ]
  },
  {
    category_key: 'profile-photo',
    label: 'Fotografía',
    icon: IconCamera,
    links: [
      { subcategory_key: 'home', label: 'Editar Fotografía' }
    ]
  },
  {
    category_key: 'profile-account',
    label: 'Cuenta',
    icon: IconUser,
    links: [
      { subcategory_key: 'home', label: 'Editar Cuenta' }
    ]
  },
  {
    category_key: 'profile-erase',
    label: 'Eliminar Cuenta',
    icon: IconTrash,
    links: [
      { subcategory_key: 'home', label: 'Eliminar Cuenta' }
    ]
  },
];
