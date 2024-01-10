import { useUIStore } from '@/store/ui/ui-store';
import { GetCourseProps } from '@/types/hooks';
import { Course } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetCourse = ({courseId, setLoadingCallback}: GetCourseProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [course, setCourse] = useState<Course[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/courses/${courseId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setCourse(response);
        } else {
          console.error('Error al obtener cursos:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };

    if (courseId) {
      getCourses();
    }
  }, [courseId, setLoadingCallback]);

  return course;
};

export default useGetCourse;
