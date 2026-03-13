const RISK_DATA = {
  overallScore: 67.4,
  status: 'high',
  totalAssets: 247,
  vulnerableAssets: 147,
  lastImprovement: 4.2,
  lastImprovementDir: 'down',
  byCategory: [
    { label:'Critical', count:36,  color:'#EF4444', pct:14.6 },
    { label:'High',     count:72,  color:'#F97316', pct:29.1 },
    { label:'Medium',   count:39,  color:'#F59E0B', pct:15.8 },
    { label:'PQC Ready',count:61,  color:'#3B82F6', pct:24.7 },
    { label:'Safe',     count:38,  color:'#10B981', pct:15.4 },
    { label:'Unscanned',count:1,   color:'#D1D5DB', pct:0.4  },
  ],
  sixMonthTrend: [
    { month:'Oct 25', score:78.2, critical:42, safe:24 },
    { month:'Nov 25', score:75.6, critical:40, safe:27 },
    { month:'Dec 25', score:73.1, critical:38, safe:30 },
    { month:'Jan 26', score:71.4, critical:37, safe:33 },
    { month:'Feb 26', score:69.8, critical:36, safe:36 },
    { month:'Mar 26', score:67.4, critical:36, safe:38 },
  ],
};

const HNDL_DATA = {
  firstEncryptedYear: 2017,
  currentYear: 2026,
  crqcYear: 2031,
  dataVolume: '4.7 TB',
  sensitiveRecords: '2.3M',
  yearsOfInterception: 7,
  timeline: [
    { year:2017, event:'First encrypted traffic recorded', type:'start' },
    { year:2019, event:'Digital banking expansion', type:'milestone' },
    { year:2021, event:'API gateway launched', type:'milestone' },
    { year:2023, event:'HNDL attacks reported globally', type:'warning' },
    { year:2025, event:'NIST PQC standards finalized', type:'positive' },
    { year:2026, event:'Current — data being intercepted', type:'current' },
    { year:2031, event:'Estimated CRQC emergence', type:'threat' },
  ],
  sliderMin: 2028,
  sliderMax: 2035,
  crqcRiskMap: {
    2028: { risk:'EXTREME', color:'#7F1D1D', dataAtRisk:'4.7 TB', records:'2.3M', years:11 },
    2029: { risk:'EXTREME', color:'#DC2626', dataAtRisk:'4.7 TB', records:'2.3M', years:12 },
    2030: { risk:'CRITICAL', color:'#EF4444', dataAtRisk:'4.7 TB', records:'2.3M', years:13 },
    2031: { risk:'HIGH',    color:'#F97316', dataAtRisk:'4.7 TB', records:'2.3M', years:14 },
    2032: { risk:'HIGH',    color:'#F59E0B', dataAtRisk:'4.2 TB', records:'2.1M', years:15 },
    2033: { risk:'MEDIUM',  color:'#F59E0B', dataAtRisk:'3.8 TB', records:'1.9M', years:16 },
    2034: { risk:'MEDIUM',  color:'#8B5CF6', dataAtRisk:'3.2 TB', records:'1.6M', years:17 },
    2035: { risk:'LOWER',   color:'#6B7280', dataAtRisk:'2.5 TB', records:'1.2M', years:18 },
  },
};

const RISK_MATRIX_ASSETS = [
  { domain:'vpn.pnbindia.in',       x:92, y:88, status:'critical', r:10 },
  { domain:'api.pnbindia.in',       x:88, y:85, status:'critical', r:10 },
  { domain:'payments.pnbindia.in',  x:85, y:82, status:'critical', r:9  },
  { domain:'legacy.pnbindia.in',    x:95, y:90, status:'critical', r:11 },
  { domain:'netbanking.pnbindia.in',x:76, y:62, status:'high',     r:8  },
  { domain:'sso.pnbindia.in',       x:72, y:58, status:'high',     r:7  },
  { domain:'trade.pnbindia.in',     x:78, y:65, status:'high',     r:8  },
  { domain:'b2b-api.pnbindia.in',   x:80, y:68, status:'high',     r:8  },
  { domain:'mobile.pnbindia.in',    x:52, y:45, status:'medium',   r:7  },
  { domain:'docs.pnbindia.in',      x:48, y:42, status:'medium',   r:6  },
  { domain:'portal.pnbindia.in',    x:45, y:38, status:'medium',   r:6  },
  { domain:'loans.pnbindia.in',     x:55, y:48, status:'medium',   r:6  },
  { domain:'corp.pnbindia.in',      x:22, y:18, status:'pqc-ready',r:6  },
  { domain:'static.pnbindia.in',    x:18, y:15, status:'pqc-ready',r:5  },
  { domain:'cdn.pnbindia.in',       x:8,  y:5,  status:'quantum-safe', r:5 },
  { domain:'assets.pnbindia.in',    x:6,  y:4,  status:'quantum-safe', r:5 },
];

