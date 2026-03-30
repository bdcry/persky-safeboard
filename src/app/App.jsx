import { Route, Routes } from 'react-router-dom';
import { Layout } from './router/router';
import { Home } from '../pages/home/home';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<div>Users</div>} />
          <Route path="/groups" element={<div>Groups</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
