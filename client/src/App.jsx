import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Playlists from './Pages/Playlists';
import Auth from './Pages/Auth';
import Navbar from './components/components/Navbar/Navbar';
import ProtectedRoute from './components/checkLoggedIn';
import LoginLogoutPage from './components/components/Login/Login';
import Artists from './Pages/Artists';
import Notifications from './Pages/Notifications';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>

          <Route path="/Playlists" element={<Playlists />} />
          <Route path='/Artists' element={<Artists />} />
          <Route path='/Notifications' element={<Notifications />} />
        </Route>

        {/* Public route */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<LoginLogoutPage />} />
        {/* Redirect all unknown routes */}
        <Route path="*" element={<Navigate to="/Home" />} />
      </Routes>
    </>
  );
}

export default App;