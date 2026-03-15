/* REPORTS PAGE — DATA CONSTANTS */
const REPORT_TYPES = [
  { id: 'full', title: 'Full Security Report', subtitle: 'All sections, complete detail', icon: 'FileText', sections: ['cbom', 'tls', 'risk', 'remediation', 'compliance'], estimatedPages: 24, estimatedSize: '2.4 MB' },
  { id: 'executive', title: 'Executive Summary', subtitle: '2-page overview for management', icon: 'BarChart2', sections: ['risk', 'compliance'], estimatedPages: 2, estimatedSize: '180 KB' },
  { id: 'technical', title: 'Technical Deep Dive', subtitle: 'Raw data, all cipher details', icon: 'Terminal', sections: ['cbom', 'tls', 'remediation'], estimatedPages: 38, estimatedSize: '4.1 MB' },
  { id: 'compliance', title: 'Compliance Report', subtitle: 'Framework gap analysis', icon: 'ClipboardCheck', sections: ['compliance', 'risk'], estimatedPages: 12, estimatedSize: '980 KB' },
];

const REPORT_SECTIONS = [
  { id: 'cbom', label: 'CBOM Inventory', defaultOn: true },
  { id: 'tls', label: 'TLS Analysis Results', defaultOn: true },
  { id: 'risk', label: 'Quantum Risk Assessment', defaultOn: true },
  { id: 'remediation', label: 'Remediation Plan', defaultOn: true },
  { id: 'compliance', label: 'Compliance Mapping', defaultOn: true },
  { id: 'rawdata', label: 'Raw Data Export', defaultOn: false },
];

const EXPORT_FORMATS = [
  { id: 'pdf', label: 'PDF', icon: 'FileText' },
  { id: 'json', label: 'JSON', icon: 'Braces' },
  { id: 'csv', label: 'CSV', icon: 'Table' },
  { id: 'xml', label: 'XML', icon: 'Code' },
];

const SCHEDULED_REPORTS = [
  { id: 'SCH-001', name: 'Weekly Full Security Report', type: 'full', frequency: 'Weekly', nextRun: 'Mar 19, 2026 — 02:00 IST', format: 'PDF', recipients: ['ciso@pnb.co.in', 'security@pnb.co.in'], active: true },
  { id: 'SCH-002', name: 'Monthly Executive Summary', type: 'executive', frequency: 'Monthly', nextRun: 'Apr 01, 2026 — 08:00 IST', format: 'PDF', recipients: ['board@pnb.co.in'], active: true },
  { id: 'SCH-003', name: 'Daily Compliance Check', type: 'compliance', frequency: 'Daily', nextRun: 'Mar 13, 2026 — 00:00 IST', format: 'JSON', recipients: ['compliance@pnb.co.in'], active: false },
];

const RECENT_REPORTS = [
  { id: 'RPT-001', name: 'Full Security Report — Mar 12', type: 'full', generatedAt: 'Mar 12, 2026 18:00', format: 'PDF', size: '2.3 MB', pages: 24, generatedBy: 'raj.kumar' },
  { id: 'RPT-002', name: 'Executive Summary — Mar 05', type: 'executive', generatedAt: 'Mar 05, 2026 09:00', format: 'PDF', size: '175 KB', pages: 2, generatedBy: 'admin' },
  { id: 'RPT-003', name: 'Compliance Report — Feb 28', type: 'compliance', generatedAt: 'Feb 28, 2026 17:30', format: 'PDF', size: '960 KB', pages: 11, generatedBy: 'deepa.singh' },
  { id: 'RPT-004', name: 'CBOM Export — Feb 26', type: 'technical', generatedAt: 'Feb 26, 2026 14:00', format: 'JSON', size: '1.2 MB', pages: null, generatedBy: 'raj.kumar' },
];
