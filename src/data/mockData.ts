// Types
export interface Document {
  docId: string;
  title: string;
  docType: 'SOP' | 'VP' | 'TM' | 'BR' | 'SPEC';
  version: string;
  status: 'DRAFT' | 'EFFECTIVE' | 'SUPERSEDED';
  department: string;
  plantCode: string;
  processAreas: string[];
  effectiveDate: string;
  nextReviewDate: string;
  ocrConfidence: number;
  contentHash: string;
}

export interface Equipment {
  equipmentId: string;
  name: string;
  equipmentType: string;
  plantCode: string;
  functionalLocation: string;
  tier: 1 | 2 | 3;
  isGmpCritical: boolean;
  qualificationStatus: string;
}

export interface Material {
  materialId: string;
  name: string;
  casNumber: string;
  materialType: 'API' | 'Excipient' | 'Solvent' | 'Buffer';
  tier: 1 | 2 | 3;
  pharmacopoeiaRefs: string[];
}

export interface ProcessParameter {
  paramId: string;
  name: string;
  parameterType: 'TEMP' | 'PRESSURE' | 'RPM' | 'TIME' | 'PH';
  value: number;
  unit: string;
  tolerance: number;
  tier: 1 | 2 | 3;
  isCpp: boolean;
}

export interface ChangeControlRequest {
  ccrId: string;
  title: string;
  changeType: 'Equipment' | 'Material' | 'Process' | 'Document';
  status: 'OPEN' | 'IMPACT_REVIEW' | 'PENDING_APPROVAL' | 'APPROVED' | 'CLOSED';
  openedDate: string;
  initiator: string;
  impactTier: 1 | 2 | 3;
  totalImpactedDocs: number;
  confirmedImpacts: number;
  rejectedImpacts: number;
  description: string;
}

export interface QuarantineItem {
  id: string;
  documentName: string;
  confidence: number;
  issue: string;
  queuedAt: string;
  status: 'PENDING_REVIEW' | 'UNDER_REVIEW' | 'RESOLVED';
  lowestPage: number;
  totalPages: number;
}

export interface ImpactNode {
  id: string;
  docId: string;
  title: string;
  docType: string;
  weight: number;
  impactType: 'DIRECT' | 'INDIRECT';
  tier: 1 | 2 | 3;
  intent: string;
  section: string;
  excerpt: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
}

export interface ImpactEdge {
  source: string;
  target: string;
  weight: number;
  intent: string;
}

export interface PharmaAlert {
  alertId: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  sopDocId: string;
  sopParameter: string;
  sopValue: string;
  pharmaSource: string;
  pharmaValue: string;
  comparisonType: 'LIMIT_EXCEEDED' | 'RANGE_MISMATCH' | 'MISSING';
  sopExcerpt: string;
  pharmaExcerpt: string;
  explanation: string;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'DISPUTED' | 'DEFERRED';
}

export interface ConsistencyAlert {
  alertId: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  type: 'PARAMETER_CONFLICT' | 'SEQUENCE_CONFLICT' | 'REFERENCE_CONFLICT' | 'EQUIPMENT_CONFLICT';
  sourceDoc: string;
  sourceDocTitle: string;
  sourceText: string;
  sourceParam: string;
  targetDoc: string;
  targetDocTitle: string;
  targetText: string;
  targetParam: string;
  similarityScore: number;
  explanation: string;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'DISPUTED' | 'DEFERRED';
}

export interface AuditEvent {
  eventId: string;
  eventTs: string;
  eventType: 'LOGIN' | 'LOGOUT' | 'VIEW' | 'CONFIRM' | 'REJECT' | 'SIGN' | 'EXPORT' | 'CONFIG_CHANGE';
  userName: string;
  userRole: string;
  targetType: string;
  targetId: string;
  justification?: string;
  hasEsignature: boolean;
  eventHash: string;
}

export interface NEREntity {
  id: string;
  text: string;
  label: 'EQUIPMENT' | 'MATERIAL' | 'PROCESS_PARAMETER' | 'REGULATORY_REFERENCE' | 'PERSONNEL';
  confidence: number;
  source: string;
  tier: 1 | 2 | 3;
  normalizedId?: string;
}

export interface SystemMetrics {
  totalDocuments: number;
  totalEntities: number;
  totalRelationships: number;
  openCCRs: number;
  pendingReviews: number;
  quarantineCount: number;
  pharmaAlerts: number;
  consistencyAlerts: number;
  avgOcrConfidence: number;
  nerF1Score: number;
  lastSyncTime: string;
  systemHealth: 'HEALTHY' | 'WARNING' | 'CRITICAL';
}

export interface SOPSection {
  sectionNumber: string;
  title: string;
  content: string;
  parameters: { name: string; value: string; unit: string; isCritical: boolean }[];
  entities: NEREntity[];
}

export interface SOPDocument {
  docId: string;
  title: string;
  version: string;
  effectiveDate: string;
  department: string;
  sections: SOPSection[];
}

// Mock Data Constants

