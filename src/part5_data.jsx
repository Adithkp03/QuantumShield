/* TLS ANALYZER — DATA CONSTANTS */
const ASSET_TLS_DATA = {
    'api.pnbindia.in': {
        domain: 'api.pnbindia.in', ip: '103.45.12.67', port: 443, type: 'API', status: 'critical', riskScore: 91,
        certificate: { subjectCN: 'api.pnbindia.in', issuer: 'DigiCert Inc', validFrom: '15 Mar 2024', validUntil: '15 Mar 2025', expired: true, sigAlgorithm: 'RSA-PKCS1-SHA256', sigAlgoSafe: false, sigAlgoWarning: "Vulnerable to Shor's Algorithm", keyType: 'RSA', keySize: '2048-bit', keySafe: false, keyWarning: 'RSA broken by quantum computers', keyUsage: 'Digital Signature, Key Encipherment', serial: '3A:F2:11:9C:44:B1:7E:2D:09:FA', chain: ['Root CA', 'DigiCert Intermediate', 'api.pnbindia.in'], san: ['api.pnbindia.in', '*.api.pnbindia.in'] },
        handshake: { tlsVersion: '1.2', tlsVersionStatus: 'warning', tlsVersionNote: 'Upgrade to 1.3 recommended', keyExchange: 'ECDH-RSA', keyExchangeStatus: 'critical', keyExchangeNote: 'Quantum Vulnerable', sessionResumption: 'Enabled', sessionResumptionStatus: 'good', hsts: 'Yes', hstsStatus: 'good', ocspStapling: 'Disabled', ocspStatus: 'warning', certTransparency: 'Yes', certTransparencyStatus: 'good', forwardSecrecy: 'Partial', forwardSecrecyStatus: 'warning' },
        cipherSuites: [
            { name: 'TLS_ECDHE_RSA_AES_256_GCM_SHA384', keyEx: 'ECDHE', auth: 'RSA', status: 'medium' },
            { name: 'TLS_ECDHE_RSA_AES_128_GCM_SHA256', keyEx: 'ECDHE', auth: 'RSA', status: 'medium' },
            { name: 'TLS_RSA_AES_256_CBC_SHA256', keyEx: 'RSA', auth: 'RSA', status: 'critical' },
            { name: 'TLS_RSA_AES_128_CBC_SHA', keyEx: 'RSA', auth: 'RSA', status: 'critical' },
            { name: 'TLS_ECDHE_RSA_CHACHA20_POLY1305', keyEx: 'ECDHE', auth: 'RSA', status: 'medium' },
            { name: 'TLS_DHE_RSA_AES_256_GCM_SHA384', keyEx: 'DHE', auth: 'RSA', status: 'high' },
            { name: 'TLS_ECDHE_RSA_AES_128_CBC_SHA256', keyEx: 'ECDHE', auth: 'RSA', status: 'high' },
            { name: 'TLS_RSA_AES_128_CBC_SHA256', keyEx: 'RSA', auth: 'RSA', status: 'critical' },
            { name: 'TLS_DHE_RSA_AES_128_GCM_SHA256', keyEx: 'DHE', auth: 'RSA', status: 'high' },
            { name: 'TLS_ECDHE_RSA_AES_256_CBC_SHA384', keyEx: 'ECDHE', auth: 'RSA', status: 'medium' },
            { name: 'TLS_RSA_AES_256_GCM_SHA384', keyEx: 'RSA', auth: 'RSA', status: 'critical' },
            { name: 'TLS_DHE_RSA_AES_256_CBC_SHA256', keyEx: 'DHE', auth: 'RSA', status: 'high' },
        ],
        pqcStatus: {
            overall: 'none', checks: [
                { algo: 'ML-KEM-768 (Kyber)', sub: 'Key Encapsulation', detected: false },
                { algo: 'ML-DSA-65 (Dilithium)', sub: 'Digital Signatures', detected: false },
                { algo: 'SLH-DSA (SPHINCS+)', sub: 'Hash-based Sigs', detected: false },
                { algo: 'Hybrid Key Exchange', sub: 'Classical + PQC', detected: false },
                { algo: 'X25519Kyber768', sub: 'ECDH + Kyber', detected: false },
                { algo: 'TLS 1.3', sub: 'Protocol Version', detected: false, note: 'Using TLS 1.2' },
            ]
        },
        vulnerabilities: [
            { severity: 'critical', title: 'RSA Key Exchange', desc: "Shor's Algorithm can break RSA on quantum computers" },
            { severity: 'critical', title: 'RSA-2048 Certificate', desc: 'Certificate signature vulnerable to quantum attack' },
            { severity: 'critical', title: 'TLS 1.2 Active', desc: 'TLS 1.3 required for quantum transition readiness' },
            { severity: 'high', title: 'DHE Key Exchange', desc: 'Discrete log problem solved by quantum algorithms' },
            { severity: 'medium', title: 'ECDHE Key Exchange', desc: "Elliptic curve broken by Shor's Algorithm" },
        ],
        remediation: ['Upgrade TLS protocol to version 1.3', 'Replace RSA key exchange with ML-KEM-768', 'Update certificate to ML-DSA-65 or SLH-DSA', 'Disable all RSA and DHE cipher suites', 'Enable OCSP stapling for certificate validation'],
    },
    'vpn.pnbindia.in': {
        domain: 'vpn.pnbindia.in', ip: '103.45.12.71', port: 4500, type: 'VPN', status: 'critical', riskScore: 95,
        certificate: { subjectCN: 'vpn.pnbindia.in', issuer: 'Entrust CA', validFrom: '01 Jan 2024', validUntil: '01 Jan 2026', expired: false, sigAlgorithm: 'RSA-PKCS1-SHA1', sigAlgoSafe: false, sigAlgoWarning: 'SHA-1 deprecated + quantum vulnerable', keyType: 'RSA', keySize: '2048-bit', keySafe: false, keyWarning: 'RSA broken by quantum computers', keyUsage: 'Digital Signature, Key Encipherment', serial: '7C:A1:44:2E:8B:0F:91:33', chain: ['Root CA', 'Entrust Intermediate', 'vpn.pnbindia.in'], san: ['vpn.pnbindia.in'] },
        handshake: { tlsVersion: '1.2', tlsVersionStatus: 'warning', tlsVersionNote: 'Upgrade to 1.3 required', keyExchange: 'RSA', keyExchangeStatus: 'critical', keyExchangeNote: 'Direct RSA — worst case for quantum', sessionResumption: 'Enabled', sessionResumptionStatus: 'good', hsts: 'No', hstsStatus: 'critical', ocspStapling: 'Disabled', ocspStatus: 'warning', certTransparency: 'No', certTransparencyStatus: 'warning', forwardSecrecy: 'No', forwardSecrecyStatus: 'critical' },
        cipherSuites: [
            { name: 'TLS_RSA_AES_256_CBC_SHA', keyEx: 'RSA', auth: 'RSA', status: 'critical' },
            { name: 'TLS_RSA_AES_128_CBC_SHA', keyEx: 'RSA', auth: 'RSA', status: 'critical' },
            { name: 'TLS_RSA_AES_256_CBC_SHA256', keyEx: 'RSA', auth: 'RSA', status: 'critical' },
            { name: 'TLS_DHE_RSA_AES_256_CBC_SHA', keyEx: 'DHE', auth: 'RSA', status: 'high' },
            { name: 'TLS_DHE_RSA_AES_128_CBC_SHA', keyEx: 'DHE', auth: 'RSA', status: 'high' },
        ],
        pqcStatus: {
            overall: 'none', checks: [
                { algo: 'ML-KEM-768 (Kyber)', sub: 'Key Encapsulation', detected: false },
                { algo: 'ML-DSA-65 (Dilithium)', sub: 'Digital Signatures', detected: false },
                { algo: 'SLH-DSA (SPHINCS+)', sub: 'Hash-based Sigs', detected: false },
                { algo: 'Hybrid Key Exchange', sub: 'Classical + PQC', detected: false },
                { algo: 'X25519Kyber768', sub: 'ECDH + Kyber', detected: false },
                { algo: 'TLS 1.3', sub: 'Protocol Version', detected: false, note: 'Using TLS 1.2' },
            ]
        },
        vulnerabilities: [
            { severity: 'critical', title: 'Direct RSA Key Exchange', desc: 'No forward secrecy + quantum breakable' },
            { severity: 'critical', title: 'No HSTS', desc: 'Missing HTTP Strict Transport Security' },
            { severity: 'critical', title: 'SHA-1 Signature', desc: 'SHA-1 is cryptographically broken' },
        ],
        remediation: ['Replace RSA key exchange with ML-KEM-768', 'Enable HSTS with minimum 1-year max-age', 'Upgrade to TLS 1.3 exclusively', 'Replace SHA-1 certificate with ML-DSA-65'],
    },
    'corp.pnbindia.in': {
        domain: 'corp.pnbindia.in', ip: '103.45.12.72', port: 443, type: 'Web Server', status: 'pqc-ready', riskScore: 18,
        certificate: { subjectCN: 'corp.pnbindia.in', issuer: "Let's Encrypt", validFrom: '01 Feb 2026', validUntil: '01 Feb 2027', expired: false, sigAlgorithm: 'ECDSA-P384', sigAlgoSafe: true, sigAlgoWarning: null, keyType: 'EC', keySize: '384-bit', keySafe: true, keyWarning: null, keyUsage: 'Digital Signature', serial: '9F:B3:22:7A:11:CC:88:D4', chain: ['ISRG Root X1', "Let's Encrypt R3", 'corp.pnbindia.in'], san: ['corp.pnbindia.in', 'www.corp.pnbindia.in'] },
        handshake: { tlsVersion: '1.3', tlsVersionStatus: 'good', tlsVersionNote: 'TLS 1.3 active', keyExchange: 'X25519Kyber768', keyExchangeStatus: 'pqc-ready', keyExchangeNote: 'Hybrid PQC active', sessionResumption: 'Enabled', sessionResumptionStatus: 'good', hsts: 'Yes', hstsStatus: 'good', ocspStapling: 'Enabled', ocspStatus: 'good', certTransparency: 'Yes', certTransparencyStatus: 'good', forwardSecrecy: 'Yes', forwardSecrecyStatus: 'good' },
        cipherSuites: [
            { name: 'TLS_AES_256_GCM_SHA384', keyEx: 'X25519Kyber768', auth: 'ECDSA', status: 'pqc-ready' },
            { name: 'TLS_AES_128_GCM_SHA256', keyEx: 'X25519', auth: 'ECDSA', status: 'medium' },
            { name: 'TLS_CHACHA20_POLY1305_SHA256', keyEx: 'X25519Kyber768', auth: 'ECDSA', status: 'pqc-ready' },
        ],
        pqcStatus: {
            overall: 'hybrid', checks: [
                { algo: 'ML-KEM-768 (Kyber)', sub: 'Key Encapsulation', detected: false },
                { algo: 'ML-DSA-65 (Dilithium)', sub: 'Digital Signatures', detected: false },
                { algo: 'SLH-DSA (SPHINCS+)', sub: 'Hash-based Sigs', detected: false },
                { algo: 'Hybrid Key Exchange', sub: 'Classical + PQC', detected: true },
                { algo: 'X25519Kyber768', sub: 'ECDH + Kyber', detected: true },
                { algo: 'TLS 1.3', sub: 'Protocol Version', detected: true },
            ]
        },
        vulnerabilities: [
            { severity: 'medium', title: 'No ML-DSA Certificate', desc: 'Certificate still uses classical ECDSA' },
            { severity: 'medium', title: 'No Full ML-KEM', desc: 'Using hybrid instead of pure ML-KEM' },
        ],
        remediation: ['Migrate certificate to ML-DSA-65 for full PQC', 'Replace hybrid with pure ML-KEM-768 key exchange'],
    },
    'cdn.pnbindia.in': {
        domain: 'cdn.pnbindia.in', ip: '103.45.12.76', port: 443, type: 'Web Server', status: 'quantum-safe', riskScore: 5,
        certificate: { subjectCN: 'cdn.pnbindia.in', issuer: 'PNB Internal PQC CA', validFrom: '01 Mar 2026', validUntil: '01 Mar 2027', expired: false, sigAlgorithm: 'ML-DSA-65', sigAlgoSafe: true, sigAlgoWarning: null, keyType: 'ML-DSA', keySize: '65 (Level 3)', keySafe: true, keyWarning: null, keyUsage: 'Digital Signature', serial: 'PQC:44:9A:F1:22:BC:77:EE', chain: ['PNB PQC Root CA', 'PNB PQC Intermediate', 'cdn.pnbindia.in'], san: ['cdn.pnbindia.in', '*.cdn.pnbindia.in'] },
        handshake: { tlsVersion: '1.3', tlsVersionStatus: 'good', tlsVersionNote: 'TLS 1.3 — optimal', keyExchange: 'ML-KEM-768', keyExchangeStatus: 'quantum-safe', keyExchangeNote: 'NIST FIPS 203 — Fully Quantum Safe', sessionResumption: 'Enabled', sessionResumptionStatus: 'good', hsts: 'Yes', hstsStatus: 'good', ocspStapling: 'Enabled', ocspStatus: 'good', certTransparency: 'Yes', certTransparencyStatus: 'good', forwardSecrecy: 'Yes', forwardSecrecyStatus: 'good' },
        cipherSuites: [
            { name: 'TLS_AES_256_GCM_SHA384', keyEx: 'ML-KEM-768', auth: 'ML-DSA-65', status: 'quantum-safe' },
            { name: 'TLS_CHACHA20_POLY1305_SHA256', keyEx: 'ML-KEM-768', auth: 'ML-DSA-65', status: 'quantum-safe' },
            { name: 'TLS_AES_128_GCM_SHA256', keyEx: 'ML-KEM-768', auth: 'ML-DSA-65', status: 'quantum-safe' },
        ],
        pqcStatus: {
            overall: 'full', checks: [
                { algo: 'ML-KEM-768 (Kyber)', sub: 'Key Encapsulation', detected: true },
                { algo: 'ML-DSA-65 (Dilithium)', sub: 'Digital Signatures', detected: true },
                { algo: 'SLH-DSA (SPHINCS+)', sub: 'Hash-based Sigs', detected: false },
                { algo: 'Hybrid Key Exchange', sub: 'Classical + PQC', detected: true },
                { algo: 'X25519Kyber768', sub: 'ECDH + Kyber', detected: true },
                { algo: 'TLS 1.3', sub: 'Protocol Version', detected: true },
            ]
        },
        vulnerabilities: [],
        remediation: [],
    },
    'netbanking.pnbindia.in': {
        domain: 'netbanking.pnbindia.in', ip: '103.45.12.68', port: 443, type: 'Web Server', status: 'high', riskScore: 74,
        certificate: { subjectCN: 'netbanking.pnbindia.in', issuer: 'Sectigo CA', validFrom: '01 Jun 2025', validUntil: '01 Jun 2026', expired: false, sigAlgorithm: 'RSA-PKCS1-SHA256', sigAlgoSafe: false, sigAlgoWarning: "Vulnerable to Shor's Algorithm", keyType: 'RSA', keySize: '2048-bit', keySafe: false, keyWarning: 'RSA broken by quantum computers', keyUsage: 'Digital Signature, Key Encipherment', serial: '11:CC:9A:44:7B:E2:31:89', chain: ['Root CA', 'Sectigo Intermediate', 'netbanking.pnbindia.in'], san: ['netbanking.pnbindia.in', 'www.netbanking.pnbindia.in'] },
        handshake: { tlsVersion: '1.2', tlsVersionStatus: 'warning', tlsVersionNote: 'Upgrade to 1.3 recommended', keyExchange: 'ECDHE-RSA', keyExchangeStatus: 'high', keyExchangeNote: "ECDHE broken by Shor's Algorithm", sessionResumption: 'Enabled', sessionResumptionStatus: 'good', hsts: 'Yes', hstsStatus: 'good', ocspStapling: 'Enabled', ocspStatus: 'good', certTransparency: 'Yes', certTransparencyStatus: 'good', forwardSecrecy: 'Yes', forwardSecrecyStatus: 'good' },
        cipherSuites: [
            { name: 'TLS_ECDHE_RSA_AES_256_GCM_SHA384', keyEx: 'ECDHE', auth: 'RSA', status: 'medium' },
            { name: 'TLS_ECDHE_RSA_AES_128_GCM_SHA256', keyEx: 'ECDHE', auth: 'RSA', status: 'medium' },
            { name: 'TLS_ECDHE_RSA_CHACHA20_POLY1305', keyEx: 'ECDHE', auth: 'RSA', status: 'medium' },
            { name: 'TLS_DHE_RSA_AES_256_GCM_SHA384', keyEx: 'DHE', auth: 'RSA', status: 'high' },
            { name: 'TLS_RSA_AES_256_CBC_SHA256', keyEx: 'RSA', auth: 'RSA', status: 'critical' },
        ],
        pqcStatus: {
            overall: 'none', checks: [
                { algo: 'ML-KEM-768 (Kyber)', sub: 'Key Encapsulation', detected: false },
                { algo: 'ML-DSA-65 (Dilithium)', sub: 'Digital Signatures', detected: false },
                { algo: 'SLH-DSA (SPHINCS+)', sub: 'Hash-based Sigs', detected: false },
                { algo: 'Hybrid Key Exchange', sub: 'Classical + PQC', detected: false },
                { algo: 'X25519Kyber768', sub: 'ECDH + Kyber', detected: false },
                { algo: 'TLS 1.3', sub: 'Protocol Version', detected: false, note: 'Using TLS 1.2' },
            ]
        },
        vulnerabilities: [
            { severity: 'high', title: 'ECDHE Key Exchange', desc: "Elliptic curve broken by Shor's Algorithm" },
            { severity: 'high', title: 'RSA-2048 Certificate', desc: 'RSA certificate quantum vulnerable' },
            { severity: 'medium', title: 'TLS 1.2 Active', desc: 'TLS 1.3 transition needed' },
        ],
        remediation: ['Enable hybrid PQC key exchange (X25519Kyber768)', 'Upgrade to TLS 1.3', 'Schedule certificate migration to ML-DSA-65'],
    },
};

