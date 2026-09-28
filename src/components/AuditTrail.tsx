import React, { useState } from 'react';
import { Link, Search, Download, Lock, CheckCircle, Clock, ShieldCheck, Activity } from 'lucide-react';

const MOCK_AUDIT_EVENTS = [
  { id: 'EV-001', timestamp: '2026-09-27T08:15:22Z', type: 'LOGIN', user: 'j.smith', role: 'QA Reviewer', target: 'System', details: 'Successful login', justification: '-', signed: false, hash: 'a1b2c3d4e5f6g7h8i9j0' },
  { id: 'EV-002', timestamp: '2026-09-27T08:18:05Z', type: 'VIEW', user: 'j.smith', role: 'QA Reviewer', target: 'DOC-1029', details: 'Viewed Batch Record', justification: '-', signed: false, hash: 'b2c3d4e5f6g7h8i9j0a1' },
  { id: 'EV-003', timestamp: '2026-09-27T08:25:11Z', type: 'CONFIRM', user: 'j.smith', role: 'QA Reviewer', target: 'DOC-1029', details: 'Confirmed parameter extraction', justification: '-', signed: true, hash: 'c3d4e5f6g7h8i9j0a1b2' },
  { id: 'EV-004', timestamp: '2026-09-27T09:01:44Z', type: 'REJECT', user: 'a.williams', role: 'Data Engineer', target: 'DOC-1030', details: 'Rejected OCR output', justification: 'Poor image quality', signed: true, hash: 'd4e5f6g7h8i9j0a1b2c3' },
  { id: 'EV-005', timestamp: '2026-09-27T09:15:33Z', type: 'VIEW', user: 'a.williams', role: 'Data Engineer', target: 'DOC-1031', details: 'Viewed CoA', justification: '-', signed: false, hash: 'e5f6g7h8i9j0a1b2c3d4' },
  { id: 'EV-006', timestamp: '2026-09-27T09:30:00Z', type: 'EXPORT', user: 'm.chen', role: 'Auditor', target: 'System', details: 'Exported Audit Trail (PDF)', justification: 'Quarterly review', signed: false, hash: 'f6g7h8i9j0a1b2c3d4e5' },
  { id: 'EV-007', timestamp: '2026-09-27T10:05:12Z', type: 'SIGN', user: 's.taylor', role: 'Approver', target: 'DOC-1025', details: 'Approved final release', justification: 'All specs met', signed: true, hash: 'g7h8i9j0a1b2c3d4e5f6' },
  { id: 'EV-008', timestamp: '2026-09-27T10:10:45Z', type: 'LOGIN', user: 'm.chen', role: 'Auditor', target: 'System', details: 'Successful login', justification: '-', signed: false, hash: 'h8i9j0a1b2c3d4e5f6g7' },
  { id: 'EV-009', timestamp: '2026-09-27T10:15:22Z', type: 'VIEW', user: 'm.chen', role: 'Auditor', target: 'DOC-1025', details: 'Viewed Document', justification: '-', signed: false, hash: 'i9j0a1b2c3d4e5f6g7h8' },
  { id: 'EV-010', timestamp: '2026-09-27T10:25:11Z', type: 'VIEW', user: 's.taylor', role: 'Approver', target: 'DOC-1025', details: 'Viewed Document', justification: '-', signed: false, hash: 'j0a1b2c3d4e5f6g7h8i9' },
  { id: 'EV-011', timestamp: '2026-09-27T11:01:44Z', type: 'REJECT', user: 'j.smith', role: 'QA Reviewer', target: 'DOC-1026', details: 'Rejected Parameter', justification: 'Incorrect unit', signed: true, hash: 'a1b2c3d4e5f6g7h8i9j1' },
  { id: 'EV-012', timestamp: '2026-09-27T11:15:33Z', type: 'CONFIRM', user: 'a.williams', role: 'Data Engineer', target: 'DOC-1031', details: 'Confirmed OCR output', justification: '-', signed: true, hash: 'b2c3d4e5f6g7h8i9j1a1' },
  { id: 'EV-013', timestamp: '2026-09-27T11:30:00Z', type: 'VIEW', user: 'm.chen', role: 'Auditor', target: 'DOC-1026', details: 'Viewed Document', justification: '-', signed: false, hash: 'c3d4e5f6g7h8i9j1a1b2' },
  { id: 'EV-014', timestamp: '2026-09-27T12:05:12Z', type: 'LOGIN', user: 's.taylor', role: 'Approver', target: 'System', details: 'Successful login', justification: '-', signed: false, hash: 'd4e5f6g7h8i9j1a1b2c3' },
  { id: 'EV-015', timestamp: '2026-09-27T12:10:45Z', type: 'SIGN', user: 's.taylor', role: 'Approver', target: 'DOC-1026', details: 'Signed Release', justification: 'Deviations resolved', signed: true, hash: 'e5f6g7h8i9j1a1b2c3d4' }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'LOGIN': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'VIEW': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    case 'CONFIRM': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'REJECT': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'SIGN': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'EXPORT': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

export default function AuditTrail() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div className="flex items-center space-x-3">
            <Link className="w-6 h-6 text-slate-400" />
            <h1 className="text-2xl font-bold text-slate-100">Audit Trail · 21 CFR Part 11 Compliant</h1>
          </div>
          <div className="flex items-center px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Chain Integrity: VERIFIED ✓
          </div>
        </header>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <input type="date" className="bg-transparent border-none outline-none text-sm text-slate-300" defaultValue="2026-09-01" />
              <span className="text-slate-500">-</span>
              <input type="date" className="bg-transparent border-none outline-none text-sm text-slate-300" defaultValue="2026-09-27" />
            </div>
            
            <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
              <option value="ALL">All Event Types</option>
              <option value="LOGIN">Login</option>
              <option value="VIEW">View</option>
              <option value="CONFIRM">Confirm</option>
              <option value="REJECT">Reject</option>
              <option value="SIGN">Sign</option>
              <option value="EXPORT">Export</option>
            </select>

            <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
              <option value="ALL">All Users</option>
              <option value="j.smith">j.smith</option>
              <option value="a.williams">a.williams</option>
              <option value="m.chen">m.chen</option>
              <option value="s.taylor">s.taylor</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 transition-colors border border-slate-600 rounded-lg px-4 py-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 font-medium">Timestamp (UTC)</th>
                  <th className="px-4 py-3 font-medium">Event Type</th>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Target</th>
                  <th className="px-4 py-3 font-medium">Details</th>
                  <th className="px-4 py-3 font-medium">Justification</th>
                  <th className="px-4 py-3 font-medium text-center">E-Sign</th>
                  <th className="px-4 py-3 font-medium">Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {MOCK_AUDIT_EVENTS.map(event => (
                  <tr key={event.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(event.timestamp).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'medium' })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-md border ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">{event.user}</td>
                    <td className="px-4 py-3 text-slate-400">{event.role}</td>
                    <td className="px-4 py-3 font-mono text-xs">{event.target}</td>
                    <td className="px-4 py-3">{event.details}</td>
                    <td className="px-4 py-3 italic text-slate-400">{event.justification}</td>
                    <td className="px-4 py-3 text-center">
                      {event.signed && <Lock className="w-4 h-4 text-emerald-400 inline-block" />}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500" title={event.hash}>
                      {event.hash.substring(0, 8)}...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-slate-400" />
            Chain Verification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-400 text-xs uppercase mb-1">Total Events</div>
              <div className="text-xl font-bold">12,847</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-400 text-xs uppercase mb-1">Chain Status</div>
              <div className="flex items-center text-emerald-400 font-bold">
                <CheckCircle className="w-4 h-4 mr-1" />
                VERIFIED
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-400 text-xs uppercase mb-1">Last Verified</div>
              <div className="text-sm">2026-09-27 12:15:00 UTC</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-400 text-xs uppercase mb-1">Hash Algorithm</div>
              <div className="text-sm font-mono">SHA-256</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
              <div className="text-slate-400 text-xs uppercase mb-1">Genesis Block</div>
              <div className="text-xs font-mono text-slate-500">000000000019d6...</div>
            </div>
          </div>
          <div className="flex justify-end border-t border-slate-700 pt-4">
            <button 
              onClick={handleVerify}
              disabled={isVerifying}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                isVerifying ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {isVerifying ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Verifying Chain...
                </>
              ) : (
                <>
                  <Link className="w-4 h-4 mr-2" />
                  Verify Chain Integrity
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
