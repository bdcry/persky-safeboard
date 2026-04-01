import { STATUS_LABELS } from '../../../../shared/constants';
import styles from './users-table.module.css';

export const UsersTable = ({
  users,
  groups,
  handleSort,
  sortField,
  sortOrder,
  handleDeleteUser,
}) => {
  return (
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
        {users.map((user) => (
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
  );
};
