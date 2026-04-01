import { createPortal } from 'react-dom';
import styles from './add-user-modal.module.css';
import { useEffect, useState } from 'react';
import { STATUS_LABELS } from '../../../../shared/constants';
import { API } from '../../../../shared/api/axios';
import toast from 'react-hot-toast';

export const AddUserModal = ({ isOpen, onClose, groups, onAddUser }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    groupId: '',
    status: 'active',
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSumbit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.fullName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      groupId: Number(formData.groupId) || null,
      status: formData.status,
    };

    const response = await API.post('/users', payload);

    if (response.status === 201) {
      onClose();
      onAddUser(response.data);
      toast.success(`Пользователь ${formData.username} добавлен`);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const showStatusOptions = () => {
    return Object.entries(STATUS_LABELS).map(([value, label]) => (
      <option key={value} value={value}>
        {label}
      </option>
    ));
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Добавить пользователя</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </div>
        <div className={styles.modalBody}>
          <form className={styles.form} onSubmit={handleSumbit}>
            <label htmlFor="fullName">Полное имя</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Введите ФИО..."
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />

            <label htmlFor="username">Юзернейм</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Введите юзернейм..."
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Введите email..."
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <label htmlFor="group">Группа</label>
            <select
              id="group"
              name="group"
              value={formData.groupId}
              onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
            >
              <option value="">Без группы</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>

            <label htmlFor="status">Статус</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              {showStatusOptions()}
            </select>

            <button className={styles.formButton} type="submit">
              Добавить
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};
