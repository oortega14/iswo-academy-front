import { useUIStore } from '@/store/ui/ui-store';
import { GetCourseProps } from '@/types/hooks';
import { Course } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetCourseLearningRoute = ({courseId, setLoadingCallback}: GetCourseProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [course, setCourse] = useState<Course[]>();

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/course_learning_routes?course_id=${courseId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setCourse(response);
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

  return course;
};

export default useGetCourseLearningRoute;
