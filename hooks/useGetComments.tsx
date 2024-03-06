import { useUIStore } from '@/store/ui/ui-store';
import { Answer, Category, LessonComment, TotalComments } from '@/types/courses';
import { GetCommentsProps } from '@/types/hooks';
import { useEffect, useState } from 'react';

const useGetComments = ({lessonId, setLoadingCallback, flag}: GetCommentsProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const initialCommentsState: TotalComments = {
    comments: [],
    total: 0,
  };
  const [comments, setComments] = useState<TotalComments>(initialCommentsState);

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/lesson_comments?lesson_id=${lessonId}`, {
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

export default useGetComments;
