import { useUIStore } from '@/store/ui/ui-store';
import { GetCoursesInformationProps }  from '@/types/hooks';
import { Course } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetCoursesInformation = ({userId, status, setLoadingCallback}: GetCoursesInformationProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [coursesInformation, setCoursesInformation] = useState<Course[]>([]);

  useEffect(() => {
    const getCoursesInformation = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/courses/${userId}/user_courses?status=${status}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setCoursesInformation(response.results);
        } else {
          console.error('Error al obtener cursos:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };

    if (userId) {
      getCoursesInformation();
    }
  }, [userId]);

  return coursesInformation;
};

export default useGetCoursesInformation;
