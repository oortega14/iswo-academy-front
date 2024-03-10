import { useUIStore } from '@/store/ui/ui-store';
import { GetLearningRouteProps }  from '@/types/hooks';
import { LearningRoute } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetLearningRoute = ({learningRouteId, setLoadingCallback, changeFlag}: GetLearningRouteProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [learningRoute, setLearningRoute] = useState<LearningRoute>();

  useEffect(() => {
    const getLearningRoute = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/learning_routes/${learningRouteId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setLearningRoute(response);
        } else {
          console.error('Error al obtener la ruta de aprendizaje:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };

    if (learningRouteId !== '0') {
      getLearningRoute();
    }
  }, [learningRouteId, changeFlag]);

  return learningRoute;
};

export default useGetLearningRoute;
