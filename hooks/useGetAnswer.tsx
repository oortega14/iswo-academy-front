import { useUIStore } from '@/store/ui/ui-store';
import { Answer } from '@/types/courses';
import { GetAnswerProps } from '@/types/hooks';
import { useEffect, useState } from 'react';

const useGetAnswer = ({answerId, setLoadingCallback}: GetAnswerProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [answer, setAnswer] = useState<Answer>();

  useEffect(() => {
    const getAnswer = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/question_options/${answerId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setAnswer(response);
        } else {
          console.error('Error al obtener cursos:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };

    if (answerId) {
      getAnswer();
    }
  }, [answerId, setLoadingCallback]);

  return answer;
};

export default useGetAnswer;
