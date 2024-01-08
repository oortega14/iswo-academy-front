import { useUIStore } from '@/store/ui/ui-store';
import { Course } from '@/types/sidebar';
import { useEffect, useState } from 'react';

type CallbackFunction = (loading: boolean) => void;

const useGetCourses = (academyId: string, setLoadingCallback: CallbackFunction) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true); // Indicar inicio de carga

        const request = await fetch(`${baseUrl}/courses?academy_id=${academyId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setCourses(response);
        } else {
          // Si la solicitud no es exitosa, puedes manejar el error según tus necesidades
          console.error('Error al obtener cursos:', response);
        }
      } catch (error) {
        // Si hay un error en la solicitud, puedes manejarlo aquí
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false); // Indicar fin de carga
      }
    };

    if (academyId) {
      getCourses();
    }
  }, [academyId, baseUrl, setLoadingCallback]);

  return courses;
};

export default useGetCourses;
