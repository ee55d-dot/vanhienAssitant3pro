import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { Page } from './types';
import { DashboardContent } from './components/DashboardContent';
import AnimatedBackground from './components/AnimatedBackground';

const useDarkMode = (): [boolean, () => void] => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return [isDarkMode, toggleDarkMode];
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.PersonalInfo);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const handlePageChange = (page: Page) => {
    // On mobile, clicking a nav link should always close the sidebar
    if (isSidebarOpen) {
        setSidebarOpen(false);
    }
    
    // Only trigger page change if the page is different
    if (page !== activePage) {
        setActivePage(page);
    }
  };

  return (
    <div className={`min-h-screen w-full bg-transparent text-slate-800 dark:text-slate-200 transition-colors duration-300`}>
      <AnimatedBackground />
      <div className="flex">
        <Sidebar 
            activePage={activePage} 
            setActivePage={handlePageChange} 
            isSidebarOpen={isSidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
        />
        <main className="flex-1 transition-all duration-300 md:ml-[250px]">
          <TopBar 
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode} 
          />
          <div className="p-4 md:p-8">
             <AnimatePresence mode="wait">
                <DashboardContent key={activePage} activePage={activePage} />
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;