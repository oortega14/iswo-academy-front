import { useUIStore } from '@/store/ui/ui-store';
import { Answer, Category, LessonComment, TotalComments } from '@/types/courses';
import { GetLessonCommentsProps } from '@/types/hooks';
import { useEffect, useState } from 'react';

const useGetLessonComments = ({academyId, setLoadingCallback, flag}: GetLessonCommentsProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const initialCommentsState: TotalComments = {
    comments_solved: [],
    comments_unsolved: [],
    total: 0,
  };
  const [comments, setComments] = useState<TotalComments>(initialCommentsState);

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/lesson_comments?academy_id=${academyId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();
        if (request.status === 200) {
          setComments(response);
        } else {
          console.error('Error al obtener categorias:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };
      getComments();
  }, [setLoadingCallback, flag]);

  return comments;
};

export default useGetLessonComments;
