import { useUIStore } from '@/store/ui/ui-store';
import { GetLessonProps } from '@/types/hooks';
import { Lesson } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetLesson = ({lessonId, setLoadingCallback}: GetLessonProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [lesson, setLesson] = useState<Lesson>();

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/lessons/${lessonId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();
        if (request.status === 200) {
          setLesson(response);
        } else {
          console.error('Error al obtener cursos:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };

    if (lessonId) {
      getCourses();
    }
  }, [lessonId, setLoadingCallback]);

  return lesson;
};

export default useGetLesson;
