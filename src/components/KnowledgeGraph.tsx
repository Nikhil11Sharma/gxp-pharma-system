import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Database, Network, Search, Terminal, ChevronRight, Layers, Box, FileText, Settings, Play } from 'lucide-react';

const graphElements = [
  // Document Nodes (blue, rectangle)
  { data: { id: 'D1', label: 'BR-2026-001', type: 'Document', tier: 'Tier 1' }, classes: 'document' },
  { data: { id: 'D2', label: 'SOP-MFG-05', type: 'Document', tier: 'Tier 2' }, classes: 'document' },
  { data: { id: 'D3', label: 'CoA-API-99', type: 'Document', tier: 'Tier 1' }, classes: 'document' },
  { data: { id: 'D4', label: 'DEV-2026-044', type: 'Document', tier: 'Tier 1' }, classes: 'document' },
  { data: { id: 'D5', label: 'VAL-REP-01', type: 'Document', tier: 'Tier 2' }, classes: 'document' },
  
  // Equipment Nodes (orange, diamond)
  { data: { id: 'E1', label: 'Bioreactor-A', type: 'Equipment', tier: 'Tier 1' }, classes: 'equipment' },
  { data: { id: 'E2', label: 'Centrifuge-02', type: 'Equipment', tier: 'Tier 2' }, classes: 'equipment' },
  { data: { id: 'E3', label: 'Chrom-Column', type: 'Equipment', tier: 'Tier 1' }, classes: 'equipment' },
  
  // Material Nodes (green, ellipse)
  { data: { id: 'M1', label: 'Media-Lot-X', type: 'Material', tier: 'Tier 2' }, classes: 'material' },
  { data: { id: 'M2', label: 'API-Batch-Y', type: 'Material', tier: 'Tier 1' }, classes: 'material' },
  
  // ProcessParameter Nodes (purple, round-rectangle)
  { data: { id: 'PP1', label: 'Temp=37.0°C', type: 'Parameter', tier: 'Tier 3' }, classes: 'parameter' },
  { data: { id: 'PP2', label: 'pH=7.2', type: 'Parameter', tier: 'Tier 3' }, classes: 'parameter' },
  
  // Process Nodes (teal, hexagon)
  { data: { id: 'P1', label: 'Fermentation', type: 'Process', tier: 'Tier 1' }, classes: 'process' },
  
  // Edges
  { data: { source: 'D1', target: 'P1', label: 'RECORDS' }, classes: 'edge' },
  { data: { source: 'SOP-MFG-05', target: 'P1', label: 'GOVERNS' }, classes: 'edge' },
  { data: { source: 'D2', target: 'P1', label: 'GOVERNS' }, classes: 'edge' },
  { data: { source: 'P1', target: 'E1', label: 'USES' }, classes: 'edge' },
  { data: { source: 'P1', target: 'M1', label: 'CONSUMES' }, classes: 'edge' },
  { data: { source: 'P1', target: 'M2', label: 'PRODUCES' }, classes: 'edge' },
  { data: { source: 'E1', target: 'PP1', label: 'MAINTAINS' }, classes: 'edge' },
  { data: { source: 'E1', target: 'PP2', label: 'MAINTAINS' }, classes: 'edge' },
  { data: { source: 'D3', target: 'M2', label: 'CERTIFIES' }, classes: 'edge' },
  { data: { source: 'D4', target: 'P1', label: 'DEVIATES_FROM' }, classes: 'edge' },
  { data: { source: 'D5', target: 'E1', label: 'VALIDATES' }, classes: 'edge' },
  { data: { source: 'E2', target: 'P1', label: 'USES' }, classes: 'edge' },
  { data: { source: 'E3', target: 'M2', label: 'PURIFIES' }, classes: 'edge' },
];

const stylesheet = [
  {
    selector: 'node',
    style: {
      'label': 'data(label)',
      'color': '#f8fafc',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '10px',
      'font-weight': 'bold',
      'text-outline-width': 1,
      'text-outline-color': '#0f172a'
    }
  },
  {
    selector: '.document',
    style: { 'background-color': '#3b82f6', 'shape': 'rectangle', 'width': 80, 'height': 30 }
  },
  {
    selector: '.equipment',
    style: { 'background-color': '#f97316', 'shape': 'diamond', 'width': 50, 'height': 50 }
  },
  {
    selector: '.material',
    style: { 'background-color': '#22c55e', 'shape': 'ellipse', 'width': 60, 'height': 40 }
  },
  {
    selector: '.parameter',
    style: { 'background-color': '#a855f7', 'shape': 'round-rectangle', 'width': 70, 'height': 30 }
  },
  {
    selector: '.process',
    style: { 'background-color': '#14b8a6', 'shape': 'hexagon', 'width': 70, 'height': 60 }
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#475569',
      'target-arrow-color': '#475569',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'label': 'data(label)',
      'font-size': '8px',
      'color': '#94a3b8',
      'text-background-color': '#1e293b',
      'text-background-opacity': 1,
      'text-background-padding': '2px',
      'text-background-shape': 'roundrectangle'
    }
  }
];