export const changeControlRequests: ChangeControlRequest[] = [
  {
    ccrId: 'CCR-2026-0142',
    title: 'Replacement of Impeller in Reactor R-201',
    changeType: 'Equipment',
    status: 'IMPACT_REVIEW',
    openedDate: '2026-09-20T08:30:00Z',
    initiator: 'J. Smith',
    impactTier: 1,
    totalImpactedDocs: 15,
    confirmedImpacts: 5,
    rejectedImpacts: 2,
    description: 'Replace existing pitched blade impeller with dual Rushton turbine to improve mixing efficiency during crystallization of API.',
  },
  {
    ccrId: 'CCR-2026-0145',
    title: 'Vendor Change for Microcrystalline Cellulose',
    changeType: 'Material',
    status: 'OPEN',
    openedDate: '2026-09-22T10:15:00Z',
    initiator: 'M. Chen',
    impactTier: 2,
    totalImpactedDocs: 8,
    confirmedImpacts: 0,
    rejectedImpacts: 0,
    description: 'Change primary supplier from Vendor A to Vendor B due to supply chain constraints.',
  },
  {
    ccrId: 'CCR-2026-0130',
    title: 'Update to HPLC Method for Assay of Ibuprofen',
    changeType: 'Process',
    status: 'PENDING_APPROVAL',
    openedDate: '2026-09-10T14:20:00Z',
    initiator: 'R. Davis',
    impactTier: 1,
    totalImpactedDocs: 5,
    confirmedImpacts: 5,
    rejectedImpacts: 0,
    description: 'Alignment of analytical method with recent USP <621> monograph update.',
  },
  {
    ccrId: 'CCR-2026-0115',
    title: 'Revision of Environmental Monitoring Limits',
    changeType: 'Document',
    status: 'APPROVED',
    openedDate: '2026-08-25T09:00:00Z',
    initiator: 'S. Patel',
    impactTier: 2,
    totalImpactedDocs: 12,
    confirmedImpacts: 12,
    rejectedImpacts: 0,
    description: 'Annual review and tightening of action limits based on historical trend data.',
  },
  {
    ccrId: 'CCR-2026-0150',
    title: 'Installation of New Blister Packaging Line',
    changeType: 'Equipment',
    status: 'OPEN',
    openedDate: '2026-09-25T11:45:00Z',
    initiator: 'K. Anderson',
    impactTier: 1,
    totalImpactedDocs: 24,
    confirmedImpacts: 0,
    rejectedImpacts: 0,
    description: 'New blister line integration into Zone C to increase secondary packaging capacity.',
  },
  {
    ccrId: 'CCR-2026-0090',
    title: 'Hold Time Extension for Bulk Granules',
    changeType: 'Process',
    status: 'CLOSED',
    openedDate: '2026-07-10T08:00:00Z',
    initiator: 'L. Gomez',
    impactTier: 2,
    totalImpactedDocs: 6,
    confirmedImpacts: 6,
    rejectedImpacts: 0,
    description: 'Extension of bulk granule hold time from 30 days to 45 days based on stability data.',
  },
  {
    ccrId: 'CCR-2026-0152',
    title: 'Software Upgrade on Tablet Press TP-300',
    changeType: 'Equipment',
    status: 'OPEN',
    openedDate: '2026-09-26T13:30:00Z',
    initiator: 'P. Novak',
    impactTier: 2,
    totalImpactedDocs: 4,
    confirmedImpacts: 0,
    rejectedImpacts: 0,
    description: 'Update HMI software to version 4.2 to resolve intermittent display freezing.',
  },
  {
    ccrId: 'CCR-2026-0148',
    title: 'Change in Purified Water Generation System Sanitization Frequency',
    changeType: 'Process',
    status: 'IMPACT_REVIEW',
    openedDate: '2026-09-24T15:10:00Z',
    initiator: 'T. Wright',
    impactTier: 1,
    totalImpactedDocs: 9,
    confirmedImpacts: 3,
    rejectedImpacts: 1,
    description: 'Reduce sanitization frequency from weekly to bi-weekly based on bioburden trending.',
  }
];

