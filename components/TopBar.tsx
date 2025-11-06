
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell, Sun, Moon } from 'lucide-react';

interface TopBarProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-20 h-[60px] flex items-center justify-between px-4 md:px-8 bg-white/10 dark:bg-slate-900/10 backdrop-blur-lg shadow-soft">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="md:hidden text-slate-600 dark:text-slate-300 mr-4">
          <Menu size={24} />
        </button>
        <div className="hidden md:flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-10 w-10 mr-2">
                <circle cx="50" cy="50" r="48" fill="#fff" className="dark:fill-slate-800"/>
                <path d="M50 10 L 90 90 H 10 Z" fill="#6366F1"/>
            </svg>
            <span className="text-sm font-bold tracking-tight text-slate-700 dark:text-white">TRƯỜNG ĐẠI HỌC VĂN HIẾN</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Language Selector */}
        <div className="flex items-center space-x-1 p-2 rounded-full hover:bg-black/5 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full" viewBox="0 0 36 36"><path fill="#C60C30" d="M0 27h36v9H0z"/><path fill="#FFCC00" d="M0 0h36v27H0z"/><path fill="#DA251D" d="M18 18a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z"/></svg>
            <span className="text-sm font-semibold">Vi</span>
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-black/5">
          <Bell size={20} />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white/10 dark:ring-slate-900/10"></span>
        </button>

        {/* Dark Mode Toggle */}
        <motion.button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-full hover:bg-black/5"
          whileTap={{ scale: 0.9, rotate: 15 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDarkMode ? 'moon' : 'sun'}
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* User Avatar */}
        <img 
          src="https://picsum.photos/id/237/40/40" 
          alt="User Avatar" 
          className="h-10 w-10 rounded-full cursor-pointer" 
        />
      </div>
    </header>
  );
};

export default TopBar;
