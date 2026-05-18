import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X,
  User,
  ShieldCheck,
  Send,
  PenTool,
  MoreVertical,
  ChevronDown
} from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  category: '开发问题' | '插件问题' | '平台问题';
  severity: '轻微' | '一般' | '严重' | '致命';
  status: 'draft' | 'returned' | 'pending' | 'unresolved' | 'not_solving' | 'fixing' | 'delayed' | 'resolved' | 'closed';
  isExpired: boolean;
  impactScope: string;
  modulePath: string;
  workflow: string;
  description: string;
  createdAt: string;
  lastUpdated: string;
  userEmail: string;
  resolutionInfo?: {
    expert: string;
    date: string;
    method: 'no_action' | 'scheduled' | 'resolved';
    reasonType?: string;
    reasonDesc?: string;
    scheduledDate?: string;
    problemCause?: string;
    resolutionDesc?: string;
    content?: string; // Legacy/General reply
  };
}

const AdminTickets: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [targetStatus, setTargetStatus] = useState<Ticket['status'] | ''>('');
  const [isReplyVisible, setIsReplyVisible] = useState(false);

  // New Resolution States
  const [resolutionMethod, setResolutionMethod] = useState<'no_action' | 'scheduled' | 'resolved' | ''>('');
  const [reasonType, setReasonType] = useState('');
  const [reasonDesc, setReasonDesc] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [problemCause, setProblemCause] = useState('');
  const [resolutionDesc, setResolutionDesc] = useState('');

  const tickets: Ticket[] = [
    {
      id: 'TK-8801',
      title: '第三方插件在消息中心无法正常弹出遮罩层',
      category: '插件问题',
      severity: '严重',
      status: 'pending',
      isExpired: false,
      userEmail: 'dev_user1@example.com',
      impactScope: '单个软件 (微信) / 消息模板',
      modulePath: '工作台 > 消息中心 > 模板配置',
      workflow: '1. 进入工作台\n2. 打开消息中心\n3. 点击模板配置\n4. 尝试开启第三方插件遮罩',
      description: '点击按钮后，背景变黑但核心弹窗未出现，控制台报错：Z-index conflict in plugin-loader.',
      createdAt: '2024-05-18 10:30',
      lastUpdated: '2024-05-18 10:30',
    },
    {
      id: 'TK-8802',
      title: 'API 接口文档中的分润比例与实际回调不符',
      category: '平台问题',
      severity: '致命',
      status: 'pending',
      isExpired: false,
      userEmail: 'finance_pro@partner.com',
      impactScope: '全部软件 / 结算资源',
      modulePath: '财务管理 > 结算单 > 导出操作',
      workflow: '调用 /api/v1/settle 接口，获取回调数据',
      description: '文档标注分润为 80%，但回调参数中的 ratio 仅为 75%。',
      createdAt: '2024-05-18 09:15',
      lastUpdated: '2024-05-18 09:15',
    },
    {
       id: 'TK-8795',
       title: '开发者基本信息修改后未即时同步',
       category: '开发问题',
       severity: '轻微',
       status: 'unresolved',
       isExpired: true,
       userEmail: 'john@startup.io',
       impactScope: '全部软件 / 个人资料',
       modulePath: '设置 > 个人中心 > 资料修改',
       workflow: '修改头像或签名并保存',
       description: '保存成功后返回页面显示旧数据。',
       createdAt: '2024-05-15 16:45',
       lastUpdated: '2024-05-16 11:00',
     }
  ];

  const getStatusGroup = (status: Ticket['status']) => {
    switch (status) {
      case 'draft': 
      case 'returned': return { group: '未受理', label: status === 'draft' ? '未提交' : '打回', color: 'bg-red-50 text-red-600' };
      case 'pending': 
      case 'unresolved': return { group: '受理中', label: status === 'pending' ? '等待答复' : '未解决', color: 'bg-blue-50 text-blue-600' };
      case 'not_solving': 
      case 'fixing': 
      case 'delayed': return { group: '已答复', label: status === 'not_solving' ? '不解决' : status === 'fixing' ? '解决中' : '延后解决', color: 'bg-amber-50 text-amber-600' };
      case 'resolved': return { group: '已解决', label: '已解决', color: 'bg-emerald-50 text-emerald-600' };
      case 'closed': return { group: '已关闭', label: '已关闭', color: 'bg-slate-100 text-slate-600' };
      default: return { group: '未知', label: '未知', color: 'bg-slate-50 text-slate-400' };
    }
  };

  const getSeverityStyle = (severity: Ticket['severity']) => {
    switch (severity) {
      case '致命': return 'text-red-700 bg-red-50 border-red-100';
      case '严重': return 'text-amber-700 bg-amber-50 border-amber-100';
      case '一般': return 'text-blue-700 bg-blue-50 border-blue-100';
      case '轻微': return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <ShieldCheck size={32} className="text-indigo-600" />
            工单受理中心
          </h1>
          <p className="text-slate-500 mt-2">后台管理与专家答复系统，处理来自开发者的技术与平台反馈。</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-4 py-2 rounded-xl border border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">待处理工单</p>
              <p className="text-2xl font-bold text-indigo-600">12</p>
           </div>
           <div className="bg-white px-4 py-2 rounded-xl border border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">平均处理时间</p>
              <p className="text-2xl font-bold text-emerald-600">45m</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filters and List */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-4">
                 <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <Filter size={14} /> 筛选条件
                 </h4>
                 <div className="space-y-3">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">搜索关键词</label>
                       <div className="relative">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                             placeholder="ID、标题、用户..." 
                             className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" 
                             value={searchQuery}
                             onChange={e => setSearchQuery(e.target.value)}
                          />
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">受理状态</label>
                       <select className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium">
                          <option>全部状态</option>
                          <option>受理中</option>
                          <option>已答复</option>
                          <option>已关闭</option>
                       </select>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">工单列表</span>
                 <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold">LATEST 20</span>
              </div>
              <div className="divide-y divide-slate-100 overflow-y-auto max-h-[600px] scrollbar-thin">
                 {tickets.map(ticket => (
                    <button 
                       key={ticket.id}
                       onClick={() => setSelectedTicket(ticket)}
                       className={`w-full text-left p-4 hover:bg-slate-50 transition-colors flex flex-col gap-2 ${selectedTicket?.id === ticket.id ? 'bg-indigo-50/50' : ''}`}
                    >
                       <div className="flex justify-between items-start">
                          <span className="text-[9px] font-mono font-bold text-slate-400">{ticket.id}</span>
                          <span className={`px-1.5 py-0.5 rounded-[4px] text-[9px] font-bold ${getStatusGroup(ticket.status).color}`}>
                             {getStatusGroup(ticket.status).label}
                          </span>
                       </div>
                       <h5 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">{ticket.title}</h5>
                       <div className="flex justify-between items-center mt-1">
                          <span className="text-[9px] text-slate-400 font-medium truncate max-w-[100px]">{ticket.userEmail}</span>
                          <span className="text-[9px] text-slate-400 font-mono tracking-tighter">{ticket.createdAt.split(' ')[0]}</span>
                       </div>
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Action and Detail Area */}
        <div className="lg:col-span-8 space-y-6">
           {selectedTicket ? (
              <div className="space-y-6 h-full items-start">
                 {/* Issue Info */}
                 <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 flex items-center gap-3">
                           <button 
                             onClick={() => setIsReplyVisible(!isReplyVisible)}
                             className={`px-4 py-1.5 rounded-full border-2 font-bold text-xs shadow-sm transition-all flex items-center gap-2 ${
                               isReplyVisible ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-indigo-100 text-indigo-600 hover:bg-indigo-50'
                             }`}
                           >
                              <MessageSquare size={14} /> {isReplyVisible ? '取消答复' : '立即答复'}
                           </button>
                           <div className={`px-4 py-1.5 rounded-full border-2 font-bold text-xs shadow-sm ${getSeverityStyle(selectedTicket.severity)}`}>
                             {selectedTicket.severity}级影响
                           </div>
                       </div>
                       
                       <div className="space-y-6 max-w-2xl">
                          <div className="space-y-2">
                             <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{selectedTicket.category}</span>
                             <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">{selectedTicket.title}</h2>
                             <div className="flex items-center gap-4 text-xs text-slate-400">
                                <span className="flex items-center gap-1.5"><User size={14} /> {selectedTicket.userEmail}</span>
                                <span className="flex items-center gap-1.5"><Clock size={14} /> 提交于 {selectedTicket.createdAt}</span>
                             </div>
                          </div>

                          {/* Reply Section Inside Detail */}
                          {isReplyVisible && (
                            <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                               <div className="flex justify-between items-center">
                                  <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                                     <PenTool size={14} /> 撰写专家答复
                                  </h3>
                                  <div className="flex gap-2">
                                     {['fixing', 'delayed', 'resolved', 'returned'].map(status => (
                                        <button 
                                           key={status}
                                           onClick={() => setTargetStatus(status as any)}
                                           className={`px-3 py-1 text-[9px] font-bold rounded-lg border transition-all ${
                                              targetStatus === status ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                                           }`}
                                        >
                                           {getStatusGroup(status as any).label}
                                        </button>
                                     ))}
                                  </div>
                               </div>

                               <div className="space-y-4">
                                  <div className="space-y-2">
                                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">解决方式</label>
                                     <div className="grid grid-cols-3 gap-3">
                                        <button onClick={() => setResolutionMethod('no_action')} className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${resolutionMethod === 'no_action' ? 'bg-white border-indigo-500 text-indigo-600 shadow-sm' : 'bg-slate-100/50 border-transparent text-slate-400'}`}>无需解决</button>
                                        <button onClick={() => setResolutionMethod('scheduled')} className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${resolutionMethod === 'scheduled' ? 'bg-white border-indigo-500 text-indigo-600 shadow-sm' : 'bg-slate-100/50 border-transparent text-slate-400'}`}>排期解决</button>
                                        <button onClick={() => setResolutionMethod('resolved')} className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${resolutionMethod === 'resolved' ? 'bg-white border-indigo-500 text-indigo-600 shadow-sm' : 'bg-slate-100/50 border-transparent text-slate-400'}`}>已解决</button>
                                     </div>
                                  </div>

                                  {resolutionMethod === 'no_action' && (
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                                        <div className="space-y-1.5">
                                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">原因类型</label>
                                           <select className="w-full px-3 py-2 bg-white border border-indigo-100 rounded-xl text-xs outline-none" value={reasonType} onChange={e => setReasonType(e.target.value)}>
                                              <option value="">请选择...</option>
                                              <option>不是问题</option>
                                              <option>不是本系统问题</option>
                                              <option>属于需求</option>
                                              <option>问题描述不清</option>
                                           </select>
                                        </div>
                                        <div className="space-y-1.5">
                                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">原因说明</label>
                                           <input className="w-full px-3 py-2 bg-white border border-indigo-100 rounded-xl text-xs outline-none" placeholder="输入说明..." value={reasonDesc} onChange={e => setReasonDesc(e.target.value)} />
                                        </div>
                                     </div>
                                  )}

                                  {resolutionMethod === 'scheduled' && (
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                                        <div className="space-y-1.5">
                                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">预计解决时间</label>
                                           <input type="date" className="w-full px-3 py-2 bg-white border border-indigo-100 rounded-xl text-xs outline-none" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} />
                                        </div>
                                        <div className="space-y-1.5">
                                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">解决说明</label>
                                           <input className="w-full px-3 py-2 bg-white border border-indigo-100 rounded-xl text-xs outline-none" placeholder="输入计划说明..." value={resolutionDesc} onChange={e => setResolutionDesc(e.target.value)} />
                                        </div>
                                     </div>
                                  )}

                                  {resolutionMethod === 'resolved' && (
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                                        <div className="space-y-1.5">
                                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">问题原因</label>
                                           <select className="w-full px-3 py-2 bg-white border border-indigo-100 rounded-xl text-xs outline-none" value={problemCause} onChange={e => setProblemCause(e.target.value)}>
                                              <option value="">请选择...</option>
                                              <option>软硬件环境问题</option>
                                              <option>系统问题</option>
                                              <option>操作问题</option>
                                              <option>数据问题</option>
                                              <option>配置问题</option>
                                              <option>其他问题</option>
                                           </select>
                                        </div>
                                        <div className="space-y-1.5">
                                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">解决说明</label>
                                           <input className="w-full px-3 py-2 bg-white border border-indigo-100 rounded-xl text-xs outline-none" placeholder="输入解决办法..." value={resolutionDesc} onChange={e => setResolutionDesc(e.target.value)} />
                                        </div>
                                     </div>
                                  )}

                                  <div className="space-y-2">
                                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">综合答复/沟通内容</label>
                                     <textarea 
                                        rows={3}
                                        placeholder="输入更详细的沟通信息..."
                                        className="w-full p-4 bg-white rounded-xl border border-indigo-100 text-sm resize-none focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                                        value={replyContent}
                                        onChange={e => setReplyContent(e.target.value)}
                                     />
                                  </div>
                               </div>

                               <div className="flex justify-end gap-3 pt-2 border-t border-indigo-100/50">
                                  <button onClick={() => setIsReplyVisible(false)} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600">取消</button>
                                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
                                     <Send size={14} /> 发送答复与处理方案
                                  </button>
                               </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-8 border-t border-slate-50 pt-6">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">影响范围</p>
                                <p className="text-sm font-semibold text-slate-700">{selectedTicket.impactScope}</p>
                             </div>
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">功能模块</p>
                                <p className="text-sm font-semibold text-slate-700">{selectedTicket.modulePath}</p>
                             </div>
                          </div>

                          <div className="space-y-4">
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                   流程复现
                                   <ChevronDown size={12} />
                                </p>
                                <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-xs font-mono leading-relaxed whitespace-pre-wrap border-l-4 border-indigo-500">
                                   {selectedTicket.workflow}
                                </div>
                             </div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">问题描述</p>
                                <div className="bg-slate-50 p-6 rounded-2xl text-sm text-slate-600 leading-relaxed italic border border-slate-100">
                                   {selectedTicket.description}
                                </div>
                             </div>
                          </div>

                          <div className="space-y-2">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">相关资源附件</p>
                             <div className="flex gap-3">
                                <button className="flex-1 flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all group">
                                   <AlertCircle size={18} className="text-slate-300 group-hover:text-amber-500" />
                                   <span className="text-[11px] font-bold text-slate-500">查看故障截图.png</span>
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all group">
                                   <Filter size={18} className="text-slate-300 group-hover:text-indigo-500" />
                                   <span className="text-[11px] font-bold text-slate-500">调试包数据.json</span>
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="h-[600px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6">
                 <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-slate-300 shadow-sm animate-pulse">
                    <ShieldCheck size={48} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-600 tracking-tight">请在左侧选择待处理工单</h3>
                    <p className="text-sm text-slate-400 max-w-[300px] mx-auto leading-relaxed">
                       选择一个工单后，您可以查看开发者提供的复现流程、环境日志并直接提供处理答复。
                    </p>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
