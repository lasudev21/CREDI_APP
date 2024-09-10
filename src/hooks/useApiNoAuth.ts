import { useState, useCallback } from 'react';
import { IErrorCallAPI } from '../types/IErrorCallAPI';
import apiNoAuth from '../services/apiNoAuth';

interface ApiResponse<T> {
  data: T | null;
  error: IErrorCallAPI | null;
  loading: boolean;
}

export function useApiNoAuth<T>() {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const request = useCallback(async (method: string, url: string, data?: any) => {
    setState({ data: null, error: null, loading: true });
    console.log(url)
    try {
      const response = await apiNoAuth[method](url, data);
      setState({ data: response.data, error: null, loading: false });
      return response.data;
    } catch (error) {
      setState({ data: null, error: error as Error, loading: false });
      throw error;
    }
  }, []);

  return { ...state, request };
}