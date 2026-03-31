import { useEffect, useState } from 'react';
import styles from './users-page.module.css';
import { API } from '../../shared/api/axios';
import { STATUS_LABELS } from '../../shared/constants';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const [sortField, setSortField] = useState('fullName');
  const [sortOrder, setSortOrder] = useState('asc');

  const [searchValue, setSearchValue] = useState('');

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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === 'asc') {
      if (sortField === 'groupId') {
        if (a[sortField] > b[sortField]) return 1;
        if (a[sortField] < b[sortField]) return -1;
        return 0;
      }

      return a[sortField].localeCompare(b[sortField]);
    } else {
      if (sortField === 'groupId') {
        if (a[sortField] < b[sortField]) return 1;
        if (a[sortField] > b[sortField]) return -1;
        return 0;
      }

      return b[sortField].localeCompare(a[sortField]);
    }
  });

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
        <button
          type="button"
          className={styles.btn}
          onClick={() => console.log('ставим показ модалки - true')}
        >
          +
        </button>
      </div>
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
              <th className={styles.workerTh}>{/* тут action delete */}</th>
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
                  <button
                    className={styles.workerBtn}
                    onClick={() => console.log('удалить', user.id)}
                  >
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