export const documents: Document[] = [
  { docId: 'SOP-MFG-001', title: 'Operation of Reactor R-201', docType: 'SOP', version: '4.0', status: 'EFFECTIVE', department: 'Manufacturing', plantCode: 'PL-100', processAreas: ['Synthesis'], effectiveDate: '2025-01-15T00:00:00Z', nextReviewDate: '2027-01-15T00:00:00Z', ocrConfidence: 0.99, contentHash: 'abc123hash' },
  { docId: 'BR-API-2026', title: 'Batch Record: API X', docType: 'BR', version: '1.2', status: 'DRAFT', department: 'Manufacturing', plantCode: 'PL-100', processAreas: ['Synthesis'], effectiveDate: '', nextReviewDate: '', ocrConfidence: 0.95, contentHash: 'def456hash' },
  { docId: 'SOP-QA-050', title: 'Line Clearance Procedures', docType: 'SOP', version: '2.1', status: 'EFFECTIVE', department: 'Quality', plantCode: 'PL-100', processAreas: ['Packaging'], effectiveDate: '2024-05-20T00:00:00Z', nextReviewDate: '2026-05-20T00:00:00Z', ocrConfidence: 0.98, contentHash: 'ghi789hash' },
  { docId: 'VP-EQ-R201', title: 'Validation Protocol: Reactor R-201', docType: 'VP', version: '1.0', status: 'SUPERSEDED', department: 'Engineering', plantCode: 'PL-100', processAreas: ['Synthesis'], effectiveDate: '2020-03-10T00:00:00Z', nextReviewDate: '2022-03-10T00:00:00Z', ocrConfidence: 0.91, contentHash: 'jkl012hash' },
  { docId: 'VP-EQ-R201-V2', title: 'Validation Protocol: Reactor R-201 (Upgraded)', docType: 'VP', version: '2.0', status: 'DRAFT', department: 'Engineering', plantCode: 'PL-100', processAreas: ['Synthesis'], effectiveDate: '', nextReviewDate: '', ocrConfidence: 0.99, contentHash: 'mno345hash' },
  { docId: 'TM-MFG-R201', title: 'Training Matrix: R-201 Operations', docType: 'TM', version: '3.0', status: 'EFFECTIVE', department: 'Training', plantCode: 'PL-100', processAreas: ['Synthesis'], effectiveDate: '2025-02-01T00:00:00Z', nextReviewDate: '2026-02-01T00:00:00Z', ocrConfidence: 0.97, contentHash: 'pqr678hash' },
  { docId: 'SPEC-RM-045', title: 'Raw Material Specification: Microcrystalline Cellulose', docType: 'SPEC', version: '5.0', status: 'EFFECTIVE', department: 'QC', plantCode: 'PL-100', processAreas: ['Formulation'], effectiveDate: '2023-11-15T00:00:00Z', nextReviewDate: '2025-11-15T00:00:00Z', ocrConfidence: 0.99, contentHash: 'stu901hash' },
  { docId: 'SOP-QC-110', title: 'HPLC Analysis of APIs', docType: 'SOP', version: '6.2', status: 'EFFECTIVE', department: 'QC', plantCode: 'PL-100', processAreas: ['Analytical'], effectiveDate: '2024-08-10T00:00:00Z', nextReviewDate: '2026-08-10T00:00:00Z', ocrConfidence: 0.98, contentHash: 'vwx234hash' },
  { docId: 'SOP-EN-020', title: 'Preventive Maintenance: Fluid Bed Dryers', docType: 'SOP', version: '2.0', status: 'EFFECTIVE', department: 'Engineering', plantCode: 'PL-100', processAreas: ['Drying'], effectiveDate: '2023-06-30T00:00:00Z', nextReviewDate: '2025-06-30T00:00:00Z', ocrConfidence: 0.96, contentHash: 'yza567hash' },
  { docId: 'BR-TAB-101', title: 'Batch Record: Paracetamol Tablets 500mg', docType: 'BR', version: '4.0', status: 'EFFECTIVE', department: 'Manufacturing', plantCode: 'PL-100', processAreas: ['Compression'], effectiveDate: '2025-04-12T00:00:00Z', nextReviewDate: '2027-04-12T00:00:00Z', ocrConfidence: 0.94, contentHash: 'bcd890hash' },
  { docId: 'SOP-MFG-045', title: 'Operation of Tablet Press TP-300', docType: 'SOP', version: '3.1', status: 'EFFECTIVE', department: 'Manufacturing', plantCode: 'PL-100', processAreas: ['Compression'], effectiveDate: '2024-09-01T00:00:00Z', nextReviewDate: '2026-09-01T00:00:00Z', ocrConfidence: 0.99, contentHash: 'efg123hash' },
  { docId: 'VP-MFG-099', title: 'Cleaning Validation: Purified Water System', docType: 'VP', version: '1.0', status: 'EFFECTIVE', department: 'Validation', plantCode: 'PL-100', processAreas: ['Utilities'], effectiveDate: '2022-12-15T00:00:00Z', nextReviewDate: '2027-12-15T00:00:00Z', ocrConfidence: 0.98, contentHash: 'hij456hash' },
];

export const quarantineItems: QuarantineItem[] = [
  { id: 'Q-1001', documentName: 'Scanned_BR_Batch_88912.pdf', confidence: 0.65, issue: 'Poor scan quality on pages 4-6, unreadable handwritten entries.', queuedAt: '2026-09-27T08:15:00Z', status: 'PENDING_REVIEW', lowestPage: 4, totalPages: 25 },
  { id: 'Q-1002', documentName: 'Vendor_COA_Lot_X771.pdf', confidence: 0.72, issue: 'Missing signature block on final page.', queuedAt: '2026-09-26T14:30:00Z', status: 'UNDER_REVIEW', lowestPage: 2, totalPages: 2 },
  { id: 'Q-1003', documentName: 'Legacy_SOP_MFG_005_v1.pdf', confidence: 0.58, issue: 'Watermark obscures critical parameter values.', queuedAt: '2026-09-25T11:00:00Z', status: 'PENDING_REVIEW', lowestPage: 3, totalPages: 10 },
  { id: 'Q-1004', documentName: 'Env_Monitoring_Log_Sep.pdf', confidence: 0.81, issue: 'Table structure extraction failed for Room 204 data.', queuedAt: '2026-09-27T09:45:00Z', status: 'PENDING_REVIEW', lowestPage: 8, totalPages: 15 },
  { id: 'Q-1005', documentName: 'Maint_Report_FBD_101.pdf', confidence: 0.69, issue: 'Embedded image resolution too low for OCR.', queuedAt: '2026-09-24T16:20:00Z', status: 'RESOLVED', lowestPage: 1, totalPages: 5 },
];

