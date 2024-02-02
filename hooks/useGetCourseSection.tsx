import { useUIStore } from '@/store/ui/ui-store';
import { GetCourseSectionProps } from '@/types/hooks';
import { CourseSection } from '@/types/modals';
import { useEffect, useState } from 'react';

const useGetCourseSection = ({sectionId, setLoadingCallback, flag}: GetCourseSectionProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [section, setSection] = useState<CourseSection>();

  useEffect(() => {
    const getSections = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/course_sections/${sectionId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setSection(response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };

    if (sectionId !== '0') {
      getSections();
    }
  }, [sectionId, setLoadingCallback, flag]);

  return section;
};

export default useGetCourseSection;
