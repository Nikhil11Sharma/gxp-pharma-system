import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Shield, FileText, Check, X, AlertTriangle, AlertCircle, FileKey, XCircle, Search, Info } from 'lucide-react';

const graphElements = [
  // Nodes
  { data: { id: 'ccr', label: 'CCR-2026-0142', type: 'ccr', tier: 'center' } },
  { data: { id: 'ent-r201', label: 'Reactor R-201', type: 'entity', entityType: 'Equipment' } },
  { data: { id: 'ent-temp', label: 'Temperature', type: 'entity', entityType: 'ProcessParameter' } },
  { data: { id: 'doc-sop410', label: 'SOP-410\nReactor Operation', type: 'doc', tier: 'tier1' } },
  { data: { id: 'doc-bmr102', label: 'BMR-102\nBatch Record', type: 'doc', tier: 'tier1' } },
  { data: { id: 'doc-val50', label: 'VAL-50\nThermal Mapping', type: 'doc', tier: 'tier1' } },
  { data: { id: 'doc-qa05', label: 'QA-05\nRelease Criteria', type: 'doc', tier: 'tier2' } },
  { data: { id: 'doc-sop412', label: 'SOP-412\nCleaning', type: 'doc', tier: 'tier2' } },
  { data: { id: 'doc-train22', label: 'TRN-22\nOperator Training', type: 'doc', tier: 'excluded' } },
  { data: { id: 'doc-maint01', label: 'MNT-01\nPM Schedule', type: 'doc', tier: 'excluded' } },

  // Edges
  { data: { source: 'ccr', target: 'ent-r201', weight: 5 } },
  { data: { source: 'ccr', target: 'ent-temp', weight: 4 } },
  
  { data: { source: 'ent-r201', target: 'doc-sop410', weight: 4.8 } },
  { data: { source: 'ent-temp', target: 'doc-sop410', weight: 4.5 } },
  
  { data: { source: 'ent-r201', target: 'doc-bmr102', weight: 5.0 } },
  { data: { source: 'ent-temp', target: 'doc-bmr102', weight: 4.9 } },
  
  { data: { source: 'ent-r201', target: 'doc-val50', weight: 4.2 } },
  
  { data: { source: 'doc-sop410', target: 'doc-sop412', weight: 3.5 } },
  { data: { source: 'doc-bmr102', target: 'doc-qa05', weight: 3.8 } },
  
  { data: { source: 'ent-r201', target: 'doc-train22', weight: 1.2 } },
  { data: { source: 'ent-r201', target: 'doc-maint01', weight: 1.5 } }
];

const stylesheet: any[] = [
  {
    selector: 'node',
    style: {
      'label': 'data(label)',
      'text-wrap': 'wrap',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'text-margin-y': 8,
      'color': '#cbd5e1',
      'font-size': '12px',
      'font-weight': 'bold'
    }
  },
  {
    selector: 'node[type="ccr"]',
    style: {
      'shape': 'hexagon',
      'background-color': '#f59e0b',
      'width': '60px',
      'height': '60px',
      'border-width': 3,
      'border-color': '#b45309'
    }
  },
  {
    selector: 'node[type="entity"]',
    style: {
      'shape': 'round-rectangle',
      'background-color': '#3b82f6',
      'width': '40px',
      'height': '40px',
      'border-width': 2,
      'border-color': '#1d4ed8'
    }
  },
  {
    selector: 'node[tier="tier1"]',
    style: {
      'shape': 'ellipse',
      'background-color': '#ef4444',
      'width': '50px',
      'height': '50px',
      'border-width': 3,
      'border-color': '#b91c1c'
    }
  },
  {
    selector: 'node[tier="tier2"]',
    style: {
      'shape': 'ellipse',
      'background-color': '#f59e0b',
      'width': '45px',
      'height': '45px',
      'border-width': 2,
      'border-color': '#b45309'
    }
  },
  {
    selector: 'node[tier="excluded"]',
    style: {
      'shape': 'ellipse',
      'background-color': '#475569',
      'width': '40px',
      'height': '40px',
      'border-width': 2,
      'border-color': '#94a3b8',
      'border-style': 'dashed'
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 'mapData(weight, 1, 5, 1, 5)',
      'line-color': '#475569',
      'target-arrow-color': '#475569',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'opacity': 0.7
    }
  },
  {
    selector: ':selected',
    style: {
      'border-color': '#ffffff',
      'border-width': 4,
      'shadow-blur': 10,
      'shadow-color': '#ffffff',
      'shadow-opacity': 0.8
    }
  }
];

