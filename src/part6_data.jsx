/* REMEDIATION PAGE — DATA CONSTANTS */
const INITIAL_REMEDIATION_ITEMS = [
  {
    id: 'REM-001', priority: 1, domain: 'vpn.pnbindia.in', type: 'VPN', status: 'critical', vulnerability: 'RSA Key Exchange',
    vulnDetail: 'RSA key exchange is completely vulnerable to Shor\'s Algorithm on cryptographically relevant quantum computers.',
    complexity: 'Easy', taskStatus: 'pending', estTime: '2–4 hours', skillLevel: 'SysAdmin', assignee: null,
    configPatch: `# nginx.conf — Add PQC key exchange\nssl_ecdh_curve X25519Kyber768:prime256v1;\nssl_protocols TLSv1.3;\nssl_prefer_server_ciphers off;\nssl_ciphers TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256;`,
    steps: ['Update OpenSSL to version 3.x with OQS provider', 'Configure ssl_ecdh_curve to X25519Kyber768:prime256v1', 'Set ssl_protocols to TLSv1.3 only', 'Disable ssl_prefer_server_ciphers', 'Test with openssl s_client -connect vpn.pnbindia.in:4500', 'Verify ML-KEM-768 handshake in scan results'],
    impact: 'Eliminates primary quantum attack vector', nistrefs: ['FIPS 203', 'SP 800-208'],
  },
  {
    id: 'REM-002', priority: 2, domain: 'api.pnbindia.in', type: 'API', status: 'critical', vulnerability: 'TLS 1.2 Active',
    vulnDetail: 'TLS 1.2 supports cipher suites vulnerable to quantum attacks. TLS 1.3 is required for quantum transition readiness.',
    complexity: 'Medium', taskStatus: 'in-progress', estTime: '4–8 hours', skillLevel: 'SysAdmin', assignee: 'Raj Kumar',
    configPatch: `# nginx.conf — Force TLS 1.3\nssl_protocols TLSv1.3;\nssl_session_cache shared:SSL:10m;\nssl_session_timeout 1d;\n# Add HSTS\nadd_header Strict-Transport-Security \n  "max-age=31536000; includeSubDomains" always;`,
    steps: ['Verify OpenSSL version supports TLS 1.3', 'Remove TLSv1.2 from ssl_protocols directive', 'Update ssl_ciphers for TLS 1.3 only', 'Restart nginx: sudo systemctl restart nginx', 'Verify with: openssl s_client -tls1_3 -connect api.pnbindia.in:443', 'Monitor for client compatibility issues for 48 hours'],
    impact: 'Forces modern protocol with better cipher negotiation', nistrefs: ['NIST SP 800-52 Rev 2'],
  },
  {
    id: 'REM-003', priority: 3, domain: 'payments.pnbindia.in', type: 'API', status: 'critical', vulnerability: 'RSA-2048 Cert',
    vulnDetail: 'RSA-2048 certificate signature is broken by Shor\'s Algorithm. Must migrate to ML-DSA or SLH-DSA.',
    complexity: 'Easy', taskStatus: 'pending', estTime: '2–4 hours', skillLevel: 'Security Eng.', assignee: null,
    configPatch: `# Generate ML-DSA-65 certificate\nopenssl genpkey -algorithm mldsa65 \\\n  -out payments_mldsa65.key\nopenssl req -new -key payments_mldsa65.key \\\n  -out payments_mldsa65.csr \\\n  -subj "/CN=payments.pnbindia.in"\n# Submit CSR to PQC-capable CA`,
    steps: ['Generate ML-DSA-65 private key using OQS OpenSSL', 'Create CSR with correct SAN entries', 'Submit to PNB internal PQC CA or PQC-capable public CA', 'Install signed certificate in nginx/apache', 'Update certificate monitoring for new format', 'Verify with QuantumShield TLS Analyzer'],
    impact: 'Eliminates certificate signature vulnerability', nistrefs: ['FIPS 204'],
  },
  {
    id: 'REM-004', priority: 4, domain: 'netbanking.pnbindia.in', type: 'Web Server', status: 'critical', vulnerability: 'Weak Cipher Suite',
    vulnDetail: 'Server supports TLS_RSA_AES_256_CBC_SHA256 which uses RSA key exchange with no forward secrecy.',
    complexity: 'Medium', taskStatus: 'pending', estTime: '3–6 hours', skillLevel: 'SysAdmin', assignee: null,
    configPatch: `# Remove weak cipher suites\nssl_ciphers 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE+AESGCM';\nssl_prefer_server_ciphers on;\n# Disable CBC mode ciphers\nssl_ciphers '!CBC:!RC4:!NULL:!aNULL:!eNULL';`,
    steps: ['Audit current cipher suite list with testssl.sh', 'Remove all CBC mode ciphers', 'Remove all RSA key exchange ciphers', 'Keep only ECDHE + AEAD cipher suites', 'Test for client compatibility', 'Re-scan with QuantumShield to verify'],
    impact: 'Removes weak cipher fallback vectors', nistrefs: ['NIST SP 800-52 Rev 2'],
  },
  {
    id: 'REM-005', priority: 5, domain: 'sso.pnbindia.in', type: 'API', status: 'critical', vulnerability: 'No PFS',
    vulnDetail: 'Server lacks Perfect Forward Secrecy. All past sessions can be decrypted if private key is compromised.',
    complexity: 'Easy', taskStatus: 'pending', estTime: '1–2 hours', skillLevel: 'SysAdmin', assignee: null,
    configPatch: `# Enable Perfect Forward Secrecy\nssl_ciphers 'ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256';\nssl_ecdh_curve secp384r1;\nssl_prefer_server_ciphers on;\n# Disable session tickets (breaks PFS)\nssl_session_tickets off;`,
    steps: ['Disable ssl_session_tickets', 'Update ssl_ciphers to ECDHE-only suites', 'Set ssl_ecdh_curve to secp384r1 minimum', 'Test PFS with ssllabs.com or testssl.sh', 'Verify —PFS flag in scan output'],
    impact: 'Protects all future sessions from compromise', nistrefs: ['NIST SP 800-52 Rev 2'],
  },
  {
    id: 'REM-006', priority: 6, domain: 'mobile.pnbindia.in', type: 'Web Server', status: 'high', vulnerability: 'ECDH Key Exchange',
    vulnDetail: 'Elliptic curve Diffie-Hellman is broken by Shor\'s Algorithm on quantum computers.',
    complexity: 'Hard', taskStatus: 'pending', estTime: '8–16 hours', skillLevel: 'Security Eng.', assignee: null,
    configPatch: `# Replace ECDH with ML-KEM hybrid\nssl_ecdh_curve X25519Kyber768:prime256v1;\nssl_protocols TLSv1.3;\n# Requires OpenSSL 3.x + OQS provider\n# Download: github.com/open-quantum-safe/oqs-provider`,
    steps: ['Install OpenSSL 3.x with OQS provider', 'Build nginx with updated OpenSSL', 'Configure X25519Kyber768 as preferred curve', 'Test hybrid handshake with Chrome/Firefox nightly', 'Monitor mobile app compatibility', 'Roll out gradually (10% → 50% → 100%)', 'Full validation with QuantumShield scanner'],
    impact: 'Replaces quantum-vulnerable key exchange', nistrefs: ['FIPS 203', 'IETF Draft hybrid-kem'],
  },
  {
    id: 'REM-007', priority: 7, domain: 'trade.pnbindia.in', type: 'Web Server', status: 'high', vulnerability: 'TLS 1.1 Detected',
    vulnDetail: 'TLS 1.1 is deprecated by RFC 8996. Contains known vulnerabilities including BEAST and POODLE.',
    complexity: 'Easy', taskStatus: 'fixed', estTime: '30 min', skillLevel: 'SysAdmin', assignee: 'Priya Sharma',
    configPatch: `# Already applied:\nssl_protocols TLSv1.2 TLSv1.3;\n# TLS 1.0 and 1.1 disabled`,
    steps: ['Remove TLSv1.1 from ssl_protocols ✓', 'Restart web server ✓', 'Verify with scanner ✓'],
    impact: 'TLS 1.1 successfully disabled', nistrefs: ['RFC 8996'],
  },
  {
    id: 'REM-008', priority: 8, domain: 'forex.pnbindia.in', type: 'Web Server', status: 'medium', vulnerability: 'AES-128 Usage',
    vulnDetail: 'AES-128 provides only 64-bit effective security against Grover\'s Algorithm on quantum computers.',
    complexity: 'Medium', taskStatus: 'pending', estTime: '2–4 hours', skillLevel: 'SysAdmin', assignee: null,
    configPatch: `# Upgrade to AES-256\nssl_ciphers 'TLS_AES_256_GCM_SHA384:ECDHE-RSA-AES256-GCM-SHA384';\n# Remove AES-128 entries from cipher list`,
    steps: ['Update cipher list to prefer AES-256', 'Remove AES-128 cipher suites', 'Test with openssl ciphers command', 'Verify no AES-128 in scan results'],
    impact: 'Doubles effective key strength against Grover\'s', nistrefs: ['NIST SP 800-131A Rev 2'],
  },
];

