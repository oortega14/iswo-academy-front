import { useUIStore } from '@/store/ui/ui-store';
import { Answer, Category } from '@/types/courses';
import { GetCategoriesProps } from '@/types/hooks';
import { useEffect, useState } from 'react';

const useGetCategories = ({setLoadingCallback}: GetCategoriesProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/academy_categories`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();
        if (request.status === 200) {
          setCategories(response);
        } else {
          console.error('Error al obtener categorias:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };
      getCategories();
  }, [setLoadingCallback]);

  return categories;
};

export default useGetCategories;
