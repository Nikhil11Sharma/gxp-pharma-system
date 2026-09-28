import React, { useState } from 'react';
import { Search, Filter, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { changeControlRequests } from '../data/mockData';

export default function ChangeControl() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredCCRs = changeControlRequests.filter((ccr) => {
    const matchesSearch = ccr.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ccr.ccrId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ccr.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'IMPACT_REVIEW': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'PENDING_APPROVAL': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'APPROVED': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'CLOSED': return 'bg-slate-700 text-slate-300 border-slate-600';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 2: return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 3: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const formatStatus = (status: string) => status.replace(/_/g, ' ');

  return (
    <div className="text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-slate-100">Change Control Requests</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search CCR ID or Title..."
                className="w-full sm:w-64 bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                className="w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="OPEN">Open</option>
                <option value="IMPACT_REVIEW">Impact Review</option>
                <option value="PENDING_APPROVAL">Pending Approval</option>
                <option value="APPROVED">Approved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCCRs.map((ccr) => {
            const progress = ccr.totalImpactedDocs > 0 ? (ccr.confirmedImpacts / ccr.totalImpactedDocs) * 100 : 0;
            return (
            <div key={ccr.ccrId} className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col h-full hover:border-slate-600 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-mono text-slate-400">{ccr.ccrId}</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(ccr.status)}`}>
                  {formatStatus(ccr.status)}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-slate-100 line-clamp-2" title={ccr.title}>
                {ccr.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-md border border-slate-600">
                  {ccr.changeType}
                </span>
                <span className={`text-xs px-2 py-1 rounded-md border ${getTierColor(ccr.impactTier)}`}>
                  Tier {ccr.impactTier}
                </span>
              </div>
              
              <p className="text-slate-400 text-sm mb-6 line-clamp-2 flex-grow" title={ccr.description}>
                {ccr.description}
              </p>
              
              <div className="space-y-4 mt-auto">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Impact Analysis Progress</span>
                    <span>{ccr.confirmedImpacts} / {ccr.totalImpactedDocs} Docs</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-700 flex justify-between items-center text-sm">
                  <div className="text-slate-400 flex flex-col">
                    <span>{ccr.initiator}</span>
                    <span className="text-xs">{new Date(ccr.openedDate).toLocaleDateString()}</span>
                  </div>
                  
                  <button className="flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group">
                    View Analysis
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
          
          {filteredCCRs.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 border border-dashed border-slate-700 rounded-xl">
              No Change Control Requests found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