const _GEN_DOMAINS = ['branch','region','zone','cluster','local','node','proxy','gateway','auth','db','cache','queue'];
const _GEN_VULNS = ['RSA Key Exchange', 'ECDH Key Exchange', 'TLS 1.2 Active', 'RSA-2048 Cert', 'Weak Cipher Suite', 'No PFS', 'AES-128 Usage', 'TLS 1.1 Detected', 'OCSP Disabled', 'No HSTS', 'DHE Key Exchange', 'SHA-1 Signature', 'Certificate Expiring', 'No Cert Transparency'];
const _GEN_COMPLEXITY = ['Easy', 'Medium', 'Hard'];

const generateRemainingItems = () => {
  const items = [...INITIAL_REMEDIATION_ITEMS];
  let critCount = 28, highCount = 67, medCount = 39;
  
  for (let i = 0; i < 139; i++) {
    const status = critCount > 0 ? 'critical' : (highCount > 0 ? 'high' : 'medium');
    if (status === 'critical') critCount--;
    else if (status === 'high') highCount--;
    else medCount--;

    const r = Math.random();
    const taskStatus = r < 0.05 ? 'fixed' : (r < 0.15 ? 'in-progress' : 'pending');
    const compIdx = r < 0.4 ? 0 : (r < 0.8 ? 1 : 2);
    
    const domainPrefix = _GEN_DOMAINS[i % _GEN_DOMAINS.length];
    const n = Math.floor(i / _GEN_DOMAINS.length) + 1;
    
    items.push({
      id: `REM-${String(i+9).padStart(3, '0')}`,
      priority: i + 9,
      domain: `${domainPrefix}${n}.pnbindia.in`,
      type: 'Web Server',
      status,
      vulnerability: _GEN_VULNS[i % _GEN_VULNS.length],
      vulnDetail: 'Autogenerated vulnerability detail for simulation purposes.',
      complexity: _GEN_COMPLEXITY[compIdx],
      taskStatus,
      estTime: '2-4 hours',
      skillLevel: 'SysAdmin',
      assignee: taskStatus === 'in-progress' ? 'Auto Assignee' : null,
      configPatch: '# Standard config patch\\n# Review required',
      steps: ['Review current configuration', 'Apply standard patch', 'Test changes', 'Verify with scanner'],
      impact: 'Standard security improvement',
      nistrefs: ['NIST SP 800-52'],
    });
  }
  return items;
};

