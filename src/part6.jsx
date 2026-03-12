const CBOMPage = () => (
    <div>
        <PageHeader
            title="CBOM Inventory"
            subtitle="CycloneDX v1.5 Cryptographic Bill of Materials · 847 components across 247 assets"
            actions={<><button className="btn-ghost">JSON</button><button className="btn-ghost">XML</button><button className="btn-ghost">CSV</button><button className="btn-primary">↓ PDF Report</button></>}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
            {[
                { l: "TOTAL COMPONENTS", v: "847", c: "#111827", i: Hash },
                { l: "UNIQUE ALGORITHMS", v: "23", c: "#4F46E5", i: GitBranch },
                { l: "EXPIRING < 30 DAYS", v: "12", c: "#F59E0B", i: Clock },
                { l: "PQC COMPONENTS", v: "14", c: "#10B981", i: ShieldCheck }
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

        <div className="card" style={{ padding: 0, marginBottom: 20 }}>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionTitle>Cryptographic Components</SectionTitle>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={14} color="#9CA3AF" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 10 }} />
                        <input type="text" placeholder="Search components..." style={{ width: 260, paddingLeft: 30 }} />
                    </div>
                    <select>
                        <option>Filter by Risk</option>
                    </select>
                    <button className="btn-ghost" style={{ padding: '8px 10px' }}><SlidersHorizontal size={16} /></button>
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: 40 }}><input type="checkbox" /></th>
                            <th>COMP ID</th>
                            <th>ASSET</th>
                            <th>ALGORITHM</th>
                            <th>KEY SIZE</th>
                            <th>TLS VER</th>
                            <th>KEY EXCHANGE</th>
                            <th>QUANTUM STATUS</th>
                            <th>RISK SCORE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: 'CBOM-001', a: 'api.pnbindia.in', alg: 'RSA-PKCS1-SHA256', b: 'critical', s: 91, sc: '#DC2626' },
                            { id: 'CBOM-002', a: 'netbanking.pnbindia.in', alg: 'ECDSA-SHA384', b: 'high', s: 74, sc: '#EA580C' },
                            { id: 'CBOM-003', a: 'vpn.pnbindia.in', alg: 'RSA-PKCS1-SHA1', b: 'critical', s: 95, sc: '#DC2626' },
                            { id: 'CBOM-004', a: 'mobile.pnbindia.in', alg: 'ECDH-SHA256', b: 'medium', s: 52, sc: '#7C3AED' },
                            { id: 'CBOM-005', a: 'corp.pnbindia.in', alg: 'ML-KEM-768', b: 'quantum-safe', s: 8, sc: '#059669' },
                            { id: 'CBOM-006', a: 'payments.pnbindia.in', alg: 'RSA-2048', b: 'critical', s: 88, sc: '#DC2626' },
                            { id: 'CBOM-007', a: 'sso.pnbindia.in', alg: 'ECDSA-P256', b: 'high', s: 71, sc: '#EA580C' },
                            { id: 'CBOM-008', a: 'cdn.pnbindia.in', alg: 'ML-DSA-65', b: 'quantum-safe', s: 5, sc: '#059669' },
                            { id: 'CBOM-009', a: 'trade.pnbindia.in', alg: 'DHE-RSA-2048', b: 'high', s: 78, sc: '#EA580C' },
                            { id: 'CBOM-010', a: 'forex.pnbindia.in', alg: 'AES-128-CBC', b: 'medium', s: 49, sc: '#7C3AED' }
                        ].map((r, i) => (
                            <tr key={i}>
                                <td><input type="checkbox" /></td>
                                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4F46E5' }}>{r.id}</td>
                                <td style={{ fontWeight: 500 }}>{r.a}</td>
                                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#374151' }}>{r.alg}</td>
                                <td><Shimmer h={16} w={60} /></td>
                                <td><Shimmer h={16} w={60} /></td>
                                <td><Shimmer h={16} w={90} /></td>
                                <td><Badge type={r.b} /></td>
                                <td style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: r.sc }}>{r.s}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF' }}>Showing 10 of 847 components</div>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['<', '1', '2', '3', '...', '85', '>'].map((p, i) => (
                        <button key={i} style={{
                            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: p === '1' ? '#4F46E5' : '#F9FAFB', color: p === '1' ? 'white' : '#6B7280',
                            border: p === '1' ? 'none' : '1px solid #E5E7EB', borderRadius: 6,
                            fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: 'pointer'
                        }}>{p}</button>
                    ))}
                </div>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="card">
                <div style={{ marginBottom: 16 }}><SectionTitle>Algorithm Distribution</SectionTitle></div>
                <Shimmer h={200} label="Bar Chart — Algorithm Usage Count" />
            </div>
            <div className="card">
                <div style={{ marginBottom: 16 }}><SectionTitle>TLS Version Distribution</SectionTitle></div>
                <Shimmer h={200} label="Donut Chart — TLS 1.0 / 1.1 / 1.2 / 1.3" />
            </div>
        </div>
    </div>
);
