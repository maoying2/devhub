
import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Database, 
  Share2, 
  Layers, 
  Cpu, 
  ArrowRight, 
  CheckCircle, 
  Code2, 
  Puzzle, 
  Terminal, 
  FileJson, 
  GitMerge, 
  FileStack, 
  Briefcase, 
  TrendingUp, 
  Globe2, 
  Rocket, 
  UserPlus, 
  PenTool, 
  ShoppingBag, 
  Coins, 
  Handshake,
  LayoutGrid,
  Building2,
  AppWindow,
  Search,
  Filter,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const vendors = [
    {
      id: '1',
      name: '智胜科技 (Winner Tech)',
      type: '核心供应商',
      location: '上海',
      software: [
        { name: 'WS-ERP 智管系统', version: 'v8.2', status: '已连接', mode: '插件扩展' },
        { name: 'WS-Cloud 数据中心', version: 'v2.1', status: '待审核', mode: 'API 适配' }
      ]
    },
    {
      id: '2',
      name: '蓝图工业 (Blueprint Industrial)',
      type: '生态合作伙伴',
      location: '深圳',
      software: [
        { name: 'BP-CAD 工业建模', version: 'v2024', status: '已连接', mode: '数据库读写' },
      ]
    },
    {
      id: '3',
      name: '灵犀互联 (LinkConnect)',
      type: '初创公司',
      location: '杭州',
      software: [
        { name: 'LC-Gateway 智能网关', version: 'v1.0', status: '联调中', mode: '文件交换' },
      ]
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 text-white p-12 lg:p-20 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Database size={400} className="absolute -top-20 -right-20" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Zap size={14} /> 开发者中心 · 生态赋能平台
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            打通应用边界，<br />
            <span className="text-blue-500">重塑软件价值</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
            提供全栈式软件适配与数据交换方案。无论您的软件是基于何种架构，都能通过我们的标准化平台触达更广阔的应用场景。
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/registration')}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-900 transition-all flex items-center gap-2 group"
            >
              入驻开发者生态 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('vendors-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 border border-slate-700 transition-all"
            >
              查看现有厂商
            </button>
          </div>
        </div>
      </section>

      {/* Software Adaptation Modes - 软件适配模式 (Core Capabilities) */}
      <section className="space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl font-bold text-slate-900 font-sans tracking-tight">核心软件适配模式</h2>
          <p className="text-slate-500 text-lg">
            我们提供四种灵活的集成方案，确保各种形态的软件都能在平台内实现无缝互联。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: '插件扩展', 
              icon: Puzzle, 
              color: 'text-blue-600', 
              bg: 'bg-blue-50',
              desc: '通过封装标准插件模块，实现功能的动态载入与UI深度集成。',
              diagram: (
                <div className="flex items-center justify-center gap-2 border-2 border-dashed border-blue-200 rounded-xl p-4 bg-blue-50/30">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                  <ArrowRight size={14} className="text-blue-400" />
                  <div className="w-12 h-12 bg-white border-2 border-blue-600 rounded flex items-center justify-center">
                    <Puzzle size={16} className="text-blue-600" />
                  </div>
                </div>
              )
            },
            { 
              title: 'API 适配', 
              icon: Terminal, 
              color: 'text-indigo-600', 
              bg: 'bg-indigo-50',
              desc: '基于 RESTful 或 gRPC 接口，提供标准化的协议转换与端到端访问。',
              diagram: (
                <div className="flex items-center justify-center gap-2 border-2 border-dashed border-indigo-200 rounded-xl p-4 bg-indigo-50/30">
                  <div className="px-2 py-1 bg-slate-800 rounded font-mono text-[8px] text-white">GET /api</div>
                  <ArrowRight size={14} className="text-indigo-400" />
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                    <Terminal size={14} />
                  </div>
                </div>
              )
            },
            { 
              title: '数据库读写', 
              icon: Database, 
              color: 'text-emerald-600', 
              bg: 'bg-emerald-50',
              desc: '直接对接到主流数据库，实现高效的数据层双向同步与聚合。',
              diagram: (
                <div className="flex items-center justify-center gap-2 border-2 border-dashed border-emerald-200 rounded-xl p-4 bg-emerald-50/30">
                  <div className="flex flex-col gap-1">
                    <div className="w-6 h-1.5 bg-emerald-600 rounded"></div>
                    <div className="w-6 h-1.5 bg-emerald-400 rounded"></div>
                  </div>
                  <GitMerge size={14} className="text-emerald-400" />
                  <Database size={24} className="text-emerald-600" />
                </div>
              )
            },
            { 
              title: '文件交换', 
              icon: FileStack, 
              color: 'text-amber-600', 
              bg: 'bg-amber-50',
              desc: '支持大体积文件、行业私有格式文件的异步传输与格式转换。',
              diagram: (
                <div className="flex items-center justify-center gap-2 border-2 border-dashed border-amber-200 rounded-xl p-4 bg-amber-50/30">
                   <FileJson size={20} className="text-amber-600" />
                   <ArrowRight size={14} className="text-amber-400" />
                   <FileStack size={20} className="text-amber-700" />
                </div>
              )
            }
          ].map((mode, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className={`w-14 h-14 ${mode.bg} ${mode.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <mode.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{mode.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">{mode.desc}</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">适配示意</p>
                {mode.diagram}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Development Flow - 开发流程 (Ultra Compact) */}
      <section className="bg-slate-50 rounded-[2.5rem] p-8 lg:px-12 lg:py-10 border border-slate-200">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="shrink-0 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">标准开发流程</h2>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Four Steps to Success</p>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              { id: '01', title: '软件注册', icon: UserPlus },
              { id: '02', title: '建模与映射', icon: PenTool },
              { id: '03', title: '适配器开发', icon: Code2 },
              { id: '04', title: '市场发布', icon: Rocket },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-blue-200 transition-all">
                <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <item.icon size={18} />
                </div>
                <span className="text-[10px] font-bold text-blue-500 mb-0.5">STEP {item.id}</span>
                <p className="text-xs font-bold text-slate-800">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendors Section - 已入驻厂商 (Compact List) */}
      <section id="vendors-section" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">已入驻合作伙伴</h2>
            <p className="text-slate-500 text-sm mt-1">共同构建开放、协同、共赢的软件生态圈。</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="搜索厂商或软件..."
                className="pl-8 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none w-48"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                      {vendor.name}
                      {vendor.type === '核心供应商' && <ShieldCheck size={14} className="text-blue-500" />}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{vendor.type} • {vendor.location}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="flex -space-x-1 shrink-0 px-2 py-1 bg-slate-50 rounded-lg">
                    {vendor.software.map((sw, i) => (
                       <span key={i} className="text-[9px] bg-white border border-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-600 shadow-sm" title={sw.name}>
                          {sw.name.split(' ')[0]}
                       </span>
                    ))}
                  </div>
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cooperation & Values - 合作方式与价值 */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4">
        {/* Cooperation Methods */}
        <div className="space-y-8">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Handshake size={20} /></div>
              <h3 className="text-2xl font-bold text-slate-900">多样化合作方式</h3>
           </div>
           <div className="grid grid-cols-1 gap-4">
              {[
                { title: '项目分成', icon: TrendingUp, desc: '基于订阅或使用频率的长期收益分成模式。' },
                { title: '单独销售', icon: ShoppingBag, desc: '在插件市场直接向用户售卖您的功能包。' },
                { title: '一次性买断', icon: Coins, desc: '根据能力评估进行的专项技术或软件采购。' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl border border-slate-200 flex items-center gap-6 group hover:border-blue-200 transition-all">
                  <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center group-hover:text-blue-600 transition-colors">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Benefits & Value */}
        <div className="space-y-8">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Rocket size={20} /></div>
              <h3 className="text-2xl font-bold text-slate-900">核心利益与生态价值</h3>
           </div>
           <div className="space-y-4">
              {[
                { 
                  title: '软件推广新渠道', 
                  desc: '将您的产品直接推送至平台万级精准客户群体，实现更高效的用户获取。',
                  icon: Globe2
                },
                { 
                  title: '更强的集成能力', 
                  desc: '通过该平台，您的软件自动具备了与其他数十款业内主流软件的集成能力。',
                  icon: GitMerge
                },
                { 
                  title: '拓展应用场景', 
                  desc: '在复杂的工业级、工程级场景中，通过交换协议实现更深度的业务闭环。',
                  icon: Briefcase
                }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100/50 flex gap-6">
                  <div className="text-emerald-600 mt-1"><CheckCircle size={20} /></div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-emerald-700 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <h2 className="text-4xl font-bold mb-6 relative z-10">准备好开启共赢之旅了吗？</h2>
        <p className="text-blue-100 mb-10 max-w-xl mx-auto text-lg relative z-10">
          加入我们的全球开发者计划，获取顶级技术支持与市场机会。
        </p>
        <div className="flex justify-center gap-4 relative z-10">
           <button 
             onClick={() => navigate('/registration')}
             className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold hover:shadow-xl transition-all text-lg"
           >
             立即入驻申请
           </button>
           <button 
             onClick={() => document.getElementById('vendors-section')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-10 py-5 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 transition-all text-lg border border-blue-500"
           >
             浏览合作伙伴列表
           </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