const ALL_REMEDIATION_ITEMS = generateRemainingItems();

const PQC_ALGORITHMS = [
  {
    id: 1, name: 'ML-KEM-768 (Kyber)', purpose: 'Key Encapsulation', fips: 'FIPS 203', icon: 'Lock', iconBg: '#EEF2FF', iconColor: '#4F46E5',
    description: 'NIST-standardized key encapsulation mechanism. Replaces RSA and ECDH for key exchange.',
    replaces: 'RSA, ECDH, DHE', securityLevel: 'NIST Level 3', keySize: '1184 bytes (public)', standardDate: 'Aug 2024', useCase: 'TLS key exchange, VPN tunnels',
  },
  {
    id: 2, name: 'ML-DSA-65 (Dilithium)', purpose: 'Digital Signatures', fips: 'FIPS 204', icon: 'PenLine', iconBg: '#F5F3FF', iconColor: '#7C3AED',
    description: 'NIST-standardized digital signature algorithm. Replaces RSA and ECDSA for certificate signing.',
    replaces: 'RSA-PKCS1, ECDSA', securityLevel: 'NIST Level 3', keySize: '1952 bytes (public)', standardDate: 'Aug 2024', useCase: 'Certificate signing, authentication',
  },
  {
    id: 3, name: 'SLH-DSA (SPHINCS+)', purpose: 'Stateless Signatures', fips: 'FIPS 205', icon: 'ShieldCheck', iconBg: '#ECFDF5', iconColor: '#059669',
    description: 'Hash-based stateless signature scheme. Conservative choice based on well-understood security.',
    replaces: 'RSA (signing), ECDSA', securityLevel: 'NIST Level 3', keySize: '32 bytes (public)', standardDate: 'Aug 2024', useCase: 'Code signing, long-term certificates',
  },
];