export const impactNodes: ImpactNode[] = [
  { id: 'n1', docId: 'SOP-MFG-001', title: 'Operation of Reactor R-201', docType: 'SOP', weight: 0.95, impactType: 'DIRECT', tier: 1, intent: 'Defines operating limits for R-201', section: '5.2', excerpt: 'Set R-201 agitator speed to 120 RPM.', status: 'PENDING' },
  { id: 'n2', docId: 'VP-EQ-R201', title: 'Validation Protocol: Reactor R-201', docType: 'VP', weight: 0.9, impactType: 'DIRECT', tier: 1, intent: 'Validates equipment performance', section: '4.0', excerpt: 'Verify pitched blade impeller installation.', status: 'CONFIRMED' },
  { id: 'n3', docId: 'BR-API-2026', title: 'Batch Record: API X', docType: 'BR', weight: 0.85, impactType: 'DIRECT', tier: 1, intent: 'Records batch specific parameters', section: 'Step 4', excerpt: 'Record R-201 agitation speed.', status: 'PENDING' },
  { id: 'n4', docId: 'TM-MFG-R201', title: 'Training Matrix: R-201 Operations', docType: 'TM', weight: 0.7, impactType: 'INDIRECT', tier: 2, intent: 'Training on updated SOP', section: 'Module 2', excerpt: 'Trainees must understand impeller dynamics.', status: 'PENDING' },
  { id: 'n5', docId: 'SOP-EN-035', title: 'Maintenance of Agitators', docType: 'SOP', weight: 0.6, impactType: 'INDIRECT', tier: 2, intent: 'Maintenance schedule', section: '6.1', excerpt: 'Inspect pitched blades quarterly.', status: 'PENDING' },
  { id: 'n6', docId: 'SOP-QA-080', title: 'Equipment Changeover', docType: 'SOP', weight: 0.5, impactType: 'INDIRECT', tier: 3, intent: 'Cleaning procedures', section: '7.3', excerpt: 'Clean underside of pitched blades thoroughly.', status: 'REJECTED' },
  { id: 'n7', docId: 'SOP-MFG-005', title: 'Crystallization General Principles', docType: 'SOP', weight: 0.4, impactType: 'INDIRECT', tier: 3, intent: 'General process description', section: '3.0', excerpt: 'Agitation type influences crystal growth.', status: 'REJECTED' },
  { id: 'n8', docId: 'SPEC-API-X', title: 'Product Spec: API X', docType: 'SPEC', weight: 0.2, impactType: 'INDIRECT', tier: 3, intent: 'Final product attributes', section: '2.0', excerpt: 'Particle size distribution limits.', status: 'PENDING' },
  { id: 'n9', docId: 'BR-API-2025', title: 'Batch Record: API Y', docType: 'BR', weight: 0.6, impactType: 'DIRECT', tier: 2, intent: 'Records batch specific parameters for Y', section: 'Step 8', excerpt: 'Agitate in R-201 for 2 hours.', status: 'CONFIRMED' },
  { id: 'n10', docId: 'SOP-SAFETY-01', title: 'Reactor Safety Guidelines', docType: 'SOP', weight: 0.4, impactType: 'INDIRECT', tier: 3, intent: 'Safety limits', section: '4.5', excerpt: 'Maximum RPM for pitched blades is 150.', status: 'PENDING' },
];

export const impactEdges: ImpactEdge[] = [
  { source: 'CCR-2026-0142', target: 'n1', weight: 0.95, intent: 'Modifies equipment referenced in SOP' },
  { source: 'CCR-2026-0142', target: 'n2', weight: 0.9, intent: 'Invalidates existing validation state' },
  { source: 'CCR-2026-0142', target: 'n3', weight: 0.85, intent: 'Alters master batch record instructions' },
  { source: 'n1', target: 'n4', weight: 0.7, intent: 'SOP update triggers training update' },
  { source: 'CCR-2026-0142', target: 'n5', weight: 0.6, intent: 'New equipment requires updated maintenance' },
  { source: 'CCR-2026-0142', target: 'n6', weight: 0.5, intent: 'Cleaning procedure may change' },
  { source: 'n3', target: 'n8', weight: 0.2, intent: 'Process change may impact product specs' },
  { source: 'CCR-2026-0142', target: 'n9', weight: 0.6, intent: 'Multi-product equipment impact' },
  { source: 'CCR-2026-0142', target: 'n10', weight: 0.4, intent: 'Safety limits must be re-evaluated' },
  { source: 'n2', target: 'n1', weight: 0.8, intent: 'Validation defines operating ranges for SOP' },
];

