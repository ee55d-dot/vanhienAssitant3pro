import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page, AiAssistantType } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { User, CreditCard, Calendar, Book, Building, CaseSensitive, Mail, Send, Bot, Heart, Cog, Lock, BookOpen, X as XIcon } from 'lucide-react';

// Wrapper Component for consistent styling and animation
const DashboardCard: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className = '' }) => (
  <div
    className={`bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-soft card-shimmer ${className}`}
  >
    {children}
  </div>
);

// Personal Info Component
const PersonalInfo: React.FC = () => {
    const infoItems = [
        { icon: User, label: "Họ và tên", value: "VG Văn Quốc Bảo" },
        { icon: CreditCard, label: "Mã sinh viên", value: "231A290036" },
        { icon: Calendar, label: "Ngày sinh", value: "01/01/2005" },
        { icon: User, label: "Lớp", value: "231TMDT1011" },
        { icon: Book, label: "Ngành", value: "Thương mại điện tử" },
        { icon: Building, label: "Khoa", value: "Kinh tế - Quản trị" },
        { icon: CaseSensitive, label: "Giới tính", value: "Nam" },
        { icon: Mail, label: "Email", value: "bao.vq.231a290036@vanhien.edu.vn" },
    ];
    return (
        <DashboardCard>
            <h2 className="text-2xl font-bold mb-6">Thông tin cá nhân</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {infoItems.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center p-4 bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl"
                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    >
                        <item.icon className="h-8 w-8 text-indigo-500 mr-4" />
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                            <p className="font-semibold">{item.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </DashboardCard>
    );
};

// Learning Results Component
const LearningResults: React.FC = () => {
    const barData = [
        { name: 'HK1', GPA: 3.2 }, { name: 'HK2', GPA: 3.5 },
        { name: 'HK3', GPA: 3.1 }, { name: 'HK4', GPA: 3.8 },
    ];
    const pieData = [
        { name: 'A', value: 400 }, { name: 'B', value: 300 },
        { name: 'C', value: 300 }, { name: 'D', value: 200 },
    ];
    const COLORS = ['#6366F1', '#A855F7', '#EC4899', '#F97316'];
    const courses = [
        { name: 'Phát triển ứng dụng Web', score: 8.5, credits: 3 },
        { name: 'Trí tuệ nhân tạo', score: 9.0, credits: 3 },
        { name: 'Quản trị dự án', score: 7.8, credits: 2 },
        { name: 'An ninh mạng', score: 8.2, credits: 3 },
    ];
    return (
        <div className="space-y-8">
            <DashboardCard>
                <h2 className="text-2xl font-bold mb-6">Tổng quan kết quả học tập</h2>
                <div className="space-y-4">
                    <p>Tín chỉ tích lũy: <strong>72/140</strong></p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                        <motion.div 
                            className="bg-gradient-blue-purple h-4 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(72/140)*100}%`}}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            </DashboardCard>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DashboardCard>
                    <h3 className="font-bold mb-4">Điểm trung bình các kỳ</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" stroke="currentColor" />
                            <YAxis stroke="currentColor"/>
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', border: 'none', borderRadius: '1rem' }} />
                            <Legend />
                            <Bar dataKey="GPA" fill="url(#colorUv)" />
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </DashboardCard>
                <DashboardCard>
                    <h3 className="font-bold mb-4">Phân loại điểm</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', border: 'none', borderRadius: '1rem' }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </DashboardCard>
            </div>
             <DashboardCard>
                <h3 className="font-bold mb-4">Chi tiết môn học</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-300 dark:border-slate-700">
                                <th className="p-3">Môn học</th>
                                <th className="p-3">Số tín chỉ</th>
                                <th className="p-3">Điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, i) => (
                                <tr key={i} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                                    <td className="p-3 font-medium">{course.name}</td>
                                    <td className="p-3">{course.credits}</td>
                                    <td className="p-3 font-semibold text-indigo-500">{course.score.toFixed(1)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </DashboardCard>
        </div>
    );
};

// Schedule Component
const Schedule: React.FC = () => {
    const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"];
    const schedule = {
        "Thứ 2": [{ time: "7:30 - 11:30", subject: "Phát triển Web", room: "A.101" }],
        "Thứ 4": [{ time: "13:00 - 17:00", subject: "Trí tuệ nhân tạo", room: "B.203" }],
        "Thứ 6": [{ time: "7:30 - 11:30", subject: "An ninh mạng", room: "C.305" }],
    };
    return (
        <DashboardCard>
            <h2 className="text-2xl font-bold mb-6">Lịch học tuần này</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {days.map(day => (
                    <div key={day} className="bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl p-4">
                        <h3 className="font-bold text-center mb-4">{day}</h3>
                        <div className="space-y-2">
                            {(schedule[day as keyof typeof schedule] || []).map((event, i) => (
                                <motion.div 
                                    key={i} 
                                    className="p-3 bg-gradient-purple-pink text-white rounded-xl shadow-md cursor-pointer"
                                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 15px rgba(0,0,0,0.2)' }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <p className="font-bold text-sm">{event.subject}</p>
                                    <p className="text-xs">{event.time}</p>
                                    <p className="text-xs opacity-80">Phòng: {event.room}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
};

// Course Registration Component
const CourseRegistration: React.FC = () => (
    <DashboardCard>
        <h2 className="text-2xl font-bold mb-6">Đăng ký học phần</h2>
        <form className="space-y-6">
            <div>
                <label className="block mb-2 font-semibold">Chọn học kỳ</label>
                <select className="w-full p-3 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:outline-none">
                    <option>Học kỳ 1 - 2024-2025</option>
                    <option>Học kỳ 2 - 2024-2025</option>
                </select>
            </div>
             <div>
                <label className="block mb-2 font-semibold">Chọn môn học</label>
                <select className="w-full p-3 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:outline-none">
                    <option>Lập trình Python</option>
                    <option>Cơ sở dữ liệu</option>
                    <option>Mạng máy tính</option>
                </select>
            </div>
            <motion.button
                type="submit"
                className="w-full py-3 px-6 font-semibold text-white bg-gradient-blue-purple rounded-2xl shadow-lg"
                whileHover={{ scale: 1.02, y: -2, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.98 }}
            >
                Đăng ký
            </motion.button>
        </form>
    </DashboardCard>
);


// AI Assistant Modal
interface AiChatModalProps {
  assistant: AiAssistantType;
  onClose: () => void;
}
interface Message {
    text: string;
    sender: 'user' | 'ai';
}
const AiChatModal: React.FC<AiChatModalProps> = ({ assistant, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: `Xin chào! Tôi là ${assistant.title}. Tôi có thể giúp gì cho bạn?`, sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleSend = () => {
    if (input.trim() === '') return;
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
        const aiResponse: Message = { text: `Phản hồi cho: "${input}"`, sender: 'ai' };
        setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full max-w-3xl h-[80vh] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={`p-4 flex items-center justify-between text-white ${assistant.gradient}`}>
          <div className="flex items-center">
            <assistant.icon className="mr-3 h-6 w-6" />
            <h3 className="font-bold text-lg">{assistant.title}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
            <XIcon size={20}/>
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'ai' && <div className={`h-8 w-8 rounded-full flex-shrink-0 ${assistant.gradient}`}><assistant.icon className="h-8 w-8 p-1.5 text-white"/></div>}
                    <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-slate-200 dark:bg-slate-700 rounded-bl-none'}`}>
                        <p>{msg.text}</p>
                    </div>
                </div>
            ))}
             <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl p-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Nhập tin nhắn của bạn..."
                    className="flex-1 bg-transparent px-2 focus:outline-none"
                />
                <motion.button 
                    onClick={handleSend}
                    className={`p-2 rounded-xl text-white ${assistant.gradient}`}
                    whileTap={{ scale: 0.95 }}
                >
                    <Send size={20} />
                </motion.button>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


// AI Assistant Component
const AccordionItem: React.FC<{
    item: AiAssistantType;
    isOpen: boolean;
    onClick: () => void;
    onButtonClick: () => void;
}> = ({ item, isOpen, onClick, onButtonClick }) => {
    return (
        <div className={`overflow-hidden rounded-2xl border ${isOpen ? 'border-transparent' : 'border-slate-200 dark:border-slate-700'}`}>
            <motion.div 
                className={`p-4 cursor-pointer flex items-center justify-between ${isOpen ? `${item.gradient} text-white` : 'bg-slate-100/50 dark:bg-slate-900/50'}`}
                onClick={onClick}
            >
                <div className="flex items-center">
                    <item.icon className="h-6 w-6 mr-4"/>
                    <h3 className="font-bold">{item.title}</h3>
                </div>
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="bg-slate-50 dark:bg-slate-800"
                    >
                        <div className="p-6">
                            <p className="mb-4 text-slate-600 dark:text-slate-300">{item.description}</p>
                            <ul className="list-disc list-inside space-y-2 mb-6">
                                {item.features.map((feature, i) => <li key={i}>{feature}</li>)}
                            </ul>
                            <motion.button 
                                onClick={onButtonClick}
                                className={`px-6 py-2 rounded-xl text-white font-semibold shadow-lg ${item.gradient} gradient-sweep`}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {item.buttonText}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AiAssistant: React.FC = () => {
    const assistants: AiAssistantType[] = [
        { id: 'learning', title: "Hỗ trợ học tập cá nhân hóa", description: "Trợ lý AI giúp bạn xây dựng lộ trình học tập, giải đáp thắc mắc chuyên ngành, và tìm kiếm tài liệu hiệu quả.", features: ["Lộ trình học tập cá nhân", "Giải đáp kiến thức 24/7", "Tóm tắt và phân tích tài liệu"], icon: BookOpen, themeColor: 'green', gradient: 'bg-gradient-to-r from-green-500 to-cyan-500', buttonText: "Chat với AI học tập" },
        { id: 'emotional', title: "Hỗ trợ cảm xúc và sức khỏe tinh thần", description: "Một người bạn đồng hành lắng nghe, chia sẻ và cung cấp các bài tập thư giãn, giúp bạn vượt qua căng thẳng trong học tập và cuộc sống.", features: ["Trò chuyện ẩn danh", "Bài tập thiền và thư giãn", "Kết nối với chuyên gia tâm lý"], icon: Heart, themeColor: 'purple', gradient: 'bg-gradient-to-r from-purple-500 to-pink-500', buttonText: "Trò chuyện cùng AI cảm xúc" },
        { id: 'admin', title: "Tự động hóa thủ tục hành chính", description: "Đơn giản hóa các thủ tục như đăng ký tín chỉ, thanh toán học phí, xin giấy tờ xác nhận... thông qua các câu lệnh tự nhiên.", features: ["Đăng ký học phần tự động", "Nhắc nhở và thanh toán học phí", "Xin giấy xác nhận sinh viên"], icon: Cog, themeColor: 'orange', gradient: 'bg-gradient-to-r from-orange-500 to-amber-500', buttonText: "Bắt đầu với AI hành chính" },
        { id: 'security', title: "Đảm bảo minh bạch và bảo mật dữ liệu", description: "Sử dụng công nghệ Blockchain để ghi lại và xác minh mọi tương tác, đảm bảo tính minh bạch và an toàn cho dữ liệu cá nhân của bạn.", features: ["Mã hóa dữ liệu cá nhân", "Lịch sử tương tác minh bạch", "Xác thực đa yếu tố"], icon: Lock, themeColor: 'teal', gradient: 'bg-gradient-to-r from-teal-500 to-sky-500', buttonText: "Tìm hiểu về bảo mật" },
    ];

    const [openAccordion, setOpenAccordion] = useState<string | null>(assistants[0].id);
    const [activeAssistant, setActiveAssistant] = useState<AiAssistantType | null>(null);

    return (
        <>
            <DashboardCard>
                <h2 className="text-2xl font-bold mb-6">Trợ lý AI VHU</h2>
                <div className="space-y-4">
                    {assistants.map(assistant => (
                        <AccordionItem 
                            key={assistant.id}
                            item={assistant}
                            isOpen={openAccordion === assistant.id}
                            onClick={() => setOpenAccordion(openAccordion === assistant.id ? null : assistant.id)}
                            onButtonClick={() => setActiveAssistant(assistant)}
                        />
                    ))}
                </div>
            </DashboardCard>
            <AnimatePresence>
                {activeAssistant && <AiChatModal assistant={activeAssistant} onClose={() => setActiveAssistant(null)} />}
            </AnimatePresence>
        </>
    );
};


// Settings Component
const Settings: React.FC = () => {
  const Toggle: React.FC<{label: string, enabled: boolean}> = ({ label, enabled }) => {
    const [isOn, setIsOn] = useState(enabled);
    return (
      <div className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-700">
        <span className="font-semibold">{label}</span>
        <div 
          onClick={() => setIsOn(!isOn)}
          className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}
        >
          <motion.div 
            className="w-6 h-6 bg-white rounded-full shadow-md"
            layout
            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          />
        </div>
      </div>
    );
  };
    return (
        <DashboardCard>
            <h2 className="text-2xl font-bold mb-6">Cài đặt</h2>
            <Toggle label="Thông báo đẩy" enabled={true} />
            <Toggle label="Email thông báo" enabled={true} />
            <Toggle label="Đồng bộ lịch" enabled={false} />
        </DashboardCard>
    );
};

// Main Dashboard Content Router
interface DashboardContentProps {
  activePage: Page;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ activePage }) => {
    const pageVariants = {
        initial: { opacity: 0, x: 40, scale: 0.98 },
        in: { opacity: 1, x: 0, scale: 1 },
        out: { opacity: 0, x: -40, scale: 0.98 }
    };
    const pageTransition = {
        type: "tween",
        ease: [0.4, 0, 0.2, 1], // Cinematic easing
        duration: 0.6
    };
    
    const renderPage = () => {
      switch (activePage) {
        case Page.PersonalInfo:
          return <PersonalInfo />;
        case Page.LearningResults:
          return <LearningResults />;
        case Page.Schedule:
          return <Schedule />;
        case Page.CourseRegistration:
          return <CourseRegistration />;
        case Page.AiAssistant:
          return <AiAssistant />;
        case Page.Settings:
          return <Settings />;
        default:
          return <PersonalInfo />;
      }
    };

    return (
        <motion.div
            key={activePage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {renderPage()}
        </motion.div>
    );
};