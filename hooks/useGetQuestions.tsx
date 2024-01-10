import { useUIStore } from '@/store/ui/ui-store';
import { Lesson, Question } from '@/types/courses';
import { useEffect, useState } from 'react';
import { GetQuestionsProps } from '@/types/hooks';

const useGetQuestions = ({courseId, setLoadingCallback}: GetQuestionsProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/test_questions?course_id=${courseId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();
        if (request.status === 200) {
          setQuestions(response);
        } else {
          console.error('Error al obtener cursos:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };

    if (!!courseId) {
      getCourses();
    }
  }, [courseId, setLoadingCallback]);

  return questions;
};

export default useGetQuestions;
