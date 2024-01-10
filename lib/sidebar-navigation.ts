import { BuildRouteProps } from "@/types/sidebar";

export const buildRoute = ({category , subcategory, id, courseId}: BuildRouteProps) => {
  const normalizedCategory = category.toLowerCase();
  let normalizedSubcategory = subcategory
  if (typeof subcategory === 'string') {
    normalizedSubcategory = subcategory.toLowerCase();
  }

  switch (normalizedCategory) {
    case 'dashboard':
      switch (normalizedSubcategory) {
        case 'inicio':
          return `/academies/${id}/dashboard/main`;
        case 'mensajes':
          return `/academies/${id}/dashboard/messages`;
        case 'icon':
          return `/academies/${id}/dashboard/main`;
      }
    case 'backoffice':
      switch (normalizedSubcategory) {
        case 'inicio':
          return `/academies/${id}/back-office/main`;
        case 'mensajes':
          return `/academies/${id}/back-office/messages`;
        case 'icon':
          return `/academies/${id}/back-office/main`;
      }
    case 'cursos':
      return `/academies/${id}/courses/${subcategory}/content`;
    case 'administrar cursos':
      switch (normalizedSubcategory) {
        case 'contenido':
          return `/academies/${id}/courses/${courseId}/content`;
        case 'estudiantes':
          return `/academies/${id}/courses/${courseId}/students`;
        case 'evaluacion':
          return `/academies/${id}/courses/${courseId}/evaluation`;
        case 'certificado':
          return `/academies/${id}/courses/${courseId}/certificate`;
        case 'icon':
          return `/academies/${id}/courses/${courseId}/content`;
      }
    default:
      return '/';
  }
};

export default buildRoute
