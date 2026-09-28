import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  GitBranch, 
  FileSearch, 
  ShieldAlert, 
  Bell,
  Eye,
  AlertTriangle
} from 'lucide-react';

import { 
  monthlyTrendData, 
  nerAccuracyData, 
  changeControlRequests as recentCCRs, 
  quarantineItems as quarantineDocs, 
  pipelineStageData as pipelineStats 
} from '../data/mockData';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'OPEN': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'IMPACT_REVIEW': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'PENDING_APPROVAL': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case 'APPROVED': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    case 'CLOSED': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="text-slate-300 text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="space-y-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-slate-100">Command Dashboard</h2>
      </div>

      {/* Top Row: Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Open CCRs', value: '12', badge: '+3 new', icon: GitBranch, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { title: 'Pending Reviews', value: '47', badge: null, icon: FileSearch, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { title: 'Quarantine Queue', value: '5', badge: 'docs', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/10' },
          { title: 'Pharma Alerts', value: '8', badge: null, icon: Bell, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        ].map((metric, i) => (
          <motion.div key={i} variants={itemVariants} className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{metric.title}</p>
                <div className="flex items-baseline space-x-2">
                  <h3 className="text-3xl font-bold text-slate-100">{metric.value}</h3>
                  {metric.badge && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                      {metric.badge}
                    </span>
                  )}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${metric.bg}`}>
                <metric.icon size={24} className={metric.color} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Second Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Documents Processed (12 Months)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="processed" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorDocs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">NER Entity Extraction Accuracy (F1)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nerAccuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="entity" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#334155', opacity: 0.4}} />
                <Bar dataKey="score" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Third Row: Table */}
      <motion.div variants={itemVariants} className="bg-slate-800 border border-slate-700 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800">
          <h3 className="text-lg font-semibold text-slate-200">Recent Change Control Requests</h3>
          <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-5 py-3 font-medium">CCR ID</th>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Impacted Docs</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-slate-300">
              {recentCCRs.slice(0, 6).map((ccr: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-5 py-3 font-mono text-slate-200">{ccr.ccrId}</td>
                  <td className="px-5 py-3 truncate max-w-xs">{ccr.title}</td>
                  <td className="px-5 py-3 text-slate-400">{ccr.changeType}</td>
                  <td className="px-5 py-3">{ccr.totalImpactedDocs}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(ccr.status)}`}>
                      {ccr.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Fourth Row: Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <ShieldAlert size={20} className="text-red-500" />
              <h3 className="text-lg font-semibold text-slate-200">OCR Quarantine Queue</h3>
            </div>
          </div>
          <div className="space-y-3">
            {quarantineDocs.map((doc: any, idx: number) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 flex items-center justify-between hover:border-slate-600 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-500/10 p-2 rounded text-red-500 mt-0.5">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200">{doc.documentName}</h4>
                    <p className="text-xs text-slate-400 mt-1">{doc.issue}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                    Confidence: {(doc.confidence * 100).toFixed(1)}%
                  </span>
                  <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded transition-colors font-medium">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-slate-200 mb-6">System Pipeline Status</h3>
          <div className="flex-1 flex flex-col justify-center space-y-6 px-2">
            {[
              { label: 'Total Docs Ingested', value: pipelineStats[0]?.value ?? 12458, color: 'bg-slate-600' },
              { label: 'OCR Passed', value: pipelineStats[1]?.value ?? 12100, color: 'bg-blue-500' },
              { label: 'NER Processed', value: pipelineStats[2]?.value ?? 11500, color: 'bg-indigo-500' },
              { label: 'Graph Loaded', value: pipelineStats[3]?.value ?? 11250, color: 'bg-emerald-500' },
            ].map((stat, i, arr) => (
              <div key={i} className="relative">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-medium text-slate-300">{stat.label}</span>
                  <span className="text-sm font-bold text-slate-100">{stat.value.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${stat.color} rounded-full`} 
                    style={{ width: `${(stat.value / arr[0].value) * 100}%` }}
                  ></div>
                </div>
                {i < arr.length - 1 && (
                  <div className="absolute -bottom-5 left-4 w-px h-4 bg-slate-700"></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
