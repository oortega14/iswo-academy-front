import { GetCurrentUserProps } from '@/types/hooks';
import { User } from '@/types/store';
import { useEffect, useState } from 'react';

const useGetCurrentUser = ({baseUrl, setLoadingCallback}: GetCurrentUserProps) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const request = await fetch(`${baseUrl}/users/current_user_info`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await request.json();
        if (request.status === 200) {
          setUser(response);
        } else {
          console.error('Error al obtener cursos:', response);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoadingCallback(false);
      }
    };


      getCurrentUser();

  }, [baseUrl]);

  return user;
};

export default useGetCurrentUser;
