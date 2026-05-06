
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

const AuthGate: React.FC = () => {
  const [appCode, setAppCode] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate APPCODE & Passcode verification
    // Mocking valid combinations
    const VALID_PAIRS = [
      { code: 'DC-8848-X', pass: '123456' },
      { code: 'DC-1024-Y', pass: '123456' }
    ];

    setTimeout(() => {
      const match = VALID_PAIRS.find(p => p.code === appCode && p.pass === passcode);
      if (match) {
        navigate(`/console/${appCode}`);
      } else {
        setError('无效的 APPCODE 或口令，请检查输入或联系管理员。');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/30 via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-900 shadow-blue-500/20 mb-6">
              <ShieldCheck size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">开发者凭证认证</h1>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              请输入您的 APPCODE 以及注册时设置的口令以进入空间。
            </p>
          </div>
        </div>

        <div className="p-12 space-y-8">
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                凭证号 APPCODE
              </label>
              <input 
                required
                type="text" 
                value={appCode}
                onChange={e => setAppCode(e.target.value.toUpperCase())}
                placeholder="DC-XXXX-X"
                className="w-full px-6 py-3 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none text-lg font-mono text-slate-800 transition-all placeholder:text-slate-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                查验口令 (注册时设置)
              </label>
              <input 
                required
                type="password" 
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                placeholder="••••••"
                className="w-full px-6 py-3 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none text-lg font-mono text-slate-800 transition-all placeholder:text-slate-200"
              />
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 animate-in shake-in duration-300">
                <AlertCircle size={18} />
                <p className="text-xs font-semibold">{error}</p>
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  验证中...
                </div>
              ) : (
                <>
                  进入开发者空间 <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">还没有凭证？</p>
            <button onClick={() => navigate('/registration')} className="text-xs font-bold text-blue-600 hover:underline">立即申请注册</button>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
             <div className="bg-white p-2 rounded-lg shadow-sm">
                <Sparkles size={16} className="text-blue-500" />
             </div>
             <p className="text-[10px] text-slate-500 leading-normal italic">
                “APPCODE 验证通过后，您将获得完整的插件发布、模型配置以及私有资料访问权限。”
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthGate;
