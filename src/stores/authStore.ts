import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (username: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append('acct', username);
      formData.append('pw', password);
      formData.append('goto', 'news');

      const response = await fetch('https://news.ycombinator.com/login', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        set({ isAuthenticated: true, user: username });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));