const RISK_DATA = {
  overallScore: 78.2,
  vulnerableAssets: 184,
  totalAssets: 247,
  byCategory: [
    { label: 'Network', color: '#4F46E5', count: 82, pct: 33 },
    { label: 'Storage', color: '#F59E0B', count: 65, pct: 26 },
    { label: 'Compute', color: '#10B981', count: 54, pct: 22 },
    { label: 'Identity', color: '#EF4444', count: 46, pct: 19 }
  ],
  sixMonthTrend: [
    { month: 'Oct', score: 85.1 },
    { month: 'Nov', score: 84.5 },
    { month: 'Dec', score: 82.3 },
    { month: 'Jan', score: 81.0 },
    { month: 'Feb', score: 79.8 },
    { month: 'Mar', score: 78.2 }
  ],
  lastImprovement: '1.6 pts'
};

const TOP_CRITICAL_ASSETS = [
  { rank: 1, domain: 'vpn.pnbindia.in', exposure: 'Customer Data', score: 96, status: 'critical' },
  { rank: 2, domain: 'api.pnbindia.in', exposure: 'Financial Txns', score: 92, status: 'critical' },
  { rank: 3, domain: 'db-main.pnbindia.in', exposure: 'PII Records', score: 88, status: 'high' }
];

const HNDL_DATA = {
  firstEncryptedYear: 2017,
  crqcRiskMap: {
    2028: { dataAtRisk: '8.4 TB', records: '4.2M', risk: 'CRITICAL', color: '#EF4444' },
    2029: { dataAtRisk: '7.1 TB', records: '3.8M', risk: 'CRITICAL', color: '#EF4444' },
    2030: { dataAtRisk: '5.9 TB', records: '3.1M', risk: 'HIGH', color: '#F97316' },
    2031: { dataAtRisk: '4.7 TB', records: '2.3M', risk: 'HIGH', color: '#F97316' },
    2032: { dataAtRisk: '3.8 TB', records: '1.9M', risk: 'MEDIUM', color: '#F59E0B' },
    2033: { dataAtRisk: '2.9 TB', records: '1.5M', risk: 'MEDIUM', color: '#F59E0B' },
    2034: { dataAtRisk: '1.8 TB', records: '0.9M', risk: 'LOW', color: '#10B981' },
    2035: { dataAtRisk: '1.1 TB', records: '0.4M', risk: 'LOW', color: '#10B981' }
  },
  timeline: [
    { year: 2017, type: 'start', event: 'Initial Encrypted Data' },
    { year: 2024, type: 'milestone', event: 'NIST Finalizes PQC' },
    { year: 2026, type: 'current', event: 'Current Day Analysis' },
    { year: 2031, type: 'threat', event: 'Estimated CRQC Emergence' }
  ]
};

const RISK_MATRIX_ASSETS = [
  { domain: 'vpn.pnbindia.in', status: 'critical', x: 85, y: 92, r: 8 },
  { domain: 'api.pnbindia.in', status: 'critical', x: 78, y: 88, r: 6 },
  { domain: 'files.pnbindia.in', status: 'high', x: 65, y: 75, r: 5 },
  { domain: 'intranet.pnbindia.in', status: 'medium', x: 45, y: 55, r: 4 },
  { domain: 'public.pnbindia.in', status: 'pqc-ready', x: 25, y: 35, r: 4 },
  { domain: 'static.pnbindia.in', status: 'quantum-safe', x: 10, y: 15, r: 3 }
];

const ALGO_VULN_TABLE = [
  { algo: 'RSA-2048', shors: true, grovers: false, nistrec: 'Replace with ML-KEM', urgent: true },
  { algo: 'ECDH (P-256)', shors: true, grovers: false, nistrec: 'Replace with ML-KEM', urgent: true },
  { algo: 'AES-128', shors: false, grovers: true, nistrec: 'Upgrade to AES-256', urgent: false },
  { algo: 'AES-256', shors: false, grovers: false, nistrec: 'Safe against Grover\'s', urgent: false },
  { algo: 'SHA-256', shors: false, grovers: true, nistrec: 'Acceptable but consider SHA-384+', urgent: false }
];

const KEY_EXCHANGE_DIST_RISK = [
  { name: 'RSA Transport', count: 112, color: '#EF4444' },
  { name: 'ECDH', count: 85, color: '#F97316' },
  { name: 'Hybrid', count: 32, color: '#3B82F6' },
  { name: 'ML-KEM-768', count: 18, color: '#10B981' }
];

const ALL_CBOM_COMPONENTS = [
  { id: 'CBOM-001', asset: 'vpn.pnb.in', type: 'Gateway', tlsVer: '1.2', algorithm: 'RSA-2048', riskScore: 96, status: 'critical' },
  { id: 'CBOM-002', asset: 'api.pnb.in', type: 'API', tlsVer: '1.2', algorithm: 'ECDH', riskScore: 92, status: 'critical' },
  { id: 'CBOM-003', asset: 'portal.pnb.in', type: 'Web', tlsVer: '1.3', algorithm: 'Hybrid', riskScore: 45, status: 'pqc-ready' },
  { id: 'CBOM-004', asset: 'static.pnb.in', type: 'CDN', tlsVer: '1.3', algorithm: 'ML-KEM', riskScore: 12, status: 'quantum-safe' }
];
