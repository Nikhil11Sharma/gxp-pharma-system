import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  GitBranch, 
  Network, 
  FileSearch, 
  Share2, 
  ScrollText, 
  ShieldAlert, 
  Settings,
  LogOut,
  Menu,
  ChevronLeft
} from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/change-control', label: 'Change Control', icon: GitBranch },
    { path: '/impact-analysis', label: 'Impact Analysis', icon: Network },
    { path: '/document-review', label: 'Document Review', icon: FileSearch },
    { path: '/knowledge-graph', label: 'Knowledge Graph', icon: Share2 },
    { path: '/audit-trail', label: 'Audit Trail', icon: ScrollText },
    { path: '/quarantine', label: 'Quarantine Queue', icon: ShieldAlert },
    { path: '/system-config', label: 'System Config', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 sticky top-0 z-20 shrink-0">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center space-x-2 text-blue-500">
            <Shield size={24} className="fill-blue-500/20" />
            <h1 className="font-bold text-lg tracking-wide hidden sm:block text-slate-100">
              PHARMA-QA <span className="text-slate-400 font-medium text-sm ml-2">CHANGE CONTROL & COMPLIANCE ASSISTANT</span>
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-500 tracking-wider">HEALTHY</span>
          </div>
          
          <div className="hidden md:flex px-2.5 py-1 rounded-md bg-slate-700/50 border border-slate-600">
            <span className="text-xs text-slate-300 font-medium">Air-Gapped ● Secure</span>
          </div>

          <div className="h-8 w-px bg-slate-700 hidden md:block"></div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-slate-100">Dr. Sarah Chen</div>
              <div className="text-xs text-slate-400">QA Director</div>
            </div>
            <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-slate-100 transition-colors">
              <LogOut size={18} />
              <span className="text-sm font-medium hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`
            ${sidebarOpen ? 'w-64' : 'w-0 sm:w-16'} 
            bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300 z-10 shrink-0
          `}
        >
          <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                const Icon = item.icon;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center px-3 py-2.5 rounded-lg transition-colors group
                        ${isActive 
                          ? 'bg-slate-700/50 text-blue-500 border-l-4 border-blue-500 shadow-sm' 
                          : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200 border-l-4 border-transparent'
                        }
                      `}
                    >
                      <Icon 
                        size={20} 
                        className={`shrink-0 ${isActive ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-300'}`} 
                      />
                      <span 
                        className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-200
                          ${sidebarOpen ? 'opacity-100' : 'opacity-0 sm:hidden'}
                        `}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className={`p-4 border-t border-slate-700 whitespace-nowrap overflow-hidden transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 sm:hidden'}`}>
            <div className="text-xs text-slate-500 font-mono">v2.1.0 · GAMP 5 Cat 4</div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-900 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
