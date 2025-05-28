import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { UserProfile } from '../pages/UserProfile/UserProfile';

export const AppRouter = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:username" element={<UserProfile />} />
      {/* Future routes: /messages, /settings, etc. */}
    </Routes>
);