const TOP_CRITICAL_ASSETS = [
  { rank:1,  domain:'vpn.pnbindia.in',         score:95, status:'critical',    exposure:'Direct RSA key exchange' },
  { rank:2,  domain:'api.pnbindia.in',          score:91, status:'critical',    exposure:'TLS 1.2 + expired cert'  },
  { rank:3,  domain:'legacy.pnbindia.in',       score:98, status:'critical',    exposure:'TLS 1.1 + RSA-1024'      },
  { rank:4,  domain:'payments.pnbindia.in',     score:88, status:'critical',    exposure:'RSA-2048 key exchange'   },
  { rank:5,  domain:'b2b-api.pnbindia.in',      score:87, status:'critical',    exposure:'DHE-RSA + TLS 1.2'       },
  { rank:6,  domain:'netbanking.pnbindia.in',   score:74, status:'high',        exposure:'ECDHE-RSA, no PQC'       },
  { rank:7,  domain:'trade.pnbindia.in',        score:78, status:'high',        exposure:'DHE-RSA key exchange'    },
  { rank:8,  domain:'admin.pnbindia.in',        score:73, status:'high',        exposure:'RSA cert + TLS 1.2'      },
  { rank:9,  domain:'sso.pnbindia.in',          score:71, status:'high',        exposure:'ECDSA-P256, no hybrid'   },
  { rank:10, domain:'forex.pnbindia.in',        score:76, status:'high',        exposure:'AES-128 + ECDHE'         },
];

const ALGO_VULN_TABLE = [
  { algo:'RSA (all sizes)',    shors:true,  grovers:false, nistrec:'Replace with ML-KEM/ML-DSA', urgent:true  },
  { algo:'ECDSA / ECDH',      shors:true,  grovers:false, nistrec:'Replace with ML-DSA-65',      urgent:true  },
  { algo:'DHE / DH',          shors:true,  grovers:false, nistrec:'Replace with ML-KEM-768',      urgent:true  },
  { algo:'AES-128',           shors:false, grovers:true,  nistrec:'Upgrade to AES-256',           urgent:false },
  { algo:'AES-256',           shors:false, grovers:false, nistrec:'No action needed',             urgent:false },
  { algo:'SHA-256',           shors:false, grovers:true,  nistrec:'Use SHA-384 or SHA-512',       urgent:false },
  { algo:'ML-KEM-768',        shors:false, grovers:false, nistrec:'FIPS 203 — Keep using',        urgent:false },
  { algo:'ML-DSA-65',         shors:false, grovers:false, nistrec:'FIPS 204 — Keep using',        urgent:false },
  { algo:'SLH-DSA',           shors:false, grovers:false, nistrec:'FIPS 205 — Keep using',        urgent:false },
];

const KEY_EXCHANGE_DIST_RISK = [
  { name:'RSA',            count:89,  safe:false, color:'#EF4444' },
  { name:'ECDHE-RSA',      count:94,  safe:false, color:'#F97316' },
  { name:'DHE-RSA',        count:43,  safe:false, color:'#F97316' },
  { name:'ECDHE',          count:27,  safe:false, color:'#F59E0B' },
  { name:'X25519',         count:18,  safe:false, color:'#F59E0B' },
  { name:'X25519Kyber768', count:38,  safe:true,  color:'#10B981' },
  { name:'ML-KEM-768',     count:24,  safe:true,  color:'#059669' },
  { name:'ML-KEM-1024',    count:14,  safe:true,  color:'#059669' },
];
