import React, { useState } from 'react';
import { Settings, Shield, Cpu, Database, Link as LinkIcon, CheckCircle, Activity, Server, AlertTriangle } from 'lucide-react';

export default function SystemConfig() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div className="flex items-center space-x-3">
            <Settings className="w-7 h-7 text-slate-400" />
            <h1 className="text-2xl font-bold">System Configuration · GAMP 5 Validated</h1>
          </div>
          <div className="flex items-center px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <Shield className="w-4 h-4 mr-2" />
            Validated State: SECURE
          </div>
        </header>

        <div className="flex space-x-1 border-b border-slate-700">
          <button 
            onClick={() => setActiveTab('general')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'general' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <div className="flex items-center"><Settings className="w-4 h-4 mr-2"/> General</div>
          </button>
          <button 
            onClick={() => setActiveTab('ner')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'ner' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <div className="flex items-center"><Cpu className="w-4 h-4 mr-2"/> NER Pipeline</div>
          </button>
          <button 
            onClick={() => setActiveTab('graph')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'graph' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <div className="flex items-center"><Database className="w-4 h-4 mr-2"/> Graph Settings</div>
          </button>
          <button 
            onClick={() => setActiveTab('integration')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'integration' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <div className="flex items-center"><LinkIcon className="w-4 h-4 mr-2"/> Integration</div>
          </button>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-200 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-400"/> System Identification
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <div className="text-xs text-slate-500 uppercase mb-1">System Name</div>
                    <div className="font-medium text-slate-200">GxP Pharma Knowledge System</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <div className="text-xs text-slate-500 uppercase mb-1">Version</div>
                    <div className="font-medium text-slate-200 font-mono">v2.4.1-prod</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <div className="text-xs text-slate-500 uppercase mb-1">GAMP 5 Category</div>
                    <div className="font-medium text-slate-200">Category 4 (Configured Software)</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <div className="text-xs text-slate-500 uppercase mb-1">Validation Status</div>
                    <div className="font-medium text-emerald-400 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1"/> Validated (OQ/PQ Complete)
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-200 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-blue-400"/> Operational Thresholds
                </h3>
                <div className="space-y-6">
                  <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="font-medium text-slate-200">OCR Confidence Threshold</div>
                        <div className="text-xs text-slate-500">Items below this score enter Quarantine Queue</div>
                      </div>
                      <div className="text-xl font-bold text-blue-400">98%</div>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 mt-4 relative">
                      <div className="bg-blue-500 h-2 rounded-full absolute left-0" style={{ width: '98%' }}></div>
                      <div className="w-4 h-4 bg-white rounded-full absolute -top-1 shadow border-2 border-blue-500 cursor-not-allowed" style={{ left: '98%', transform: 'translateX(-50%)' }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                      <div className="text-xs text-slate-500 uppercase mb-1">Maximum Graph Depth</div>
                      <div className="font-medium text-slate-200 text-lg">3 Hops</div>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                      <div className="text-xs text-slate-500 uppercase mb-1">Minimum Edge Weight</div>
                      <div className="font-medium text-slate-200 text-lg">0.30</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-500 italic bg-slate-900/50 p-3 rounded flex items-start">
                <Shield className="w-4 h-4 mr-2 mt-0.5 text-slate-400 flex-shrink-0" />
                Note: These settings are read-only in the production environment. Changes require formal Change Control approval and reconfiguration in the DEV environment.
              </div>
            </div>
          )}

          {activeTab === 'ner' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg">PubMedBERT v2.1 (Fine-tuned)</h4>
                  <p className="text-sm text-slate-400">Primary extraction model for Life Sciences context</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase">Last Retrained</div>
                  <div className="font-medium text-slate-200">2026-08-15 02:00 UTC</div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-4 text-slate-200">Model Performance (F1 Scores)</h3>
                <div className="space-y-4 bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">Materials (API, Excipients)</span><span className="text-slate-400">0.96</span></div>
                    <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '96%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">Equipment (Tags, Types)</span><span className="text-slate-400">0.94</span></div>
                    <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">Process Parameters (Temp, pH, Time)</span><span className="text-slate-400">0.91</span></div>
                    <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '91%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">Deviations / Observations</span><span className="text-slate-400">0.85</span></div>
                    <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-sm font-semibold mb-2 text-slate-200 flex items-center"><Activity className="w-4 h-4 mr-2 text-blue-400"/> Active Learning Queue</h3>
                  <div className="text-3xl font-bold text-slate-100 mb-1">1,204</div>
                  <p className="text-xs text-slate-400">Items pending human-in-the-loop annotation</p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-sm font-semibold mb-3 text-slate-200">Weak Supervision Sources</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm"><span className="text-slate-300">Regex Rules</span><span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">Active</span></div>
                    <div className="flex items-center justify-between text-sm"><span className="text-slate-300">SAP Master Data Gazetteer</span><span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">Active</span></div>
                    <div className="flex items-center justify-between text-sm"><span className="text-slate-300">Chembl Dictionary</span><span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">Active</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'graph' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-slate-200">Entity Tier Definitions</h3>
                <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800 text-slate-400">
                      <tr>
                        <th className="px-4 py-3 font-medium">Tier</th>
                        <th className="px-4 py-3 font-medium">Definition</th>
                        <th className="px-4 py-3 font-medium">Examples</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      <tr>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold">Tier 1 (Critical)</span></td>
                        <td className="px-4 py-3 text-slate-300">Direct impact on product quality or patient safety.</td>
                        <td className="px-4 py-3 text-slate-400">APIs, Critical Process Parameters, Sterilization Equipment</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs font-bold">Tier 2 (Major)</span></td>
                        <td className="px-4 py-3 text-slate-300">Indirect impact; supports critical processes.</td>
                        <td className="px-4 py-3 text-slate-400">Buffer prep, Secondary packaging, Environmental Monitoring</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-bold">Tier 3 (Minor)</span></td>
                        <td className="px-4 py-3 text-slate-300">No direct quality impact; administrative or general.</td>
                        <td className="px-4 py-3 text-slate-400">Pallets, General maintenance logs, Consumables</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-sm font-semibold mb-3 text-slate-200">Edge Weight Classifications</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between items-center"><span className="text-slate-300">Explicit reference (e.g. Doc A cites Doc B)</span><span className="font-mono text-emerald-400">1.0</span></li>
                    <li className="flex justify-between items-center"><span className="text-slate-300">Co-occurrence in same sentence</span><span className="font-mono text-blue-400">0.8</span></li>
                    <li className="flex justify-between items-center"><span className="text-slate-300">Co-occurrence in same paragraph</span><span className="font-mono text-amber-400">0.5</span></li>
                    <li className="flex justify-between items-center"><span className="text-slate-300">Co-occurrence in same document</span><span className="font-mono text-slate-400">0.2</span></li>
                  </ul>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-sm font-semibold mb-3 text-slate-200">Blast Radius Parameters</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Default traversal depth for impact analysis</div>
                      <div className="font-medium text-slate-200">2 Hops</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Decay factor per hop</div>
                      <div className="font-medium text-slate-200">0.5x</div>
                    </div>
                    <div className="flex items-center text-amber-400 text-xs bg-amber-400/10 p-2 rounded">
                      <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0"/> Traversal stops automatically at Tier 3 boundaries.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integration' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <Server className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-200">Veeva Vault (eQMS)</h4>
                        <div className="flex items-center text-emerald-400 text-xs mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                          Connected · Read-Only
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm border-t border-slate-700 pt-4">
                    <div className="flex justify-between"><span className="text-slate-400">Last Sync</span><span className="text-slate-200">10 mins ago</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Sync Frequency</span><span className="text-slate-200">Every 15 minutes</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Docs Indexed</span><span className="text-slate-200">142,855</span></div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                        <Server className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-200">SAP ERP (Master Data)</h4>
                        <div className="flex items-center text-emerald-400 text-xs mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                          Connected · Read-Only
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm border-t border-slate-700 pt-4">
                    <div className="flex justify-between"><span className="text-slate-400">Last Sync</span><span className="text-slate-200">2 hours ago</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Sync Frequency</span><span className="text-slate-200">Daily @ 00:00 UTC</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Entities Indexed</span><span className="text-slate-200">38,102</span></div>
                  </div>
                </div>
                
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 opacity-60">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center mr-3">
                        <Server className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-200">LIMS System</h4>
                        <div className="flex items-center text-slate-400 text-xs mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-slate-500 mr-1.5"></span>
                          Not Configured
                        </div>
                      </div>
                    </div>
                    <button className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 px-2 py-1 rounded transition-colors text-slate-300">Configure</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
