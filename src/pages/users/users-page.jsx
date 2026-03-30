import { useEffect, useState } from 'react';
import styles from './users-page.module.css';
import { API } from '../../shared/api/axios';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

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

  if (users.length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className={styles.usersSection}>
      <div className={styles.wrapper}>
        <input type="text" className={styles.input} placeholder="Искать по имени или роли..." />
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
              <th className={styles.workerTh}>Full Name</th>
              <th className={styles.workerTh}>Username</th>
              <th className={styles.workerTh}>E-mail</th>
              <th className={styles.workerTh}>Group</th>
              <th className={styles.workerTh}>Status</th>
              <th className={styles.workerTh}>{/* тут action delete */}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className={styles.workersTrData} key={user.id}>
                <td className={styles.workerTd}>{user.fullName}</td>
                <td className={styles.workerTd}>{user.username}</td>
                <td className={styles.workerTd}>{user.email}</td>
                <td className={styles.workerTd}>
                  {groups.find((group) => Number(group.id) === user.groupId)?.name || 'Нет данных'}
                </td>
                <td className={styles.workerTd}>{user.status}</td>
                <td className={styles.workerTd}>
                  <button className={styles.workerBtn} onClick={() => console.log('удалить', user.id)}>✖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