export default function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [cy, setCy] = useState<any>(null);

  useEffect(() => {
    if (cy) {
      cy.on('tap', 'node', (evt: any) => {
        setSelectedNode(evt.target.data());
      });
      cy.on('tap', (evt: any) => {
        if (evt.target === cy) setSelectedNode(null);
      });
    }
  }, [cy]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      <header className="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
        <div className="flex items-center space-x-3">
          <Network className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-bold">Knowledge Graph Explorer</h1>
        </div>
        <div className="flex space-x-4 text-sm text-slate-400">
          <div className="flex items-center"><Database className="w-4 h-4 mr-1"/> 14,832 Nodes</div>
          <div className="flex items-center"><Share2Icon className="w-4 h-4 mr-1"/> 47,291 Edges</div>
          <div className="flex items-center"><ClockIcon className="w-4 h-4 mr-1"/> Updated: 2026-09-27 12:00 UTC</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative bg-slate-900">
          {/* Cytoscape Graph */}
          <div className="absolute inset-0">
            <CytoscapeComponent 
              elements={graphElements} 
              style={{ width: '100%', height: '100%' }} 
              stylesheet={stylesheet as any}
              layout={{ name: 'cose', padding: 50 }}
              cy={(cyRef: any) => setCy(cyRef)}
            />
          </div>
          
          {/* Terminal / Query Bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-700 p-4">
            <div className="flex items-center space-x-2 text-slate-400 mb-2 text-xs uppercase font-semibold">
              <Terminal className="w-4 h-4" />
              <span>Cypher Query Console</span>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1 bg-slate-900 border border-slate-700 rounded p-2 flex items-center font-mono text-sm">
                <span className="text-blue-500 mr-2">$</span>
                <input 
                  type="text" 
                  className="bg-transparent border-none outline-none flex-1 text-slate-300"
                  defaultValue="MATCH (d:Document)-[r:RECORDS]->(p:Process) RETURN d, r, p LIMIT 25"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium flex items-center transition-colors">
                <Play className="w-4 h-4 mr-2" /> Run Query
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center">
              <Layers className="w-4 h-4 mr-2" /> Entity Tiering
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Tier 1 (Critical)</span>
                  <span className="text-slate-400">1,247</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-red-500 h-1.5 rounded-full" style={{ width: '15%' }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Tier 2 (Major)</span>
                  <span className="text-slate-400">3,891</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '35%' }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Tier 3 (Minor)</span>
                  <span className="text-slate-400">9,694</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '70%' }}></div></div>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-slate-700 flex-1 overflow-y-auto">
            {selectedNode ? (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center">
                  <Box className="w-4 h-4 mr-2" /> Node Details
                </h2>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 uppercase">Label</div>
                    <div className="font-mono text-sm text-slate-200">{selectedNode.label}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase">Type</div>
                    <div className="text-sm font-medium text-slate-200">{selectedNode.type}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase">Tier Classification</div>
                    <div className="text-sm font-medium text-slate-200 inline-block px-2 py-0.5 bg-slate-800 rounded border border-slate-600 mt-1">{selectedNode.tier}</div>
                  </div>
                  <div className="pt-2">
                    <button className="w-full py-1.5 bg-slate-700 hover:bg-slate-600 text-xs rounded text-slate-300 transition-colors">
                      View Full Record
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Search className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm text-center">Click on a node in the graph<br/>to view details.</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-900/50">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
              <Share2Icon className="w-4 h-4 mr-2" /> Relationships
            </h2>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between p-2 bg-slate-800 rounded border border-slate-700"><span>RECORDS</span> <span className="font-mono text-slate-400">12,401</span></div>
              <div className="flex justify-between p-2 bg-slate-800 rounded border border-slate-700"><span>GOVERNS</span> <span className="font-mono text-slate-400">8,922</span></div>
              <div className="flex justify-between p-2 bg-slate-800 rounded border border-slate-700"><span>USES</span> <span className="font-mono text-slate-400">15,304</span></div>
              <div className="flex justify-between p-2 bg-slate-800 rounded border border-slate-700"><span>CONSUMES</span> <span className="font-mono text-slate-400">10,664</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Temporary icon components to avoid missing imports
function Share2Icon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
}

function ClockIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
