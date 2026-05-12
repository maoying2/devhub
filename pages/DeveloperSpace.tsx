
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
  const [passcode, setPasscode] = useState('123456');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [viewMode, setViewMode] = useState<'login' | 'findAppCode' | 'resetPassword' | 'checkStatus'>('login');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [checkIdNumber, setCheckIdNumber] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState('');
  
  const navigate = useNavigate();

  const VALID_PAIRS = [
    { code: 'DC-8848-X', pass: '123456', email: 'dev1@example.com', name: '智诚软件负责人', company: '智诚软件有限公司', status: 'approved' },
    { code: 'DC-1024-Y', pass: '123456', email: 'dev2@example.com', name: '极客通讯开发部', company: '极客通讯科技有限公司', status: 'approved' },
    { code: 'TEST', pass: 'TEST', email: 'test@example.com', name: '测试开发者', company: '测试企业', status: 'approved' },
    { code: 'DC-9999-Z', pass: '123456', email: 'fisherilvens405@gmail.com', name: '当前用户', company: '智联创新', status: 'approved' }
  ];

  // Mock registrations history for the current session user
  const CURRENT_USER_EMAIL = 'fisherilvens405@gmail.com';
  const REGISTRATION_HISTORY = [
    { 
      email: 'fisherilvens405@gmail.com', 
      status: 'rejected', 
      date: '2024-05-01', 
      type: '个人开发',
      reason: '实名认证照片不符合要求（需手持证件照），请重新上传。' 
    },
    { 
      email: 'fisherilvens405@gmail.com', 
      status: 'approved', 
      date: '2024-05-10', 
      type: '三方企业',
      code: 'DC-9999-Z'
    }
  ];

  const currentUserData = VALID_PAIRS.find(p => p.code === appCode) || VALID_PAIRS[0];

  const handleCheckStatus = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const match = VALID_PAIRS.find(p => p.code === appCode && p.pass === passcode);
      if (match || (appCode === 'DC-8848-X' && passcode === '123456')) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setError('无效的 APPCODE 或密码，请检查输入或联系管理员。');
        setIsLoading(false);
      }
    }, 800);
  };

  const handleFindAppCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      const match = VALID_PAIRS.find(p => p.pass === passcode);
      if (match) {
        setRecoverySuccess(`身份验证成功！您的 APPCODE 为: ${match.code}`);
      } else {
        setError('未找到匹配该密码的开发者凭证。');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      const match = VALID_PAIRS.find(p => p.code === appCode && p.email === recoveryEmail);
      if (match) {
        setRecoverySuccess(`重置链接已发送至: ${recoveryEmail}，请检查邮件。`);
      } else {
        setError('APPCODE 与注册邮箱不匹配，请确保输入正确的信息。');
      }
      setIsLoading(false);
    }, 1000);
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
              {viewMode === 'login' && '请输入 APPCODE 与查验密码进入安全空间。'}
              {viewMode === 'findAppCode' && '请输入您的查验密码以找回 APPCODE。'}
              {viewMode === 'resetPassword' && '请输入 APPCODE 与注册邮箱重置密码。'}
              {viewMode === 'checkStatus' && '输入注册时的邮箱与证件号查询申请进度。'}
            </p>
          </div>
        </div>

        <div className="p-10 space-y-8">
          {viewMode === 'login' ? (
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
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">查验密码</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    required
                    type="password" 
                    value={passcode}
                    onChange={e => setPasscode(e.target.value)}
                    placeholder="••••••"
                    className="w-full pl-12 pr-6 py-3 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:ring-0 outline-none text-sm font-mono text-slate-800 transition-all bg-slate-50/50"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 animate-in shake-in">
                  <AlertCircle size={16} />
                  <p className="text-[10px] font-bold">{error}</p>
                </div>
              )}

              <button 
                disabled={isLoading}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-100 disabled:opacity-50"
              >
                {isLoading ? '正在认证...' : <><Lock size={16} /> 安全登录空间</>}
              </button>

              <div className="flex flex-col gap-2 pt-2">
                 <div className="flex items-center justify-between">
                    <button type="button" onClick={() => { setViewMode('findAppCode'); setError(''); setRecoverySuccess(''); }} className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors">找回 APPCODE</button>
                    <button type="button" onClick={() => { setViewMode('resetPassword'); setError(''); setRecoverySuccess(''); }} className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors">重置密码</button>
                 </div>
                 <button type="button" onClick={() => { setViewMode('checkStatus'); setError(''); setRecoverySuccess(''); }} className="w-full mt-2 py-2.5 border-2 border-slate-50 rounded-xl text-[10px] font-bold text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all text-center">尚未通过审核？查询申请进度</button>
              </div>
            </form>
          ) : viewMode === 'findAppCode' ? (
// ... existing findAppCode form ...
            <form onSubmit={handleFindAppCode} className="space-y-6">
               <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">验证密码</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    required
                    type="password" 
                    value={passcode}
                    onChange={e => setPasscode(e.target.value)}
                    placeholder="请输入您的查验密码"
                    className="w-full pl-12 pr-6 py-3 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:ring-0 outline-none text-sm font-mono text-slate-800 transition-all bg-slate-50/50"
                  />
                </div>
              </div>

              {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold">{error}</div>}
              {recoverySuccess && <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold border border-emerald-100 leading-relaxed">{recoverySuccess}</div>}

              <div className="flex flex-col gap-3">
                <button 
                  disabled={isLoading}
                  className="w-full py-3.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  {isLoading ? '查询中...' : '立即通过密码找回 APPCODE'}
                </button>
                <button type="button" onClick={() => { setViewMode('login'); setError(''); setRecoverySuccess(''); }} className="text-xs font-bold text-slate-400 hover:text-slate-600 py-2">返回登录</button>
              </div>
            </form>
          ) : viewMode === 'checkStatus' ? (
            <div className="space-y-6">
               <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                       <Mail size={18} />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">当前关联账户</p>
                       <p className="text-xs font-bold text-slate-700">{CURRENT_USER_EMAIL}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    系统已自动识别您的登录身份。以下是您在该账户下发起的所有开发者申请记录：
                  </p>
               </div>

               <div className="space-y-4">
                 {REGISTRATION_HISTORY.length > 0 ? (
                   REGISTRATION_HISTORY.map((item, idx) => (
                    <div key={idx} className="relative pl-10 pb-6 last:pb-0 group">
                       {/* Timeline Line */}
                       <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100 group-last:bottom-auto group-last:h-4"></div>
                       {/* Timeline Node */}
                       <div className={`absolute left-2 top-0 w-4.5 h-4.5 rounded-full border-4 border-white shadow-sm z-10 transition-transform group-hover:scale-125 ${
                         item.status === 'approved' ? 'bg-emerald-500 shadow-emerald-200' : 
                         item.status === 'rejected' ? 'bg-red-500 shadow-red-200' : 'bg-amber-500 shadow-amber-200'
                       }`}></div>

                       <div className="bg-white border-2 border-slate-50 rounded-2xl p-4 shadow-sm group-hover:border-blue-100 transition-all">
                          <div className="flex justify-between items-start mb-2">
                             <div>
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase mr-2">{item.type}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                                  item.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 
                                  item.status === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                  {item.status === 'approved' ? '已通过' : item.status === 'rejected' ? '已驳回' : '审核中'}
                                </span>
                             </div>
                             <span className="text-[10px] font-mono text-slate-400">{item.date}</span>
                          </div>
                          
                          {item.status === 'approved' && (
                             <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl space-y-2">
                                <div className="flex justify-between items-center">
                                   <span className="text-[10px] text-emerald-700 font-bold">分配 APPCODE</span>
                                   <span className="text-xs font-mono font-bold text-emerald-800 tracking-wider bg-white px-2 py-0.5 rounded shadow-sm">{item.code}</span>
                                </div>
                                <p className="text-[10px] text-emerald-600/80">恭喜！您的申请已通过，请使用该代码及注册口令登录空间。</p>
                             </div>
                          )}

                          {item.status === 'rejected' && (
                             <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl">
                                <p className="text-[10px] font-bold text-red-700 mb-1">驳回原因：</p>
                                <p className="text-[10px] text-red-600 leading-relaxed italic">{item.reason}</p>
                                <button 
                                  onClick={() => navigate('/registration')}
                                  className="mt-2 text-[10px] font-bold text-red-700 flex items-center gap-1 hover:underline"
                                >
                                  <PenTool size={10} /> 立即重新申请
                                </button>
                             </div>
                          )}

                          {item.status === 'pending' && (
                             <p className="mt-2 text-[10px] text-slate-500 leading-relaxed">您的申请正在由 AI 及人工团队进行双重评估，请耐心等待 1-3 个工作日。</p>
                          )}
                       </div>
                    </div>
                   ))
                 ) : (
                   <div className="text-center py-10">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                         <Search size={24} className="text-slate-200" />
                      </div>
                      <p className="text-xs font-bold text-slate-400">未发现该账户的申请记录</p>
                      <button 
                        onClick={() => navigate('/registration')}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                      >
                        立即发起首次申请
                      </button>
                   </div>
                 )}
               </div>

               <div className="pt-4 border-t border-slate-100">
                 <button 
                   type="button" 
                   onClick={() => { setViewMode('login'); setError(''); setRecoverySuccess(''); }} 
                   className="w-full py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                 >
                   返回登录空间
                 </button>
               </div>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">APPCODE</label>
                  <input 
                    required
                    type="text" 
                    value={appCode}
                    onChange={e => setAppCode(e.target.value.toUpperCase())}
                    placeholder="DC-XXXX-X"
                    className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-blue-500 outline-none text-sm font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">注册邮箱</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      required
                      type="email" 
                      value={recoveryEmail}
                      onChange={e => setRecoveryEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full pl-12 pr-6 py-3 rounded-2xl border-2 border-slate-50 focus:border-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold">{error}</div>}
              {recoverySuccess && <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold border border-emerald-100 leading-relaxed">{recoverySuccess}</div>}

              <div className="flex flex-col gap-3">
                <button 
                  disabled={isLoading}
                  className="w-full py-3.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  {isLoading ? '正在重置...' : '发送密码重置邮件'}
                </button>
                <button type="button" onClick={() => { setViewMode('login'); setError(''); setRecoverySuccess(''); }} className="text-xs font-bold text-slate-400 hover:text-slate-600 py-2">返回登录</button>
              </div>
            </form>
          )}

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

