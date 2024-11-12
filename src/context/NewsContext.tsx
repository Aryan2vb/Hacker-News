import React, { createContext, useContext, ReactNode } from 'react';

interface NewsContextType {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = React.useState('all');

  return (
    <NewsContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}