const TLS_ASSET_OPTIONS = [
    { domain: 'api.pnbindia.in', ip: '103.45.12.67', port: 443, status: 'critical' },
    { domain: 'vpn.pnbindia.in', ip: '103.45.12.71', port: 4500, status: 'critical' },
    { domain: 'payments.pnbindia.in', ip: '103.45.12.89', port: 443, status: 'critical' },
    { domain: 'legacy.pnbindia.in', ip: '103.45.12.44', port: 443, status: 'critical' },
    { domain: 'b2b-api.pnbindia.in', ip: '103.45.12.102', port: 8443, status: 'critical' },
    { domain: 'netbanking.pnbindia.in', ip: '103.45.12.68', port: 443, status: 'high' },
    { domain: 'sso.pnbindia.in', ip: '103.45.12.75', port: 443, status: 'high' },
    { domain: 'trade.pnbindia.in', ip: '103.45.12.91', port: 443, status: 'high' },
    { domain: 'forex.pnbindia.in', ip: '103.45.12.93', port: 443, status: 'high' },
    { domain: 'mobile.pnbindia.in', ip: '103.45.12.70', port: 443, status: 'medium' },
    { domain: 'docs.pnbindia.in', ip: '103.45.12.80', port: 443, status: 'medium' },
    { domain: 'corp.pnbindia.in', ip: '103.45.12.72', port: 443, status: 'pqc-ready' },
    { domain: 'static.pnbindia.in', ip: '103.45.12.82', port: 443, status: 'pqc-ready' },
    { domain: 'cdn.pnbindia.in', ip: '103.45.12.76', port: 443, status: 'quantum-safe' },
    { domain: 'assets.pnbindia.in', ip: '103.45.12.83', port: 443, status: 'quantum-safe' },
];

