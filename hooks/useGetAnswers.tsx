import { useUIStore } from '@/store/ui/ui-store';
import { Answer } from '@/types/courses';
import { GetAnswersProps } from '@/types/hooks';
import { useEffect, useState } from 'react';

const useGetAnswers = ({questionId, setLoadingCallback}: GetAnswersProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const getAnswers = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/question_options?test_question_id=${questionId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setAnswers(response);
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
      getAnswers();
    }
  }, [questionId, setLoadingCallback]);

  return answers;
};

export default useGetAnswers;
