
import React, { useState } from 'react';
import { 
  Book, 
  Code, 
  Download, 
  FileText, 
  Search, 
  ChevronRight, 
  ShieldCheck, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Trash2, 
  LayoutGrid, 
  History,
  FileCode,
  Users,
  Settings,
  Lock,
  ChevronDown,
  ExternalLink,
  Filter
} from 'lucide-react';
import { HelperUserType } from '../types';

interface DocRecord {
  id: number;
  name: string;
  type: string;
  publisher: string;
  publishTime: string;
  category: string;
  visibility: HelperUserType[];
}

const Documentation: React.FC = () => {
  // Mock current user identity for demo
  const [currentUserRole, setCurrentUserRole] = useState<HelperUserType>('USER');
  const [isRegisteredDev, setIsRegisteredDev] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('用户手册');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { title: '快速入门', icon: History, subMenus: ['入门说明', '系统简介'], access: ['USER', 'DEVELOPER', 'ADMIN'] },
    { title: '开发资料', icon: FileCode, subMenus: ['SDK手册', 'API文档', '数据字典'], access: ['DEVELOPER'] },
    { title: '用户手册', icon: Book, subMenus: ['基础功能', '高级应用', '常见问题'], access: ['USER', 'DEVELOPER', 'ADMIN'] },
    { title: '管理员资料', icon: Settings, subMenus: ['系统维护', '权限分配', '审计指南'], access: ['ADMIN'] },
    { title: '测试221', icon: LayoutGrid, subMenus: ['模块A', '模块B'], access: ['ADMIN'] },
  ];

  const allDocuments: DocRecord[] = [
    { id: 1, name: 'CMakeLists.txt', type: 'txt', publisher: 'administrator', publishTime: '2024-05-07 09:31:49', category: '开发资料', visibility: ['DEVELOPER'] },
    { id: 2, name: '系统初始化指南.pdf', type: 'pdf', publisher: 'system_manager', publishTime: '2024-04-12 10:20:00', category: '用户手册', visibility: ['USER', 'DEVELOPER', 'ADMIN'] },
    { id: 3, name: '核心交换协议说明书.docx', type: 'docx', publisher: 'dev_lead', publishTime: '2024-03-15 14:45:12', category: '开发资料', visibility: ['DEVELOPER'] },
    { id: 4, name: '管理员审计规范.pdf', type: 'pdf', publisher: 'security_officer', publishTime: '2024-05-01 16:00:00', category: '管理员资料', visibility: ['ADMIN'] },
    { id: 5, name: '软件安装包 v2.0.zip', type: 'zip', publisher: 'administrator', publishTime: '2024-05-06 11:30:00', category: '快速入门', visibility: ['USER', 'DEVELOPER', 'ADMIN'] },
    { id: 6, name: 'API调用频率限制策略.txt', type: 'txt', publisher: 'api_admin', publishTime: '2024-04-28 09:12:00', category: '开发资料', visibility: ['DEVELOPER'] },
  ];

  // Helper function to check if user can see a category
  const canViewCategory = (access: string[]) => {
    // Ordinary users who haven't bound to a developer cannot view developer info (DEVELOPER category)
    if (access.includes('DEVELOPER') && !isRegisteredDev && currentUserRole !== 'DEVELOPER') {
      return false;
    }
    
    // User help (USER category) is accessible to all
    if (access.includes('USER')) return true;

    // Admin help (ADMIN category) is only for admins
    if (access.includes('ADMIN') && currentUserRole === 'ADMIN') return true;

    // Developer help (DEVELOPER category) is for registered devs/bound users
    if (access.includes('DEVELOPER') && (isRegisteredDev || currentUserRole === 'DEVELOPER')) return true;

    return false;
  };

  // Visibility logic for individual documents
  const isAccessible = (doc: DocRecord) => {
    // Admins can view User Help and Admin Help
    if (currentUserRole === 'ADMIN') {
      return doc.visibility.includes('USER') || doc.visibility.includes('ADMIN');
    }
    
    // Bound users / Developers can view User Help and Developer Help
    if (currentUserRole === 'DEVELOPER' || isRegisteredDev) {
      return doc.visibility.includes('USER') || doc.visibility.includes('DEVELOPER');
    }

    // Normal users who haven't bound only see User Help
    return doc.visibility.includes('USER');
  };

  const filteredDocs = allDocuments.filter(doc => 
    isAccessible(doc) && 
    (activeCategory === 'ALL' || doc.category === activeCategory) &&
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Role Switcher for Demo */}
      <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center justify-between text-xs font-bold text-blue-700">
        <div className="flex items-center gap-4">
          <span>当前身份模拟:</span>
          <div className="flex gap-2">
            {[
              { role: 'USER', label: '普通用户' },
              { role: 'DEVELOPER', label: '开发者' },
              { role: 'ADMIN', label: '管理员' }
            ].map(r => (
              <button 
                key={r.role}
                onClick={() => setCurrentUserRole(r.role as HelperUserType)}
                className={`px-3 py-1 rounded-lg border transition-all ${currentUserRole === r.role ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-200'}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-60">绑定状态:</span>
          <button 
             onClick={() => setIsRegisteredDev(!isRegisteredDev)}
             className={`px-3 py-1 rounded-lg border transition-all ${isRegisteredDev ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-200 text-slate-600 border-slate-300'}`}
          >
            {isRegisteredDev ? '已绑定开发者' : '未绑定开发者'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-280px)] min-h-[600px]">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden shrink-0">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">导航</h3>
            <span className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">维护</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
             <button 
               onClick={() => setActiveCategory('新建菜单')}
               className="w-full text-left px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2 mb-2"
             >
               <Plus size={16} /> 新建菜单
             </button>
             
             {categories.map((cat, i) => {
               const hasAccess = canViewCategory(cat.access);
               return (
                <div key={i} className={`space-y-1 ${!hasAccess ? 'opacity-40 grayscale' : ''}`}>
                  <button 
                    disabled={!hasAccess}
                    onClick={() => hasAccess && setActiveCategory(cat.title)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center justify-between rounded-xl transition-all ${
                        activeCategory === cat.title ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon size={18} />
                      {cat.title}
                    </div>
                    {!hasAccess ? <Lock size={12} /> : <ChevronDown size={14} className={activeCategory === cat.title ? 'rotate-180' : ''} />}
                  </button>
                  
                  {activeCategory === cat.title && hasAccess && (
                    <div className="pl-11 py-1 space-y-2 animate-in slide-in-from-top-2 duration-200">
                      {cat.subMenus.map(sub => (
                        <p key={sub} className="text-xs text-slate-500 hover:text-blue-600 cursor-pointer">{sub}</p>
                      ))}
                    </div>
                  )}
                </div>
               );
             })}
          </div>
        </div>

        {/* content Area (Table View) */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col min-w-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex items-center gap-3 w-full md:w-auto">
               <div className="relative flex-1 md:w-80">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="输入资料名称搜索" 
                   className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                 />
               </div>
               <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                 搜索
               </button>
             </div>
             
             {currentUserRole === 'ADMIN' && (
               <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                 <Plus size={16} /> 上传
               </button>
             )}
          </div>

          <div className="flex-1 overflow-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-50 border-b border-slate-100 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest sticky top-0 z-10">
                   <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded" /></th>
                   <th className="px-6 py-4 w-16">序号</th>
                   <th className="px-6 py-4">资料名称</th>
                   <th className="px-6 py-4">资料类型</th>
                   <th className="px-6 py-4">发布人</th>
                   <th className="px-6 py-4 whitespace-nowrap">发布时间</th>
                   <th className="px-6 py-4 text-center">操作</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {filteredDocs.length > 0 ? filteredDocs.map((doc, i) => (
                   <tr key={doc.id} className="hover:bg-slate-50 transition-colors text-sm text-slate-600 group">
                     <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                     <td className="px-6 py-4 font-mono text-xs">{i + 1}</td>
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                           <FileText size={16} />
                         </div>
                         <span className="font-medium text-slate-800 group-hover:text-blue-600 truncate max-w-[200px] sm:max-w-xs">{doc.name}</span>
                       </div>
                     </td>
                     <td className="px-6 py-4">{doc.type}</td>
                     <td className="px-6 py-4">{doc.publisher}</td>
                     <td className="px-6 py-4 font-mono text-xs text-slate-400 whitespace-nowrap">{doc.publishTime}</td>
                     <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-4 text-blue-600 font-bold text-xs">
                          <button className="hover:underline flex items-center gap-1">预览</button>
                          <button className="hover:underline flex items-center gap-1">下载</button>
                          {currentUserRole === 'ADMIN' && (
                            <button className="text-red-500 hover:underline flex items-center gap-1">删除</button>
                          )}
                        </div>
                     </td>
                   </tr>
                 )) : (
                   <tr>
                     <td colSpan={7} className="px-6 py-20 text-center text-slate-400 italic">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                             <FileText size={32} />
                          </div>
                          <span>暂无符合条件的帮助资料</span>
                        </div>
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
          </div>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
             <span className="text-xs text-slate-500">共 {filteredDocs.length} 条</span>
             <div className="flex items-center gap-2">
                <button className="p-2 border border-slate-200 rounded hover:bg-white transition-all">< ChevronRight size={14} className="rotate-180" /></button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold">1</button>
                <button className="p-2 border border-slate-200 rounded hover:bg-white transition-all">< ChevronRight size={14} /></button>
                <select className="ml-2 text-xs border border-slate-200 rounded px-2 py-1 outline-none bg-white">
                  <option>10 条/页</option>
                  <option>20 条/页</option>
                </select>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
