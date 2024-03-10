import { useUIStore } from '@/store/ui/ui-store';
import { GetLearningRoutesProps }  from '@/types/hooks';
import { LearningRoute } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetLearningRoutes = ({academyId, setLoadingCallback, changeFlag}: GetLearningRoutesProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [learningRoutes, setLearningRoutes] = useState<LearningRoute[]>([]);

  useEffect(() => {
    const getLearningRoutes = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/learning_routes?academy_id=${academyId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setLearningRoutes(response);
        } else {
          console.error('Error al obtener las rutas de aprendizaje:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };

    if (academyId) {
      getLearningRoutes();
    }
  }, [academyId, changeFlag]);

  return learningRoutes;
};

export default useGetLearningRoutes;
