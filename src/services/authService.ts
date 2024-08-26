import api from './api';

export const login = async (username: string, password: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post('account/signin', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    // await api.post('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};