

const RemediationPage = () => (
    <div>
        <PageHeader
            title="Remediation Center"
            subtitle="Prioritized action plan to achieve quantum-safe cryptographic posture across all assets"
            actions={<><button className="btn-ghost">Assign Tasks</button><button className="btn-primary">Export Plan</button></>}
        />

        <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', marginBottom: 20 }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Overall Remediation Progress</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF' }}>38 of 247 assets</span>
                </div>
                <div style={{ height: 10, background: '#F3F4F6', borderRadius: 5, overflow: 'hidden', marginTop: 10 }}>
                    <div style={{ height: '100%', width: '15.4%', background: 'linear-gradient(90deg, #4F46E5, #06B6D4)', borderRadius: 5, boxShadow: '0 0 8px rgba(79,70,229,0.4)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF' }}>
                    <span>25% Quick Wins</span><span>50% Core Systems</span><span>75% Deep Infra</span><span>100% Fully Safe</span>
                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 32, fontWeight: 800, color: '#4F46E5' }}>15.4%</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>Complete</div>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
            {/* Left */}
            <div className="card" style={{ padding: 0 }}>
                <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                        {['All(147)', 'Critical(36)', 'High(72)', 'Medium(39)'].map((t, i) => (
                            <div key={i} style={{
                                padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 12,
                                background: i === 0 ? '#EEF2FF' : 'transparent', color: i === 0 ? '#4F46E5' : '#6B7280', fontWeight: i === 0 ? 600 : 400
                            }}>{t}</div>
                        ))}
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>PRIORITY</th>
                                    <th>ASSET</th>
                                    <th>VULNERABILITY</th>
                                    <th>COMPLEXITY</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { p: "1", c: "🔴", a: "vpn.pnbindia.in", v: "RSA Key Exchange", cx: "Easy", cxC: "#10B981", s: "pending" },
                                    { p: "2", c: "🔴", a: "api.pnbindia.in", v: "TLS 1.2 Active", cx: "Medium", cxC: "#F59E0B", s: "in-progress" },
                                    { p: "3", c: "🔴", a: "payments.pnbindia.in", v: "RSA-2048 Cert", cx: "Easy", cxC: "#10B981", s: "pending" },
                                    { p: "4", c: "🟠", a: "netbanking.pnbindia.in", v: "Weak Cipher Suite", cx: "Medium", cxC: "#F59E0B", s: "pending" },
                                    { p: "5", c: "🟠", a: "sso.pnbindia.in", v: "No PFS", cx: "Easy", cxC: "#10B981", s: "pending" },
                                    { p: "6", c: "🟡", a: "mobile.pnbindia.in", v: "ECDH Key Exchange", cx: "Hard", cxC: "#EF4444", s: "pending" },
                                    { p: "7", c: "🟡", a: "trade.pnbindia.in", v: "TLS 1.1 Detected", cx: "Easy", cxC: "#10B981", s: "fixed" },
                                    { p: "8", c: "🟡", a: "forex.pnbindia.in", v: "AES-128 Usage", cx: "Medium", cxC: "#F59E0B", s: "pending" }
                                ].map((r, i) => (
                                    <tr key={i}>
                                        <td><div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>{r.c}</span> <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700 }}>{r.p}</span></div></td>
                                        <td style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{r.a}</td>
                                        <td>{r.v}</td>
                                        <td style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: r.cxC }}>{r.cx}</td>
                                        <td><Badge type={r.s} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>vpn.pnbindia.in</span>
                    <span style={{ marginLeft: 8 }}><Badge type="critical" /></span>
                </div>

                <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 6 }}>Vulnerability</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
                        RSA key exchange is completely vulnerable to Shor's Algorithm on cryptographically relevant quantum computers.
                    </div>
                </div>

                <div style={{ marginTop: 14 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 6 }}>Remediation Steps</div>
                    <Shimmer h={70} label="Step-by-step instructions" />
                </div>

                <div style={{ marginTop: 14 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 6 }}>Configuration Patch</div>
                    <div style={{ background: '#F8F9FC', border: '1px solid #E5E7EB', borderRadius: 8, padding: 14, overflowX: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4F46E5', lineHeight: 1.7 }}>
                        <pre style={{ margin: 0 }}>
                            # nginx.conf — Add PQC key exchange
                            ssl_ecdh_curve X25519Kyber768:prime256v1;
                            ssl_protocols TLSv1.3;
                            ssl_prefer_server_ciphers off;
                        </pre>
                    </div>
                </div>

                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #F3F4F6', display: 'flex', gap: 20 }}>
                    {[
                        { l: "Complexity", v: "Easy", c: "#10B981" },
                        { l: "Est. Time", v: "2–4 hours", c: "#111827" },
                        { l: "Skill Level", v: "SysAdmin", c: "#111827" }
                    ].map((k, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF', marginBottom: 2 }}>{k.l}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: k.c }}>{k.v}</div>
                        </div>
                    ))}
                </div>

                <button className="btn-primary" style={{ width: '100%', marginTop: 14, justifyContent: 'center' }}>Mark as In Progress</button>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 20 }}>
            {[
                { i: Lock, bg: "#EEF2FF", c: "#4F46E5", n: "ML-KEM-768 (Kyber)", u: "Key Encapsulation", f: "FIPS 203" },
                { i: PenLine, bg: "#F5F3FF", c: "#7C3AED", n: "ML-DSA-65 (Dilithium)", u: "Digital Signatures", f: "FIPS 204" },
                { i: ShieldCheck, bg: "#ECFDF5", c: "#10B981", n: "SLH-DSA (SPHINCS+)", u: "Stateless Signatures", f: "FIPS 205" }
            ].map((k, i) => (
                <div key={i} className="card">
                    <div style={{ width: 40, height: 40, borderRadius: 20, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <k.i size={20} color={k.c} />
                    </div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 12 }}>{k.n}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B7280', marginTop: 4 }}>{k.u}</div>
                    <div style={{ marginTop: 10, display: 'inline-flex', background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE', padding: '3px 10px', borderRadius: 999, fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 600 }}>
                        {k.f}
                    </div>
                </div>
            ))}
        </div>
    </div>
);


const CompliancePage = () => (
    <div>
        <PageHeader
            title="Compliance Mapping"
            subtitle="Cryptographic posture mapped against 5 regulatory and international security frameworks"
            actions={<><button className="btn-ghost">↓ Audit Trail</button><button className="btn-primary">Compliance Report</button></>}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 20 }}>
            {[
                { n: "RBI", f: "RBI Cybersecurity Framework", s: "42%", st: "critical", d: 110, c: "#DC2626" },
                { n: "NIST", f: "NIST SP 800-208", s: "38%", st: "critical", d: 100, c: "#DC2626" },
                { n: "SEBI", f: "SEBI IT Framework", s: "51%", st: "high", d: 130, c: "#EA580C" },
                { n: "ISO", f: "ISO 27001", s: "67%", st: "medium", d: 170, c: "#7C3AED" },
                { n: "PCI", f: "PCI-DSS v4.0", s: "55%", st: "high", d: 140, c: "#EA580C" }
            ].map((k, i) => (
                <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#111827' }}>{k.n}</span>
                        <span style={{ background: '#F3F4F6', color: '#6B7280', fontFamily: "'Inter', sans-serif", fontSize: 10, padding: '2px 8px', borderRadius: 4 }}>{k.n}</span>
                    </div>

                    <div style={{ margin: '14px 0', position: 'relative', width: 72, height: 72 }}>
                        <svg viewBox="0 0 36 36" style={{ width: 72, height: 72 }}>
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F3F4F6" strokeWidth="3" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={k.c} strokeWidth="3" strokeDasharray={`${k.s.replace('%', '')} 100`} />
                        </svg>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800, color: '#111827' }}>
                            {k.s}
                        </div>
                    </div>

                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginBottom: 10 }}>{k.f}</div>
                    <Badge type={k.st} />
                </div>
            ))}
        </div>

        <div className="card" style={{ padding: 0, marginBottom: 20 }}>
            <div style={{ padding: 20 }}><SectionTitle>Control Mapping</SectionTitle></div>
            <div style={{ overflowX: 'auto' }}>
                <table>
                    <thead>
                        <tr>
                            <th>CTRL ID</th>
                            <th>FRAMEWORK</th>
                            <th>REQUIREMENT</th>
                            <th>STATUS</th>
                            <th>ASSETS AFFECTED</th>
                            <th>GAP DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: "RBI-CS-3.1", f: "RBI", r: "Encryption in transit", st: "critical", a: "112 assets" },
                            { id: "NIST-PQC-1", f: "NIST", r: "Post-quantum algorithm adoption", st: "critical", a: "209 assets" },
                            { id: "SEBI-IT-4", f: "SEBI", r: "Cryptographic key management", st: "high", a: "87 assets" },
                            { id: "ISO-10-1", f: "ISO", r: "Cryptographic controls policy", st: "medium", a: "45 assets" },
                            { id: "PCI-4.2.1", f: "PCI", r: "Strong cryptography TLS", st: "high", a: "94 assets" },
                            { id: "RBI-CS-5.2", f: "RBI", r: "Certificate lifecycle mgmt", st: "medium", a: "38 assets" },
                            { id: "NIST-PQC-2", f: "NIST", r: "Crypto inventory (CBOM)", st: "in-progress", a: "247 assets" },
                            { id: "ISO-10-2", f: "ISO", r: "Algorithm deprecation plan", st: "pending", a: "147 assets" }
                        ].map((r, i) => (
                            <tr key={i}>
                                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#374151' }}>{r.id}</td>
                                <td>{r.f}</td>
                                <td>{r.r}</td>
                                <td><Badge type={r.st} /></td>
                                <td>{r.a}</td>
                                <td><Shimmer h={18} w={120} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <SectionTitle>Audit Trail</SectionTitle>
                <button className="btn-ghost">Export Log</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < 6 ? '1px solid #F9FAFB' : 'none', alignItems: 'center' }}>
                        <div style={{ width: 150, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#9CA3AF' }}>2026-03-12 14:{i}0:00</div>
                        <Badge type="in-progress">Scan Started</Badge>
                        <div style={{ flex: 1, fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#374151' }}>Automated Discovery Scan initialized via API</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF' }}>system_runner</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const CertificatesPage = () => (
    <div>
        <PageHeader
            title="Certificates & Labels"
            subtitle="Digital quantum-safety certifications issued to compliant assets"
            actions={<><button className="btn-ghost">Verification Portal</button><button className="btn-primary">+ Issue Certificate</button></>}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
            {[
                { l: "TOTAL ISSUED", v: "38", i: Award, c: "#4F46E5" },
                { l: "QUANTUM SAFE", v: "12", i: ShieldCheck, c: "#10B981" },
                { l: "PQC READY", v: "26", i: Zap, c: "#3B82F6" }
            ].map((k, i) => (
                <div key={i} className="card" style={{ padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>{k.l}</div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: k.c }}>{k.v}</div>
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: 14, background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <k.i size={16} color={k.c} />
                    </div>
                </div>
            ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
                { d: "corp.pnbindia.in", st: "quantum-safe", dt: "Today / 1 year", hbg: "linear-gradient(135deg, #ECFDF5, #D1FAE5)", ic: "#10B981" },
                { d: "cdn.pnbindia.in", st: "quantum-safe", dt: "3 days ago", hbg: "linear-gradient(135deg, #ECFDF5, #D1FAE5)", ic: "#10B981" },
                { d: "static.pnbindia.in", st: "pqc-ready", dt: "1 week ago", hbg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", ic: "#3B82F6" },
                { d: "docs.pnbindia.in", st: "pqc-ready", dt: "2 weeks ago", hbg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", ic: "#3B82F6" },
                { d: "internal.pnbindia.in", st: "pqc-ready", dt: "3 weeks ago", hbg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", ic: "#3B82F6" },
                { d: "[shimmer]", st: "in-review", dt: "—", hbg: "#F9FAFB", ic: "#9CA3AF" }
            ].map((c, i) => (
                <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', opacity: c.st === 'in-review' ? 0.6 : 1 }}>
                    <div style={{ height: 80, background: c.hbg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldCheck size={36} color={c.ic} />
                    </div>
                    <div style={{ padding: '16px 18px' }}>
                        {c.d === '[shimmer]' ? <Shimmer h={18} w={120} /> : <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>{c.d}</div>}
                        <div style={{ marginTop: 6 }}><Badge type={c.st} /></div>

                        <div style={{ margin: '12px 0', borderTop: '1px solid #F9FAFB' }} />

                        <div style={{ display: 'flex', gap: 16 }}>
                            <div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase' }}>Issued / Expires</div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', marginTop: 2 }}>{c.dt}</div>
                            </div>
                        </div>

                        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#4F46E5', cursor: 'pointer' }}>View Details</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="card" style={{ marginTop: 20 }}>
            <SectionTitle>Certification Criteria</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 14 }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <ShieldCheck size={16} color="#10B981" />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: '#111827' }}>Fully Quantum Safe</span>
                    </div>
                    {[
                        "TLS 1.3 with ML-KEM key exchange",
                        "ML-DSA or SLH-DSA certificate signature",
                        "No classical key exchange fallback",
                        "Certificate issued by PQC-capable CA",
                        "No deprecated cipher suites"
                    ].map((c, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#374151' }}>
                            <CheckCircle size={14} color="#10B981" /> {c}
                        </div>
                    ))}
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <Zap size={16} color="#3B82F6" />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: '#111827' }}>PQC Ready</span>
                    </div>
                    {[
                        "TLS 1.3 enabled",
                        "Hybrid PQC key exchange active",
                        "RSA key size ≥ 3072-bit",
                        "No TLS 1.0 or 1.1",
                        "CBOM entry up to date"
                    ].map((c, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#374151' }}>
                            <CheckCircle size={14} color="#10B981" /> {c}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);