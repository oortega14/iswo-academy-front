import { useUIStore } from '@/store/ui/ui-store';
import { GetCoursesProps } from '@/types/hooks';
import { Course } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetCourses = ({academyId, setLoadingCallback}: GetCoursesProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/courses?academy_id=${academyId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setCourses(response);
        } else {
          console.error('Error al obtener cursos:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };

    if (academyId) {
      getCourses();
    }
  }, [academyId, baseUrl, setLoadingCallback]);

  return courses;
};

export default useGetCourses;
