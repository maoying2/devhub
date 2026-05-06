
import React from 'react';
import { Book, Code, Download, FileText, Search, Tag, ChevronRight, Share2, Star, ShieldCheck } from 'lucide-react';
import { HelperUserType } from '../types';

const Documentation: React.FC = () => {
  const [filter, setFilter] = React.useState<HelperUserType | 'ALL'>('ALL');

  const categories = [
    { name: '入门指南', count: 12, icon: Book, types: ['USER', 'DEVELOPER'] },
    { name: 'API 参考', count: 48, icon: Code, types: ['DEVELOPER'] },
    { name: '软件 SDK', count: 8, icon: Download, types: ['DEVELOPER'] },
    { name: '管理手册', count: 5, icon: FileText, types: ['ADMIN'] },
    { name: '核心准则', count: 15, icon: ShieldCheck, types: ['ALL'] },
  ];

  const articles = [
    { title: '智能模型对接标准 2.0', size: '2.4 MB', type: 'PDF', date: '2024-03-20', tags: ['规范', '核心'], userType: 'DEVELOPER' },
    { title: '管理员快速上手手册', size: '1.2 MB', type: 'PDF', date: '2024-03-22', tags: ['管理', '必读'], userType: 'ADMIN' },
    { title: '普通用户软件使用指南', size: '5.8 MB', type: 'PDF', date: '2024-03-18', tags: ['使用'], userType: 'USER' },
    { title: 'Java SDK 核心包 (v4.5.1)', size: '15.8 MB', type: 'ZIP', date: '2024-03-15', tags: ['SDK', 'Java'], userType: 'DEVELOPER' },
    { title: '系统安全审计规范', size: '1.1 MB', type: 'PDF', date: '2024-03-10', tags: ['安全', '合规'], userType: 'ADMIN' },
  ];

  const filteredArticles = articles.filter(a => filter === 'ALL' || a.userType === filter);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">系统帮助中心</h1>
          <p className="text-slate-500 mt-2">获取最新的 SDK、管理手册以及用户使用指南。</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
          {(['ALL', 'DEVELOPER', 'USER', 'ADMIN'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === t ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t === 'ALL' ? '全部' : t === 'DEVELOPER' ? '开发人员' : t === 'USER' ? '普通用户' : '管理员'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {categories.filter(c => filter === 'ALL' || c.types.includes(filter as any) || c.types.includes('ALL')).map((cat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 transition-all group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                <cat.icon size={20} className="text-blue-600" />
              </div>
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{cat.name}</h3>
            <p className="text-[10px] text-slate-400 mt-1">{cat.count} 个资源</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Star className="text-amber-500 fill-amber-500" size={20} /> 资料列表
            </h2>
            <div className="space-y-4">
              {filteredArticles.map((res, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:border-slate-200 hover:bg-slate-50 transition-all">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 text-xs uppercase">
                      {res.type}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-800 hover:text-blue-600 cursor-pointer">{res.title}</h4>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          res.userType === 'DEVELOPER' ? 'bg-blue-100 text-blue-600' :
                          res.userType === 'ADMIN' ? 'bg-purple-100 text-purple-600' :
                          'bg-emerald-100 text-emerald-600'
                        }`}>
                          {res.userType === 'DEVELOPER' ? '开发' : res.userType === 'ADMIN' ? '管理' : '用户'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-400">{res.size} · {res.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Download size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">需要技术支持？</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                如果以上资料未能解决您的问题，请联系我们的技术经理，或发起工单咨询。
              </p>
              <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40">
                发起在线工单
              </button>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Book size={120} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Tag size={18} className="text-slate-400" /> 热门标签</h4>
            <div className="flex flex-wrap gap-2">
              {['Gemini', 'API', 'Webhooks', 'OAuth2', 'Cloud SDK', 'Security', 'Compliance', 'Beta', 'Analytics'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
