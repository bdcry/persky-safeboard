import { Route, Routes } from 'react-router-dom';
import { Layout } from './router/router';
import { Home } from '../pages/home/home';
import { UsersPage } from '../pages/users/users-page';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/groups" element={<div>Groups</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
