import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { UserProfile } from '../pages/UserProfile';

export const AppRouter = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:username" element={<UserProfile />} />
      {/* Future routes: /messages, /settings, etc. */}
    </Routes>
);