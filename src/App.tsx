import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AllNews } from './pages/AllNews';
import { Popular } from './pages/Popular';
import { Ask } from './pages/Ask';
import { Show } from './pages/Show';
import { Jobs } from './pages/Jobs';
import { Community } from './pages/Community';
import { Legal } from './pages/Legal';
import { Security } from './pages/Security';
import { FAQ } from './pages/FAQ';
import { Login } from './pages/Login';
import { useAuthStore } from './stores/authStore';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/news" replace />} />
          <Route path="news" element={<AllNews /> } />
          <Route path="popular" element={<Popular />} />
          <Route path="ask" element={<Ask />} />
          <Route path="show" element={<Show />} />
          <Route path="jobs" element={<Jobs />} />
          <Route 
            path="community" 
            element={
              isAuthenticated ? <Community /> : <Navigate to="/login" replace />
            } 
          />
          <Route path="legal" element={<Legal />} />
          <Route path="security" element={<Security />} />
          <Route path="faq" element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;