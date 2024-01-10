import { useUIStore } from '@/store/ui/ui-store';
import { Student } from '@/types/courses';
import { GetLessonsProps } from '@/types/hooks';
import { useEffect, useState } from 'react';

const useGetStudents = ({courseId, setLoadingCallback}: GetLessonsProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/students?course_id=${courseId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();
        if (request.status === 200) {
          setStudents(response);
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
  }, [courseId, setLoadingCallback]);

  return students;
};

export default useGetStudents;
