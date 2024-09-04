import { useState, useCallback } from 'react';
import api from '../services/api';
import { IErrorCallAPI } from '../types/IErrorCallAPI';

interface ApiResponse<T> {
  data: T | null;
  error: IErrorCallAPI | null;
  loading: boolean;
}

export function useApi<T>() {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const request = useCallback(async (method: string, url: string, data?: any) => {
    setState({ data: null, error: null, loading: true });
    try {
      const response = await api[method](url, data);
      setState({ data: response.data, error: null, loading: false });
      return response.data;
    } catch (error) {
      setState({ data: null, error: error as Error, loading: false });
      throw error;
    }
  }, []);

  return { ...state, request };
}