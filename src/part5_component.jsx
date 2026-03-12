/* TLS ANALYZER PAGE — Component */
const TLSAnalyzerPage = ({ nav }) => {
    const [selectedDomain, setSelectedDomain] = useState('api.pnbindia.in');
    const [rescanning, setRescanning] = useState(false);
    const [rescanProgress, setRescanProgress] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedCipher, setExpandedCipher] = useState(null);
    const [copiedSerial, setCopiedSerial] = useState(false);
    const [copiedCode, setCopiedCode] = useState(null);
    const [cipherFilter, setCipherFilter] = useState('all');

    const asset = ASSET_TLS_DATA[selectedDomain] || genFallback(selectedDomain);
    useEffect(() => { setActiveTab('overview'); setExpandedCipher(null); }, [selectedDomain]);

    const startRescan = () => { setRescanning(true); setRescanProgress(0); let p = 0; const iv = setInterval(() => { p += 2; setRescanProgress(p); if (p >= 100) { clearInterval(iv); setTimeout(() => setRescanning(false), 600); } }, 60); };
    const copyText = (t, type) => { navigator.clipboard.writeText(t).catch(() => { }); if (type === 'serial') { setCopiedSerial(true); setTimeout(() => setCopiedSerial(false), 2000); } else { setCopiedCode(type); setTimeout(() => setCopiedCode(null), 2000); } };
    const exportReport = () => {
        const c = ['QuantumShield Remediation Report', 'Asset: ' + asset.domain, 'Risk Score: ' + asset.riskScore + '/100', 'Generated: ' + new Date().toLocaleDateString(), '', 'VULNERABILITIES:', ...asset.vulnerabilities.map((v, i) => `${i + 1}. [${v.severity.toUpperCase()}] ${v.title}: ${v.desc}`), '', 'REMEDIATION STEPS:', ...asset.remediation.map((r, i) => `${i + 1}. ${r}`)].join('\n');
        const blob = new Blob([c], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `remediation-${asset.domain}.txt`; a.click(); URL.revokeObjectURL(url);
    };

    const filteredCiphers = cipherFilter === 'all' ? asset.cipherSuites : asset.cipherSuites.filter(c => cipherFilter === 'critical' ? (c.status === 'critical') : (c.status === 'quantum-safe' || c.status === 'pqc-ready'));
    const scanHistory = [
        { date: 'Mar 12, 2026', tlsVer: asset.handshake.tlsVersion, status: asset.status, riskScore: asset.riskScore, changes: 0, trigger: 'Scheduled' },
        { date: 'Mar 05, 2026', tlsVer: asset.handshake.tlsVersion, status: asset.status, riskScore: asset.riskScore + 2, changes: 1, trigger: 'Scheduled', note: 'Certificate renewed' },
        { date: 'Feb 26, 2026', tlsVer: asset.handshake.tlsVersion, status: asset.status, riskScore: asset.riskScore + 3, changes: 0, trigger: 'Scheduled' },
        { date: 'Feb 19, 2026', tlsVer: asset.handshake.tlsVersion, status: asset.status, riskScore: asset.riskScore + 3, changes: 2, trigger: 'Manual', note: 'New cipher suites detected' },
        { date: 'Feb 12, 2026', tlsVer: asset.handshake.tlsVersion, status: asset.status, riskScore: asset.riskScore + 5, changes: 0, trigger: 'Scheduled' },
    ];

    const tlsC = TLS_VER_COLORS[asset.handshake.tlsVersion] || TLS_VER_COLORS['1.2'];
    const hVal = (st, val) => <span style={{ color: HS_COLORS[st] || '#6B7280', fontWeight: 600 }}>{val}</span>;
    const parseCipher = (n) => { const enc = n.includes('CHACHA20') ? 'CHACHA20-POLY1305' : n.includes('AES_256_GCM') ? 'AES-256-GCM' : n.includes('AES_128_GCM') ? 'AES-128-GCM' : n.includes('AES_256_CBC') ? 'AES-256-CBC' : n.includes('AES_128_CBC') ? 'AES-128-CBC' : 'AES'; const mac = n.includes('POLY1305') ? 'POLY1305' : n.includes('SHA384') ? 'SHA384' : n.includes('SHA256') ? 'SHA256' : 'SHA'; return { enc, mac }; };
    const cipherRec = { critical: '⚠ Disable immediately. Replace with TLS_AES_256_GCM_SHA384 using ML-KEM.', high: '↑ Phase out. Insufficient for quantum transition.', medium: '→ Schedule replacement with PQC equivalent.', 'pqc-ready': '✓ Acceptable during transition period.', 'quantum-safe': '✓ Fully quantum safe. No action needed.' };

    return (
        <div>
            <PageHeader title="TLS Analyzer" subtitle="Deep cryptographic inspection of TLS configuration, certificates, and cipher suites"
                actions={<><button className="btn-ghost" onClick={() => nav('discovery')}>← Asset Discovery</button><button className="btn-primary" onClick={startRescan} disabled={rescanning} style={rescanning ? { background: '#6366F1', cursor: 'not-allowed' } : {}}>{rescanning ? <><RefreshCw size={14} style={{ animation: 'spin 0.8s linear infinite' }} /> Scanning...</> : '↻ Re-scan'}</button></>} />

            {/* ASSET SELECTOR */}
            <div className="card" style={{ padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Analyzing:</span>
                <select value={selectedDomain} onChange={e => setSelectedDomain(e.target.value)} style={{ minWidth: 320, fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>
                    {TLS_ASSET_OPTIONS.map(o => <option key={o.domain} value={o.domain}>{o.domain} — {o.ip} : {o.port}</option>)}
                </select>
                <Badge type={asset.status} />
                <div style={{ width: 1, height: 20, background: '#E5E7EB' }} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#9CA3AF' }}>Last scanned 2 hours ago</span>
                <div style={{ marginLeft: 'auto' }}>
                    {rescanning ? <div style={{ width: 160, height: 6, background: '#EEF2FF', borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', width: `${rescanProgress}%`, background: '#4F46E5', borderRadius: 3, transition: 'width 0.3s' }} /></div>
                        : <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, background: tlsC.bg, color: tlsC.t, border: `1px solid ${tlsC.b}`, borderRadius: 999, padding: '5px 14px' }}>TLS {asset.handshake.tlsVersion}</span>}
                </div>
            </div>

            {/* TABS */}
            <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #E5E7EB', marginBottom: 20 }}>
                {[{ k: 'overview', l: 'Overview' }, { k: 'vulnerabilities', l: 'Vulnerabilities', n: asset.vulnerabilities.length, nb: '#FEF2F2', nc: '#DC2626' }, { k: 'remediation', l: 'Remediation Steps', n: asset.remediation.length, nb: '#EEF2FF', nc: '#4F46E5' }, { k: 'history', l: 'Scan History' }].map(t => (
                    <div key={t.k} onClick={() => setActiveTab(t.k)} style={{ padding: '10px 20px', cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: activeTab === t.k ? 600 : 500, color: activeTab === t.k ? '#4F46E5' : '#6B7280', borderBottom: activeTab === t.k ? '2px solid #4F46E5' : '2px solid transparent', marginBottom: -1, display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.15s' }}>
                        {t.l}
                        {t.n !== undefined && <span style={{ background: t.nb, color: t.nc, borderRadius: 999, padding: '1px 7px', fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600 }}>{t.n}</span>}
                    </div>
                ))}
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && <div key={selectedDomain + 'ov'} className="page-animate" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* LEFT: Cert + Handshake */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* CERT CARD */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>TLS Certificate Details</p>
                            <Badge type={asset.status} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 24px' }}>
                            {[
                                { l: 'SUBJECT CN', v: <span style={{ fontWeight: 600 }}>{asset.certificate.subjectCN}</span> },
                                { l: 'ISSUER', v: asset.certificate.issuer },
                                { l: 'VALID FROM', v: <span style={{ color: '#059669' }}>{asset.certificate.validFrom}</span> },
                                { l: 'VALID UNTIL', v: <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ color: asset.certificate.expired ? '#DC2626' : '#059669' }}>{asset.certificate.validUntil}</span>{asset.certificate.expired && <span style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: 999, padding: '1px 7px', fontSize: 10, fontWeight: 600 }}>Expired</span>}</span> },
                                { l: 'SIG ALGORITHM', v: <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{asset.certificate.sigAlgoSafe ? <CheckCircle size={13} color="#059669" /> : <AlertTriangle size={13} color="#F59E0B" />}<span style={{ color: asset.certificate.sigAlgoSafe ? '#059669' : '#D97706' }}>{asset.certificate.sigAlgorithm}</span></span> },
                                { l: 'KEY TYPE / SIZE', v: <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{asset.certificate.keySafe ? <CheckCircle size={13} color="#059669" /> : <XCircle size={13} color="#DC2626" />}<span style={{ color: asset.certificate.keySafe ? '#059669' : '#DC2626' }}>{asset.certificate.keyType} / {asset.certificate.keySize}</span></span> },
                                { l: 'KEY USAGE', v: asset.certificate.keyUsage, span: 2 },
                                { l: 'SERIAL', v: <span style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={() => copyText(asset.certificate.serial, 'serial')}><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: '#4F46E5' }}>{asset.certificate.serial.slice(0, 20)}...</span>{copiedSerial ? <Check size={13} color="#10B981" /> : <Copy size={13} color="#9CA3AF" />}</span>, span: 2 },
                            ].map((f, i) => (
                                <div key={i} style={{ gridColumn: f.span ? `span ${f.span}` : undefined }}>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{f.l}</div>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 500, color: '#111827' }}>{f.v}</div>
                                </div>
                            ))}
                        </div>
                        {/* Chain */}
                        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #F3F4F6' }}>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>CERTIFICATE CHAIN</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                {asset.certificate.chain.map((c, i) => (
                                    <React.Fragment key={i}>
                                        <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '8px 14px', fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500, color: '#374151', display: 'flex', alignItems: 'center', gap: 5 }}>
                                            {i === 0 && <ShieldCheck size={13} color="#10B981" />}{i === asset.certificate.chain.length - 1 && <Lock size={13} color="#4F46E5" />}{c}
                                        </div>
                                        {i < asset.certificate.chain.length - 1 && <ArrowRight size={14} color="#D1D5DB" />}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div style={{ marginTop: 12 }}>
                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 8 }}>SUBJECT ALTERNATIVE NAMES</div>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    {asset.certificate.san.map((s, i) => <span key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#374151', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 6, padding: '2px 8px' }}>{s}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* HANDSHAKE CARD */}
                    <div className="card">
                        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16 }}>TLS Handshake Details</p>
                        {[
                            { l: 'TLS Version:', v: <><span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: HS_COLORS[asset.handshake.tlsVersionStatus] }}>{asset.handshake.tlsVersion}</span><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: HS_COLORS[asset.handshake.tlsVersionStatus], marginLeft: 6 }}>· {asset.handshake.tlsVersionNote}</span></> },
                            { l: 'Key Exchange:', v: <><span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: HS_COLORS[asset.handshake.keyExchangeStatus] }}>{asset.handshake.keyExchange}</span><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: HS_COLORS[asset.handshake.keyExchangeStatus], marginLeft: 6 }}>· {asset.handshake.keyExchangeNote}</span></> },
                            { l: 'Session Resumption:', v: hVal(asset.handshake.sessionResumptionStatus, asset.handshake.sessionResumption) },
                            { l: 'HSTS:', v: <>{hVal(asset.handshake.hstsStatus, asset.handshake.hsts)}{asset.handshake.hsts === 'No' && <span style={{ marginLeft: 6, background: '#FEF2F2', color: '#DC2626', padding: '1px 6px', borderRadius: 999, fontSize: 10, fontWeight: 600 }}>⚠ Risk</span>}</> },
                            { l: 'OCSP Stapling:', v: hVal(asset.handshake.ocspStatus, asset.handshake.ocspStapling) },
                            { l: 'Cert Transparency:', v: hVal(asset.handshake.certTransparencyStatus, asset.handshake.certTransparency) },
                            { l: 'Forward Secrecy:', v: hVal(asset.handshake.forwardSecrecyStatus, asset.handshake.forwardSecrecy) },
                        ].map((r, i, a) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < a.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#6B7280' }}>{r.l}</span>
                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13 }}>{r.v}</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* RIGHT: Cipher + PQC */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* CIPHER CARD */}
                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Cipher Suite Analysis</p>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 999, padding: '3px 10px' }}>{asset.cipherSuites.length} suites</span>
                                <select value={cipherFilter} onChange={e => setCipherFilter(e.target.value)} style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, padding: '4px 8px', borderRadius: 6 }}>
                                    <option value="all">All</option><option value="critical">Critical Only</option><option value="safe">Safe Only</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table><thead><tr><th>CIPHER SUITE</th><th>KEY EXCHANGE</th><th>AUTH</th><th>QUANTUM STATUS</th></tr></thead>
                                <tbody>
                                    {filteredCiphers.map((c, i) => (
                                        <React.Fragment key={i}>
                                            <tr onClick={() => setExpandedCipher(expandedCipher === i ? null : i)} style={{ cursor: 'pointer' }}>
                                                <td style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: expandedCipher === i ? '#4F46E5' : '#374151', fontWeight: expandedCipher === i ? 600 : 400, whiteSpace: 'nowrap' }}>{c.name}</td>
                                                <td style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500, color: KE_COLORS[c.keyEx] || '#374151' }}>{c.keyEx}</td>
                                                <td style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#374151' }}>{c.auth}</td>
                                                <td><Badge type={c.status} /></td>
                                            </tr>
                                            {expandedCipher === i && <tr><td colSpan={4} style={{ background: '#F8F9FC', padding: '14px 16px' }}>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                                                    <div><div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 8 }}>Algorithm</div>
                                                        {[{ l: 'Key Exchange', v: c.keyEx, cl: KE_COLORS[c.keyEx] }, { l: 'Auth', v: c.auth }, { l: 'Encryption', v: parseCipher(c.name).enc }, { l: 'MAC', v: parseCipher(c.name).mac }].map((d, j) => <div key={j} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, marginBottom: 4 }}><span style={{ color: '#9CA3AF' }}>{d.l}: </span><span style={{ fontWeight: 500, color: d.cl || '#374151' }}>{d.v}</span></div>)}
                                                    </div>
                                                    <div><div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 8 }}>Quantum Analysis</div>
                                                        {[{ l: "Broken by Shor's?", v: ['RSA', 'DHE', 'ECDHE', 'ECDH-RSA', 'ECDHE-RSA', 'DHE-RSA'].includes(c.keyEx) }, { l: "Weakened by Grover's?", v: !c.name.includes('256') && !c.name.includes('CHACHA20') }, { l: 'Forward Secrecy', v: !['RSA'].includes(c.keyEx), inv: true }].map((d, j) => <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Inter',sans-serif", fontSize: 12, marginBottom: 4 }}>
                                                            {(d.inv ? !d.v : d.v) ? <XCircle size={13} color="#DC2626" /> : <CheckCircle size={13} color="#10B981" />}<span style={{ color: (d.inv ? !d.v : d.v) ? '#DC2626' : '#059669' }}>{d.l}: {(d.inv ? d.v : !d.v) ? 'No' : 'Yes'}</span></div>)}
                                                    </div>
                                                    <div><div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 8 }}>Recommendation</div>
                                                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#374151', lineHeight: 1.6 }}>{cipherRec[c.status] || cipherRec.medium}</p>
                                                    </div>
                                                </div>
                                            </td></tr>}
                                        </React.Fragment>
                                    ))}
                                </tbody></table>
                        </div>
                    </div>
                    {/* PQC CARD */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Post-Quantum Cryptography Status</p>
                            <span style={{
                                fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, borderRadius: 999, padding: '3px 10px',
                                background: asset.pqcStatus.overall === 'full' ? '#ECFDF5' : asset.pqcStatus.overall === 'hybrid' ? '#EFF6FF' : '#FEF2F2',
                                color: asset.pqcStatus.overall === 'full' ? '#059669' : asset.pqcStatus.overall === 'hybrid' ? '#2563EB' : '#DC2626',
                                border: `1px solid ${asset.pqcStatus.overall === 'full' ? '#A7F3D0' : asset.pqcStatus.overall === 'hybrid' ? '#BFDBFE' : '#FECACA'}`
                            }}>
                                {asset.pqcStatus.overall === 'full' ? 'Fully Quantum Safe' : asset.pqcStatus.overall === 'hybrid' ? 'Hybrid PQC Active' : 'No PQC Detected'}
                            </span>
                        </div>
                        {asset.pqcStatus.checks.map((c, i, a) => (
                            <div key={i} title={PQC_TIPS[c.algo] || ''} style={{ display: 'flex', alignItems: 'center', padding: '12px 4px', borderBottom: i < a.length - 1 ? '1px solid #F9FAFB' : 'none', borderRadius: 8, transition: 'background 0.1s', cursor: 'default' }} onMouseOver={e => e.currentTarget.style.background = '#FAFAFA'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                                <div style={{ width: 32, height: 32, borderRadius: 16, background: c.detected ? '#ECFDF5' : '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {c.detected ? <CheckCircle size={16} color="#10B981" /> : <XCircle size={16} color="#DC2626" />}
                                </div>
                                <div style={{ flex: 1, marginLeft: 12 }}>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{c.algo}</div>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{c.sub}</div>
                                </div>
                                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: c.detected ? 600 : 500, color: c.detected ? '#059669' : c.note ? '#D97706' : '#DC2626' }}>{c.detected ? 'Detected' : c.note || 'Not Detected'}</span>
                            </div>
                        ))}
                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
                            <div style={{ background: asset.pqcStatus.overall === 'full' ? '#ECFDF5' : asset.pqcStatus.overall === 'hybrid' ? '#EFF6FF' : '#FEF2F2', borderLeft: `3px solid ${asset.pqcStatus.overall === 'full' ? '#10B981' : asset.pqcStatus.overall === 'hybrid' ? '#3B82F6' : '#EF4444'}`, borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                {asset.pqcStatus.overall === 'full' ? <CheckCircle size={16} color="#10B981" style={{ marginTop: 2, flexShrink: 0 }} /> : asset.pqcStatus.overall === 'hybrid' ? <Zap size={16} color="#3B82F6" style={{ marginTop: 2, flexShrink: 0 }} /> : <AlertTriangle size={16} color="#DC2626" style={{ marginTop: 2, flexShrink: 0 }} />}
                                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#374151', lineHeight: 1.5 }}>
                                    {asset.pqcStatus.overall === 'full' ? 'This asset implements NIST-standardized PQC algorithms. It is protected against known quantum cryptanalytic attacks including Shor\'s Algorithm.' : asset.pqcStatus.overall === 'hybrid' ? 'Hybrid PQC is active. Classical algorithms are still present as fallback. Migrate to pure PQC to achieve full quantum safety.' : 'This asset has zero post-quantum cryptography. All encryption is vulnerable to HNDL attacks and will be broken once CRQCs emerge.'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            {/* VULNERABILITIES TAB */}
            {activeTab === 'vulnerabilities' && <div key={selectedDomain + 'vu'} className="page-animate">
                {asset.vulnerabilities.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 60 }}><ShieldCheck size={48} color="#10B981" /><p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: '#374151', marginTop: 12 }}>No Vulnerabilities Found</p><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>This asset is fully quantum safe</p></div>
                ) : (<>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                        {[{ l: 'CRITICAL', c: asset.vulnerabilities.filter(v => v.severity === 'critical').length, bg: '#FEF2F2', tc: '#DC2626' }, { l: 'HIGH', c: asset.vulnerabilities.filter(v => v.severity === 'high').length, bg: '#FFF7ED', tc: '#EA580C' }, { l: 'MEDIUM', c: asset.vulnerabilities.filter(v => v.severity === 'medium').length, bg: '#F5F3FF', tc: '#7C3AED' }].map((s, i) => (
                            <div key={i} style={{ flex: 1, background: s.bg, borderRadius: 10, padding: '12px 16px', textAlign: 'center' }}>
                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase' }}>{s.l}</div>
                                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 28, fontWeight: 800, color: s.tc }}>{s.c}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {asset.vulnerabilities.map((v, i) => (
                            <div key={i} className="card" style={{ padding: '16px 20px', borderLeft: `4px solid ${v.severity === 'critical' ? '#DC2626' : v.severity === 'high' ? '#EA580C' : '#7C3AED'}`, display: 'flex', alignItems: 'flex-start', gap: 14, transition: 'box-shadow 0.15s,transform 0.15s' }} onMouseOver={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseOut={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                                <div style={{ width: 36, height: 36, borderRadius: 18, background: v.severity === 'critical' ? '#FEF2F2' : v.severity === 'high' ? '#FFF7ED' : '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {v.severity === 'critical' ? <XCircle size={18} color="#DC2626" /> : v.severity === 'high' ? <AlertTriangle size={18} color="#EA580C" /> : <AlertCircle size={18} color="#7C3AED" />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: '#111827' }}>{v.title}</span><Badge type={v.severity} /></div>
                                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#6B7280', marginTop: 4 }}>{v.desc}</p>
                                </div>
                                <span onClick={() => setActiveTab('remediation')} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#4F46E5', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>Fix →</span>
                            </div>
                        ))}
                    </div>
                </>)}
            </div>}

            {/* REMEDIATION TAB */}
            {activeTab === 'remediation' && <div key={selectedDomain + 're'} className="page-animate">
                {asset.remediation.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 60 }}><ShieldCheck size={48} color="#10B981" /><p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: '#374151', marginTop: 12 }}>No Remediation Required</p><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>This asset is fully quantum safe</p></div>
                ) : (<>
                    <div style={{ background: '#EEF2FF', borderRadius: 12, padding: '16px 20px', marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
                        <Info size={20} color="#4F46E5" /><div><p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: '#111827' }}>Remediation Plan for {asset.domain}</p><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#6B7280' }}>{asset.remediation.length} action items · Estimated total time: 8-16 hours</p></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {asset.remediation.map((r, i) => {
                            const code = getCodeSnip(r); const eff = getEffort(r);
                            return (
                                <div key={i} className="card" style={{ padding: 20, display: 'flex', gap: 16 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 18, background: '#EEF2FF', border: '1px solid #C7D2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, color: '#4F46E5', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: '#111827' }}>{r}</p>
                                        {code && <div style={{ position: 'relative', background: '#F8F9FC', border: '1px solid #E5E7EB', borderRadius: 8, padding: 14, marginTop: 12, overflowX: 'auto' }}>
                                            <pre style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#374151', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>{code}</pre>
                                            <div onClick={() => copyText(code, i)} style={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer', padding: 4 }}>
                                                {copiedCode === i ? <Check size={14} color="#10B981" /> : <Copy size={14} color="#9CA3AF" />}
                                            </div>
                                        </div>}
                                        <div style={{ marginTop: 12, display: 'flex', gap: 20 }}>
                                            {[{ l: 'COMPLEXITY', v: eff.c }, { l: 'EST. TIME', v: eff.t }, { l: 'REQUIRES', v: eff.r }].map((e, j) => <div key={j}><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase' }}>{e.l}: </span><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#374151' }}>{e.v}</span></div>)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>)}
            </div>}

            {/* HISTORY TAB */}
            {activeTab === 'history' && <div key={selectedDomain + 'hi'} className="page-animate">
                <div className="card" style={{ marginBottom: 20 }}>
                    <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 12 }}>Risk Score History</p>
                    <ResponsiveContainer width="100%" height={120}>
                        <LineChart data={[...scanHistory].reverse()}>
                            <Line type="monotone" dataKey="riskScore" stroke={asset.status === 'quantum-safe' ? '#10B981' : '#EF4444'} strokeWidth={2} dot={{ r: 4, fill: asset.status === 'quantum-safe' ? '#10B981' : '#EF4444' }} />
                            <XAxis dataKey="date" hide /><YAxis domain={[0, 100]} hide />
                            <Tooltip contentStyle={{ fontFamily: "'Inter',sans-serif", fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={v => [v + '/100', 'Risk Score']} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table><thead><tr><th>DATE</th><th>TLS VER</th><th>STATUS</th><th>RISK SCORE</th><th>CHANGES</th><th>TRIGGER</th></tr></thead>
                        <tbody>
                            {scanHistory.map((s, i) => {
                                const tc = TLS_VER_COLORS[s.tlsVer] || TLS_VER_COLORS['1.2']; return (
                                    <tr key={i}>
                                        <td style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#374151' }}>{s.date}</td>
                                        <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600, background: tc.bg, color: tc.t, border: `1px solid ${tc.b}`, borderRadius: 999, padding: '2px 8px' }}>TLS {s.tlsVer}</span></td>
                                        <td><Badge type={s.status} /></td>
                                        <td style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, color: BADGE_STYLES[s.status]?.color || '#374151' }}>{s.riskScore}</td>
                                        <td style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#9CA3AF' }}>{s.changes === 0 ? '—' : <span title={s.note} style={{ color: '#EA580C', cursor: 'help' }}>● {s.changes} changes</span>}</td>
                                        <td><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#374151', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 999, padding: '2px 8px' }}>{s.trigger}</span></td>
                                    </tr>
                                );
                            })}
                        </tbody></table>
                </div>
            </div>}

            {/* BOTTOM ACTION BAR */}
            {asset.status !== 'quantum-safe' && (
                <div style={{ borderTop: '1px solid #E5E7EB', padding: '14px 0', marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', bottom: 0, background: '#F8F9FC', zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <AlertTriangle size={16} color={BADGE_STYLES[asset.status]?.color || '#F59E0B'} />
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#374151' }}>{asset.vulnerabilities.length} vulnerabilities found — {asset.status === 'critical' ? 'immediate action required' : 'remediation recommended'}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn-ghost" onClick={() => nav('cbom')}>View CBOM Entry</button>
                        <button className="btn-ghost" onClick={() => nav('remediation')}>View in Remediation</button>
                        <button className="btn-primary" onClick={exportReport}><Download size={14} /> Generate Fix Report</button>
                    </div>
                </div>
            )}
        </div>
    );
};
