import React, { useState } from 'react';
import { ShieldAlert, FileText, Check, X, AlertTriangle, Search, Eye, AlertCircle } from 'lucide-react';

const MOCK_QUARANTINE_DATA = [
  { id: 'Q-1001', name: 'Batch_Record_XYZ123.pdf', confidence: 88, issue: 'Low confidence on handwritten dates', page: '3 of 15', queuedAt: '2026-09-27T08:14:00Z', status: 'Pending Review' },
  { id: 'Q-1002', name: 'CoA_Supplier_A.pdf', confidence: 75, issue: 'Table structure unreadable, overlapping text', page: '1 of 2', queuedAt: '2026-09-27T09:22:00Z', status: 'Pending Review' },
  { id: 'Q-1003', name: 'Logbook_Entry_0926.pdf', confidence: 93, issue: 'Signature field unclear', page: '1 of 1', queuedAt: '2026-09-27T10:05:00Z', status: 'Pending Review' },
  { id: 'Q-1004', name: 'Dev_Report_445.pdf', confidence: 96, issue: 'Unrecognized material code', page: '4 of 8', queuedAt: '2026-09-27T10:45:00Z', status: 'Pending Review' },
  { id: 'Q-1005', name: 'Calibration_Cert_Temp1.pdf', confidence: 82, issue: 'Faded text on calibration values', page: '2 of 3', queuedAt: '2026-09-27T11:30:00Z', status: 'Under Review' },
];

export default function QuarantineQueue() {
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [showESign, setShowESign] = useState(false);

  const getConfidenceColor = (score: number) => {
    if (score < 90) return 'text-red-500';
    if (score < 95) return 'text-amber-500';
    return 'text-orange-500';
  };

  const getConfidenceBg = (score: number) => {
    if (score < 90) return 'bg-red-500';
    if (score < 95) return 'bg-amber-500';
    return 'bg-orange-500';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-7 h-7 text-red-500" />
            <h1 className="text-2xl font-bold">OCR Quarantine Queue</h1>
            <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full text-xs font-bold">
              5 Items
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center space-x-4">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm text-slate-400">Pending Review</div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">1</div>
              <div className="text-sm text-slate-400">Under Review</div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg">
              <Check className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-slate-400">Resolved Today</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_QUARANTINE_DATA.map(doc => (
            <div key={doc.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md hover:border-slate-600 transition-colors">
              <div className="flex items-start space-x-4 flex-1">
                <FileText className="w-8 h-8 text-slate-400 mt-1" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{doc.name}</h3>
                  <div className="text-sm text-slate-400 flex items-center space-x-3">
                    <span>{doc.id}</span>
                    <span>•</span>
                    <span className="flex items-center text-amber-400/80"><AlertTriangle className="w-3 h-3 mr-1"/> {doc.issue}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center space-x-3">
                    <span>Lowest confidence on page {doc.page}</span>
                    <span>•</span>
                    <span>Queued: {new Date(doc.queuedAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getConfidenceColor(doc.confidence)}`}>
                    {doc.confidence}%
                  </div>
                  <div className="w-24 h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                    <div className={`h-full ${getConfidenceBg(doc.confidence)}`} style={{ width: `${doc.confidence}%` }}></div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => setSelectedDoc(doc)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors w-36"
                  >
                    Review Document
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors w-36 border border-slate-600">
                    Request Rescan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
              <div>
                <h2 className="text-xl font-bold flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-slate-400"/>
                  Reviewing: {selectedDoc.name}
                </h2>
                <p className="text-sm text-slate-400 mt-1">Issue: {selectedDoc.issue}</p>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="text-slate-400 hover:text-white p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              <div className="w-1/2 border-r border-slate-700 p-4 bg-slate-900/30 flex flex-col">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Original Scan Preview</h3>
                <div className="flex-1 bg-slate-700/50 rounded-lg border border-slate-600 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                  <div className="text-slate-500 flex flex-col items-center">
                    <FileText className="w-16 h-16 mb-2 opacity-50" />
                    <span>[ Original Scan Placeholder ]</span>
                    <span className="text-xs mt-2">Page {selectedDoc.page}</span>
                  </div>
                  {/* Fake highlight box */}
                  <div className="absolute top-1/3 left-1/4 w-32 h-8 border-2 border-red-500/50 bg-red-500/10 rounded"></div>
                </div>
              </div>
              
              <div className="w-1/2 p-4 flex flex-col">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">OCR Text Output</h3>
                <div className="flex-1 bg-slate-900 rounded-lg border border-slate-700 p-4 font-mono text-sm overflow-y-auto">
                  <div className="text-slate-300 space-y-4">
                    <p>BATCH: XYZ-12345</p>
                    <p>DATE: <span className="bg-red-500/30 text-red-200 px-1 border border-red-500/50 rounded">08/??/2026</span></p>
                    <p>OPERATOR: J. SMITH</p>
                    <p>TEMP: 24.5 °C</p>
                    <p>HUMIDITY: <span className="bg-red-500/30 text-red-200 px-1 border border-red-500/50 rounded">4?%</span></p>
                    <p>COMMENTS: ALL SPECS MET DURING INITIAL RUN.</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 mb-2">Confidence Breakdown:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs"><span className="text-slate-400">Alphanumeric chars</span> <span className="text-emerald-400">99%</span></div>
                      <div className="flex justify-between text-xs"><span className="text-slate-400">Handwritten numbers</span> <span className="text-red-400">72%</span></div>
                      <div className="flex justify-between text-xs"><span className="text-slate-400">Signatures</span> <span className="text-amber-400">85%</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-700 bg-slate-900/50 flex justify-end space-x-4">
              <button onClick={() => setSelectedDoc(null)} className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors border border-slate-600">
                Reject & Request New Scan
              </button>
              <button onClick={() => setShowESign(true)} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center">
                <Check className="w-4 h-4 mr-2" />
                Accept with Corrections
              </button>
            </div>
          </div>
        </div>
      )}

      {showESign && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[60]">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Electronic Signature</h3>
            <p className="text-sm text-slate-400 mb-6">21 CFR Part 11 Requires re-authentication for this action.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
                <input type="text" value="current.user" disabled className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Approval PIN</label>
                <input type="password" placeholder="••••" maxLength={4} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors text-center tracking-[1em]" />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button onClick={() => setShowESign(false)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors">
                Cancel
              </button>
              <button onClick={() => { setShowESign(false); setSelectedDoc(null); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
                Sign & Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
