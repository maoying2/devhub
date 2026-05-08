
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Info, 
  Users, 
  FileText, 
  ShieldCheck, 
  Settings, 
  PlusCircle, 
  LogOut, 
  ChevronRight, 
  Search,
  Bell,
  Code2,
  Lock,
  MessageSquareCode,
  Globe,
  UserCheck,
  LayoutGrid
} from 'lucide-react';
import Landing from './pages/Landing';
import Registration from './pages/Registration';
import Management from './pages/Management';
import Documentation from './pages/Documentation';
import AuthGate from './pages/AuthGate';
import DeveloperConsole from './pages/DeveloperConsole';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: Globe, label: '开发者中心 (Home)', path: '/' },
    { icon: UserCheck, label: '开发者注册 (Registration)', path: '/registration' },
    { icon: FileText, label: '系统帮助中心 (Help Center)', path: '/help' },
    { icon: Lock, label: '凭证中心 (Auth)', path: '/auth' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 z-50 transition-all duration-300">
      <Link to="/" className="p-6 flex items-center gap-3 border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
        <div className="bg-blue-500 p-2 rounded-lg">
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight">DevHub</span>
      </Link>
      <nav className="mt-8 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 text-slate-400 hover:text-white w-full px-4 py-3">
          <LogOut size={20} />
          <span className="text-sm font-medium">退出登录</span>
        </button>
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 left-64 z-40 px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">软件数据交换平台</span>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-blue-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">管理员</p>
            <p className="text-xs text-slate-500 font-medium tracking-wide">Admin Portal</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16 min-h-screen">
          <div className="p-8 max-w-[1440px] mx-auto">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/management" element={<Management />} />
              <Route path="/help" element={<Documentation />} />
              <Route path="/auth" element={<AuthGate />} />
              <Route path="/console/:appCode" element={<DeveloperConsole />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
