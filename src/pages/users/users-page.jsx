import { useEffect, useState } from 'react';
import styles from './users-page.module.css';
import { API } from '../../shared/api/axios';
import { STATUS_LABELS } from '../../shared/constants';
import { useSortHook } from './custom-hooks/useSortHook';
import toast from 'react-hot-toast';
import { AddUserModal } from './ui/add-user-modal/add-user-modal';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUsersData = async () => {
      const response = await API.get('/users');
      setUsers(response.data);
    };

    const getGroupsData = async () => {
      const response = await API.get('/groups');
      setGroups(response.data);
    };

    getUsersData();
    getGroupsData();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchLower = searchValue.toLowerCase();

    return (
      user.fullName.toLowerCase().includes(searchLower) ||
      user.username.toLowerCase().includes(searchLower)
    );
  });

  const { sortedItems: sortedUsers, sortField, sortOrder, handleSort } = useSortHook(filteredUsers);

  const handleDeleteUser = async (userId) => {
    const username = users.find((user) => user.id === userId)?.username;
    const preparedUsers = users.filter((user) => user.id !== userId);

    try {
      await API.delete(`/users/${userId}`);
      setUsers(preparedUsers);
      toast.success(`Пользователь ${username} удалён`);
    } catch (err) {
      toast.error(`Не удалось удалить пользователя ${username}`);
      console.error(err);
    }
  };

  const handleAddUser = async (payload) => {
    try {
      const response = await API.post('/users', payload);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      toast.success(`Пользователь ${payload.username} добавлен`);
    } catch (err) {
      toast.error(`Не удалось добавить пользователя ${payload.username}`);
      console.error(err);
    }
  };

  return (
    <section className={styles.usersSection}>
      <div className={styles.wrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Искать по имени или юзернейму..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="button" className={styles.btn} onClick={() => setIsModalOpen(true)}>
          +
        </button>
      </div>
      {isModalOpen && (
        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          groups={groups}
          onAddUser={handleAddUser}
        />
      )}
      <div className={styles.tableWrapper}>
        <table className={styles.workersTable}>
          <thead>
            <tr className={styles.workersTr}>
              <th className={styles.workerTh} onClick={() => handleSort('fullName')}>
                Full Name {sortField === 'fullName' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className={styles.workerTh} onClick={() => handleSort('username')}>
                Username {sortField === 'username' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className={styles.workerTh} onClick={() => handleSort('email')}>
                E-mail {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className={styles.workerTh} onClick={() => handleSort('groupId')}>
                Group {sortField === 'groupId' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className={styles.workerTh} onClick={() => handleSort('status')}>
                Status {sortField === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className={styles.workerTh}></th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr className={styles.workersTrData} key={user.id}>
                <td className={styles.workerTd}>{user.fullName}</td>
                <td className={styles.workerTd}>{user.username}</td>
                <td className={styles.workerTd}>{user.email}</td>
                <td className={styles.workerTd}>
                  {groups.find((group) => Number(group.id) === user.groupId)?.name || 'Без группы'}
                </td>
                <td className={styles.workerTd}>{STATUS_LABELS[user.status]}</td>
                <td className={styles.workerTd}>
                  <button className={styles.workerBtn} onClick={() => handleDeleteUser(user.id)}>
                    ✖
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedUsers.length === 0 && (
        <div className={styles.noData}>По вашему запросу ничего не найдено</div>
      )}
    </section>
  );
};
