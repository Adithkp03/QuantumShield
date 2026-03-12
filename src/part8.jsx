const ReportsPage = () => (
    <div>
        <PageHeader
            title="Reports & Export"
            subtitle="Generate, schedule, and export cryptographic audit reports"
            actions={<><button className="btn-ghost">Scheduled Reports</button><button className="btn-primary">↓ Generate Now</button></>}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 20 }}>
            <div className="card">
                <div style={{ marginBottom: 20 }}>
                    <SectionTitle>Report Type</SectionTitle>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            { l: "Full Security Report", sub: "All sections, complete detail", sel: true },
                            { l: "Executive Summary", sub: "2-page overview for management" },
                            { l: "Technical Deep Dive", sub: "Raw data, all cipher details" },
                            { l: "Compliance Report", sub: "Framework gap analysis" }
                        ].map((r, i) => (
                            <div key={i} style={{ padding: '12px 14px', borderRadius: 8, border: `1px solid ${r.sel ? '#4F46E5' : '#E5E7EB'}`, background: r.sel ? '#EEF2FF' : '#F9FAFB', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'center' }}>
                                <div style={{ width: 16, height: 16, borderRadius: 8, border: `1px solid ${r.sel ? '#4F46E5' : '#9CA3AF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {r.sel && <div style={{ width: 8, height: 8, borderRadius: 4, background: '#4F46E5' }} />}
                                </div>
                                <div>
                                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{r.l}</div>
                                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>{r.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                    <SectionTitle>Date Range</SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4 }}>From</div>
                            <input type="date" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4 }}>To</div>
                            <input type="date" style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                    <SectionTitle>Include Sections</SectionTitle>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#374151' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input type="checkbox" defaultChecked /> CBOM Inventory</label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input type="checkbox" defaultChecked /> TLS Analysis Results</label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input type="checkbox" defaultChecked /> Quantum Risk Assessment</label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input type="checkbox" defaultChecked /> Remediation Plan</label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input type="checkbox" defaultChecked /> Compliance Mapping</label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input type="checkbox" /> Raw Data Export</label>
                    </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                    <SectionTitle>Export Format</SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        {['PDF', 'JSON', 'CSV', 'XML'].map((f, i) => (
                            <div key={i} style={{
                                border: `1px solid ${i === 0 ? '#4F46E5' : '#E5E7EB'}`, background: i === 0 ? '#EEF2FF' : '#F9FAFB', color: i === 0 ? '#4F46E5' : '#6B7280',
                                borderRadius: 8, padding: 10, textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer'
                            }}>
                                {f}
                            </div>
                        ))}
                    </div>
                </div>

                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 11 }}>Generate Report</button>
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <SectionTitle>Preview</SectionTitle>
                    <Badge type="pending">PDF · Full Report</Badge>
                </div>

                <div style={{ background: '#F8F9FC', border: '1px solid #E5E7EB', borderRadius: 8, padding: 24, minHeight: 540 }}>
                    <Shimmer h={32} w={200} />
                    <div style={{ marginTop: 12 }}><Shimmer h={20} w={320} /></div>
                    <div style={{ marginTop: 8, marginBottom: 24 }}><Shimmer h={14} w={240} /></div>

                    <div style={{ marginBottom: 6 }}><Shimmer h={12} /></div>
                    <div style={{ marginBottom: 6 }}><Shimmer h={12} w="92%" /></div>
                    <div style={{ marginBottom: 20 }}><Shimmer h={12} w="97%" /></div>

                    <div style={{ marginBottom: 20 }}><Shimmer h={180} label="Chart Area" /></div>

                    <div style={{ marginBottom: 6 }}><Shimmer h={12} /></div>
                    <div style={{ marginBottom: 6 }}><Shimmer h={12} w="85%" /></div>
                    <div style={{ marginBottom: 6 }}><Shimmer h={12} w="94%" /></div>
                    <div style={{ marginBottom: 24 }}><Shimmer h={12} w="88%" /></div>

                    <div style={{ marginBottom: 20 }}><Shimmer h={120} label="Table Area" /></div>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginTop: 16 }}>
                    Preview updates when you adjust settings
                </div>
            </div>
        </div>
    </div>
);


const SettingsPage = () => (
    <div>
        <PageHeader
            title="Settings"
            subtitle="Configure scan parameters, notifications, API access, and team management"
            actions={<><button className="btn-primary">Save Changes</button></>}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
            {/* Left Nav */}
            <div className="card" style={{ padding: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                        { l: "Scan Configuration", act: true },
                        { l: "Notifications" },
                        { l: "API Integration" },
                        { l: "Team Management" }
                    ].map((n, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: n.act ? '#EEF2FF' : 'transparent', color: n.act ? '#4F46E5' : '#6B7280', fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 500, cursor: 'pointer' }}>
                            <span>{n.l}</span>
                            {n.act ? null : <ChevronRight size={14} color="#D1D5DB" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Content */}
            <div className="card">
                <SectionTitle>General Scan Settings</SectionTitle>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4 }}>Default Scan Depth</div>
                        <select style={{ width: '100%' }}><option>Standard</option><option>Quick</option><option>Deep</option></select>
                    </div>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4 }}>Scan Timeout (sec)</div>
                        <input type="number" defaultValue="30" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4 }}>Max Concurrent Targets</div>
                        <input type="number" defaultValue="10" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4 }}>Default Port Range</div>
                        <input type="text" defaultValue="443, 8443, 4500" style={{ width: '100%' }} />
                    </div>
                </div>

                <div style={{ marginTop: 24 }}><SectionTitle>Scan Options</SectionTitle></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                        { l: "Subdomain Enumeration", sub: "Discover all subdomains automatically", on: true },
                        { l: "Deep Certificate Analysis", sub: "Full certificate chain validation", on: true },
                        { l: "Aggressive Port Scanning", sub: "Scan all 65535 ports (slow)", on: false },
                        { l: "Validate Cert Chains", sub: "Check full trust chain", on: true },
                        { l: "Detect Hybrid PQC", sub: "Identify classical+PQC hybrid modes", on: true },
                        { l: "Include Internal IPs", sub: "Extend scan to private IP ranges", on: false }
                    ].map((o, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F9FAFB' }}>
                            <div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: '#111827' }}>{o.l}</div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{o.sub}</div>
                            </div>
                            <div style={{ width: 40, height: 22, borderRadius: 11, background: o.on ? '#4F46E5' : '#E5E7EB', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                                <div style={{ position: 'absolute', top: 2, left: o.on ? 20 : 2, width: 18, height: 18, borderRadius: 9, background: 'white', transition: 'left 0.2s' }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 24 }}><SectionTitle>Scheduled Scanning</SectionTitle></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4 }}>Auto-scan Frequency</div>
                        <select style={{ width: '100%' }}><option>Daily</option><option>Weekly</option><option>Monthly</option><option>Manual</option></select>
                    </div>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4 }}>Next Scheduled Scan</div>
                        <input type="text" value="2026-03-13 02:00 IST" disabled style={{ width: '100%', background: '#F3F4F6', color: '#9CA3AF' }} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);