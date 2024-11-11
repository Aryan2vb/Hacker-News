import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true; // default to dark mode if no saved setting
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    console.log('Dark mode is', darkMode); // Check if this is being logged correctly
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Sync user data with localStorage whenever it changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const login = async (email: string, password: string) => {
    // Simulate login action (replace with actual API)
    setUser({
      name: email.split('@')[0], // Example name based on email
      email
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate registration action (replace with actual API)
    setUser({ name, email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
      <AppContext.Provider value={{
        darkMode,
        toggleDarkMode,
        user,
        login,
        register,
        logout
      }}>
        {children}
      </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}