const mockNodeDetails: Record<string, any> = {
  'doc-sop410': {
    id: 'SOP-410',
    title: 'Reactor Operation Procedure',
    type: 'SOP',
    version: '4.2',
    weight: '4.85',
    impactType: 'Direct (Tier 1)',
    intent: 'Operational Parameter Dependency',
    entity: 'Reactor R-201',
    entityType: 'Equipment',
    confidence: 96,
    extractionSource: 'NLP Extraction Model v2.4',
    textSection: 'The operator must ensure that [Reactor R-201] is pre-heated to the designated setpoint prior to the addition of Compound A. The [Temperature] must be maintained consistently throughout the exothermic reaction phase.',
    highlight: ['Reactor R-201', 'Temperature'],
    status: 'pending'
  },
  'doc-bmr102': {
    id: 'BMR-102',
    title: 'Master Batch Record - Product X',
    type: 'BMR',
    version: '2.0',
    weight: '5.0',
    impactType: 'Direct (Tier 1)',
    intent: 'Critical Process Parameter',
    entity: 'Temperature',
    entityType: 'ProcessParameter',
    confidence: 99,
    extractionSource: 'NLP Extraction Model v2.4',
    textSection: 'Step 4.2: Verify [Temperature] of Reactor R-201 is within range before proceeding.',
    highlight: ['Temperature'],
    status: 'confirmed'
  }
};