const TLS_VER_COLORS = { '1.3': { t: '#059669', bg: '#ECFDF5', b: '#A7F3D0' }, '1.2': { t: '#D97706', bg: '#FFFBEB', b: '#FDE68A' }, '1.1': { t: '#DC2626', bg: '#FEF2F2', b: '#FECACA' } };
const HS_COLORS = { good: '#059669', warning: '#D97706', critical: '#DC2626', high: '#EA580C', 'pqc-ready': '#2563EB', 'quantum-safe': '#059669' };
const KE_COLORS = { 'ML-KEM-768': '#059669', 'ML-KEM-1024': '#059669', 'X25519Kyber768': '#2563EB', 'ECDHE': '#D97706', 'ECDHE-RSA': '#D97706', 'X25519': '#2563EB', 'DHE': '#EA580C', 'DHE-RSA': '#EA580C', 'RSA': '#DC2626', 'ECDH-RSA': '#DC2626' };

const PQC_TIPS = { 'ML-KEM-768 (Kyber)': 'NIST FIPS 203 — Key Encapsulation Mechanism', 'ML-DSA-65 (Dilithium)': 'NIST FIPS 204 — Digital Signature Algorithm', 'SLH-DSA (SPHINCS+)': 'NIST FIPS 205 — Stateless Hash-Based Signature', 'Hybrid Key Exchange': 'Combines classical + PQC for transition safety', 'X25519Kyber768': 'X25519 ECDH + Kyber KEM hybrid scheme', 'TLS 1.3': 'Required base for PQC cipher negotiation' };