export const pharmaAlerts: PharmaAlert[] = [
  {
    alertId: 'PA-001',
    severity: 'CRITICAL',
    sopDocId: 'SOP-QC-110',
    sopParameter: 'Column Temperature',
    sopValue: '45°C',
    pharmaSource: 'USP <621> Chromatography',
    pharmaValue: 'Max 40°C',
    comparisonType: 'LIMIT_EXCEEDED',
    sopExcerpt: 'Maintain column compartment temperature at 45°C during the run.',
    pharmaExcerpt: 'For this stationary phase, temperatures should not exceed 40°C to prevent degradation.',
    explanation: 'SOP temperature limit exceeds maximum allowed by USP <621> for the specified column type.',
    status: 'PENDING'
  },
  {
    alertId: 'PA-002',
    severity: 'WARNING',
    sopDocId: 'SPEC-RM-045',
    sopParameter: 'Loss on Drying',
    sopValue: 'NMT 6.0%',
    pharmaSource: 'Ph. Eur. 2.2.32',
    pharmaValue: 'NMT 5.0%',
    comparisonType: 'RANGE_MISMATCH',
    sopExcerpt: 'Loss on drying (105°C, 2h) shall be NMT 6.0%.',
    pharmaExcerpt: 'Microcrystalline cellulose loss on drying: Maximum 5.0 per cent.',
    explanation: 'Internal specification is looser than the current European Pharmacopoeia monograph.',
    status: 'ACKNOWLEDGED'
  },
  {
    alertId: 'PA-003',
    severity: 'CRITICAL',
    sopDocId: 'SOP-MFG-001',
    sopParameter: 'Sterilization Hold Time',
    sopValue: '10 mins',
    pharmaSource: 'USP <1229> Sterilization',
    pharmaValue: 'Min 15 mins @ 121°C',
    comparisonType: 'LIMIT_EXCEEDED',
    sopExcerpt: 'Hold at 121.5°C for 10 minutes.',
    pharmaExcerpt: 'Standard moist heat sterilization cycles require a minimum of 15 minutes at 121°C.',
    explanation: 'Sterilization hold time is shorter than regulatory minimum standards.',
    status: 'PENDING'
  },
  {
    alertId: 'PA-004',
    severity: 'INFO',
    sopDocId: 'SOP-MFG-045',
    sopParameter: 'Tablet Friability',
    sopValue: 'NMT 1.0%',
    pharmaSource: 'USP <1216> Tablet Friability',
    pharmaValue: 'NMT 1.0%',
    comparisonType: 'MISSING',
    sopExcerpt: 'Target friability is < 1.0%.',
    pharmaExcerpt: 'A maximum weight loss of not more than 1.0% is considered acceptable.',
    explanation: 'SOP aligns with USP, but does not explicitly reference USP <1216> in the testing section.',
    status: 'DISPUTED'
  },
  {
    alertId: 'PA-005',
    severity: 'WARNING',
    sopDocId: 'VP-MFG-099',
    sopParameter: 'TOC Limit',
    sopValue: '500 ppb',
    pharmaSource: 'USP <643> TOC',
    pharmaValue: '500 ppb',
    comparisonType: 'RANGE_MISMATCH',
    sopExcerpt: 'Action limit for TOC is 500 ppb.',
    pharmaExcerpt: 'The limit response is 500 µg/L (ppb) of Carbon.',
    explanation: 'Action limit equals the regulatory absolute limit. Typically action limits should be lower (e.g., 300 ppb) to allow corrective action before a failure.',
    status: 'PENDING'
  },
  {
    alertId: 'PA-006',
    severity: 'CRITICAL',
    sopDocId: 'SOP-QA-050',
    sopParameter: 'Visual Inspection Light Intensity',
    sopValue: '2000 Lux',
    pharmaSource: 'USP <790> Visible Particulates',
    pharmaValue: '2000 - 3750 Lux',
    comparisonType: 'RANGE_MISMATCH',
    sopExcerpt: 'Perform visual inspection under fluorescent light at 2000 Lux.',
    pharmaExcerpt: 'Illumination at the inspection point is between 2000 and 3750 lux.',
    explanation: 'SOP specifies exactly 2000 Lux. Natural degradation of bulbs may cause it to fall below the minimum USP requirement. Recommend defining a range.',
    status: 'PENDING'
  }
];

export const consistencyAlerts: ConsistencyAlert[] = [
  {
    alertId: 'CA-001',
    severity: 'CRITICAL',
    type: 'PARAMETER_CONFLICT',
    sourceDoc: 'SOP-MFG-001',
    sourceDocTitle: 'Operation of Reactor R-201',
    sourceText: 'Cooling jacket temperature should be set to 5°C.',
    sourceParam: 'Temp: 5°C',
    targetDoc: 'BR-API-2026',
    targetDocTitle: 'Batch Record: API X',
    targetText: 'Set R-201 cooling jacket to 10°C.',
    targetParam: 'Temp: 10°C',
    similarityScore: 0.92,
    explanation: 'Master Batch Record specifies a different cooling temperature than the equipment operating SOP.',
    status: 'PENDING'
  },
  {
    alertId: 'CA-002',
    severity: 'WARNING',
    type: 'SEQUENCE_CONFLICT',
    sourceDoc: 'SOP-QA-050',
    sourceDocTitle: 'Line Clearance Procedures',
    sourceText: 'QA must sign off before removing previous batch documentation.',
    sourceParam: 'Step 3',
    targetDoc: 'BR-TAB-101',
    targetDocTitle: 'Batch Record: Paracetamol Tablets',
    targetText: 'Remove previous batch documentation, then request QA sign-off.',
    targetParam: 'Step 2 & 3',
    similarityScore: 0.85,
    explanation: 'The sequence of line clearance operations contradicts the QA SOP.',
    status: 'ACKNOWLEDGED'
  },
  {
    alertId: 'CA-003',
    severity: 'INFO',
    type: 'EQUIPMENT_CONFLICT',
    sourceDoc: 'VP-EQ-R201',
    sourceDocTitle: 'Validation Protocol: Reactor R-201',
    sourceText: 'Vessel volume is 2000L.',
    sourceParam: 'Vol: 2000L',
    targetDoc: 'TM-MFG-R201',
    targetDocTitle: 'Training Matrix: R-201',
    targetText: 'R-201 is a 2500L glass-lined reactor.',
    targetParam: 'Vol: 2500L',
    similarityScore: 0.88,
    explanation: 'Discrepancy in equipment volume stated in training material vs validation documentation.',
    status: 'PENDING'
  },
  {
    alertId: 'CA-004',
    severity: 'CRITICAL',
    type: 'REFERENCE_CONFLICT',
    sourceDoc: 'SPEC-RM-045',
    sourceDocTitle: 'Raw Material Specification',
    sourceText: 'Test according to SOP-QC-110 v5.0.',
    sourceParam: 'SOP-QC-110 v5.0',
    targetDoc: 'SOP-QC-110',
    targetDocTitle: 'HPLC Analysis of APIs',
    targetText: 'Current effective version is 6.2.',
    targetParam: 'Version 6.2',
    similarityScore: 0.98,
    explanation: 'Specification document references an obsolete version of the testing SOP.',
    status: 'PENDING'
  }
];

