
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, BarChart2, BookOpen, Bot, Settings, X } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const navItems = [
  { page: Page.PersonalInfo, icon: User },
  { page: Page.LearningResults, icon: BarChart2 },
  { page: Page.Schedule, icon: Calendar },
  { page: Page.CourseRegistration, icon: BookOpen },
  { page: Page.AiAssistant, icon: Bot },
  { page: Page.Settings, icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isSidebarOpen, setSidebarOpen }) => {
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };
  
  const NavLink: React.FC<{item: typeof navItems[0]}> = ({ item }) => {
    const isActive = activePage === item.page;
    return (
        <motion.li
            className="relative"
            whileHover={{ scale: 1.02, x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    setActivePage(item.page);
                }}
                className={`flex items-center p-4 text-base font-semibold rounded-2xl transition-all duration-300 ${
                    isActive
                        ? 'text-white'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
            >
                <item.icon className="mr-4 h-5 w-5" />
                <span>{item.page}</span>
            </a>
            {isActive && (
                <motion.div
                    layoutId="active-nav-glow"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/50 to-purple-500/50 shadow-glow-purple-blue"
                    style={{ borderRadius: '16px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            )}
        </motion.li>
    );
  };

  const SidebarContent = () => (
      <div className="h-full w-full bg-slate-900/50 dark:bg-vhuu-dark/80 backdrop-blur-xl border-r border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-4 h-[60px] border-b border-white/10">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-10 w-10 mr-2">
                <circle cx="50" cy="50" r="48" fill="#fff"/>
                <path d="M50 10 L 90 90 H 10 Z" fill="#6366F1"/>
            </svg>
            <span className="text-sm font-bold text-white tracking-tight">TRƯỜNG ĐẠI HỌC VĂN HIẾN</span>
          </div>
           <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-300 hover:text-white">
                <X size={24} />
           </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => <NavLink key={item.page} item={item} />)}
          </ul>
        </nav>
      </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
                <motion.div
                    className="fixed top-0 left-0 h-full w-[250px] z-50 md:hidden"
                    variants={sidebarVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                >
                    <SidebarContent />
                </motion.div>
            </>
        )}
      </AnimatePresence>
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 h-full w-[250px] z-30">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
