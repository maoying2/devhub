
import React from 'react';
import { ShieldCheck, Zap, Database, Share2, Layers, Cpu, ArrowRight, CheckCircle, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 text-white p-12 lg:p-20">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Database size={400} className="absolute -top-20 -right-20" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Zap size={14} /> 全新一代软件数据交换
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
            连接孤岛数据，<br />
            <span className="text-blue-500">赋能软件生态</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            我们提供安全、高效、标准化的数据交换协议，助力开发者轻松打通跨平台业务流。
            通过 DevHub，合作伙伴可以快速获取授权，发布插件并实现深度业务集成。
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/registration')}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-900 transition-all flex items-center gap-2 group"
            >
              申请成为合作伙伴 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/docs')}
              className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 border border-slate-700 transition-all"
            >
              查看技术文档
            </button>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">核心交换能力</h2>
          <p className="text-slate-500">
            不仅仅是简单的 API 调用，我们构建了一整套覆盖资料获取、插件发布及模型配置的深度合作框架。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Share2} 
            title="多维数据同步" 
            desc="支持实时流式数据、批量定时同步以及基于事件触发的精准数据交换，满足多种业务场景需求。"
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="金融级安全保障" 
            desc="采用 APPCODE+APPKEY 双重认证机制，结合数据脱敏与端到端加密，确保合作数据的绝对隐私与合规。"
          />
          <FeatureCard 
            icon={Layers} 
            title="灵活的插件架构" 
            desc="开发者可封装自有能力为标准插件发布，通过平台快速触达最终用户，实现技术变现与生态扩展。"
          />
        </div>
      </section>

      {/* Details Section */}
      <section className="bg-white rounded-[3rem] border border-slate-200 p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-slate-900 leading-tight">
            从注册到上线，<br />
            只需简单三步
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: '注册申请', desc: '填写开发者信息与合作意向，通过 AI 智能初审与人工复核。' },
              { step: '02', title: '资料获取', desc: '根据授权等级，获取专属 APPCODE 与全套技术开发包。' },
              { step: '03', title: '对接发布', desc: '进行插件接口调试或模型配置，一键发布至交换中心。' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="text-4xl font-black text-slate-100 group-hover:text-blue-500 transition-colors duration-300">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
             <button 
              onClick={() => navigate('/registration')}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all"
             >
               立即开始
             </button>
          </div>
        </div>

        <div className="relative">
          <div className="bg-slate-100 rounded-3xl p-8 aspect-square flex flex-col justify-between border border-slate-200 overflow-hidden group">
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                <Code2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 italic">"高效对接，生态共赢"</h3>
              <p className="text-slate-500 text-sm italic">
                “作为合作伙伴，我们通过 DevHub 快速集成了核心业务模块，大幅降低了跨系统数据传输的研发成本。”
              </p>
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-blue-200"></div>
              <div>
                <p className="text-sm font-bold text-slate-800">王经理</p>
                <p className="text-xs text-slate-400">首席技术合作伙伴</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center pb-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">准备好提升您的数据交换能力了吗？</h2>
        <p className="text-slate-500 mb-10 max-w-xl mx-auto">
          我们对合作伙伴的筛选保持严谨态度，以确保生态的高质量与安全性。
        </p>
        <button 
          onClick={() => navigate('/registration')}
          className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all text-lg"
        >
          立即提交申请
        </button>
      </section>
    </div>
  );
};

export default Landing;
