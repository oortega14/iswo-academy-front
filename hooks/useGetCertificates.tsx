import { useUIStore } from '@/store/ui/ui-store';
import { Answer, Category } from '@/types/courses';
import { GetCategoriesProps } from '@/types/hooks';
import { Certificate } from '@/types/courses';
import { useEffect, useState } from 'react';

const useGetCertificates = ({setLoadingCallback}: GetCategoriesProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const getCertificates = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/certificates`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();
        if (request.status === 200) {
          setCertificates(response);
        } else {
          console.error('Error al obtener categorias:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };
      getCertificates();
  }, [setLoadingCallback]);

  return certificates;
};

export default useGetCertificates;