const CODE_SNIPS = {
    'Upgrade TLS': '# nginx.conf\nssl_protocols TLSv1.3;\nssl_prefer_server_ciphers off;',
    'Replace RSA key exchange': '# nginx.conf (with OpenSSL 3.x + OQS)\nssl_ecdh_curve X25519Kyber768:prime256v1;\nssl_ciphers TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256;',
    'Update certificate': '# Generate ML-DSA key and cert\nopenssl genpkey -algorithm mldsa65 -out mldsa65.key\nopenssl req -new -key mldsa65.key -out mldsa65.csr',
    'Disable all RSA': "# nginx.conf\nssl_ciphers 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:!RSA:!DHE';",
    'Enable OCSP': '# nginx.conf\nssl_stapling on;\nssl_stapling_verify on;\nresolver 8.8.8.8;',
    'Enable HSTS': '# nginx.conf\nadd_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;',
    'Enable hybrid': '# nginx.conf (OpenSSL 3.x + OQS provider)\nssl_ecdh_curve X25519Kyber768:X25519:prime256v1;',
    'Migrate certificate': '# Generate ML-DSA key\nopenssl genpkey -algorithm mldsa65 -out pqc.key\nopenssl req -new -x509 -key pqc.key -out pqc.crt -days 365',
    'Replace hybrid': '# Pure ML-KEM configuration\nssl_ecdh_curve mlkem768;\nssl_ciphers TLS_AES_256_GCM_SHA384;',
    'Replace SHA-1': '# Generate ML-DSA certificate\nopenssl genpkey -algorithm mldsa65 -out new.key\nopenssl req -new -x509 -key new.key -out new.crt -days 365',
    'Schedule certificate': '# Plan migration\nopenssl genpkey -algorithm mldsa65 -out pqc.key\nopenssl req -new -key pqc.key -out pqc.csr -subj "/CN=asset.pnbindia.in"',
};

