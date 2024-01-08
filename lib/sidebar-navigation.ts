export const buildRoute = (category: string, subcategory: string, id: string) => {
  const normalizedCategory = category.toLowerCase();
  const normalizedSubcategory = subcategory.toLowerCase();

  switch (normalizedCategory) {
    case 'dashboard':
      switch (normalizedSubcategory) {
        case 'inicio':
          return `/academies/${id}/dashboard`;
        case 'mensajes':
          return `/academies/${id}/dashboard/messages`;
      }
    case 'backoffice':
      switch (normalizedSubcategory) {
        case 'inicio':
          return `/academies/${id}/back-office`;
        case 'mensajes':
          return `/academies/${id}/back-office/messages`;
      }
    case 'cursos':
      switch (normalizedSubcategory) {
        case 'inicio':
          return `/academies/${id}/courses`;
        case 'mensajes':
          return `/academies/${id}/courses/messages`;
      }
    default:
      return '/';
  }
};

export default buildRoute
