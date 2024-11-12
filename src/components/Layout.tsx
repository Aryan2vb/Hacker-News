import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function Layout() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar darkMode={darkMode} />
      <div className="pl-64"> {/* Add left padding equal to sidebar width */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="pt-20"> {/* Increase top padding to prevent header overlap */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}