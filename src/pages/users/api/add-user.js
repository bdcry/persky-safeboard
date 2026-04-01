import { api } from "../../../shared/api/axios";


export const addUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
}