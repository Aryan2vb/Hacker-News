import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NewsList from './components/NewsList';
import { AppProvider } from './context/AppContext';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppProvider>
      <div className="flex flex-col md:flex-row  bg-gray-300 dark:bg-gray-950 dark:text-gray-300 text-navy min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header onSearch={setSearchQuery} />
          <NewsList searchQuery={searchQuery} />
        </div>
      </div>
    </AppProvider>
  );
}