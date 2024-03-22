import { useUIStore } from '@/store/ui/ui-store';
import { GetBanksProps } from '@/types/hooks';
import { Bank } from '@/types/sidebar';
import { useEffect, useState } from 'react';

const useGetBanks = ({setLoadingCallback}: GetBanksProps) => {
  const baseUrl = useUIStore((state) => state.baseUrl);
  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    const getBanks = async () => {
      try {
        setLoadingCallback(true);
        const request = await fetch(`${baseUrl}/payments/banks`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();

        if (request.status === 200) {
          setBanks(response);
        } else {
          console.error('Error al obtener cursos:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };
      getBanks();
  }, []);

  return banks;
};

export default useGetBanks;
