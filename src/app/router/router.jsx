import { Outlet } from 'react-router-dom';
import { Navigation } from '../../components/ui/navigation/navigation';
import styles from './router.module.css';

export const Layout = () => {
  return (
    <div className={styles['app-layout']}>
      <Navigation />
      <main className={styles['app-main']}>
        <Outlet />
      </main>
    </div>
  );
};
