import { useUIStore } from '@/store/ui/ui-store';
import { GetEvaluationProps } from '@/types/hooks';
import { Evaluation } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetEvaluation = ({evaluationId, setLoadingCallback}: GetEvaluationProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [evaluation, setEvaluation] = useState<Evaluation>();

  useEffect(() => {
    const getEvaluation = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/course_tests/${evaluationId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();
        if (request.status === 200) {
          setEvaluation(response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    }
    if (evaluationId) {
      getEvaluation();
    }
  }, [evaluationId]);

  return evaluation;
};

export default useGetEvaluation;
