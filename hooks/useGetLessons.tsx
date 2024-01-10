import { useUIStore } from '@/store/ui/ui-store';
import { Lesson } from '@/types/courses';
import { useEffect, useState } from 'react';

type CallbackFunction = (loading: boolean) => void;

const useGetLessons = (courseId: string, setLoadingCallback: CallbackFunction) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/lessons?course_id=${courseId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();
        if (request.status === 200) {
          setLessons(response);
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
  }, [courseId, baseUrl, setLoadingCallback]);

  return lessons;
};

export default useGetLessons;
