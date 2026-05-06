
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Puzzle, 
  Settings2, 
  Terminal, 
  CloudUpload, 
  MessageSquareCode, 
  Database, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Key,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Box,
  Sliders
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { RegistrationStatus, Developer } from '../types';

const DeveloperConsole: React.FC = () => {
  const { appCode } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('credentials');
  const [chatQuery, setChatQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Mock fetching developer details based on appCode
  const devDetails: Developer = {
    id: '1',
    name: '李小龙',
    email: 'bruce@lee.com',
    company: '功夫科技',
    status: RegistrationStatus.APPROVED,
    appCode: appCode || '',
    appKey: 'ak_prod_a1b2c3d4e5f6g7h8i9j0',
    passcode: '******',
    permissions: { 
      interfaceExchange: true, 
      desktopAdaptation: true, 
      csharpTemplate: false, 
      fileConversion: true 
    },
    expiryDate: '2025-12-31',
    purpose: '用于动作捕捉数据交换'
  };

  const handleAiAsk = async () => {
    if (!chatQuery.trim()) return;
    const userMsg = chatQuery;
    setChatQuery('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsAiLoading(true);
    
    try {
      const result = await geminiService.getDevAssistantResponse(userMsg);
      setChatHistory(prev => [...prev, { role: 'ai', content: result }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'ai', content: '抱歉，AI 助手暂时无法响应。' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const tabs = [
    { id: 'credentials', label: '凭证中心', icon: Key },
    { id: 'plugins', label: '插件发布', icon: Puzzle },
    { id: 'api', label: '接口对接', icon: Terminal },
    { id: 'model', label: '模型配置', icon: Database },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/auth')} className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">开发者空间</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={12} /> 认证通过
              </span>
              <span className="text-xs text-slate-400 font-medium">APPCODE: {appCode}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="px-5 py-2 bg-white border border-slate-200 rounded-2xl flex flex-col justify-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">凭证有效期</p>
            <p className="text-sm font-bold text-slate-800">{devDetails.expiryDate}</p>
          </div>
          <button className="px-5 py-2 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-black transition-all">续期申请</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex gap-2 p-1.5 bg-slate-200/50 rounded-2xl w-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[500px]">
            {activeTab === 'credentials' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">凭证与权限概览</h3>
                  <p className="text-sm text-slate-400 mt-1">这是您的平台访问核心凭证，请勿公开。</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">平台通证 APPKEY</label>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl relative group">
                        <code className="text-sm font-mono text-blue-700 break-all">{devDetails.appKey}</code>
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white border border-slate-100 rounded-lg text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:text-blue-600">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">已激活权限</label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { id: 'interfaceExchange', label: '交换接口 (Data Exchange)', active: devDetails.permissions.interfaceExchange },
                          { id: 'desktopAdaptation', label: '桌面适配 (Desktop UI)', active: devDetails.permissions.desktopAdaptation },
                          { id: 'csharpTemplate', label: 'C# 模板工程 (C# Template)', active: devDetails.permissions.csharpTemplate },
                          { id: 'fileConversion', label: '文件转换 (File Conversion)', active: devDetails.permissions.fileConversion },
                        ].map(p => (
                          <div key={p.id} className={`flex items-center justify-between p-3 rounded-xl border ${p.active ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                            <div className="flex items-center gap-3">
                              {p.active ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                              <span className="text-sm font-bold">{p.label}</span>
                            </div>
                            <span className="text-[10px] font-bold uppercase">{p.active ? 'Active' : 'Locked'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        <AlertCircle size={16} className="text-amber-500" /> 使用注意事项
                      </h4>
                      <ul className="mt-4 space-y-3 text-xs text-slate-500 leading-relaxed">
                        <li>• AppKey 仅限申请所属企业内部使用</li>
                        <li>• 单个接口并发限制为 10 QPS</li>
                        <li>• 所有调用均记录在案，供 AI 安全审计</li>
                        <li>• 凭证泄露请第一时间联系管理员冻结</li>
                      </ul>
                    </div>
                    <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">管理员审核备注</p>
                      <p className="text-xs text-slate-600">“资料审核通过，已根据业务场景分配高级接口权限。请参考 C# 插件模版快速开始。”</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'plugins' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">插件发布与版本管理</h3>
                    <p className="text-sm text-slate-400">将您的能力封装为插件提供给平台用户。</p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
                    <CloudUpload size={20} /> 上传新插件
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: '智能客服网关', version: 'v1.2.0', status: 'ONLINE', downloads: '1.2k' },
                    { name: '支付安全过滤', version: 'v0.9.5', status: 'BETA', downloads: '450' },
                  ].map((p, idx) => (
                    <div key={idx} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 group hover:bg-white hover:border-blue-100 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                          <Puzzle size={24} />
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>{p.status}</span>
                      </div>
                      <h4 className="font-bold text-slate-800">{p.name}</h4>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-slate-400">版本 {p.version}</span>
                        <span className="text-xs text-slate-500 font-medium">{p.downloads} 次调用</span>
                      </div>
                    </div>
                  ))}
                  <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer">
                    <CloudUpload size={32} />
                    <span className="text-sm font-bold">发布更多插件</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                 <h3 className="text-xl font-bold text-slate-900">接口对接控制台</h3>
                 <div className="bg-slate-900 rounded-2xl p-6 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto shadow-inner">
                   <p className="text-emerald-400">// 初始化 SDK 示例</p>
                   <p><span className="text-indigo-400">const</span> client = <span className="text-indigo-400">new</span> DevHubClient({`{`}</p>
                   <p className="ml-4">appCode: <span className="text-amber-300">'{appCode}'</span>,</p>
                   <p className="ml-4">appKey: <span className="text-amber-300">'{devDetails.appKey}'</span></p>
                   <p>{`}`});</p>
                   <p className="mt-4 text-emerald-400">// 调用智能解析接口</p>
                   <p><span className="text-indigo-400">await</span> client.parse(<span className="text-amber-300">'Hello, DevHub!'</span>);</p>
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="flex gap-3">
                       <CheckCircle2 className="text-emerald-500" />
                       <span className="text-sm font-bold text-slate-700">认证接口 (Auth API)</span>
                     </div>
                     <span className="text-xs text-slate-400 font-mono">200 OK</span>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="flex gap-3">
                       <CheckCircle2 className="text-emerald-500" />
                       <span className="text-sm font-bold text-slate-700">数据推送接口 (Ingest API)</span>
                     </div>
                     <span className="text-xs text-slate-400 font-mono">200 OK</span>
                   </div>
                 </div>
              </div>
            )}
            
            {activeTab === 'model' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold text-slate-900">模型参数配置</h3>
                <div className="space-y-6 max-w-lg">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">推理模型选择</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500">
                      <option>DevHub-Pro-v3 (推荐)</option>
                      <option>DevHub-Flash-v2 (低延迟)</option>
                      <option>DevHub-Large-v1 (高精准)</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">Temperature (多样性): 0.7</label>
                    <input type="range" className="w-full" />
                  </div>
                  <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold">保存配置</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Resource Links Sidebar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <ExternalLink size={18} className="text-blue-600" /> 快捷资源入口
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

          {/* AI Chatbot */}
          <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col h-[500px] relative overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                <MessageSquareCode size={16} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">AI 开发助理</h4>
                <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Active Assistant</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
              <div className="bg-slate-800/50 p-4 rounded-2xl rounded-tl-none border border-slate-800/50 max-w-[90%]">
                <p className="text-xs text-slate-300 leading-relaxed">
                  你好！我是您的专属开发助理。您可以查阅权限范围内的任何资料或咨询技术细节。
                </p>
              </div>
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 rounded-2xl max-w-[90%] text-xs leading-relaxed border ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none border-blue-500' 
                      : 'bg-slate-800/50 text-slate-300 rounded-tl-none border-slate-800/50'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/50 p-4 rounded-2xl rounded-tl-none border border-slate-800/50 flex gap-1">
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-1.5 border border-slate-700/50 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <input 
                  type="text" 
                  value={chatQuery}
                  onChange={e => setChatQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAiAsk()}
                  placeholder="询问开发问题..."
                  className="bg-transparent border-none outline-none flex-1 text-xs text-white"
                />
                <button 
                  onClick={handleAiAsk}
                  disabled={isAiLoading || !chatQuery.trim()}
                  className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <ArrowLeft size={14} className="rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperConsole;
