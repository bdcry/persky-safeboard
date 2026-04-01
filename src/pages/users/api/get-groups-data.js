import { api } from "../../../shared/api/axios";


export const getGroupsData = async () => {
  const response = await api.get('/groups');
  return response.data;
};
