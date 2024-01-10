import { useUIStore } from '@/store/ui/ui-store';
import { Question } from '@/types/courses';
import { GetQuestionProps } from '@/types/hooks';
import { useEffect, useState } from 'react';

const useGetQuestion = ({questionId, setLoadingCallback}: GetQuestionProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [lesson, setLesson] = useState<Question>();

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/test_questions/${questionId}`, {
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

    if (questionId) {
      getCourses();
    }
  }, [questionId, setLoadingCallback]);

  return lesson;
};

export default useGetQuestion;
