
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Trash2, 
  RefreshCw, 
  Clock, 
  MoreHorizontal, 
  ChevronRight,
  Filter,
  CheckCircle2,
  XCircle,
  Code2,
  Lock,
  Copy,
  ExternalLink,
  FileText
} from 'lucide-react';
import { RegistrationStatus, Developer } from '../types';

const MOCK_DEVELOPERS: Developer[] = [
  {
    id: '1',
    name: '李小龙',
    email: 'bruce@lee.com',
    company: '功夫科技',
    status: RegistrationStatus.APPROVED,
    appCode: 'DC-8848-X',
    appKey: 'ak_prod_a1b2c3d4e5f6',
    passcode: '123456',
    permissions: { interfaceExchange: true, desktopAdaptation: true, csharpTemplate: false, fileConversion: true },
    expiryDate: '2025-12-31',
    purpose: '用于动作捕捉数据交换'
  },
  {
    id: '2',
    name: '张建国',
    email: 'jianguo@corp.com',
    company: '建国集团',
    status: RegistrationStatus.PENDING,
    passcode: '123456',
    permissions: { interfaceExchange: false, desktopAdaptation: false, csharpTemplate: false, fileConversion: false },
    purpose: '用于办公自动化系统对接'
  },
  {
    id: '3',
    name: '王小红',
    email: 'xiaohong@startup.io',
    company: '红红火火工作室',
    status: RegistrationStatus.APPROVED,
    appCode: 'DC-1024-Y',
    appKey: 'ak_test_z9y8x7w6v5u4',
    passcode: '123456',
    permissions: { interfaceExchange: true, desktopAdaptation: true, csharpTemplate: true, fileConversion: true },
    expiryDate: '2024-06-15',
    purpose: '全能插件开发'
  }
];

