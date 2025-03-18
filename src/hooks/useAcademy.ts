import { useApi } from './useApi';
import { Academy } from '@/models/academy-model.ts';
import { useEffect } from 'react';

interface UseAcademyProps {
  academyId?: string;
  fetchOnMount?: boolean;
}

export const useAcademy = ({ academyId, fetchOnMount = false }: UseAcademyProps = {}) => {
  const {
    data: academy,
    error,
    loading,
    getById,
    getAll,
    create,
    update,
    remove,
    setData
  } = useApi<Academy>('/academies');

  useEffect(() => {
    if (academyId && fetchOnMount) {
      getById(academyId);
    }
  }, [academyId, fetchOnMount, getById]);

  return {
    academy,
    error,
    loading,
    getAcademy: getById,
    getAcademies: getAll,
    createAcademy: create,
    updateAcademy: update,
    deleteAcademy: remove,
    setAcademy: setData
  };
}; 