export const auditEvents: AuditEvent[] = [
  { eventId: 'AE-001', eventTs: '2026-09-27T08:15:22Z', eventType: 'LOGIN', userName: 'jsmith', userRole: 'Operator', targetType: 'System', targetId: 'SYS', hasEsignature: false, eventHash: 'h1' },
  { eventId: 'AE-002', eventTs: '2026-09-27T08:20:10Z', eventType: 'VIEW', userName: 'jsmith', userRole: 'Operator', targetType: 'Document', targetId: 'SOP-MFG-001', hasEsignature: false, eventHash: 'h2' },
  { eventId: 'AE-003', eventTs: '2026-09-27T09:05:45Z', eventType: 'CONFIRM', userName: 'mchen', userRole: 'QA_Reviewer', targetType: 'ImpactNode', targetId: 'n2', justification: 'Verified impact is direct.', hasEsignature: true, eventHash: 'h3' },
  { eventId: 'AE-004', eventTs: '2026-09-27T09:15:00Z', eventType: 'REJECT', userName: 'mchen', userRole: 'QA_Reviewer', targetType: 'ImpactNode', targetId: 'n6', justification: 'Cleaning procedure unaffected by impeller change.', hasEsignature: true, eventHash: 'h4' },
  { eventId: 'AE-005', eventTs: '2026-09-26T14:30:12Z', eventType: 'CONFIG_CHANGE', userName: 'admin_sys', userRole: 'Admin', targetType: 'System', targetId: 'NER_Threshold', justification: 'Increased threshold to reduce false positives.', hasEsignature: true, eventHash: 'h5' },
  { eventId: 'AE-006', eventTs: '2026-09-26T15:45:00Z', eventType: 'VIEW', userName: 'rdavis', userRole: 'QC_Analyst', targetType: 'Alert', targetId: 'PA-001', hasEsignature: false, eventHash: 'h6' },
  { eventId: 'AE-007', eventTs: '2026-09-26T16:00:20Z', eventType: 'SIGN', userName: 'rdavis', userRole: 'QC_Analyst', targetType: 'ChangeControl', targetId: 'CCR-2026-0130', justification: 'Method update approved.', hasEsignature: true, eventHash: 'h7' },
  { eventId: 'AE-008', eventTs: '2026-09-25T10:10:10Z', eventType: 'EXPORT', userName: 'spatel', userRole: 'Manager', targetType: 'Report', targetId: 'Monthly_Metrics', hasEsignature: false, eventHash: 'h8' },
  { eventId: 'AE-009', eventTs: '2026-09-25T11:22:33Z', eventType: 'LOGIN', userName: 'kanderson', userRole: 'Engineer', targetType: 'System', targetId: 'SYS', hasEsignature: false, eventHash: 'h9' },
  { eventId: 'AE-010', eventTs: '2026-09-25T11:45:00Z', eventType: 'CONFIRM', userName: 'kanderson', userRole: 'Engineer', targetType: 'ChangeControl', targetId: 'CCR-2026-0150', justification: 'Initiated CCR for blister line.', hasEsignature: true, eventHash: 'h10' },
  { eventId: 'AE-011', eventTs: '2026-09-24T09:00:00Z', eventType: 'LOGOUT', userName: 'lgomez', userRole: 'Supervisor', targetType: 'System', targetId: 'SYS', hasEsignature: false, eventHash: 'h11' },
  { eventId: 'AE-012', eventTs: '2026-09-24T14:20:00Z', eventType: 'VIEW', userName: 'pnovak', userRole: 'Operator', targetType: 'Document', targetId: 'BR-TAB-101', hasEsignature: false, eventHash: 'h12' },
  { eventId: 'AE-013', eventTs: '2026-09-24T15:10:00Z', eventType: 'CONFIRM', userName: 'twright', userRole: 'Validation', targetType: 'ChangeControl', targetId: 'CCR-2026-0148', justification: 'Initiated sanitization change.', hasEsignature: true, eventHash: 'h13' },
  { eventId: 'AE-014', eventTs: '2026-09-23T10:05:00Z', eventType: 'VIEW', userName: 'mchen', userRole: 'QA_Reviewer', targetType: 'Alert', targetId: 'CA-001', hasEsignature: false, eventHash: 'h14' },
  { eventId: 'AE-015', eventTs: '2026-09-23T10:15:00Z', eventType: 'CONFIRM', userName: 'mchen', userRole: 'QA_Reviewer', targetType: 'Alert', targetId: 'CA-002', justification: 'Acknowledged sequence conflict, update pending.', hasEsignature: true, eventHash: 'h15' },
  { eventId: 'AE-016', eventTs: '2026-09-22T08:30:00Z', eventType: 'LOGIN', userName: 'jsmith', userRole: 'Operator', targetType: 'System', targetId: 'SYS', hasEsignature: false, eventHash: 'h16' },
  { eventId: 'AE-017', eventTs: '2026-09-22T10:15:00Z', eventType: 'CONFIRM', userName: 'mchen', userRole: 'QA_Reviewer', targetType: 'ChangeControl', targetId: 'CCR-2026-0145', justification: 'Initiated vendor change CCR.', hasEsignature: true, eventHash: 'h17' },
  { eventId: 'AE-018', eventTs: '2026-09-21T13:45:00Z', eventType: 'VIEW', userName: 'rdavis', userRole: 'QC_Analyst', targetType: 'Document', targetId: 'SPEC-RM-045', hasEsignature: false, eventHash: 'h18' },
  { eventId: 'AE-019', eventTs: '2026-09-21T14:00:00Z', eventType: 'REJECT', userName: 'rdavis', userRole: 'QC_Analyst', targetType: 'Alert', targetId: 'PA-004', justification: 'Friability limit is adequate, explicit USP ref not required in this section.', hasEsignature: true, eventHash: 'h19' },
  { eventId: 'AE-020', eventTs: '2026-09-20T08:30:00Z', eventType: 'CONFIRM', userName: 'jsmith', userRole: 'Operator', targetType: 'ChangeControl', targetId: 'CCR-2026-0142', justification: 'Initiated impeller change CCR.', hasEsignature: true, eventHash: 'h20' },
];

