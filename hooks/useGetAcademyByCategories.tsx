import { useUIStore } from '@/store/ui/ui-store';
import { AcademyCategory } from '@/types/academies';
import { GetAcademyByCategoryProps } from '@/types/hooks';
import { Academy } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetAcademyByCategories = ({setLoadingCallback}: GetAcademyByCategoryProps ) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [categories, setCategories] = useState<AcademyCategory[]>([]);

  useEffect(() => {
    const getAcademy = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/academies`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
        const response = await request.json();
        if (request.status === 200) {
          setCategories(response);
        } else {
          console.error('Error al obtener cursos:', response);
        }
      } catch (e) {
        console.error('Error de red:', e);
      } finally {
        setLoadingCallback(false);
      }
    }
      getAcademy();
  }, [baseUrl, setLoadingCallback]);

  return categories
};

export { useGetAcademyByCategories };
