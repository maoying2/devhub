import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Send,
  User,
  Paperclip,
  X,
  Camera,
  PenTool
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
  resolutionInfo?: {
    expert: string;
    date: string;
    method: 'no_action' | 'scheduled' | 'resolved';
    reasonType?: string;
    reasonDesc?: string;
    scheduledDate?: string;
    problemCause?: string;
    resolutionDesc?: string;
    content?: string;
    attachments?: string[];
  };
}

const Tickets: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [form, setForm] = useState({
    title: '',
    category: '开发问题',
    impactRange: '全部软件',
    resourceType: '全部资源',
    menu: '',
    page: '',
    action: '',
    workflow: '',
    description: '',
    severity: '一般',
    screenshots: [] as string[],
    attachments: [] as string[],
  });

  const tickets: Ticket[] = [
    {
      id: 'TK-8801',
      title: '第三方插件在消息中心无法正常弹出遮罩层',
      category: '插件问题',
      severity: '严重',
      status: 'fixing',
      isExpired: false,
      impactScope: '单个软件 (微信) / 消息模板',
      modulePath: '工作台 > 消息中心 > 模板配置',
      workflow: '1. 进入工作台\n2. 打开消息中心\n3. 点击模板配置\n4. 尝试开启第三方插件遮罩',
      description: '点击按钮后，背景变黑但核心弹窗未出现，控制台报错：Z-index conflict in plugin-loader.',
      createdAt: '2024-05-18 10:30',
      lastUpdated: '2024-05-18 11:20',
      resolutionInfo: {
        expert: '内核工程部-张工',
        method: 'scheduled',
        content: '初步定位为样式隔离冲突，正在适配新的遮罩渲染逻辑。',
        scheduledDate: '2024-05-25',
        resolutionDesc: '适配最新的 z-index 渲染层级逻辑',
        date: '2024-05-18 11:15'
      }
    },
    {
      id: 'TK-8802',
      title: 'API 接口文档中的分润比例与实际回调不符',
      category: '平台问题',
      severity: '致命',
      status: 'pending',
      isExpired: false,
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
      status: 'returned',
      isExpired: true,
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

  const getSeverityColor = (severity: Ticket['severity']) => {
    switch (severity) {
      case '致命': return 'text-red-700 bg-red-50 border-red-100';
      case '严重': return 'text-amber-700 bg-amber-50 border-amber-100';
      case '一般': return 'text-blue-700 bg-blue-50 border-blue-100';
      case '轻微': return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <MessageSquare size={32} className="text-blue-600" />
            在线问题工单
          </h1>
          <p className="text-slate-500 mt-2">提交技术疑问或业务反馈，AI 与人工专家将为您快速响应。</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('list')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'list' 
              ? 'bg-slate-900 text-white' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            工单列表
          </button>
          <button 
            onClick={() => setActiveTab('create')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'create' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border border-blue-200 text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Plus size={18} /> 发起新工单
          </button>
        </div>
      </div>

      {activeTab === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* List Section */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  placeholder="搜索工单标题或状态..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg">
                <Filter size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {tickets.filter(t => t.title.includes(searchQuery)).map((ticket) => {
                const statusInfo = getStatusGroup(ticket.status);
                return (
                  <button 
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`w-full text-left bg-white p-5 rounded-2xl border-2 transition-all hover:shadow-lg ${
                      selectedTicket?.id === ticket.id ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{ticket.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSeverityColor(ticket.severity)}`}>
                          {ticket.severity}级
                        </span>
                        {ticket.isExpired && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white flex items-center gap-1">
                            <Clock size={10} /> 已过期
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{statusInfo.group}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2 truncate">{ticket.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-500">
                      <span className="font-bold text-slate-700">{ticket.category}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {ticket.createdAt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details / Sidebar */}
          <div className="space-y-6">
            {selectedTicket ? (
              <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden sticky top-8 shadow-2xl shadow-slate-200/50">
                <div className="bg-slate-900 p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="font-bold text-base leading-tight">{selectedTicket.title}</h2>
                    <button onClick={() => setSelectedTicket(null)} className="p-1 hover:bg-white/10 rounded-lg"><X size={16} /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest">{selectedTicket.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getSeverityColor(selectedTicket.severity)}`}>
                      {selectedTicket.severity}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusGroup(selectedTicket.status).color}`}>
                      {getStatusGroup(selectedTicket.status).label}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin">
                   <section className="space-y-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">问题详情</h4>
                      <div className="grid grid-cols-2 gap-4 text-[11px]">
                         <div>
                            <p className="text-slate-400 mb-1">功能模块</p>
                            <p className="text-slate-700 font-medium">{selectedTicket.modulePath}</p>
                         </div>
                         <div>
                            <p className="text-slate-400 mb-1">影响范围</p>
                            <p className="text-slate-700 font-medium">{selectedTicket.impactScope}</p>
                         </div>
                      </div>
                      
                      <div>
                         <p className="text-[10px] text-slate-400 mb-1.5 uppercase font-bold">操作流程描述</p>
                         <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed whitespace-pre-wrap border border-slate-100">
                           {selectedTicket.workflow}
                         </div>
                      </div>

                      <div>
                         <p className="text-[10px] text-slate-400 mb-1.5 uppercase font-bold">问题现象描述</p>
                         <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed italic border border-slate-100">
                           {selectedTicket.description}
                         </div>
                      </div>
                   </section>

                   <section className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">附件与截图</h4>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="aspect-video bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-blue-200 transition-all">
                            <Camera size={20} className="text-slate-300 group-hover:text-blue-400" />
                            <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-500">查看故障截图</span>
                         </div>
                         <div className="aspect-video bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-blue-200 transition-all">
                            <Paperclip size={20} className="text-slate-300 group-hover:text-blue-400" />
                            <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-500">下载问题数据</span>
                         </div>
                      </div>
                   </section>

                   {selectedTicket.resolutionInfo && (
                     <section className="space-y-3 pt-4 border-t border-slate-100">
                        <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                           <CheckCircle2 size={12} /> 处理结果与答复
                        </h4>
                        <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl space-y-4 shadow-sm shadow-blue-100/50">
                           <div className="flex justify-between items-center text-[10px]">
                              <span className="font-bold text-blue-800 flex items-center gap-1.5 bg-blue-100/50 px-2 py-1 rounded-lg">
                                 <User size={12} /> {selectedTicket.resolutionInfo.expert}
                              </span>
                              <span className="text-slate-400 font-mono">{selectedTicket.resolutionInfo.date}</span>
                           </div>

                           <div className="space-y-3">
                              {selectedTicket.resolutionInfo.method === 'no_action' && (
                                 <div className="bg-white/60 p-3 rounded-xl border border-blue-100 space-y-2">
                                    <div className="flex items-center justify-between">
                                       <span className="text-[10px] font-bold text-slate-400">解决方式：无需解决</span>
                                       <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">{selectedTicket.resolutionInfo.reasonType}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 font-medium">说明：{selectedTicket.resolutionInfo.reasonDesc}</p>
                                 </div>
                              )}

                              {selectedTicket.resolutionInfo.method === 'scheduled' && (
                                 <div className="bg-white/60 p-3 rounded-xl border border-blue-100 space-y-2">
                                    <div className="flex items-center justify-between">
                                       <span className="text-[10px] font-bold text-slate-400">解决方式：排期解决</span>
                                       <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">预计：{selectedTicket.resolutionInfo.scheduledDate}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 font-medium">计划：{selectedTicket.resolutionInfo.resolutionDesc}</p>
                                 </div>
                              )}

                              {selectedTicket.resolutionInfo.method === 'resolved' && (
                                 <div className="bg-white/60 p-3 rounded-xl border border-blue-100 space-y-2">
                                    <div className="flex items-center justify-between">
                                       <span className="text-[10px] font-bold text-slate-400">解决方式：已解决</span>
                                       <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">原因：{selectedTicket.resolutionInfo.problemCause}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 font-medium">方案：{selectedTicket.resolutionInfo.resolutionDesc}</p>
                                 </div>
                              )}

                              {selectedTicket.resolutionInfo.content && (
                                 <div className="pt-2 border-t border-blue-100/50">
                                    <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1 italic">附加说明</p>
                                    <p className="text-xs text-blue-700 leading-relaxed font-medium">
                                       {selectedTicket.resolutionInfo.content}
                                    </p>
                                 </div>
                              )}
                           </div>
                        </div>
                     </section>
                   )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] p-10 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm">
                   <MessageSquare size={24} />
                </div>
                <div className="space-y-1">
                   <h3 className="font-bold text-slate-600">点击工单查看详情</h3>
                   <p className="text-xs text-slate-400 max-w-[200px]">选择一个工单以查看对话历史、解决进度或提交新回复。</p>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 space-y-4">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">本月统计</h4>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                     <p className="text-[10px] text-slate-500 font-bold mb-1">解决率</p>
                     <p className="text-xl font-bold text-slate-800">92%</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                     <p className="text-[10px] text-slate-500 font-bold mb-1">平均响应</p>
                     <p className="text-xl font-bold text-slate-800">1.5h</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-slate-900 p-10 text-center text-white">
             <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/20">
                <Plus size={32} />
             </div>
             <h2 className="text-2xl font-bold tracking-tight">提交新工单</h2>
             <p className="text-slate-400 text-sm mt-2">请详细描述您遇到的问题，通常在 2 小时内获得人工回复。</p>
          </div>
          
          <form className="p-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">问题标题</label>
                <input 
                  required
                  type="text" 
                  placeholder="一句话简述您的问题..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 outline-none text-sm transition-all"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">问题种类</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm transition-all bg-white"
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                >
                  <option>开发问题</option>
                  <option>插件问题</option>
                  <option>平台问题</option>
                </select>
              </div>
            </div>

            {/* Impact Scope */}
            <div className="space-y-4">
               <h3 className="text-xs font-bold text-slate-800 border-l-4 border-blue-500 pl-3">影响范围</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">影响软件</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input type="radio" name="sw" checked={form.impactRange === '全部软件'} onChange={() => setForm({...form, impactRange: '全部软件'})} className="text-blue-600" /> 全部软件
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input type="radio" name="sw" checked={form.impactRange === '单个软件'} onChange={() => setForm({...form, impactRange: '单个软件'})} className="text-blue-600" /> 单个软件
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">影响资源</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input type="radio" name="res" checked={form.resourceType === '全部资源'} onChange={() => setForm({...form, resourceType: '全部资源'})} className="text-blue-600" /> 全部类型
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input type="radio" name="res" checked={form.resourceType === '单个资源类型'} onChange={() => setForm({...form, resourceType: '单个资源类型'})} className="text-blue-600" /> 单个类型
                    </label>
                  </div>
                </div>
               </div>
            </div>

            {/* Module Path */}
            <div className="space-y-4">
               <h3 className="text-xs font-bold text-slate-800 border-l-4 border-amber-500 pl-3">功能模块 (菜单 &gt; 页面 &gt; 操作)</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input placeholder="一级菜单 (如: 设置)" className="px-4 py-2 text-sm bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" value={form.menu} onChange={e => setForm({...form, menu: e.target.value})} />
                  <input placeholder="子页面 (如: 账号)" className="px-4 py-2 text-sm bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" value={form.page} onChange={e => setForm({...form, page: e.target.value})} />
                  <input placeholder="具体操作 (如: 修改密码)" className="px-4 py-2 text-sm bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" value={form.action} onChange={e => setForm({...form, action: e.target.value})} />
               </div>
            </div>

            {/* Content areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">操作流程描述</label>
                  <textarea rows={4} placeholder="请描述产生问题的具体操作步骤..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 outline-none text-sm transition-all resize-none" value={form.workflow} onChange={e => setForm({...form, workflow: e.target.value})} />
               </div>
               <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">问题现象描述</label>
                  <textarea rows={4} placeholder="描述实际发生的错误或现象..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 outline-none text-sm transition-all resize-none" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">严重等级</label>
                  <div className="grid grid-cols-4 gap-2">
                     {['轻微', '一般', '严重', '致命'].map(level => (
                        <button 
                          key={level}
                          type="button"
                          onClick={() => setForm({...form, severity: level as any})}
                          className={`py-2 text-[10px] font-bold rounded-lg border-2 transition-all ${
                            form.severity === level ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                           {level}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">问题截图 (必填)</label>
                  <div className="p-4 border-2 border-dashed border-blue-100 rounded-xl bg-blue-50/30 text-center cursor-pointer hover:bg-blue-50 transition-all">
                     <Camera size={20} className="mx-auto text-blue-400 mb-1" />
                     <p className="text-[10px] text-blue-600 font-bold">点击或拖拽上传截图</p>
                  </div>
               </div>
            </div>

            <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-100 rounded-2xl text-center">
               <div className="flex flex-col items-center">
                  <Paperclip size={24} className="text-slate-300 mb-2" />
                  <p className="text-xs text-slate-500">上传其它问题数据附件 (可选)</p>
                  <p className="text-[10px] text-slate-400 mt-1">支持 Log, JSON, PNG, JPG, PDF (最大 20MB)</p>
               </div>
            </div>

            <div className="flex gap-4">
               <button type="submit" className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-100">
                  确认提交工单
               </button>
               <button 
                 type="button" 
                 onClick={() => setActiveTab('list')}
                 className="px-8 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
               >
                 取消
               </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tickets;
