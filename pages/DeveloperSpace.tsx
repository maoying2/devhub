
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, 
  ShieldCheck, 
  ChevronRight, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  UserPlus, 
  PenTool, 
  GitMerge, 
  ShoppingBag, 
  ArrowUpRight,
  LogOut,
  AppWindow,
  Zap,
  RotateCcw,
  Search,
  Mail,
  User,
  ExternalLink,
  Info
} from 'lucide-react';

const DeveloperSpace: React.FC = () => {
  const [appCode, setAppCode] = useState('DC-8848-X');
  const [passcode, setPasscode] = useState('••••••');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [recoverySuccess, setRecoverySuccess] = useState('');
  
  const navigate = useNavigate();

  const VALID_PAIRS = [
    { code: 'DC-8848-X', pass: '123456', email: 'dev1@example.com', name: '智诚软件负责人', company: '智诚软件有限公司' },
    { code: 'DC-1024-Y', pass: '123456', email: 'dev2@example.com', name: '极客通讯开发部', company: '极客通讯科技有限公司' },
    { code: 'TEST', pass: 'TEST', email: 'test@example.com', name: '测试开发者', company: '测试企业' }
  ];

  const currentUserData = VALID_PAIRS.find(p => p.code === appCode) || VALID_PAIRS[0];

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 800);
  };

  const secureLinks = [
    { title: '开发帮助资料', desc: 'SDK 手册与 API 协议文档', icon: BookOpen, path: '/help' },
    { title: '软件注册', desc: '新适配软件入驻申请', icon: UserPlus, path: '/registration' },
    { title: '软件建模', desc: '定义软件核心数据结构', icon: PenTool, path: `/console/${appCode || 'DEFAULT'}?tab=model` },
    { title: '软件映射', desc: '配置数据字段对应比例', icon: GitMerge, path: `/console/${appCode || 'DEFAULT'}?tab=api` },
    { title: '插件市场', desc: '适配器发布与收益管理', icon: ShoppingBag, path: `/console/${appCode || 'DEFAULT'}?tab=plugins` },
  ];

  if (isAuthenticated) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-slate-900 p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 bg-blue-600 rounded text-[10px] font-bold uppercase tracking-widest">Authorized</span>
                <span className="text-slate-400 font-mono text-xs">{appCode}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">开发者工作空间</h1>
              <p className="text-slate-400 text-sm mt-2">欢迎回来。以下是根据当前登录生成的安全访问入口。</p>
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="relative z-10 px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold hover:bg-red-950 hover:text-red-400 hover:border-red-900 transition-all flex items-center gap-2"
            >
              <LogOut size={16} /> 退出空间
            </button>
          </div>

          <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Zap size={20} className="text-blue-500" /> 安全跳转列表
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {secureLinks.map((link, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(link.path)}
                    className="group bg-slate-50 border border-slate-100 p-5 rounded-2xl text-left hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all relative overflow-hidden"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                      <link.icon size={18} className="text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">{link.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{link.desc}</p>
                    <div className="absolute top-4 right-4 text-slate-200 group-hover:text-blue-100">
                       <ArrowUpRight size={14} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Developer Info Card */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Info size={20} className="text-indigo-500" /> 开发者详细信息
              </h2>
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 border border-slate-200 shadow-sm">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{currentUserData?.name}</h4>
                    <p className="text-xs text-slate-400">项目负责人</p>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                   <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-400">所属凭证</span>
                     <span className="text-xs font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">{currentUserData?.code}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-400">所属公司</span>
                     <span className="text-xs font-medium text-slate-600">{currentUserData?.company}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-400">空间密码</span>
                     <span className="text-xs font-medium text-slate-500 italic">复用平台账号密码</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-400">认证状态</span>
                     <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">已同步认证</span>
                   </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-[10px] text-blue-600 leading-relaxed italic">
                   提示：开发者空间密码现已与平台主账号同步。如需修改，请前往账号设置页面进行操作。
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-10 pb-10">
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
               <div className="bg-white p-2 rounded-xl shadow-sm text-amber-600 shrink-0">
                  <ShieldCheck size={20} />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-amber-900 mb-1">安全审计提示</h4>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    当前环境的所有操作均由系统进行全量日志记录。页面链接包含动态生成的安全令牌，请勿直接分享本页面的 URL。
                  </p>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">已接入软件</p>
               <h4 className="text-2xl font-bold text-slate-800">03 <span className="text-xs font-normal text-slate-400">Total</span></h4>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
               <AppWindow size={24} />
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
             <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">活跃适配器</p>
                <h4 className="text-2xl font-bold text-slate-800">12 <span className="text-xs font-normal text-slate-400">Instances</span></h4>
             </div>
             <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <ShieldCheck size={24} />
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/30 via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/20 mb-4">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">开发者工作空间</h1>
            <p className="text-slate-400 text-xs max-w-xs mx-auto">
              空间密码已与平台账号同步，点击下方按钮安全进入。
            </p>
          </div>
        </div>

        <div className="p-10 space-y-8">
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">APPCODE</label>
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  required
                  type="text" 
                  value={appCode}
                  onChange={e => setAppCode(e.target.value.toUpperCase())}
                  placeholder="DC-XXXX-X"
                  className="w-full pl-12 pr-6 py-3 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:ring-0 outline-none text-sm font-mono text-slate-800 transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">查验密码 (已同步平台)</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  required
                  readOnly
                  type="password" 
                  value={passcode}
                  className="w-full pl-12 pr-6 py-3 rounded-2xl border-2 border-slate-50 outline-none text-sm font-mono text-slate-400 bg-slate-50/50 cursor-not-allowed"
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-100 disabled:opacity-50"
            >
              {isLoading ? '正在认证...' : <><Lock size={16} /> 安全登录空间</>}
            </button>
          </form>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3 mt-4">
             <div className="bg-white p-2 rounded-lg shadow-sm">
                <Sparkles size={16} className="text-blue-500" />
             </div>
             <p className="text-[10px] text-slate-500 leading-normal italic">
                “您的开发者空间权限已与平台身份绑定。如需修改查验密码，请在平台设置中重置登录密码。”
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperSpace;