export default function ImpactAnalysis() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [justification, setJustification] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');

  const handleNodeClick = (event: any) => {
    const node = event.target;
    const nodeId = node.id();
    if (mockNodeDetails[nodeId]) {
      setSelectedNode({ ...mockNodeDetails[nodeId], nodeId });
    } else {
      setSelectedNode(null);
    }
  };

  const cytoscapeConfig = {
    elements: graphElements,
    style: { width: '100%', height: '600px', backgroundColor: '#0f172a' },
    layout: {
      name: 'cose',
      padding: 50,
      nodeRepulsion: 4000,
      idealEdgeLength: 100,
      edgeElasticity: 100,
      nestingFactor: 5,
      gravity: 250,
      numIter: 1000
    },
    stylesheet: stylesheet
  };

  const handleConfirm = () => {
    if (selectedNode) {
      setSelectedNode({ ...selectedNode, status: 'confirmed' });
    }
  };

  const handleRejectSubmit = () => {
    if (justification.length >= 20 && password && pin) {
      if (selectedNode) {
        setSelectedNode({ ...selectedNode, status: 'rejected' });
      }
      setShowRejectModal(false);
      setJustification('');
      setPassword('');
      setPin('');
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Left Panel - Graph */}
      <div className="w-[55%] border-r border-slate-700 flex flex-col relative">
        <div className="bg-slate-800 border-b border-slate-700 p-4 z-10 shadow-md">
          <h2 className="font-semibold text-lg flex items-center text-slate-100">
            <Shield className="w-5 h-5 mr-2 text-amber-500" />
            Impact Chain · CCR-2026-0142: Modify Reactor R-201 Temperature Setpoint
          </h2>
        </div>
        
        <div className="flex-1 relative bg-slate-900">
          <CytoscapeComponent 
            elements={cytoscapeConfig.elements} 
            stylesheet={cytoscapeConfig.stylesheet} 
            layout={cytoscapeConfig.layout} 
            style={cytoscapeConfig.style}
            cy={(cy: any) => {
              cy.on('tap', 'node', handleNodeClick);
              // Set background color of cy container if needed, already handled in style
            }}
          />
        </div>

        <div className="bg-slate-800 p-4 border-t border-slate-700 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between text-sm">
            <div className="flex space-x-4">
              <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2 border border-red-700"></span> Tier 1</div>
              <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-2 border border-amber-700"></span> Tier 2</div>
              <div className="flex items-center"><span className="w-3 h-3 rounded-sm bg-blue-500 mr-2 border border-blue-700"></span> Entity</div>
              <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-slate-500 mr-2 border-2 border-slate-400 border-dashed border-box"></span> Excluded</div>
            </div>
            <div className="text-slate-400 font-mono bg-slate-900 px-3 py-1 rounded-md border border-slate-700">
              Direct: 4 | Indirect: 3 | Excluded: 2 | Total Weight: 4.85
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Details */}
      <div className="w-[45%] bg-slate-800 flex flex-col overflow-y-auto">
        {selectedNode ? (
          <div className="p-6 space-y-6">
            <div className="border-b border-slate-700 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-400" />
                    {selectedNode.id}
                  </h3>
                  <p className="text-slate-400 text-lg mt-1">{selectedNode.title}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                    {selectedNode.type}
                  </span>
                  <span className="text-slate-500 text-sm font-mono">v{selectedNode.version}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Impact Score</p>
                <div className="text-3xl font-bold text-red-400">{selectedNode.weight}</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Impact Type</p>
                <div className="text-lg font-semibold text-slate-200 mt-1">{selectedNode.impactType}</div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center">
                <Search className="w-4 h-4 mr-2 text-slate-400" />
                <span className="text-sm font-semibold text-slate-300">Extracted Section</span>
              </div>
              <div className="p-4 text-slate-300 leading-relaxed font-serif text-lg">
                {selectedNode.textSection.split(/(\[.*?\])/).map((part: string, i: number) => {
                  if (part.startsWith('[') && part.endsWith(']')) {
                    const text = part.slice(1, -1);
                    return <span key={i} className="bg-amber-500/30 text-amber-200 px-1 rounded font-semibold border-b-2 border-amber-500/50">{text}</span>;
                  }
                  return <span key={i}>{part}</span>;
                })}
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-700 p-5 space-y-4">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2 text-slate-400" />
                Entity Recognition
              </h4>
              <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
                <div>
                  <div className="text-slate-400 text-xs mb-1">Detected Entity</div>
                  <div className="font-semibold text-slate-200">{selectedNode.entity}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-xs mb-1">Entity Type</div>
                  <div className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded text-sm">{selectedNode.entityType}</div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>NER Confidence Score</span>
                  <span>{selectedNode.confidence}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${selectedNode.confidence}%` }}></div>
                </div>
                <div className="text-right mt-1 text-[10px] text-slate-500">Source: {selectedNode.extractionSource}</div>
              </div>
            </div>

            <div className="pt-4 mt-auto">
              {selectedNode.status === 'pending' ? (
                <div className="flex space-x-4">
                  <button onClick={handleConfirm} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors shadow-lg shadow-emerald-900/20">
                    <Check className="w-5 h-5 mr-2" />
                    Confirm Impact
                  </button>
                  <button onClick={() => setShowRejectModal(true)} className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-500 border border-red-500/50 py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors">
                    <X className="w-5 h-5 mr-2" />
                    Reject Impact
                  </button>
                </div>
              ) : selectedNode.status === 'confirmed' ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-center text-emerald-400 font-semibold">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Impact Confirmed
                </div>
              ) : (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center justify-center text-red-400 font-semibold">
                  <XCircle className="w-5 h-5 mr-2" />
                  Impact Rejected
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-800">
              <Shield className="w-12 h-12 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">Select a Node</h3>
            <p className="max-w-md">Click on any document or entity node in the impact chain graph to view its detailed assessment, extracted text, and AI confidence scores.</p>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-red-500/10 border-b border-slate-700 p-4 flex items-center text-red-400">
              <AlertTriangle className="w-6 h-6 mr-3" />
              <h3 className="text-lg font-bold">Reject AI Impact Assessment</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Justification (Required)</label>
                <textarea 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all h-32 resize-none"
                  placeholder="Provide scientific or process justification for excluding this document from the impact scope..."
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                />
                <div className="flex justify-between mt-1">
                  <span className={`text-xs ${justification.length < 20 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {justification.length}/20 min characters
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 space-y-4">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center">
                  <FileKey className="w-4 h-4 mr-2" />
                  Electronic Signature Required
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Password</label>
                    <input 
                      type="password"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">PIN</label>
                    <input 
                      type="password"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-blue-500"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-4 border-t border-slate-700 flex justify-end space-x-3">
              <button 
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleRejectSubmit}
                disabled={justification.length < 20 || !password || !pin}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center"
              >
                Sign & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper for check circle icon missing from imports
function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
