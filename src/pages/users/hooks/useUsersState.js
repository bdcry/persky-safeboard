import toast from 'react-hot-toast';
import { deleteUser } from '../api/delete-user';
import { addUser } from '../api/add-user';
import { useState } from 'react';

export const useUsersState = () => {
  const [users, setUsers] = useState([]);
  const handleDeleteUser = async (userId) => {
    const username = users.find((user) => user.id === userId)?.username;

    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success(`Пользователь ${username} удалён`);
    } catch (err) {
      toast.error(`Не удалось удалить пользователя ${username}`);
      console.error('Error deleting user:', err);
    }
  };

  const handleAddUser = async (payload) => {
    try {
      const newUserData = await addUser(payload);
      setUsers((prevUsers) => [...prevUsers, newUserData]);
      toast.success(`Пользователь ${payload.username} добавлен`);
    } catch (err) {
      toast.error(`Не удалось добавить пользователя ${payload.username}`);
      console.error('Error adding user:', err);
    }
  };

  return {
    users,
    setUsers,
    handleDeleteUser,
    handleAddUser,
  };
};
