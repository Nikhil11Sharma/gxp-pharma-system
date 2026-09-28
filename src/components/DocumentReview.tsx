import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, AlertTriangle, AlertCircle, Info, 
  CheckCircle, XCircle, Clock, ChevronRight, 
  Lock, ArrowRight, Activity, ArrowLeftRight
} from 'lucide-react';
import { sopDocument, pharmaAlerts, consistencyAlerts } from '../data/mockData';

type TabType = 'pharma' | 'semantic';

export default function DocumentReview() {
  const [activeTab, setActiveTab] = useState<TabType>('pharma');
  const [disputeAlertId, setDisputeAlertId] = useState<string | null>(null);
  const [justification, setJustification] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'WARNING': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'INFO': return <Info className="w-5 h-5 text-blue-400" />;
      default: return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'WARNING': return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'INFO': return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const getEntityBadge = (label: string) => {
    switch (label) {
      case 'EQUIPMENT': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'MATERIAL': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'PROCESS_PARAMETER': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'REGULATORY_REFERENCE': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-slate-600 text-slate-300 border-slate-500';
    }
  };

  const hasAlertForSection = (sectionNumber: string) => {
    const criticalSections = ['4.0', '5.0', '6.0'];
    if (criticalSections.includes(sectionNumber)) return 'border-l-4 border-l-red-500/70';
    return 'border-l-4 border-l-transparent';
  };

  const renderContent = (content: string, entities: typeof sopDocument.sections[0]['entities']) => {
    if (!entities || entities.length === 0) {
      return <p className="text-slate-300 leading-relaxed text-sm">{content}</p>;
    }

    let result = content;
    const sortedEntities = [...entities].sort((a, b) => b.text.length - a.text.length);
    
    sortedEntities.forEach(entity => {
      const badge = getEntityBadge(entity.label);
      const replacement = `<mark class="px-1.5 py-0.5 rounded text-xs font-medium border ${badge} not-italic">${entity.text}</mark>`;
      result = result.replace(new RegExp(entity.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    });

    return (
      <div 
        className="text-slate-300 leading-relaxed text-sm"
        dangerouslySetInnerHTML={{ __html: result }} 
      />
    );
  };

  const handleDispute = (alertId: string) => {
    setDisputeAlertId(alertId);
    setJustification('');
    setPassword('');
    setPin('');
  };

  const handleSubmitDispute = () => {
    if (justification.length >= 20 && password && pin) {
      alert(`Dispute signed and recorded for alert ${disputeAlertId}`);
      setDisputeAlertId(null);
    }
  };

  const renderDisputeForm = (alertId: string) => (
    <AnimatePresence>
      {disputeAlertId === alertId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 border-t border-slate-600 pt-4 space-y-3"
        >
          <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
            <Lock className="w-4 h-4" />
            21 CFR Part 11 — Electronic Signature Required
          </div>
          <textarea
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Type justification for dispute (minimum 20 characters)..."
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 min-h-[80px]"
          />
          {justification.length > 0 && justification.length < 20 && (
            <p className="text-xs text-red-400">{20 - justification.length} more characters required</p>
          )}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="AD Password"
              className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="System PIN"
              className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmitDispute}
              disabled={justification.length < 20 || !password || !pin}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm rounded-lg font-medium transition-colors"
            >
              <Lock className="w-4 h-4" /> Sign & Submit Dispute
            </button>
            <button
              onClick={() => setDisputeAlertId(null)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex h-[calc(100vh-5rem)] text-slate-100 overflow-hidden">
      {/* Left Panel: SOP Document Viewer (45%) */}
      <div className="w-[45%] h-full border-r border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700 bg-slate-800/80">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold">
              {sopDocument.docId} <span className="text-slate-400 text-lg font-normal">v{sopDocument.version}</span>
            </h1>
          </div>
          <h2 className="text-lg text-slate-300">{sopDocument.title}</h2>
          <div className="mt-2 text-sm text-slate-400 flex items-center gap-4">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Effective: {new Date(sopDocument.effectiveDate).toLocaleDateString()}</span>
            <span className="text-slate-500">|</span>
            <span>{sopDocument.department}</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {sopDocument.sections.map(section => (
            <div key={section.sectionNumber} className={`p-4 rounded-lg bg-slate-800/40 ${hasAlertForSection(section.sectionNumber)}`}>
              <h3 className="font-semibold text-base text-slate-200 mb-2">
                {section.sectionNumber} {section.title}
              </h3>
              {renderContent(section.content, section.entities)}
              {section.parameters.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {section.parameters.map((p, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded border ${p.isCritical ? 'bg-red-500/15 text-red-300 border-red-500/30' : 'bg-slate-700 text-slate-300 border-slate-600'}`}>
                      {p.name}: {p.value} {p.unit} {p.isCritical && '⚠️ CPP'}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Alert Streams (55%) */}
      <div className="w-[55%] h-full flex flex-col">
        {/* Tab Bar */}
        <div className="flex border-b border-slate-700 bg-slate-800/80">
          <button
            onClick={() => setActiveTab('pharma')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'pharma'
                ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            Pharmacopoeia RAG
            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full">{pharmaAlerts.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('semantic')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'semantic'
                ? 'text-purple-400 border-b-2 border-purple-400 bg-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
            Semantic Consistency
            <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full">{consistencyAlerts.length}</span>
          </button>
        </div>

        {/* Alert Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'pharma' && pharmaAlerts.map(alert => (
            <div key={alert.alertId} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(alert.severity)}
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300 border border-slate-600">
                    {alert.comparisonType.replace(/_/g, ' ')}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-mono">{alert.alertId}</span>
              </div>

              {/* Comparison View */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-start mb-3">
                <div className="bg-slate-900/70 border border-slate-600 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1 font-medium">SOP States</div>
                  <div className="text-sm text-amber-300 font-medium">{alert.sopValue}</div>
                  <div className="text-xs text-slate-400 mt-1 italic">{alert.sopExcerpt}</div>
                </div>
                <div className="flex items-center justify-center pt-4">
                  <ArrowRight className="w-5 h-5 text-slate-500" />
                </div>
                <div className="bg-slate-900/70 border border-blue-500/30 rounded-lg p-3">
                  <div className="text-xs text-blue-400 mb-1 font-medium">{alert.pharmaSource}</div>
                  <div className="text-sm text-blue-300 font-medium">{alert.pharmaValue}</div>
                  <div className="text-xs text-slate-400 mt-1 italic">{alert.pharmaExcerpt}</div>
                </div>
              </div>

              {/* Explanation */}
              <p className="text-sm text-slate-300 mb-4 bg-slate-900/50 p-2 rounded border-l-2 border-amber-500/50">
                {alert.explanation}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 text-xs rounded-lg border border-emerald-500/30 font-medium transition-colors flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Acknowledge
                </button>
                <button 
                  onClick={() => handleDispute(alert.alertId)}
                  className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs rounded-lg border border-red-500/30 font-medium transition-colors flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" /> Dispute
                </button>
                <button className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 text-xs rounded-lg border border-amber-500/30 font-medium transition-colors flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Defer
                </button>
              </div>

              {renderDisputeForm(alert.alertId)}
            </div>
          ))}

          {activeTab === 'semantic' && consistencyAlerts.map(alert => (
            <div key={alert.alertId} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(alert.severity)}
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    {alert.type.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Side-by-side Excerpts */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-slate-900/70 border border-slate-600 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1 font-medium">This SOP — {alert.sourceDoc}</div>
                  <div className="text-sm text-slate-200">{alert.sourceText}</div>
                  <div className="text-xs text-amber-300 mt-1 font-medium">{alert.sourceParam}</div>
                </div>
                <div className="bg-slate-900/70 border border-red-500/20 rounded-lg p-3">
                  <div className="text-xs text-red-400 mb-1 font-medium">Conflict — {alert.targetDoc}</div>
                  <div className="text-sm text-slate-200">{alert.targetText}</div>
                  <div className="text-xs text-red-300 mt-1 font-medium">{alert.targetParam}</div>
                </div>
              </div>

              {/* Similarity Score */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-slate-400">Similarity:</span>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${alert.similarityScore * 100}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-purple-400">{(alert.similarityScore * 100).toFixed(1)}%</span>
              </div>

              {/* Explanation */}
              <p className="text-sm text-slate-300 mb-4 bg-slate-900/50 p-2 rounded border-l-2 border-purple-500/50">
                {alert.explanation}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 text-xs rounded-lg border border-emerald-500/30 font-medium transition-colors flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Acknowledge
                </button>
                <button 
                  onClick={() => handleDispute(alert.alertId)}
                  className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs rounded-lg border border-red-500/30 font-medium transition-colors flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" /> Dispute
                </button>
                <button className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 text-xs rounded-lg border border-amber-500/30 font-medium transition-colors flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Defer
                </button>
              </div>

              {renderDisputeForm(alert.alertId)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