const Management: React.FC = () => {
  const [devs, setDevs] = useState<Developer[]>(MOCK_DEVELOPERS);
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  
  // Audit Form State
  const [auditForm, setAuditForm] = useState({
    status: RegistrationStatus.APPROVED,
    comment: '',
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    permissions: {
      interfaceExchange: true,
      desktopAdaptation: false,
      csharpTemplate: false,
      fileConversion: false
    }
  });

  const handleOpenAuth = (dev: Developer) => {
    setSelectedDev(dev);
    setAuditForm({
      status: RegistrationStatus.APPROVED,
      comment: '',
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      permissions: { ...dev.permissions }
    });
    setIsAuthModalOpen(true);
  };

  const handleAuthorize = () => {
    if (!selectedDev) return;
    
    const isApproved = auditForm.status === RegistrationStatus.APPROVED;
    
    // Simulate generation of keys if approved
    const updated: Developer = {
      ...selectedDev,
      status: auditForm.status,
      appCode: isApproved ? `DC-${Math.floor(1000 + Math.random() * 9000)}-Z` : undefined,
      appKey: isApproved ? `ak_prod_${Math.random().toString(36).substr(2, 12)}` : undefined,
      expiryDate: isApproved ? auditForm.expiryDate : undefined,
      permissions: { ...auditForm.permissions },
      auditInfo: {
        comment: auditForm.comment,
        auditedAt: new Date().toISOString(),
        auditor: 'Admin'
      }
    };
    
    setDevs(prev => prev.map(d => d.id === updated.id ? updated : d));
    setSelectedDev(updated);
    setIsAuthModalOpen(false);
    
    if (isApproved) {
      setIsKeyModalOpen(true);
    } else {
      alert('审核已完成，申请已驳回。');
    }
  };

  const getStatusBadge = (status: RegistrationStatus) => {
    const styles = {
      [RegistrationStatus.APPROVED]: 'bg-emerald-100 text-emerald-700',
      [RegistrationStatus.PENDING]: 'bg-amber-100 text-amber-700',
      [RegistrationStatus.REJECTED]: 'bg-red-100 text-red-700',
      [RegistrationStatus.REVIEWING]: 'bg-blue-100 text-blue-700',
      [RegistrationStatus.DRAFT]: 'bg-slate-100 text-slate-500',
    };
    const labels = {
      [RegistrationStatus.APPROVED]: '已授权',
      [RegistrationStatus.PENDING]: '待审核',
      [RegistrationStatus.REJECTED]: '已驳回',
      [RegistrationStatus.REVIEWING]: '复核中',
      [RegistrationStatus.DRAFT]: '草稿',
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">开发者审核管理</h1>
          <p className="text-slate-500 mt-2">处理开发者入驻申请，配置授权权限并签发平台密钥。</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-600 font-semibold hover:bg-slate-50">
            <Filter size={18} /> 筛选
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">申请人与企业</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">授权范围</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">APPCODE / 有效期</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">管理操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {devs.map((dev) => (
              <tr key={dev.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold uppercase">
                      {dev.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{dev.name}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{dev.company}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">{getStatusBadge(dev.status)}</td>
                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    {dev.permissions.interfaceExchange && <span title="交换接口" className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><RefreshCw size={14} /></span>}
                    {dev.permissions.desktopAdaptation && <span title="桌面适配" className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><ExternalLink size={14} /></span>}
                    {dev.permissions.csharpTemplate && <span title="C# 模板" className="w-6 h-6 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Code2 size={14} /></span>}
                    {dev.permissions.fileConversion && <span title="文件转换" className="w-6 h-6 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><FileText size={14} /></span>}
                  </div>
                </td>
                <td className="px-6 py-5">
                  {dev.appCode ? (
                    <div>
                      <code className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono">{dev.appCode}</code>
                      <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
                        <Clock size={10} /> {dev.expiryDate}
                      </p>
                    </div>
                  ) : (
                    <span className="text-slate-300">未签发</span>
                  )}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-1">
                    {dev.status === RegistrationStatus.PENDING ? (
                      <button 
                        onClick={() => handleOpenAuth(dev)}
                        className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-sm" title="开始审核">
                        <ShieldCheck size={14} /> 审核
                      </button>
                    ) : (
                      <>
                        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors" title="修改权限"><Key size={18} /></button>
                        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors" title="注销"><Trash2 size={18} /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Authorization Modal */}
      {isAuthModalOpen && selectedDev && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900">资料审核与授权配置</h3>
                <button onClick={() => setIsAuthModalOpen(false)} className="text-slate-400 hover:text-slate-600"><XCircle /></button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">申请人背景</p>
                  <p className="text-sm font-bold text-slate-800">{selectedDev.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedDev.company}</p>
                  <p className="text-xs text-slate-500 mt-2 italic">"{selectedDev.purpose}"</p>
                </div>
                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                  <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">审核决定</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" value={RegistrationStatus.APPROVED} checked={auditForm.status === RegistrationStatus.APPROVED} onChange={() => setAuditForm({...auditForm, status: RegistrationStatus.APPROVED})} />
                      <span className="text-sm font-bold text-emerald-600">通过入驻</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" value={RegistrationStatus.REJECTED} checked={auditForm.status === RegistrationStatus.REJECTED} onChange={() => setAuditForm({...auditForm, status: RegistrationStatus.REJECTED})} />
                      <span className="text-sm font-bold text-red-600">驳回申请</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-700">步骤 1: 配置有效期与意见</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-500">有效期至</label>
                    <input type="date" value={auditForm.expiryDate} onChange={e => setAuditForm({...auditForm, expiryDate: e.target.value})} className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-500">审核意见 (文本描述)</label>
                    <input type="text" placeholder="请输入审核评估意见..." value={auditForm.comment} onChange={e => setAuditForm({...auditForm, comment: e.target.value})} className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <p className="text-sm font-bold text-slate-700">步骤 2: 开发者权限勾选 (可多选)</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'interfaceExchange', label: '交换接口 (Data Exchange)', desc: '用于插件开发所需的数据交换接口访问' },
                    { id: 'desktopAdaptation', label: '桌面适配 (Desktop UI)', desc: '用于软件接口适配与桌面环境集成' },
                    { id: 'csharpTemplate', label: 'C# 模板工程 (C# Template)', desc: '用于 C# 插件代码框架快速开发授权' },
                    { id: 'fileConversion', label: '文件转换 (File Conversion)', desc: '用于在线各类工程文件格式转换服务' }
                  ].map(p => (
                    <label key={p.id} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${auditForm.permissions[p.id as keyof typeof auditForm.permissions] ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                      <input type="checkbox" checked={auditForm.permissions[p.id as keyof typeof auditForm.permissions]} onChange={() => setAuditForm({
                        ...auditForm,
                        permissions: { ...auditForm.permissions, [p.id]: !auditForm.permissions[p.id as keyof typeof auditForm.permissions] }
                      })} className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                      <div>
                        <p className="font-bold text-slate-800">{p.label}</p>
                        <p className="text-slate-500 mt-0.5 leading-tight">{p.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setIsAuthModalOpen(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">取消</button>
                <button onClick={handleAuthorize} className={`flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all ${auditForm.status === RegistrationStatus.REJECTED ? 'bg-red-600 hover:bg-red-700 shadow-red-200' : ''}`}>
                  {auditForm.status === RegistrationStatus.APPROVED ? '通过并生成 AppKey' : '确认驳回申请'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key Result Modal */}
      {isKeyModalOpen && selectedDev && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto rotate-12">
                <Lock size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">授权密钥已生成</h3>
                <p className="text-slate-500 text-sm mt-1">请妥善保存以下信息，切勿向第三方透露。</p>
              </div>

              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">APPCODE (凭证号)</label>
                  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 group">
                    <code className="flex-1 font-mono text-sm text-blue-700 font-bold">{selectedDev.appCode}</code>
                    <button className="text-slate-400 hover:text-blue-600"><Copy size={16} /></button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">APPKEY (密钥)</label>
                  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <code className="flex-1 font-mono text-xs text-slate-600 truncate">{selectedDev.appKey}</code>
                    <button className="text-slate-400 hover:text-blue-600"><Copy size={16} /></button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3 text-left">
                <Clock size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  该凭证有效期至 <strong>{selectedDev.expiryDate}</strong>。系统将在到期前 15 天通过邮件通知您续期。
                </p>
              </div>

              <button 
                onClick={() => setIsKeyModalOpen(false)}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all"
              >
                我知道了，关闭窗口
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;
