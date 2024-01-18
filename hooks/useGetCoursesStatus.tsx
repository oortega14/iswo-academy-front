import { useUIStore } from '@/store/ui/ui-store';
import { GetCoursesStatusProps }  from '@/types/hooks';
import { CoursesStatus } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetCoursesStatus = ({userId, setLoadingCallback}: GetCoursesStatusProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [coursesStatus, setCoursesStatus] = useState<CoursesStatus>();

  useEffect(() => {
    const getCoursesStatus = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/users/${userId}/courses_information`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setCoursesStatus(response);
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
      getCoursesStatus();
    }
  }, [userId]);

  return coursesStatus;
};

export default useGetCoursesStatus;
