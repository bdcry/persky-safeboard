import { api } from "../../../shared/api/axios";


export const deleteUser = async (userId) => {
  await api.delete(`/users/${userId}`);
}