export const nerEntities: NEREntity[] = [
  { id: 'E-001', text: 'Reactor R-201', label: 'EQUIPMENT', confidence: 0.99, source: 'SOP-MFG-001', tier: 1, normalizedId: 'EQ-R201' },
  { id: 'E-002', text: '120 RPM', label: 'PROCESS_PARAMETER', confidence: 0.95, source: 'SOP-MFG-001', tier: 1 },
  { id: 'E-003', text: 'Microcrystalline Cellulose', label: 'MATERIAL', confidence: 0.98, source: 'SPEC-RM-045', tier: 2, normalizedId: 'MAT-MCC-01' },
  { id: 'E-004', text: 'USP <621>', label: 'REGULATORY_REFERENCE', confidence: 0.97, source: 'SOP-QC-110', tier: 1 },
  { id: 'E-005', text: 'Fluid Bed Dryer', label: 'EQUIPMENT', confidence: 0.94, source: 'SOP-EN-020', tier: 2 },
  { id: 'E-006', text: 'Paracetamol', label: 'MATERIAL', confidence: 0.99, source: 'BR-TAB-101', tier: 1, normalizedId: 'MAT-PCM-01' },
  { id: 'E-007', text: 'Tablet Press TP-300', label: 'EQUIPMENT', confidence: 0.98, source: 'SOP-MFG-045', tier: 1, normalizedId: 'EQ-TP300' },
  { id: 'E-008', text: 'Purified Water', label: 'MATERIAL', confidence: 0.96, source: 'VP-MFG-099', tier: 1 },
  { id: 'E-009', text: '121.5°C', label: 'PROCESS_PARAMETER', confidence: 0.99, source: 'SOP-MFG-001', tier: 1 },
  { id: 'E-010', text: 'Quality Assurance Manager', label: 'PERSONNEL', confidence: 0.92, source: 'SOP-QA-050', tier: 3 },
  { id: 'E-011', text: 'Ph. Eur. 2.2.32', label: 'REGULATORY_REFERENCE', confidence: 0.95, source: 'SPEC-RM-045', tier: 1 },
  { id: 'E-012', text: '5°C', label: 'PROCESS_PARAMETER', confidence: 0.98, source: 'SOP-MFG-001', tier: 1 },
  { id: 'E-013', text: 'Ibuprofen', label: 'MATERIAL', confidence: 0.99, source: 'CCR-2026-0130', tier: 1, normalizedId: 'MAT-IBU-01' },
  { id: 'E-014', text: '10 minutes', label: 'PROCESS_PARAMETER', confidence: 0.97, source: 'SOP-MFG-001', tier: 1 },
  { id: 'E-015', text: 'Production Supervisor', label: 'PERSONNEL', confidence: 0.93, source: 'BR-API-2026', tier: 3 },
];

export const systemMetrics: SystemMetrics = {
  totalDocuments: 12458,
  totalEntities: 84592,
  totalRelationships: 156304,
  openCCRs: 42,
  pendingReviews: 18,
  quarantineCount: 5,
  pharmaAlerts: 14,
  consistencyAlerts: 22,
  avgOcrConfidence: 0.96,
  nerF1Score: 0.94,
  lastSyncTime: '2026-09-27T18:45:00Z',
  systemHealth: 'HEALTHY'
};

