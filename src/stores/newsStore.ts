import { create } from 'zustand';

interface NewsState {
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 30,
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));