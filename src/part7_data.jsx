/* CERTIFICATES PAGE — DATA CONSTANTS */
const CERT_STYLES = {
  'quantum-safe': { bannerBg:'linear-gradient(135deg, #D1FAE5, #ECFDF5)', bannerBorder:'#A7F3D0', iconColor:'#059669', badgeBg:'#ECFDF5', badgeColor:'#059669', badgeBorder:'#A7F3D0', badgeLabel:'Quantum Safe' },
  'pqc-ready': { bannerBg:'linear-gradient(135deg, #DBEAFE, #EFF6FF)', bannerBorder:'#BFDBFE', iconColor:'#2563EB', badgeBg:'#EFF6FF', badgeColor:'#2563EB', badgeBorder:'#BFDBFE', badgeLabel:'PQC Ready' },
  'in-review': { bannerBg:'#F9FAFB', bannerBorder:'#E5E7EB', iconColor:'#D1D5DB', badgeBg:'#F3F4F6', badgeColor:'#6B7280', badgeBorder:'#E5E7EB', badgeLabel:'In Review' },
};

const CERT_KPIS = [
  { label:'TOTAL ISSUED', value:38, icon:'Award', iconBg:'#EEF2FF', iconColor:'#4F46E5', valueColor:'#4F46E5', sub:'certificates issued to date' },
  { label:'QUANTUM SAFE', value:12, icon:'ShieldCheck', iconBg:'#ECFDF5', iconColor:'#059669', valueColor:'#059669', sub:'assets fully quantum safe' },
  { label:'PQC READY', value:26, icon:'Zap', iconBg:'#EFF6FF', iconColor:'#3B82F6', valueColor:'#3B82F6', sub:'assets in PQC transition' },
];

const CERT_CRITERIA = {
  quantumSafe: { title:'Fully Quantum Safe', icon:'ShieldCheck', iconColor:'#059669', iconBg:'#ECFDF5', items:['TLS 1.3 with ML-KEM key exchange','ML-DSA or SLH-DSA certificate signature','No classical key exchange fallback','Certificate issued by PQC-capable CA','No deprecated cipher suites'] },
  pqcReady: { title:'PQC Ready', icon:'Zap', iconColor:'#2563EB', iconBg:'#EFF6FF', items:['TLS 1.3 enabled','Hybrid PQC key exchange active','RSA key size ≥ 3072-bit','No TLS 1.0 or 1.1','CBOM entry up to date'] },
};

const _QS_DOMAINS = ['cdn','corp','assets','media','secure-api','pqc-test','infra','cloud','auth','sso','dns','gateway'];
const _PR_DOMAINS = ['static','docs','internal','reporting','analytics','corp-vpn','branch','region','zone','cluster','local','node','proxy','db','cache','queue','mail','ftp','voip','video','chat','wiki','jira','confluence','git','ci'];

const generateCertificates = () => {
  const certs = [];
  
  _QS_DOMAINS.forEach((prefix, i) => {
    certs.push({
      id: `CERT-QS-${String(i+1).padStart(3,'0')}`,
      domain: `${prefix}.pnbindia.in`,
      type: 'quantum-safe',
      status: 'quantum-safe',
      issuedDate: i===0?'Today':i===1?'3 days ago':i===2?'1 week ago':`${i+1} weeks ago`,
      expiresIn: i===0?'1 year':i===1?'1 year':i===2?'11 months':`10 months`,
      issuedFull: `Mar ${String(12-i).padStart(2,'0')}, 2026`,
      expiresFull: `Mar ${String(12-i).padStart(2,'0')}, 2027`,
      keyExchange: i%2===0?'ML-KEM-768':'X25519Kyber768',
      certAlgo: i%2===0?'ML-DSA-65':'ECDSA-P384',
      tlsVersion: '1.3',
      issuedBy: i===1?'PNB PQC CA':'QuantumShield CA v1',
      serialNumber: `QS-2026-${String(i+1).padStart(3,'0')}-${prefix.toUpperCase()}`,
      verificationUrl: `https://verify.quantumshield.in/QS-2026-QS${String(i+1).padStart(3,'0')}`,
      criteria: CERT_CRITERIA.quantumSafe.items,
      passedChecks: 5, totalChecks: 5,
    });
  });

  _PR_DOMAINS.forEach((prefix, i) => {
    certs.push({
      id: `CERT-PR-${String(i+1).padStart(3,'0')}`,
      domain: `${prefix}.pnbindia.in`,
      type: 'pqc-ready',
      status: 'pqc-ready',
      issuedDate: i===0?'1 week ago':i===1?'2 weeks ago':`${i+2} weeks ago`,
      expiresIn: i===0?'11 months':i===1?'10 months':`${9-(i%3)} months`,
      issuedFull: `Feb ${String(26-i).padStart(2,'0')}, 2026`,
      expiresFull: `Jan ${String(26-i).padStart(2,'0')}, 2027`,
      keyExchange: 'X25519Kyber768',
      certAlgo: i%2===0?'ECDSA-P384':'ECDSA-P256',
      tlsVersion: '1.3',
      issuedBy: 'QuantumShield CA v1',
      serialNumber: `QS-2026-${String(100+i+1).padStart(3,'0')}-${prefix.toUpperCase()}`,
      verificationUrl: `https://verify.quantumshield.in/QS-2026-PR${String(i+1).padStart(3,'0')}`,
      criteria: CERT_CRITERIA.pqcReady.items,
      passedChecks: 5, totalChecks: 5,
    });
  });

  certs.unshift({
    id: 'CERT-006', domain: null, type: 'in-review', status: 'in-review',
    issuedDate: '—', expiresIn: '—', issuedFull: null, expiresFull: null,
    keyExchange: null, certAlgo: null, tlsVersion: null, issuedBy: null,
    serialNumber: null, verificationUrl: null, criteria: [], passedChecks: 0, totalChecks: 5,
    reviewNote: 'Pending cryptographic verification scan',
  });

  return certs;
};

const CERTIFICATES = generateCertificates();