export const sopDocument: SOPDocument = {
  docId: 'SOP-MFG-001',
  title: 'Operation of Reactor R-201',
  version: '4.0',
  effectiveDate: '2025-01-15T00:00:00Z',
  department: 'Manufacturing',
  sections: [
    {
      sectionNumber: '1.0',
      title: 'Purpose',
      content: 'This Standard Operating Procedure (SOP) defines the operational steps, critical process parameters (CPPs), and safety precautions for the operation of the 2000L glass-lined Reactor R-201 during the synthesis of API X.',
      parameters: [],
      entities: [
        { id: 'e1', text: 'Reactor R-201', label: 'EQUIPMENT', confidence: 0.99, source: 'SOP-MFG-001', tier: 1 },
        { id: 'e2', text: 'API X', label: 'MATERIAL', confidence: 0.98, source: 'SOP-MFG-001', tier: 1 }
      ]
    },
    {
      sectionNumber: '2.0',
      title: 'Scope',
      content: 'This procedure applies to all manufacturing personnel involved in the operation, charging, heating, cooling, and discharging of Reactor R-201 in Plant 100.',
      parameters: [],
      entities: [
        { id: 'e3', text: 'Reactor R-201', label: 'EQUIPMENT', confidence: 0.99, source: 'SOP-MFG-001', tier: 1 }
      ]
    },
    {
      sectionNumber: '3.0',
      title: 'Prerequisites',
      content: 'Ensure equipment is clean and bears a valid "CLEANED" label. Verify that the previous batch records are closed and line clearance is approved by QA.',
      parameters: [],
      entities: [
        { id: 'e4', text: 'QA', label: 'PERSONNEL', confidence: 0.92, source: 'SOP-MFG-001', tier: 3 }
      ]
    },
    {
      sectionNumber: '4.0',
      title: 'Solvent Charging',
      content: 'Transfer 500L of Purified Water and 200L of Ethanol into R-201 using the automated transfer skid. Maintain reactor pressure at < 0.5 bar during transfer.',
      parameters: [
        { name: 'Purified Water Volume', value: '500', unit: 'L', isCritical: false },
        { name: 'Ethanol Volume', value: '200', unit: 'L', isCritical: false },
        { name: 'Reactor Pressure', value: '< 0.5', unit: 'bar', isCritical: true }
      ],
      entities: [
        { id: 'e5', text: 'Purified Water', label: 'MATERIAL', confidence: 0.97, source: 'SOP-MFG-001', tier: 1 },
        { id: 'e6', text: 'Ethanol', label: 'MATERIAL', confidence: 0.98, source: 'SOP-MFG-001', tier: 2 },
        { id: 'e7', text: '< 0.5 bar', label: 'PROCESS_PARAMETER', confidence: 0.95, source: 'SOP-MFG-001', tier: 1 }
      ]
    },
    {
      sectionNumber: '5.0',
      title: 'Heating and Agitation',
      content: 'Start the agitator and set R-201 agitator speed to 120 RPM. Initiate heating via the steam jacket. Ramp the internal temperature to 85°C (±2°C) over 30 minutes. Hold at this temperature for 2 hours for complete dissolution.',
      parameters: [
        { name: 'Agitator Speed', value: '120', unit: 'RPM', isCritical: true },
        { name: 'Target Temperature', value: '85', unit: '°C', isCritical: true },
        { name: 'Hold Time', value: '120', unit: 'minutes', isCritical: true }
      ],
      entities: [
        { id: 'e8', text: '120 RPM', label: 'PROCESS_PARAMETER', confidence: 0.99, source: 'SOP-MFG-001', tier: 1 },
        { id: 'e9', text: '85°C', label: 'PROCESS_PARAMETER', confidence: 0.98, source: 'SOP-MFG-001', tier: 1 },
        { id: 'e10', text: '2 hours', label: 'PROCESS_PARAMETER', confidence: 0.97, source: 'SOP-MFG-001', tier: 1 }
      ]
    },
    {
      sectionNumber: '6.0',
      title: 'Cooling and Crystallization',
      content: 'Turn off steam and apply chilled water to the cooling jacket. The cooling jacket temperature should be set to 5°C. Cool the reaction mixture to 10°C at a rate of 1°C/minute. Agitation must be maintained at 60 RPM during crystallization.',
      parameters: [
        { name: 'Jacket Setpoint', value: '5', unit: '°C', isCritical: true },
        { name: 'Cooling Rate', value: '1', unit: '°C/min', isCritical: false },
        { name: 'Final Temp', value: '10', unit: '°C', isCritical: true },
        { name: 'Cryst Agitator Speed', value: '60', unit: 'RPM', isCritical: true }
      ],
      entities: [
        { id: 'e11', text: '5°C', label: 'PROCESS_PARAMETER', confidence: 0.99, source: 'SOP-MFG-001', tier: 1 },
        { id: 'e12', text: '10°C', label: 'PROCESS_PARAMETER', confidence: 0.98, source: 'SOP-MFG-001', tier: 1 },
        { id: 'e13', text: '60 RPM', label: 'PROCESS_PARAMETER', confidence: 0.99, source: 'SOP-MFG-001', tier: 1 }
      ]
    }
  ]
};

export const monthlyTrendData = [
  { month: 'Oct', documentsProcessed: 450, entitiesExtracted: 2100, alertsGenerated: 12, ccrsCompleted: 5 },
  { month: 'Nov', documentsProcessed: 520, entitiesExtracted: 2450, alertsGenerated: 15, ccrsCompleted: 8 },
  { month: 'Dec', documentsProcessed: 380, entitiesExtracted: 1800, alertsGenerated: 9, ccrsCompleted: 4 },
  { month: 'Jan', documentsProcessed: 610, entitiesExtracted: 3100, alertsGenerated: 22, ccrsCompleted: 10 },
  { month: 'Feb', documentsProcessed: 590, entitiesExtracted: 2950, alertsGenerated: 18, ccrsCompleted: 7 },
  { month: 'Mar', documentsProcessed: 650, entitiesExtracted: 3300, alertsGenerated: 25, ccrsCompleted: 12 },
  { month: 'Apr', documentsProcessed: 720, entitiesExtracted: 3650, alertsGenerated: 14, ccrsCompleted: 15 },
  { month: 'May', documentsProcessed: 680, entitiesExtracted: 3400, alertsGenerated: 19, ccrsCompleted: 9 },
  { month: 'Jun', documentsProcessed: 810, entitiesExtracted: 4100, alertsGenerated: 28, ccrsCompleted: 14 },
  { month: 'Jul', documentsProcessed: 750, entitiesExtracted: 3850, alertsGenerated: 21, ccrsCompleted: 11 },
  { month: 'Aug', documentsProcessed: 890, entitiesExtracted: 4600, alertsGenerated: 30, ccrsCompleted: 18 },
  { month: 'Sep', documentsProcessed: 920, entitiesExtracted: 4800, alertsGenerated: 24, ccrsCompleted: 22 },
];

export const pipelineStageData = [
  { name: 'Ingested', value: 12458 },
  { name: 'OCR Completed', value: 12100 },
  { name: 'NER Processed', value: 11500 },
  { name: 'Graph Embedded', value: 11250 },
  { name: 'Fully Indexed', value: 11100 },
];

export const nerAccuracyData = [
  { name: 'Equipment', precision: 0.96, recall: 0.94, f1: 0.95 },
  { name: 'Material', precision: 0.98, recall: 0.97, f1: 0.97 },
  { name: 'Process Param', precision: 0.93, recall: 0.91, f1: 0.92 },
  { name: 'Regulatory', precision: 0.99, recall: 0.98, f1: 0.98 },
  { name: 'Personnel', precision: 0.89, recall: 0.85, f1: 0.87 },
];
