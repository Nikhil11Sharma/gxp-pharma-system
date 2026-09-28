import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import ChangeControl from './components/ChangeControl'
import ImpactAnalysis from './components/ImpactAnalysis'
import DocumentReview from './components/DocumentReview'
import KnowledgeGraph from './components/KnowledgeGraph'
import AuditTrail from './components/AuditTrail'
import QuarantineQueue from './components/QuarantineQueue'
import SystemConfig from './components/SystemConfig'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="change-control" element={<ChangeControl />} />
        <Route path="impact-analysis" element={<ImpactAnalysis />} />
        <Route path="document-review" element={<DocumentReview />} />
        <Route path="knowledge-graph" element={<KnowledgeGraph />} />
        <Route path="audit-trail" element={<AuditTrail />} />
        <Route path="quarantine" element={<QuarantineQueue />} />
        <Route path="system-config" element={<SystemConfig />} />
      </Route>
    </Routes>
  )
}

export default App
