import { useUIStore } from '@/store/ui/ui-store';
import { GetExamProps } from '@/types/hooks';
import { Exam } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetExam = ({evaluationId, userId, setLoadingCallback}: GetExamProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [exam, setExam] = useState<Exam>();

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/exams/find_exam?course_test_id=${evaluationId}&user_id=${userId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setExam(response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };

    if (evaluationId) {
      getCourses();
    }
  }, [evaluationId]);

  return exam;
};

export default useGetExam;