const getCodeSnip = (step) => { for (const k in CODE_SNIPS) if (step.includes(k)) return CODE_SNIPS[k]; return null; };
const getEffort = (s) => { if (s.includes('Upgrade TLS') || s.includes('Upgrade to TLS')) return { c: 'Medium', t: '2-4 hr', r: 'SysAdmin' }; if (s.includes('Replace') && (s.includes('key') || s.includes('hybrid'))) return { c: 'Hard', t: '4-8 hr', r: 'Security Eng.' }; if (s.includes('certificate') || s.includes('cert') || s.includes('ML-DSA') || s.includes('SHA-1')) return { c: 'Hard', t: '4-8 hr', r: 'Security Eng.' }; if (s.includes('Disable')) return { c: 'Easy', t: '1-2 hr', r: 'SysAdmin' }; return { c: 'Easy', t: '1 hr', r: 'SysAdmin' }; };

const genFallback = (domain) => {
    const o = TLS_ASSET_OPTIONS.find(a => a.domain === domain);
    if (!o) return ASSET_TLS_DATA['api.pnbindia.in'];
    const safe = o.status === 'quantum-safe' || o.status === 'pqc-ready';
    return {
        domain: o.domain, ip: o.ip, port: o.port, type: 'Web Server', status: o.status, riskScore: o.status === 'critical' ? 90 : o.status === 'high' ? 75 : o.status === 'medium' ? 50 : o.status === 'pqc-ready' ? 18 : 5,
        certificate: { subjectCN: o.domain, issuer: safe ? 'PNB PQC CA' : 'DigiCert Inc', validFrom: '01 Jan 2025', validUntil: '01 Jan 2026', expired: false, sigAlgorithm: safe ? 'ECDSA-P384' : 'RSA-PKCS1-SHA256', sigAlgoSafe: safe, sigAlgoWarning: safe ? null : "Quantum vulnerable", keyType: safe ? 'EC' : 'RSA', keySize: safe ? '384-bit' : '2048-bit', keySafe: safe, keyWarning: safe ? null : 'RSA quantum breakable', keyUsage: 'Digital Signature', serial: 'AA:BB:CC:DD:EE:FF', chain: ['Root CA', 'Intermediate', o.domain], san: [o.domain] },
        handshake: { tlsVersion: safe ? '1.3' : '1.2', tlsVersionStatus: safe ? 'good' : 'warning', tlsVersionNote: safe ? 'TLS 1.3 active' : 'Upgrade to 1.3 needed', keyExchange: o.status === 'quantum-safe' ? 'ML-KEM-768' : o.status === 'pqc-ready' ? 'X25519Kyber768' : 'ECDHE-RSA', keyExchangeStatus: o.status, keyExchangeNote: safe ? 'PQC Active' : 'Quantum Vulnerable', sessionResumption: 'Enabled', sessionResumptionStatus: 'good', hsts: 'Yes', hstsStatus: 'good', ocspStapling: safe ? 'Enabled' : 'Disabled', ocspStatus: safe ? 'good' : 'warning', certTransparency: 'Yes', certTransparencyStatus: 'good', forwardSecrecy: safe ? 'Yes' : 'Partial', forwardSecrecyStatus: safe ? 'good' : 'warning' },
        cipherSuites: safe ? [{ name: 'TLS_AES_256_GCM_SHA384', keyEx: o.status === 'quantum-safe' ? 'ML-KEM-768' : 'X25519Kyber768', auth: o.status === 'quantum-safe' ? 'ML-DSA-65' : 'ECDSA', status: o.status }] : [{ name: 'TLS_ECDHE_RSA_AES_256_GCM_SHA384', keyEx: 'ECDHE', auth: 'RSA', status: 'medium' }, { name: 'TLS_RSA_AES_256_CBC_SHA256', keyEx: 'RSA', auth: 'RSA', status: 'critical' }],
        pqcStatus: { overall: o.status === 'quantum-safe' ? 'full' : o.status === 'pqc-ready' ? 'hybrid' : 'none', checks: [{ algo: 'ML-KEM-768 (Kyber)', sub: 'Key Encapsulation', detected: o.status === 'quantum-safe' }, { algo: 'ML-DSA-65 (Dilithium)', sub: 'Digital Signatures', detected: o.status === 'quantum-safe' }, { algo: 'SLH-DSA (SPHINCS+)', sub: 'Hash-based Sigs', detected: false }, { algo: 'Hybrid Key Exchange', sub: 'Classical + PQC', detected: safe }, { algo: 'X25519Kyber768', sub: 'ECDH + Kyber', detected: safe }, { algo: 'TLS 1.3', sub: 'Protocol Version', detected: safe }] },
        vulnerabilities: safe ? [] : [{ severity: o.status, title: 'Classical Key Exchange', desc: 'Current key exchange is quantum vulnerable' }],
        remediation: safe ? [] : ['Upgrade to TLS 1.3', 'Replace key exchange with ML-KEM-768', 'Update certificate to ML-DSA-65'],
    };
};
