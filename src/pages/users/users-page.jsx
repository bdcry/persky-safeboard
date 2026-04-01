import { useEffect, useState } from 'react';
import styles from './users-page.module.css';
import { useSortHook } from './hooks/useSortHook';
import { AddUserModal } from './ui/add-user-modal/add-user-modal';
import { getUsersData } from './api/get-users-data';
import { getGroupsData } from './api/get-groups-data';
import { UsersTable } from './ui/users-table/users-table';
import { useUsersState } from './hooks/useUsersState';

export const UsersPage = () => {
  const { users, setUsers, handleDeleteUser, handleAddUser } = useUsersState();
  const [groups, setGroups] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersData = await getUsersData();
      setUsers(usersData);
    };

    const fetchGroupsData = async () => {
      const groupsData = await getGroupsData();
      setGroups(groupsData);
    };

    fetchUsersData();
    fetchGroupsData();
  }, [setUsers]);

  const filteredUsers = users.filter((user) => {
    const searchLower = searchValue.toLowerCase();

    return (
      user.fullName.toLowerCase().includes(searchLower) ||
      user.username.toLowerCase().includes(searchLower)
    );
  });

  const { sortedItems: sortedUsers, sortField, sortOrder, handleSort } = useSortHook(filteredUsers);

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
        <UsersTable
          users={sortedUsers}
          groups={groups}
          handleSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
          handleDeleteUser={handleDeleteUser}
        />
      </div>
      {sortedUsers.length === 0 && (
        <div className={styles.noData}>По вашему запросу ничего не найдено</div>
      )}
    </section>
  );
};
