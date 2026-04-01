import { api } from "../../../shared/api/axios";


export const getUsersData = async () => {
  const response = await api.get('/users');
  return response.data;
};
