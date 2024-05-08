import { useUIStore } from '@/store/ui/ui-store';
import { getAcademyProps } from '@/types/hooks';
import { Academy } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetAcademy = ({academyId, setLoadingCallback}: getAcademyProps ) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [academy, setAcademy] = useState<Academy>();

  useEffect(() => {
    const getAcademy = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/academies/${academyId}`,{
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();
        if (request.status === 200) {
          setAcademy(response);
        } else {
          console.error('Error al obtener academia:', response);
        }
      } catch (e) {
        console.error('Error de red:', e);
      } finally {
        setLoadingCallback(false);
      }
    }
    if (!!academyId) {
      getAcademy();
    }
  }, [academyId]);

  return academy
};

export { useGetAcademy };
