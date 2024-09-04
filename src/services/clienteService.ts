import { ManageErrors } from '../utils/ErrorUtils';
import api from './api';

export const getClientes = async () => {
  try {
    const response = await api.get('clientes');
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};
