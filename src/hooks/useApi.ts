import apiService, { ApiResponse } from '@/services/api-service';
import { useState, useCallback } from 'react';

interface UseApiOptions {
  onSuccess?: <T>(data: T) => void;
  onError?: (error: string) => void;
}

export function useApi<T>(endpoint: string, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Función para manejar la respuesta de la API
  const handleResponse = useCallback(<R>(response: ApiResponse<R>, setter?: (data: R) => void) => {
    if (response.success && response.data) {
      if (setter) {
        setter(response.data);
      }
      if (options.onSuccess) {
        options.onSuccess(response.data);
      }
      return response.data;
    } else {
      const errorMessage = response.error || 'Error desconocido';
      setError(errorMessage);
      if (options.onError) {
        options.onError(errorMessage);
      }
      return null;
    }
  }, [options]);

  // Métodos CRUD
  const getAll = useCallback(async (): Promise<T[] | null> => {
    setLoading(true);
    try {
      const response = await apiService.getAll<T>(endpoint);
      const result = handleResponse<T[]>(response, setData as (data: T[]) => void);
      return result;
    } finally {
      setLoading(false);
    }
  }, [endpoint, handleResponse]);

  const getById = useCallback(async (id: string): Promise<T | null> => {
    setLoading(true);
    try {
      const response = await apiService.getById<T>(endpoint, id);
      const result = handleResponse<T>(response, setData);
      return result;
    } finally {
      setLoading(false);
    }
  }, [endpoint, handleResponse]);

  const create = useCallback(async <B = Partial<T>>(newData: B): Promise<T | null> => {
    setLoading(true);
    try {
      const response = await apiService.create<T, B>(endpoint, newData);
      return handleResponse<T>(response);
    } finally {
      setLoading(false);
    }
  }, [endpoint, handleResponse]);

  const update = useCallback(async <B = Partial<T>>(id: string, updateData: B): Promise<T | null> => {
    setLoading(true);
    try {
      const response = await apiService.update<T, B>(endpoint, id, updateData);
      return handleResponse<T>(response);
    } finally {
      setLoading(false);
    }
  }, [endpoint, handleResponse]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await apiService.delete<T>(endpoint, id);
      return response.success;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return {
    data,
    error,
    loading,
    getAll,
    getById,
    create,
    update,
    remove,
    setData,
    setError
  };
} 