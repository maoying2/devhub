
import React, { useState } from 'react';
import { 
  CheckCircle, 
  Info, 
  ChevronRight, 
  FileText, 
  Send, 
  UserCheck, 
  ShieldAlert, 
  Sparkles, 
  Lock, 
  Key, 
  ShieldCheck, 
  ExternalLink, 
  BookOpen, 
  Box, 
  Sliders, 
  Clock,
  AlertCircle
} from 'lucide-react';
import { geminiService } from '../services/geminiService';

const Registration: React.FC = () => {
  // Mocking registration status for demonstration
  // In a real app, this would come from an auth context or Firestore
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    companyWebsite: '',
    companySize: '1-50',
    industry: '',
    purpose: '',
    githubUrl: '',
    region: '华东 (上海)',
    expectedMonthlyRequests: '< 10k',
    passcode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [reviewResult, setReviewResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    if (e) e.preventDefault();
    if (isDraft) setIsSavingDraft(true);
    else setIsSubmitting(true);
    
    try {
      // If submitting (not draft), perform AI review
      let review = null;
      if (!isDraft) {
        review = await geminiService.reviewApplication(form);
        setReviewResult(review);
      }
      
      // Here we would normally save to Firestore
      // For now, we simulate success
      console.log(isDraft ? 'Saving draft...' : 'Submitting application...', form);
      
      if (!isDraft) {
        setStep(3);
      } else {
        alert('草稿已保存！您可以稍后继续填写。');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIsSavingDraft(false);
    }
  };

  const steps = [
    { num: 1, label: '注册指南', icon: Info },
    { num: 2, label: '资料填写', icon: FileText },
    { num: 3, label: '提交成功', icon: CheckCircle },
  ];

  const InputLabel = ({ label, required = false }: { label: string, required?: boolean }) => (
    <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5 mb-2">
      {label}
      {required ? (
        <span className="text-red-500 font-bold">*</span>
      ) : (
        <span className="text-[10px] font-medium bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded uppercase tracking-wider">非必填</span>
      )}
    </label>
  );

  if (isRegistered) {
    const devData = {
      name: '李小龙',
      company: '功夫科技',
      expiryDate: '2025-12-31',
      appCode: 'DC-8848-X',
      appKey: 'ak_prod_a1b2c3d4e5f6g7h8i9j0',
      permissions: ['交换接口', '桌面适配', '文件转换']
    };

    const handleUnlock = () => {
      // Mocking passcode check (correct one is '123456')
      if (passcodeInput === '123456') {
        setIsUnlocked(true);
        setPasscodeError('');
      } else {
        setPasscodeError('查验口令错误，请检查输入。');
      }
    };

    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">开发者信息中心</h1>
            <p className="text-slate-500 mt-2">您可以查看授权状态、权限范围及获取凭证中心入口。</p>
          </div>
          <div className="flex items-center gap-3 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl border border-emerald-100">
             <ShieldCheck size={20} />
             <span className="font-bold">已入驻成功</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Core Info */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-sm">
              <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">授权状态概览</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status Record</span>
              </div>
              <div className="p-8 grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1.5">
                    <p className="text-xs text-slate-400 font-medium">开发者名称</p>
                    <p className="text-lg font-bold text-slate-800">{devData.name}</p>
                </div>
                <div className="space-y-1.5">
                    <p className="text-xs text-slate-400 font-medium">所属企业</p>
                    <p className="text-lg font-bold text-slate-800">{devData.company}</p>
                </div>
                <div className="space-y-1.5">
                    <p className="text-xs text-slate-400 font-medium">授权有效期至</p>
                    <div className="flex items-center gap-2 text-indigo-600">
                        <Clock size={16} />
                        <span className="text-lg font-bold">{devData.expiryDate}</span>
                    </div>
                </div>
                <div className="space-y-1.5">
                    <p className="text-xs text-slate-400 font-medium">已授权权限</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {devData.permissions.map(p => (
                            <span key={p} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded border border-blue-100">{p}</span>
                        ))}
                    </div>
                </div>
              </div>
            </div>

            {/* AppKey & Credentials */}
            <div className="bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
              
              {!isUnlocked ? (
                <div className="flex flex-col items-center justify-center text-center py-6 space-y-6">
                    <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-slate-400">
                        <Lock size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white">凭证信息已加密</h4>
                        <p className="text-slate-400 text-xs mt-2">输入注册时设置的查验口令，获取 AppKey 及授权代码。</p>
                    </div>
                    <div className="w-full max-w-xs space-y-3">
                        <input 
                            type="password" 
                            placeholder="请输入查验口令"
                            value={passcodeInput}
                            onChange={(e) => setPasscodeInput(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center tracking-[0.5em]"
                        />
                        {passcodeError && <p className="text-red-400 text-[10px] font-bold">{passcodeError}</p>}
                        <button 
                            onClick={handleUnlock}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all"
                        >
                            解密并查看凭证
                        </button>
                    </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in zoom-in-95 duration-300">
                     <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-white">平台接入凭证</h4>
                        <button onClick={() => setIsUnlocked(false)} className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                            <Lock size={12} /> 重新锁定
                        </button>
                     </div>
                     <div className="grid grid-cols-1 gap-4">
                        <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">APPCODE (身份标识)</p>
                            <code className="text-xl font-mono text-emerald-400">{devData.appCode}</code>
                        </div>
                        <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">APPKEY (密钥通证)</p>
                            <code className="text-sm font-mono text-blue-400 break-all">{devData.appKey}</code>
                        </div>
                     </div>
                     <p className="text-[10px] text-slate-500 italic">* appkey 可以用来查看和获取开发者资料以及处理平台对接相关功能。</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Access Links */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <ExternalLink size={18} className="text-blue-600" /> 开发者快速入口
                </h4>
                <div className="space-y-3">
                    {[
                    { icon: BookOpen, label: '开发者帮助资料', desc: 'SDK使用说明与API手册', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { icon: Box, label: '软件建模中心', desc: '可视化数据建模工具', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { icon: Sliders, label: '软件配置管理', desc: '自定义软件行为参数', color: 'text-amber-600', bg: 'bg-amber-50' },
                    ].map((item, i) => (
                    <button key={i} className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all text-left border border-transparent hover:border-slate-100 group">
                        <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                        <item.icon size={20} />
                        </div>
                        <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                    </button>
                    ))}
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl">
                <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
                    <AlertCircle size={18} />
                    <span className="text-sm">管理须知</span>
                </div>
                <p className="text-xs text-amber-600 leading-relaxed">
                    如需变更业务场景或调整 QPS 限制，请在开发者空间提交“权限调优申请”。
                </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">开发者入驻申请</h1>
          <p className="text-slate-500 mt-2 text-lg">尚未检测到您的开发者角色。完善资料即可开启您的开发者生态之旅。</p>
        </div>
        <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded uppercase tracking-widest">未注册开发者</span>
            <button onClick={() => setIsRegistered(true)} className="mt-2 text-[10px] text-blue-500 hover:underline cursor-pointer"> [模拟已注册状态] </button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        {steps.map((s, idx) => (
          <React.Fragment key={s.num}>
            <div className={`flex items-center gap-3 ${step === s.num ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step === s.num ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-100'
              }`}>
                <s.icon size={20} />
              </div>
              <span className="font-semibold">{s.label}</span>
            </div>
            {idx < steps.length - 1 && <ChevronRight className="text-slate-300" />}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {step === 1 && (
          <div className="p-10 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800">入驻流程须知</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="mt-1 bg-blue-100 p-2 rounded-lg shrink-0"><UserCheck className="text-blue-600 w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-slate-800">企业资质审核</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">我们优先支持具有明确业务场景的企业开发者。请确保公司名称与执照一致。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 bg-blue-100 p-2 rounded-lg shrink-0"><ShieldAlert className="text-blue-600 w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-slate-800">合规使用规范</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">所有授权数据严禁私自转售。数据交换必须遵循平台安全协议（SDXP-Protocol）。</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <CheckCircle size={16} className="text-blue-500" /> 预计审核时效
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-2">⏱️ 提交详细资料：8-10 分钟</li>
                    <li className="flex items-center gap-2">🤖 AI 深度预审：实时反馈</li>
                    <li className="flex items-center gap-2">👤 专家人工复核：24-48 小时</li>
                  </ul>
                </div>
              </div>
            </div>
            <button 
              onClick={() => {
                setStep(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-100"
            >
              我已经了解，进入资料填写 <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-10 space-y-10">
            {/* Section 1: Basic & Enterprise */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-bold text-slate-800">基本信息与企业背景</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <InputLabel label="姓名 / 负责人" required />
                  <input 
                    required
                    type="text" 
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300"
                    placeholder="请输入负责人真实姓名"
                  />
                </div>
                <div className="space-y-1">
                  <InputLabel label="企业全称" required />
                  <input 
                    required
                    type="text" 
                    value={form.company}
                    onChange={e => setForm({...form, company: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300"
                    placeholder="请输入与企业执照一致的名称"
                  />
                </div>
                <div className="space-y-1">
                  <InputLabel label="企业官网" />
                  <input 
                    type="url" 
                    value={form.companyWebsite}
                    onChange={e => setForm({...form, companyWebsite: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300"
                    placeholder="https://www.example.com"
                  />
                </div>
                <div className="space-y-1">
                  <InputLabel label="行业领域" />
                  <input 
                    type="text" 
                    value={form.industry}
                    onChange={e => setForm({...form, industry: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300"
                    placeholder="例如：金融科技、电子商务、人工智能"
                  />
                </div>
                <div className="space-y-1">
                  <InputLabel label="公司规模" />
                  <select 
                    value={form.companySize}
                    onChange={e => setForm({...form, companySize: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                  >
                    <option value="1-20">1-20 人</option>
                    <option value="21-50">21-50 人</option>
                    <option value="51-200">51-200 人</option>
                    <option value="201-500">201-500 人</option>
                    <option value="500+">500+ 人以上</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Contact */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-l-4 border-emerald-500 pl-4">
                <h3 className="text-lg font-bold text-slate-800">联系方式</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <InputLabel label="联系邮箱" required />
                  <input 
                    required
                    type="email" 
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="work@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <InputLabel label="联系电话" required />
                  <input 
                    required
                    type="tel" 
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="请输入手机号码或座机"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Technical & Business */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-l-4 border-amber-500 pl-4">
                <h3 className="text-lg font-bold text-slate-800">技术背景与业务场景</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <InputLabel label="GitHub / 开源主页" />
                  <input 
                    type="url" 
                    value={form.githubUrl}
                    onChange={e => setForm({...form, githubUrl: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="space-y-1">
                  <InputLabel label="首选部署区域" required />
                  <select 
                    value={form.region}
                    onChange={e => setForm({...form, region: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                  >
                    <option value="华东 (上海)">华东 (上海)</option>
                    <option value="华南 (深圳)">华南 (深圳)</option>
                    <option value="华北 (北京)">华北 (北京)</option>
                    <option value="西南 (成都)">西南 (成都)</option>
                    <option value="海外 (新加坡)">海外 (新加坡)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <InputLabel label="预期月调用量" />
                  <select 
                    value={form.expectedMonthlyRequests}
                    onChange={e => setForm({...form, expectedMonthlyRequests: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                  >
                    <option value="< 10k">小于 10,000 次</option>
                    <option value="10k-100k">10,000 - 100,000 次</option>
                    <option value="100k-1M">100,000 - 1,000,000 次</option>
                    <option value="> 1M">1,000,000 次以上</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <InputLabel label="凭证查看口令 (查看 AppKey 必填)" required />
                  <div className="relative">
                    <input 
                      required
                      type="password" 
                      value={form.passcode}
                      onChange={e => setForm({...form, passcode: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300"
                      placeholder="请设置 6 位以上数字或字母组合"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={18} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">审核通过后，需输入此口令才能查看 AppKey 和敏感开发参数。</p>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <InputLabel label="合作目的与场景需求" required />
                  <textarea 
                    required
                    rows={4}
                    value={form.purpose}
                    onChange={e => setForm({...form, purpose: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="请详细描述您的业务痛点以及希望通过我们的 API 解决的问题。更详细的描述有助于通过 AI 的初次审核。"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                返回指南
              </button>
              <button 
                type="button"
                disabled={isSavingDraft || isSubmitting}
                onClick={(e) => handleSubmit(e as any, true)}
                className="flex-1 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all disabled:opacity-50"
              >
                {isSavingDraft ? '正在保存...' : '保存为草稿'}
              </button>
              <button 
                disabled={isSubmitting || isSavingDraft}
                className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-100"
              >
                {isSubmitting ? '正在通过 AI 深度审核...' : '提交完整申请'}
                {!isSubmitting && <Send size={20} />}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="p-16 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">申请提交成功！</h2>
            <p className="text-slate-500 max-w-md mx-auto">
              您的申请已收到。我们的 AI 系统已完成初步扫描，管理员将在 1-3 个工作日内完成最后的人工复核。
            </p>
            
            {reviewResult && (
              <div className="max-w-xl mx-auto mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-left">
                <div className="flex items-center gap-2 text-blue-600 font-bold mb-3">
                  <Sparkles size={18} /> AI 智能预审报告
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-500 font-medium">风险评分</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    reviewResult.riskScore < 30 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {reviewResult.riskScore}/100 ({reviewResult.recommendation})
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-100 italic">
                  "{reviewResult.comments}"
                </p>
              </div>
            )}

            <div className="flex gap-4 justify-center mt-10">
              <button 
                onClick={() => setStep(1)}
                className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50"
              >
                返回首页
              </button>
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200">
                查看审核进度
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
