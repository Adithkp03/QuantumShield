import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    ShieldCheck, Radar, Lock, ClipboardList, Atom, Wrench, FileText, Award, Settings, Search,
    Bell, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Zap, CheckCircle, AlertTriangle, XCircle, Activity,
    Globe, Code, Network, Server, LayoutDashboard, TrendingDown, PenLine, SlidersHorizontal, Hash, GitBranch, Clock,
    Download, ExternalLink, Users, Copy, Check, X
} from 'lucide-react';

const BADGE_STYLES = {
    'quantum-safe': { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
    'pqc-ready': { bg: '#EFF6FF', color: '#3B82F6', border: '#BFDBFE' },
    'medium': { bg: '#F5F3FF', color: '#7C3AED', border: '#DDD6FE' },
    'high': { bg: '#FFF7ED', color: '#EA580C', border: '#FED7AA' },
    'critical': { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
    'fixed': { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
    'in-progress': { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
    'pending': { bg: '#F9FAFB', color: '#6B7280', border: '#E5E7EB' },
};

const Badge = ({ type, children }) => {
    const style = BADGE_STYLES[type] || BADGE_STYLES['pending'];
    const label = children || type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return (
        <span style={{
            background: style.bg, color: style.color, border: `1px solid ${style.border}`,
            padding: '3px 10px', fontFamily: "'Inter', sans-serif", fontSize: '11.5px', fontWeight: 600,
            borderRadius: '999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {label}
        </span>
    );
};

const Shimmer = ({ h, w = '100%', label, radius = 8 }) => (
    <div style={{ position: 'relative', width: w }}>
        <div className="shimmer-block" style={{ height: h, width: '100%', borderRadius: radius }} />
        {label && (
            <span style={{
                position: 'absolute', top: 10, left: 12,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: '#D1D5DB', pointerEvents: 'none'
            }}>
                {label}
            </span>
        )}
    </div>
);

const PageHeader = ({ title, subtitle, actions }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>
                {title}
            </h1>
            {subtitle && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9CA3AF', marginTop: 3 }}>
                    {subtitle}
                </p>
            )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
            {actions}
        </div>
    </div>
);

const SectionTitle = ({ children }) => (
    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 14 }}>
        {children}
    </p>
);



const LoginPage = ({ onLogin }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', height: '100vh', background: '#F8F9FC' }}>
        <div style={{
            background: 'linear-gradient(145deg, #4F46E5, #7C3AED)', padding: '64px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white'
        }}>
            <ShieldCheck size={52} color="white" style={{ marginBottom: 24 }} />
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 40, fontWeight: 800, color: 'white' }}>QuantumShield</h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.75)', marginTop: 8, maxWidth: 380, lineHeight: 1.6 }}>
                Quantum-Ready Cybersecurity for Future-Safe Banking
            </p>

            <div style={{
                marginTop: 32, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8, padding: '10px 16px', display: 'inline-flex', gap: 8, alignItems: 'center'
            }}>
                <Zap size={15} color="white" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: 'white' }}>Powered by NIST PQC Standards 2024</span>
            </div>

            <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                    { icon: ShieldCheck, title: "Full CBOM Inventory", sub: "Cryptographic bill of materials for every asset" },
                    { icon: Zap, title: "HNDL Risk Detection", sub: "Identify harvest-now-decrypt-later vulnerabilities" },
                    { icon: Award, title: "PQC Certification", sub: "Automated quantum-safety labels and certificates" }
                ].map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <f.icon size={16} color="white" />
                        </div>
                        <div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: 'white' }}>{f.title}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{f.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 40, fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                Punjab National Bank · Internal Cybersecurity Platform
            </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', background: '#F8F9FC' }}>
            <div className="card" style={{ width: 400, padding: 36 }}>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: '#111827' }}>Welcome back</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6B7280', marginTop: 4 }}>Sign in to your security dashboard</p>

                <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Email</div>
                        <input type="email" placeholder="security@pnb.co.in" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Password</div>
                        <input type="password" placeholder="••••••••••" style={{ width: '100%' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B7280' }}>
                            <input type="checkbox" style={{ width: 'auto' }} /> Remember me
                        </label>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#4F46E5', cursor: 'pointer' }}>Forgot password?</span>
                    </div>

                    <button className="btn-primary" onClick={onLogin} style={{ width: '100%', marginTop: 8, padding: 11, justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700 }}>
                        Sign In
                    </button>
                </div>

                <div style={{ marginTop: 24, borderTop: '1px solid #F3F4F6', paddingTop: 16, textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>
                    Punjab National Bank — Internal Security Portal
                </div>
            </div>
        </div>
    </div>
);


const DashboardPage = ({ nav }) => (
    <div>
        <PageHeader
            title="Security Dashboard"
            subtitle="Last full scan: 2 hours ago · Next scheduled: in 22 hours"
            actions={<><button className="btn-primary">▶ Run New Scan</button><button className="btn-ghost">↓ Export Report</button></>}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
            {[
                { l: "TOTAL ASSETS", v: "247", i: ShieldCheck, cbg: "#F1F5F9", ic: "#64748B", t: "↑12%", tc: "#10B981" },
                { l: "QUANTUM SAFE", v: "38", i: CheckCircle, cbg: "#ECFDF5", ic: "#10B981", t: "↑4%", tc: "#10B981" },
                { l: "PQC READY", v: "61", i: Zap, cbg: "#EFF6FF", ic: "#3B82F6", t: "↑8%", tc: "#10B981" },
                { l: "VULNERABLE", v: "112", i: AlertTriangle, cbg: "#FFFBEB", ic: "#F59E0B", t: "↓2%", tc: "#10B981" },
                { l: "CRITICAL RISK", v: "36", i: XCircle, cbg: "#FEF2F2", ic: "#EF4444", t: "↓5%", tc: "#10B981" },
                { l: "AVG RISK SCORE", v: "67.4", i: Activity, cbg: "#F5F3FF", ic: "#8B5CF6", t: "↓1.2", tc: "#10B981" }
            ].map((k, i) => (
                <div key={i} className="card" style={{ padding: '18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.l}</div>
                        <div style={{ width: 28, height: 28, borderRadius: 14, background: k.cbg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <k.i size={16} color={k.ic} />
                        </div>
                    </div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: k.ic, marginTop: 10 }}>{k.v}</div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                        <TrendingDown size={13} color={k.tc} style={{ transform: k.t.includes('↑') ? 'rotate(180deg)' : 'none' }} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: k.tc }}>{k.t}</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>vs last scan</span>
                    </div>
                </div>
            ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginTop: 20 }}>
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#111827' }}>Security Posture Trend</p>
                    <select style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 6, padding: '5px 10px', outline: 'none' }}>
                        <option>Last 30 days</option>
                    </select>
                </div>
                <Shimmer h={240} label="Line Chart — Risk Score Over Time" />
            </div>
            <div className="card">
                <SectionTitle>Asset Risk Distribution</SectionTitle>
                <Shimmer h={240} label="Donut Chart — Safe / PQC-Ready / Vulnerable / Critical" />
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginTop: 20 }}>
            <div className="card">
                <SectionTitle>HNDL Exposure Meter</SectionTitle>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF', marginTop: 2, marginBottom: 14 }}>Harvest Now, Decrypt Later Risk Index</div>
                <Shimmer h={180} label="Radial Gauge — HNDL Risk Score" />
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B7280' }}>Est. years of data at risk: <span style={{ fontWeight: 600, color: '#111827' }}>7 years</span></div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B7280' }}>Projected CRQC emergence: <span style={{ fontWeight: 600, color: '#111827' }}>2031</span></div>
                </div>
            </div>
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#111827' }}>Recent Activity</p>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#4F46E5', cursor: 'pointer' }}>View all</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < 6 ? '1px solid #F3F4F6' : 'none' }}>
                            <div className="shimmer-block" style={{ width: 32, height: 32, borderRadius: 16 }} />
                            <div style={{ flex: 1 }}>
                                <div className="shimmer-block" style={{ height: 12, width: 160, borderRadius: 4, marginBottom: 5 }} />
                                <div className="shimmer-block" style={{ height: 10, width: 90, borderRadius: 4 }} />
                            </div>
                            <div className="shimmer-block" style={{ height: 10, width: 55, borderRadius: 4 }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 20 }}>
            {[
                { l: "Start Deep Scan", sub: "Discover all assets", i: Radar, bg: "#EEF2FF", c: "#4F46E5", p: 'discovery' },
                { l: "Generate CBOM", sub: "Export full inventory", i: FileText, bg: "#EFF6FF", c: "#3B82F6", p: 'cbom' },
                { l: "Issue Certificates", sub: "Label quantum-safe assets", i: Award, bg: "#ECFDF5", c: "#10B981", p: 'certificates' },
                { l: "View Critical Alerts", sub: "36 assets need immediate attention", i: AlertTriangle, bg: "#FFF7ED", c: "#F59E0B", p: 'remediation' }
            ].map((a, i) => (
                <div key={i} onClick={() => nav(a.p)} className="card" style={{ padding: '16px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'box-shadow 0.15s' }} onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'} onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'}>
                    <div style={{ width: 38, height: 38, borderRadius: 19, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <a.i size={18} color={a.c} />
                    </div>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{a.l}</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{a.sub}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


const DiscoveryPage = () => (
    <div>
        <PageHeader
            title="Asset Discovery"
            subtitle="Discover and enumerate all internet-facing assets across domains, IPs, and CIDR ranges"
            actions={<><button className="btn-primary">+ New Scan Target</button></>}
        />

        <div className="card" style={{ marginBottom: 20 }}>
            <SectionTitle>Configure Scan Target</SectionTitle>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 180px 180px', gap: 12, marginTop: 14 }}>
                <div style={{ gridColumn: 'span 2' }}>
                    <input type="text" placeholder="netbanking.pnbindia.in  or  103.45.0.0/24" style={{ width: '100%' }} />
                </div>
                <select>
                    <option>Quick</option>
                    <option>Standard</option>
                    <option>Deep</option>
                </select>
                <select>
                    <option>All Types</option>
                    <option>Web Servers</option>
                    <option>APIs</option>
                    <option>VPN</option>
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <div style={{ display: 'flex', gap: 16, fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B7280' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input type="checkbox" defaultChecked /> Include Subdomains</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input type="checkbox" defaultChecked /> Scan Common Ports</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input type="checkbox" /> Deep Certificate Analysis</label>
                </div>
                <button className="btn-primary">▶ Start Scan</button>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
            {[
                { l: "WEB SERVERS", v: "94", i: Globe, bg: "#EFF6FF", c: "#3B82F6", sub: "Active HTTPS endpoints" },
                { l: "API ENDPOINTS", v: "87", i: Code, bg: "#EEF2FF", c: "#4F46E5", sub: "REST & SOAP interfaces" },
                { l: "VPN GATEWAYS", v: "23", i: Network, bg: "#F5F3FF", c: "#8B5CF6", sub: "TLS-based tunnels" },
                { l: "OTHER", v: "43", i: Server, bg: "#FFFBEB", c: "#F59E0B", sub: "Load balancers, proxies" }
            ].map((k, i) => (
                <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 22, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <k.i size={20} color={k.c} />
                    </div>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.l}</div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: '#111827' }}>{k.v}</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{k.sub}</div>
                    </div>
                </div>
            ))}
        </div>

        <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Discovery Results</p>
                    <span style={{ marginLeft: 10 }}><Badge type="pqc-ready">247 assets</Badge></span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={14} color="#9CA3AF" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 10 }} />
                        <input type="text" placeholder="Filter results..." style={{ width: 220, paddingLeft: 30 }} />
                    </div>
                    <button className="btn-ghost" style={{ padding: '8px 10px' }}><SlidersHorizontal size={16} /></button>
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: 40 }}><input type="checkbox" /></th>
                            <th>ASSET / DOMAIN</th>
                            <th>IP ADDRESS</th>
                            <th>PORT</th>
                            <th>TYPE</th>
                            <th>TLS VERSION</th>
                            <th>QUANTUM STATUS</th>
                            <th>LAST SCANNED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { d: "api.pnbindia.in", t: "API", b: "critical" },
                            { d: "netbanking.pnbindia.in", t: "Web Server", b: "high" },
                            { d: "vpn.pnbindia.in", t: "VPN", b: "critical" },
                            { d: "mobile.pnbindia.in", t: "Web Server", b: "medium" },
                            { d: "corp.pnbindia.in", t: "Web Server", b: "pqc-ready" },
                            { d: "payments.pnbindia.in", t: "API", b: "high" },
                            { d: "sso.pnbindia.in", t: "API", b: "medium" },
                            { d: "cdn.pnbindia.in", t: "Web Server", b: "quantum-safe" },
                        ].map((r, i) => (
                            <tr key={i}>
                                <td style={{ width: 40 }}><input type="checkbox" /></td>
                                <td style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{r.d}</td>
                                <td><Shimmer h={18} w={100} /></td>
                                <td><Shimmer h={18} w={60} /></td>
                                <td>
                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: '#374151', background: '#F3F4F6', border: '1px solid #E5E7EB', padding: '2px 8px', borderRadius: 999 }}>{r.t}</span>
                                </td>
                                <td><Shimmer h={18} w={70} /></td>
                                <td><Badge type={r.b} /></td>
                                <td><Shimmer h={18} w={110} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF' }}>Showing 8 of 247 assets</div>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['<', '1', '2', '3', '...', '31', '>'].map((p, i) => (
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
    </div>
);


const TLSAnalyzerPage = () => (
    <div>
        <PageHeader
            title="TLS Analyzer"
            subtitle="Deep cryptographic inspection of TLS configuration, certificates, and cipher suites"
            actions={<><button className="btn-ghost">← Asset Discovery</button><button className="btn-primary">↻ Re-scan</button></>}
        />

        <div className="card" style={{ marginBottom: 20, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Analyzing:</span>
            <select style={{ minWidth: 260 }}>
                <option>api.pnbindia.in — 103.45.12.67 : 443</option>
            </select>
            <span style={{ color: '#E5E7EB' }}>|</span>
            <Badge type="critical" />
            <span style={{ color: '#E5E7EB' }}>|</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF' }}>Last scanned 2 hours ago</span>

            <div style={{ marginLeft: 'auto', background: '#FFFBEB', border: '1px solid #FDE68A', color: '#D97706', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999 }}>
                TLS 1.2
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            {/* Left */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <SectionTitle>TLS Certificate Details</SectionTitle>
                    <Badge type="critical" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    {[
                        { l: "Subject CN:", v: "api.pnbindia.in" },
                        { l: "Issuer:", v: "DigiCert Inc" },
                        { l: "Valid From:", v: "15 Mar 2024" },
                        { l: "Valid Until:", v: <><span style={{ color: '#DC2626' }}>15 Mar 2025</span>  <Badge type="critical">Expired</Badge></> },
                        { l: "Sig Algorithm:", v: <><span style={{ color: '#F59E0B' }}>⚠</span> RSA-PKCS1-SHA256</> },
                        { l: "Key Type/Size:", v: <><span style={{ color: '#DC2626' }}>✗</span> RSA / 2048-bit</> },
                        { l: "Key Usage:", v: "Digital Signature, Key Encipherment", colSpan: 2 },
                        { l: "Serial:", v: <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4F46E5' }}>3A:F2:11:9C...</span>, colSpan: 2 }
                    ].map((r, i) => (
                        <div key={i} style={{ gridColumn: r.colSpan ? `span ${r.colSpan}` : 'span 1' }}>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{r.l}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: '#111827' }}>{r.v}</div>
                        </div>
                    ))}
                </div>

                <div style={{ margin: '16px -20px 0', borderTop: '1px solid #F3F4F6', paddingTop: 16, paddingLeft: 20, paddingRight: 20 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 10 }}>Certificate Chain</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        {['Root CA', 'DigiCert Intermediate', 'api.pnbindia.in'].map((c, i) => (
                            <React.Fragment key={i}>
                                <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '8px 12px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: '#374151' }}>{c}</div>
                                {i < 2 && <span style={{ color: '#9CA3AF', fontFamily: "'Inter', sans-serif", fontSize: 14 }}>→</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="card" style={{ padding: 0 }}>
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <SectionTitle>Cipher Suite Analysis</SectionTitle>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB', padding: '2px 10px', borderRadius: 999 }}>12 suites detected</span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>CIPHER SUITE</th>
                                <th>KEY EXCHANGE</th>
                                <th>AUTH</th>
                                <th>QUANTUM STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { c: "TLS_ECDHE_RSA_AES_256_GCM_SHA384", k: "ECDHE", a: "RSA", st: "medium" },
                                { c: "TLS_ECDHE_RSA_AES_128_GCM_SHA256", k: "ECDHE", a: "RSA", st: "medium" },
                                { c: "TLS_RSA_AES_256_CBC_SHA256", k: "RSA", a: "RSA", st: "critical" },
                                { c: "TLS_RSA_AES_128_CBC_SHA", k: "RSA", a: "RSA", st: "critical" },
                                { c: "TLS_ECDHE_RSA_CHACHA20_POLY1305", k: "ECDHE", a: "RSA", st: "medium" },
                                { c: "TLS_DHE_RSA_AES_256_GCM_SHA384", k: "DHE", a: "RSA", st: "high" }
                            ].map((r, i) => (
                                <tr key={i}>
                                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#374151' }}>{r.c}</td>
                                    <td>{r.k}</td>
                                    <td>{r.a}</td>
                                    <td><Badge type={r.st} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Left */}
            <div className="card">
                <div style={{ marginBottom: 16 }}><SectionTitle>TLS Handshake Details</SectionTitle></div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                        { l: "TLS Version:", v: <span style={{ color: '#F59E0B' }}>1.2</span>, sub: "Upgrade to 1.3 recommended" },
                        { l: "Key Exchange:", v: <span style={{ color: '#DC2626' }}>ECDH-RSA</span>, sub: "Quantum Vulnerable" },
                        { l: "Session Resumption:", v: <span style={{ color: '#10B981' }}>Enabled</span> },
                        { l: "HSTS Enabled:", v: <span style={{ color: '#10B981' }}>Yes</span> },
                        { l: "OCSP Stapling:", v: <span style={{ color: '#F59E0B' }}>Disabled</span> },
                        { l: "Cert Transparency:", v: <span style={{ color: '#10B981' }}>Yes</span> },
                        { l: "Forward Secrecy:", v: <span style={{ color: '#F59E0B' }}>Partial</span> }
                    ].map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F9FAFB' }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF' }}>{r.l}</span>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'center', gap: 6 }}>
                                {r.v}
                                {r.sub && <span style={{ fontWeight: 400, color: '#6B7280' }}>· {r.sub}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <SectionTitle>Post-Quantum Cryptography Status</SectionTitle>
                    <Badge type="critical">No PQC Detected</Badge>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                        { n: "ML-KEM-768 (Kyber)", u: "Key Encapsulation", s: "Not Detected", ok: false },
                        { n: "ML-DSA-65 (Dilithium)", u: "Digital Signatures", s: "Not Detected", ok: false },
                        { n: "SLH-DSA (SPHINCS+)", u: "Hash-based Sigs", s: "Not Detected", ok: false },
                        { n: "Hybrid Key Exchange", u: "Classical + PQC", s: "Not Detected", ok: false },
                        { n: "X25519Kyber768", u: "ECDH + Kyber", s: "Not Detected", ok: false },
                        { n: "TLS 1.3", u: "Protocol Version", s: "Using TLS 1.2", ok: false, warn: true }
                    ].map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F9FAFB' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 28, height: 28, borderRadius: 14, background: r.ok ? '#ECFDF5' : (r.warn ? '#FFFBEB' : '#FEF2F2'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {r.ok ? <CheckCircle size={16} color="#10B981" /> : <XCircle size={16} color={r.warn ? "#F59E0B" : "#DC2626"} />}
                                </div>
                                <div>
                                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{r.n}</div>
                                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>{r.u}</div>
                                </div>
                            </div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: r.ok ? '#10B981' : (r.warn ? "#F59E0B" : "#DC2626") }}>{r.s}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);


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


const RiskPage = () => (
    <div>
        <PageHeader
            title="Quantum Risk Assessment"
            subtitle="Organization-wide quantum vulnerability scoring and HNDL exposure analysis"
            actions={<><button className="btn-ghost">Configure Parameters</button><button className="btn-primary">↓ Risk Report</button></>}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
                <div>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 64, fontWeight: 800, color: '#EF4444' }}>67.4</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, color: '#9CA3AF' }}>/100</span>
                </div>
                <div style={{ marginTop: 10 }}><Badge type="high" /></div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF', marginTop: 12, maxWidth: 200, textAlign: 'center' }}>
                    147 of 247 assets have quantum-vulnerable configurations
                </div>
            </div>

            <div className="card">
                <SectionTitle>By Category</SectionTitle>
                <div style={{ marginBottom: 12 }}><Shimmer h={140} label="Stacked Bar — Risk by Asset Type" /></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                        { l: "Critical", c: "#EF4444", v: "36 assets" },
                        { l: "High", c: "#F97316", v: "72 assets" },
                        { l: "Medium", c: "#F59E0B", v: "39 assets" },
                        { l: "Safe", c: "#10B981", v: "99 assets" }
                    ].map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151' }}>
                                <span style={{ width: 8, height: 8, borderRadius: 4, background: r.c }} /> {r.l}
                            </div>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600 }}>{r.v}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card">
                <SectionTitle>6-Month Trend</SectionTitle>
                <div style={{ marginBottom: 12 }}><Shimmer h={140} label="Line Chart — Risk Score Trend" /></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TrendingDown size={16} color="#10B981" />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#10B981' }}>↓ 4.2 improvement from last month</span>
                </div>
            </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
            <SectionTitle>Harvest Now, Decrypt Later — Exposure Calculator</SectionTitle>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
                Estimate total sensitive data at risk based on estimated CRQC emergence timeline
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF', marginBottom: 2 }}>Encrypted data on record since</div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#111827' }}>2017 <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400, color: '#6B7280' }}>(7 years exposed)</span></div>
                    </div>
                    <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF', marginBottom: 8 }}>Estimated CRQC emergence</div>
                        <Shimmer h={36} label="Year slider 2028–2035" />
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: '#F59E0B', marginTop: 8 }}>2031</div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                        { l: "DATA VOLUME AT RISK", v: "~4.7 TB", c: "#EF4444" },
                        { l: "SENSITIVE RECORDS", v: "2.3M", c: "#F97316" },
                        { l: "YEARS OF INTERCEPTION", v: "7 years", c: "#F59E0B" }
                    ].map((k, i) => (
                        <div key={i} style={{ background: '#F9FAFB', padding: 14, borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: '#9CA3AF' }}>{k.l}</div>
                            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800, color: k.c }}>{k.v}</div>
                        </div>
                    ))}
                </div>

                <div>
                    <Shimmer h={160} label="HNDL Timeline 2017 → 2031" />
                </div>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="card">
                <div style={{ marginBottom: 14 }}><SectionTitle>Risk Matrix</SectionTitle></div>
                <Shimmer h={280} label="2×2 Likelihood vs Impact Scatter" />
            </div>
            <div className="card">
                <SectionTitle>Top Critical Assets</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                        { r: "1", d: "vpn.pnbindia.in", bg: "#EF4444", w: "100%", b: "critical" },
                        { r: "2", d: "api.pnbindia.in", bg: "#EF4444", w: "90%", b: "critical" },
                        { r: "3", d: "payments.pnbindia.in", bg: "#EF4444", w: "85%", b: "critical" },
                        { r: "4", d: "trade.pnbindia.in", bg: "#F97316", w: "70%", b: "high" },
                        { r: "5", d: "netbanking.pnbindia.in", bg: "#F97316", w: "65%", b: "high" }
                    ].map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #F9FAFB' }}>
                            <div style={{ width: 28, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800, color: '#E5E7EB' }}>{a.r}</div>
                            <div style={{ flex: 1, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{a.d}</div>
                            <div style={{ width: 80, height: 6, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: a.w, background: a.bg }} />
                            </div>
                            <Badge type={a.b} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// ─── Remediation data: 8 seed + 139 generated = 147 items ───
const REMEDIATION_SEED = [
  { id: 'REM-001', priority: 1, domain: 'vpn.pnbindia.in', type: 'VPN', status: 'critical', vulnerability: 'RSA Key Exchange', vulnDetail: "RSA key exchange is completely vulnerable to Shor's Algorithm on cryptographically relevant quantum computers.", complexity: 'Easy', taskStatus: 'pending', estTime: '2–4 hours', skillLevel: 'SysAdmin', assignee: null, configPatch: `# nginx.conf — Add PQC key exchange\nssl_ecdh_curve X25519Kyber768:prime256v1;\nssl_protocols TLSv1.3;\nssl_prefer_server_ciphers off;\nssl_ciphers TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256;`, steps: ['Update OpenSSL to version 3.x with OQS provider', 'Configure ssl_ecdh_curve to X25519Kyber768:prime256v1', 'Set ssl_protocols to TLSv1.3 only', 'Disable ssl_prefer_server_ciphers', 'Test with openssl s_client -connect vpn.pnbindia.in:4500', 'Verify ML-KEM-768 handshake in scan results'], impact: 'Eliminates primary quantum attack vector', nistrefs: ['FIPS 203', 'SP 800-208'] },
  { id: 'REM-002', priority: 2, domain: 'api.pnbindia.in', type: 'API', status: 'critical', vulnerability: 'TLS 1.2 Active', vulnDetail: 'TLS 1.2 supports cipher suites vulnerable to quantum attacks. TLS 1.3 is required for quantum transition readiness.', complexity: 'Medium', taskStatus: 'in-progress', estTime: '4–8 hours', skillLevel: 'SysAdmin', assignee: 'Raj Kumar', configPatch: `# nginx.conf — Force TLS 1.3\nssl_protocols TLSv1.3;\nssl_session_cache shared:SSL:10m;\nssl_session_timeout 1d;\n# Add HSTS\nadd_header Strict-Transport-Security \n  "max-age=31536000; includeSubDomains" always;`, steps: ['Verify OpenSSL version supports TLS 1.3', 'Remove TLSv1.2 from ssl_protocols directive', 'Update ssl_ciphers for TLS 1.3 only', 'Restart nginx: sudo systemctl restart nginx', 'Verify with: openssl s_client -tls1_3 -connect api.pnbindia.in:443', 'Monitor for client compatibility issues for 48 hours'], impact: 'Forces modern protocol with better cipher negotiation', nistrefs: ['NIST SP 800-52 Rev 2'] },
  { id: 'REM-003', priority: 3, domain: 'payments.pnbindia.in', type: 'API', status: 'critical', vulnerability: 'RSA-2048 Cert', vulnDetail: "RSA-2048 certificate signature is broken by Shor's Algorithm. Must migrate to ML-DSA or SLH-DSA.", complexity: 'Easy', taskStatus: 'pending', estTime: '2–4 hours', skillLevel: 'Security Eng.', assignee: null, configPatch: `# Generate ML-DSA-65 certificate\nopenssl genpkey -algorithm mldsa65 \\\n  -out payments_mldsa65.key\nopenssl req -new -key payments_mldsa65.key \\\n  -out payments_mldsa65.csr \\\n  -subj "/CN=payments.pnbindia.in"\n# Submit CSR to PQC-capable CA`, steps: ['Generate ML-DSA-65 private key using OQS OpenSSL', 'Create CSR with correct SAN entries', 'Submit to PNB internal PQC CA or PQC-capable public CA', 'Install signed certificate in nginx/apache', 'Update certificate monitoring for new format', 'Verify with QuantumShield TLS Analyzer'], impact: 'Eliminates certificate signature vulnerability', nistrefs: ['FIPS 204'] },
  { id: 'REM-004', priority: 4, domain: 'netbanking.pnbindia.in', type: 'Web Server', status: 'critical', vulnerability: 'Weak Cipher Suite', vulnDetail: 'Server supports TLS_RSA_AES_256_CBC_SHA256 which uses RSA key exchange with no forward secrecy.', complexity: 'Medium', taskStatus: 'pending', estTime: '3–6 hours', skillLevel: 'SysAdmin', assignee: null, configPatch: `# Remove weak cipher suites\nssl_ciphers 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE+AESGCM';\nssl_prefer_server_ciphers on;\n# Disable CBC mode ciphers\nssl_ciphers '!CBC:!RC4:!NULL:!aNULL:!eNULL';`, steps: ['Audit current cipher suite list with testssl.sh', 'Remove all CBC mode ciphers', 'Remove all RSA key exchange ciphers', 'Keep only ECDHE + AEAD cipher suites', 'Test for client compatibility', 'Re-scan with QuantumShield to verify'], impact: 'Removes weak cipher fallback vectors', nistrefs: ['NIST SP 800-52 Rev 2'] },
  { id: 'REM-005', priority: 5, domain: 'sso.pnbindia.in', type: 'API', status: 'critical', vulnerability: 'No PFS', vulnDetail: 'Server lacks Perfect Forward Secrecy. All past sessions can be decrypted if private key is compromised.', complexity: 'Easy', taskStatus: 'pending', estTime: '1–2 hours', skillLevel: 'SysAdmin', assignee: null, configPatch: `# Enable Perfect Forward Secrecy\nssl_ciphers 'ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256';\nssl_ecdh_curve secp384r1;\nssl_prefer_server_ciphers on;\n# Disable session tickets (breaks PFS)\nssl_session_tickets off;`, steps: ['Disable ssl_session_tickets', 'Update ssl_ciphers to ECDHE-only suites', 'Set ssl_ecdh_curve to secp384r1 minimum', 'Test PFS with ssllabs.com or testssl.sh', 'Verify —PFS flag in scan output'], impact: 'Protects all future sessions from compromise', nistrefs: ['NIST SP 800-52 Rev 2'] },
  { id: 'REM-006', priority: 6, domain: 'mobile.pnbindia.in', type: 'Web Server', status: 'high', vulnerability: 'ECDH Key Exchange', vulnDetail: "Elliptic curve Diffie-Hellman is broken by Shor's Algorithm on quantum computers.", complexity: 'Hard', taskStatus: 'pending', estTime: '8–16 hours', skillLevel: 'Security Eng.', assignee: null, configPatch: `# Replace ECDH with ML-KEM hybrid\nssl_ecdh_curve X25519Kyber768:prime256v1;\nssl_protocols TLSv1.3;\n# Requires OpenSSL 3.x + OQS provider\n# Download: github.com/open-quantum-safe/oqs-provider`, steps: ['Install OpenSSL 3.x with OQS provider', 'Build nginx with updated OpenSSL', 'Configure X25519Kyber768 as preferred curve', 'Test hybrid handshake with Chrome/Firefox nightly', 'Monitor mobile app compatibility', 'Roll out gradually (10% → 50% → 100%)', 'Full validation with QuantumShield scanner'], impact: 'Replaces quantum-vulnerable key exchange', nistrefs: ['FIPS 203', 'IETF Draft hybrid-kem'] },
  { id: 'REM-007', priority: 7, domain: 'trade.pnbindia.in', type: 'Web Server', status: 'high', vulnerability: 'TLS 1.1 Detected', vulnDetail: 'TLS 1.1 is deprecated by RFC 8996. Contains known vulnerabilities including BEAST and POODLE.', complexity: 'Easy', taskStatus: 'fixed', estTime: '30 min', skillLevel: 'SysAdmin', assignee: 'Priya Sharma', configPatch: `# Already applied:\nssl_protocols TLSv1.2 TLSv1.3;\n# TLS 1.0 and 1.1 disabled`, steps: ['Remove TLSv1.1 from ssl_protocols ✓', 'Restart web server ✓', 'Verify with scanner ✓'], impact: 'TLS 1.1 successfully disabled', nistrefs: ['RFC 8996'] },
  { id: 'REM-008', priority: 8, domain: 'forex.pnbindia.in', type: 'Web Server', status: 'medium', vulnerability: 'AES-128 Usage', vulnDetail: "AES-128 provides only 64-bit effective security against Grover's Algorithm on quantum computers.", complexity: 'Medium', taskStatus: 'pending', estTime: '2–4 hours', skillLevel: 'SysAdmin', assignee: null, configPatch: `# Upgrade to AES-256\nssl_ciphers 'TLS_AES_256_GCM_SHA384:ECDHE-RSA-AES256-GCM-SHA384';\n# Remove AES-128 entries from cipher list`, steps: ['Update cipher list to prefer AES-256', 'Remove AES-128 cipher suites', 'Test with openssl ciphers command', 'Verify no AES-128 in scan results'], impact: "Doubles effective key strength against Grover's", nistrefs: ['NIST SP 800-131A Rev 2'] },
];

const VULN_POOL = ['RSA Key Exchange', 'ECDH Key Exchange', 'TLS 1.2 Active', 'RSA-2048 Cert', 'Weak Cipher Suite', 'No PFS', 'AES-128 Usage', 'TLS 1.1 Detected', 'OCSP Disabled', 'No HSTS', 'DHE Key Exchange', 'SHA-1 Signature', 'Certificate Expiring', 'No Cert Transparency'];
const DOMAIN_PREFIXES = ['branch', 'region', 'gateway', 'app', 'cdn', 'static', 'auth', 'mail', 'db', 'backup', 'dev', 'staging', 'uat', 'corp', 'intranet'];
const TYPES = ['VPN', 'API', 'Web Server'];

function buildRemediationItem(idx, overrides = {}) {
  const statusOrder = ['critical', 'high', 'medium'];
  const status = statusOrder[Math.floor(idx / 41) % 3];
  const vuln = VULN_POOL[idx % VULN_POOL.length];
  const complexityOrder = ['Easy', 'Easy', 'Medium', 'Medium', 'Hard'];
  const complexity = complexityOrder[idx % 5];
  const prefix = DOMAIN_PREFIXES[idx % DOMAIN_PREFIXES.length];
  const domain = `${prefix}${Math.floor(idx / DOMAIN_PREFIXES.length) + 1}.pnbindia.in`;
  return {
    id: `REM-${String(idx + 1).padStart(3, '0')}`,
    priority: idx + 1,
    domain,
    type: TYPES[idx % 3],
    status,
    vulnerability: vuln,
    vulnDetail: `${vuln} requires remediation for quantum-safe posture. Apply PQC or TLS 1.3 best practices.`,
    complexity,
    taskStatus: overrides.taskStatus || 'pending',
    estTime: complexity === 'Hard' ? '8–16 hours' : complexity === 'Medium' ? '3–6 hours' : '2–4 hours',
    skillLevel: complexity === 'Hard' ? 'Security Eng.' : 'SysAdmin',
    assignee: overrides.assignee ?? null,
    configPatch: `# Remediation for ${domain}\n# Address: ${vuln}\nssl_protocols TLSv1.3;\nssl_ciphers TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256;`,
    steps: ['Audit current configuration', 'Apply PQC or TLS 1.3 changes', 'Restart services', 'Verify with scanner', 'Update documentation'],
    impact: 'Improves quantum readiness',
    nistrefs: ['FIPS 203', 'NIST SP 800-52 Rev 2'],
    ...overrides,
  };
}

const _genFixed = new Set([8, 11, 14, 17, 19, 21, 27, 28, 31, 35, 38, 42, 46, 49, 50, 54, 56, 63, 65, 70, 74, 77, 83, 84, 91, 95, 98, 104, 105, 112, 115, 119, 125, 126, 133, 136, 140, 145]);
const _genInProgress = new Set([9, 20, 30, 41, 51, 61, 72, 82, 93, 103, 111, 124, 135]);
function getAllRemediationItems() {
  const out = [...REMEDIATION_SEED];
  for (let i = 8; i < 147; i++) {
    let taskStatus = 'pending';
    if (_genFixed.has(i)) taskStatus = 'fixed';
    else if (_genInProgress.has(i)) taskStatus = 'in-progress';
    out.push(buildRemediationItem(i, { taskStatus }));
  }
  return out;
}

const ALL_REMEDIATION_ITEMS = getAllRemediationItems();

const PQC_ALGORITHMS = [
  { id: 1, name: 'ML-KEM-768 (Kyber)', purpose: 'Key Encapsulation', fips: 'FIPS 203', icon: 'Lock', iconBg: '#EEF2FF', iconColor: '#4F46E5', description: 'NIST-standardized key encapsulation mechanism. Replaces RSA and ECDH for key exchange.', replaces: 'RSA, ECDH, DHE', securityLevel: 'NIST Level 3', keySize: '1184 bytes (public)', standardDate: 'Aug 2024', useCase: 'TLS key exchange, VPN tunnels' },
  { id: 2, name: 'ML-DSA-65 (Dilithium)', purpose: 'Digital Signatures', fips: 'FIPS 204', icon: 'PenLine', iconBg: '#F5F3FF', iconColor: '#7C3AED', description: 'NIST-standardized digital signature algorithm. Replaces RSA and ECDSA for certificate signing.', replaces: 'RSA-PKCS1, ECDSA', securityLevel: 'NIST Level 3', keySize: '1952 bytes (public)', standardDate: 'Aug 2024', useCase: 'Certificate signing, authentication' },
  { id: 3, name: 'SLH-DSA (SPHINCS+)', purpose: 'Stateless Signatures', fips: 'FIPS 205', icon: 'ShieldCheck', iconBg: '#ECFDF5', iconColor: '#059669', description: 'Hash-based stateless signature scheme. Conservative choice based on well-understood security.', replaces: 'RSA (signing), ECDSA', securityLevel: 'NIST Level 3', keySize: '32 bytes (public)', standardDate: 'Aug 2024', useCase: 'Code signing, long-term certificates' },
];

const PROGRESS_TOTAL = 247;
const TEAM_MEMBERS = [
  { value: '', label: '— Select team member —' },
  { value: 'raj', label: 'Raj Kumar — Senior Security Engineer' },
  { value: 'priya', label: 'Priya Sharma — Systems Administrator' },
  { value: 'amit', label: 'Amit Patel — Security Analyst' },
  { value: 'deepa', label: 'Deepa Singh — Infrastructure Engineer' },
  { value: 'vikram', label: 'Vikram Nair — DevSecOps Engineer' },
];

const RemediationPage = ({ nav }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(ALL_REMEDIATION_ITEMS[0]);
  const [taskStatuses, setTaskStatuses] = useState(() => {
    const map = {};
    ALL_REMEDIATION_ITEMS.forEach(item => { map[item.id] = item.taskStatus; });
    return map;
  });
  const [assignees, setAssignees] = useState(() => {
    const map = {};
    ALL_REMEDIATION_ITEMS.forEach(item => { if (item.assignee) map[item.id] = item.assignee; });
    return map;
  });
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignTarget, setAssignTarget] = useState(null);
  const [assignForm, setAssignForm] = useState({ task: '', member: '', priority: 'Critical', dueDate: '', notes: '', email: true });
  const [copiedCode, setCopiedCode] = useState(false);
  const [progressAnimated, setProgressAnimated] = useState(false);
  const [expandedStep, setExpandedStep] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('priority');
  const [showCompleted, setShowCompleted] = useState(true);
  const [toast, setToast] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [justFixedId, setJustFixedId] = useState(null);

  const filteredItems = useMemo(() => {
    let items = ALL_REMEDIATION_ITEMS;
    if (activeFilter !== 'all') items = items.filter(i => i.status === activeFilter);
    if (!showCompleted) items = items.filter(i => taskStatuses[i.id] !== 'fixed');
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      items = items.filter(i => i.domain.includes(q) || i.vulnerability.toLowerCase().includes(q));
    }
    return items.sort((a, b) => {
      if (sortBy === 'priority') return a.priority - b.priority;
      const order = { Easy: 0, Medium: 1, Hard: 2 };
      return (order[a.complexity] ?? 0) - (order[b.complexity] ?? 0);
    });
  }, [activeFilter, taskStatuses, showCompleted, searchText, sortBy]);

  const counts = useMemo(() => ({
    all: ALL_REMEDIATION_ITEMS.length,
    critical: ALL_REMEDIATION_ITEMS.filter(i => i.status === 'critical').length,
    high: ALL_REMEDIATION_ITEMS.filter(i => i.status === 'high').length,
    medium: ALL_REMEDIATION_ITEMS.filter(i => i.status === 'medium').length,
  }), []);

  useEffect(() => { const t = setTimeout(() => setProgressAnimated(true), 300); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (filteredItems.length > 0 && !filteredItems.find(i => i.id === selectedItem?.id)) setSelectedItem(filteredItems[0]);
  }, [activeFilter, filteredItems]);
  useEffect(() => {
    if (assignModalOpen && !assignForm.dueDate) {
      const d = new Date(); d.setDate(d.getDate() + 14);
      setAssignForm(f => ({ ...f, dueDate: d.toISOString().slice(0, 10) }));
    }
  }, [assignModalOpen]);

  const liveFixed = useMemo(() => Object.values(taskStatuses).filter(s => s === 'fixed').length, [taskStatuses]);
  const liveInProgress = useMemo(() => Object.values(taskStatuses).filter(s => s === 'in-progress').length, [taskStatuses]);
  const livePending = useMemo(() => Object.values(taskStatuses).filter(s => s === 'pending').length, [taskStatuses]);
  const livePercentage = ((liveFixed / PROGRESS_TOTAL) * 100).toFixed(1);
  const milestones = [
    { label: '25% Quick Wins', pct: 25 },
    { label: '50% Core Systems', pct: 50 },
    { label: '75% Deep Infra', pct: 75 },
    { label: '100% Fully Safe', pct: 100 },
  ];

  const updateTaskStatus = useCallback((id, newStatus) => {
    setTaskStatuses(prev => ({ ...prev, [id]: newStatus }));
    if (newStatus === 'fixed') {
      setJustFixedId(id);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 600);
      const item = ALL_REMEDIATION_ITEMS.find(i => i.id === id);
      setToast({ type: 'fixed', message: `${item?.domain ?? id} marked as fixed`, id: Date.now() });
      setTimeout(() => setToast(null), 3000);
      const next = filteredItems.find(i => i.id !== id && taskStatuses[i.id] !== 'fixed');
      if (next) setTimeout(() => setSelectedItem(next), 400);
    }
  }, [filteredItems, taskStatuses]);

  const handleExportPlan = useCallback(() => {
    const headers = 'Priority,Domain,Type,Vulnerability,Complexity,Status,Est Time,Skill Level,Assignee,NIST Refs';
    const rows = ALL_REMEDIATION_ITEMS.map(i => {
      const status = taskStatuses[i.id] ?? i.taskStatus;
      return [i.priority, i.domain, i.type, i.vulnerability, i.complexity, status, i.estTime, i.skillLevel, assignees[i.id] ?? i.assignee ?? '', (i.nistrefs || []).join('; ')].map(c => `"${String(c).replace(/"/g, '""')}"`).join(',');
    });
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'pnb-remediation-plan.csv';
    a.click();
    URL.revokeObjectURL(a.href);
    setToast({ type: 'export', message: `Plan exported — ${ALL_REMEDIATION_ITEMS.length} items`, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, [taskStatuses, assignees]);

  const handleAssign = useCallback(() => {
    const target = assignTarget || (assignForm.task ? ALL_REMEDIATION_ITEMS.find(i => i.id === assignForm.task) : null);
    const memberLabel = TEAM_MEMBERS.find(m => m.value === assignForm.member)?.label;
    const name = memberLabel && memberLabel !== TEAM_MEMBERS[0].label ? memberLabel.split(' — ')[0] : null;
    if (target && name) {
      setAssignees(prev => ({ ...prev, [target.id]: name }));
      setAssignModalOpen(false);
      setAssignTarget(null);
      setAssignForm({ task: '', member: '', priority: 'Critical', dueDate: '', notes: '', email: true });
      setToast({ type: 'assign', message: 'Task assigned', id: Date.now() });
      setTimeout(() => setToast(null), 3000);
    } else if (!target && assignForm.member && memberLabel && memberLabel !== TEAM_MEMBERS[0].label) {
      const firstPending = ALL_REMEDIATION_ITEMS.find(i => taskStatuses[i.id] === 'pending');
      if (firstPending) {
        const name = memberLabel.split(' — ')[0];
        setAssignees(prev => ({ ...prev, [firstPending.id]: name }));
        setAssignModalOpen(false);
        setAssignForm({ task: '', member: '', priority: 'Critical', dueDate: '', notes: '', email: true });
        setToast({ type: 'assign', message: 'Task assigned', id: Date.now() });
        setTimeout(() => setToast(null), 3000);
      }
    }
  }, [assignTarget, assignForm, taskStatuses]);

  const displayItems = filteredItems.slice(0, 50);
  const selectedStatus = selectedItem ? (taskStatuses[selectedItem.id] ?? selectedItem.taskStatus) : null;
  const selectedAssignee = selectedItem ? (assignees[selectedItem.id] ?? selectedItem.assignee) : null;

  return (
    <div>
      <PageHeader
        title="Remediation Center"
        subtitle="Prioritized action plan to achieve quantum-safe cryptographic posture across all assets"
        actions={
          <>
            <button className="btn-ghost" onClick={() => { setAssignTarget(null); setAssignModalOpen(true); }}>Assign Tasks</button>
            <button className="btn-primary" onClick={handleExportPlan}>Export Plan</button>
          </>
        }
      />

      {/* Progress card */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 12, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Overall Remediation Progress</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF', marginTop: 3 }}>{liveFixed} of {PROGRESS_TOTAL} assets remediated · In progress: {liveInProgress} · Pending: {livePending}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF' }}>{liveFixed} of {PROGRESS_TOTAL} assets</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: '#4F46E5' }}>{livePercentage}%</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>Complete</div>
          </div>
        </div>
        <div style={{ height: 10, background: '#F3F4F6', borderRadius: 5, overflow: 'visible', position: 'relative' }}>
          <div style={{
            height: '100%', borderRadius: 5, background: 'linear-gradient(90deg, #4F46E5, #06B6D4)', boxShadow: '0 0 8px rgba(79,70,229,0.4)',
            width: progressAnimated ? `${livePercentage}%` : '0%', transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative',
          }}>
            <div style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 8, height: 8, borderRadius: '50%', background: '#4F46E5', boxShadow: '0 0 0 3px rgba(79,70,229,0.25)' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, position: 'relative' }}>
          {milestones.map((m, i) => (
            <span key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: Number(livePercentage) >= m.pct ? 600 : 500, color: Number(livePercentage) >= m.pct ? '#4F46E5' : '#9CA3AF' }}>{m.label}</span>
          ))}
        </div>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F3F4F6', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', textAlign: 'center' }}>
          {[
            { label: 'FIXED', value: liveFixed, color: '#10B981' },
            { label: 'IN PROGRESS', value: liveInProgress, color: '#4F46E5' },
            { label: 'PENDING', value: livePending, color: '#9CA3AF' },
            { label: 'EST. COMPLETION', value: 'Q3 2026', color: '#111827' },
            { label: 'TIME SAVED', value: '142 hr', color: '#8B5CF6' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, textTransform: 'uppercase', color: '#9CA3AF', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main: Queue | Fix guide */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.85fr', gap: 20, marginBottom: 20 }}>
        {/* Left: Queue */}
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {['all', 'critical', 'high', 'medium'].map(f => (
                  <button key={f} onClick={() => setActiveFilter(f)} style={{
                    padding: '7px 14px', borderRadius: 8, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: activeFilter === f ? 600 : 500, cursor: 'pointer', transition: 'background 0.12s',
                    background: activeFilter === f ? '#4F46E5' : 'transparent', color: activeFilter === f ? 'white' : '#6B7280', border: 'none',
                  }}>{f === 'all' ? `All (${counts.all})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f]})`}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ position: 'relative', width: 180 }}>
                  <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input type="text" placeholder="Search..." value={searchText} onChange={e => setSearchText(e.target.value)} style={{ width: '100%', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 6, padding: '6px 12px 6px 28px', fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151' }} />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#6B7280', cursor: 'pointer' }}>
                  <input type="checkbox" checked={!showCompleted} onChange={() => setShowCompleted(!showCompleted)} /> Hide fixed
                </label>
              </div>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                  <th style={{ padding: '10px 20px', fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', width: 90, textAlign: 'left' }}>PRIORITY</th>
                  <th style={{ padding: '10px 20px', fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'left' }}>ASSET</th>
                  <th style={{ padding: '10px 20px', fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', width: 160, textAlign: 'left' }}>VULNERABILITY</th>
                  <th style={{ padding: '10px 20px', fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', width: 100, textAlign: 'left' }}>COMPLEXITY</th>
                  <th style={{ padding: '10px 20px', fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', width: 110, textAlign: 'left' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.map(item => {
                  const status = taskStatuses[item.id] ?? item.taskStatus;
                  const dotColor = status === 'fixed' ? '#10B981' : item.status === 'critical' ? '#EF4444' : item.status === 'high' ? '#F97316' : '#F59E0B';
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <tr key={item.id} onClick={() => setSelectedItem(item)} style={{
                      cursor: 'pointer', borderBottom: '1px solid #F9FAFB', transition: 'background 0.1s', background: isSelected ? '#EEF2FF' : 'white',
                      borderLeft: isSelected ? '3px solid #4F46E5' : '3px solid transparent', opacity: status === 'fixed' ? 0.6 : 1,
                    }}>
                      <td style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: dotColor }}>{item.priority}</span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{item.domain}</div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 999, padding: '2px 8px', color: '#6B7280' }}>{item.type}</span>
                      </td>
                      <td style={{ padding: '14px 16px', fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: '#374151' }}>{item.vulnerability}</td>
                      <td style={{ padding: '14px 16px', fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: item.complexity === 'Easy' ? '#10B981' : item.complexity === 'Medium' ? '#F59E0B' : '#EF4444' }}>{item.complexity}</td>
                      <td style={{ padding: '14px 20px' }} onClick={e => status === 'fixed' && e.stopPropagation()}>
                        <Badge type={status}>{status === 'fixed' ? 'Fixed ✓' : status === 'in-progress' ? 'In Progress' : 'Pending'}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>Showing {displayItems.length} of {activeFilter === 'all' ? counts.all : counts[activeFilter]} items</span>
            {activeFilter !== 'all' && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#4F46E5', cursor: 'pointer' }} onClick={() => setActiveFilter('all')}>Clear filter</span>}
          </div>
        </div>

        {/* Right: Fix guide */}
        {selectedItem && (
          <div key={selectedItem.id} className="page-animate" style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: '#111827' }}>{selectedItem.domain}</span>
                <Badge type={selectedItem.status} />
              </div>
              <ExternalLink size={16} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => nav && nav('tls-analyzer')} title="View in TLS Analyzer" />
            </div>
            <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>VULNERABILITY</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#374151', lineHeight: 1.7 }}>{selectedItem.vulnDetail}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>REMEDIATION STEPS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {(selectedItem.steps || []).map((step, i) => {
                    const isFixed = selectedStatus === 'fixed';
                    const isExp = expandedStep === i;
                    return (
                      <div key={i} onClick={() => setExpandedStep(isExp ? null : i)} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 4px', borderBottom: '1px solid #F9FAFB', cursor: 'pointer', transition: 'background 0.1s', borderRadius: 6, background: isExp ? '#FAFAFA' : 'transparent' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#EEF2FF', border: '1px solid #C7D2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: '#4F46E5', flexShrink: 0 }}>{i + 1}</div>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: isFixed ? '#9CA3AF' : '#374151', lineHeight: 1.5, textDecoration: isFixed ? 'line-through' : 'none' }}>{step}</span>
                          {isFixed && <CheckCircle size={12} color="#10B981" style={{ marginLeft: 6, verticalAlign: 'middle' }} />}
                          {isExp && <div style={{ background: '#F8F9FC', borderRadius: 6, padding: '8px 12px', fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#6B7280', marginTop: 4 }}>Technical note: verify configuration and re-scan after applying.</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>CONFIGURATION PATCH</div>
                <div style={{ background: '#F8F9FC', border: '1px solid #E5E7EB', borderRadius: 8, padding: '14px 16px', position: 'relative', overflowX: 'auto' }}>
                  <pre style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{selectedItem.configPatch}</pre>
                  <button onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(selectedItem.configPatch); setCopiedCode(true); setTimeout(() => setCopiedCode(false), 2000); }} style={{ position: 'absolute', top: 8, right: 8, width: 32, height: 28, background: 'white', border: '1px solid #E5E7EB', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title={copiedCode ? 'Copied!' : 'Copy'}>
                    {copiedCode ? <Check size={13} color="#10B981" /> : <Copy size={13} color="#9CA3AF" />}
                  </button>
                  {copiedCode && <span style={{ position: 'absolute', top: -24, right: 8, fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#10B981', animation: 'fadeInUp 0.2s ease-out' }}>Copied!</span>}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, background: '#F9FAFB', borderRadius: 8, padding: '12px 16px' }}>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, textTransform: 'uppercase', color: '#9CA3AF', letterSpacing: '0.08em', marginBottom: 4 }}>Complexity</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: selectedItem.complexity === 'Easy' ? '#10B981' : selectedItem.complexity === 'Medium' ? '#F59E0B' : '#EF4444' }}>{selectedItem.complexity}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, textTransform: 'uppercase', color: '#9CA3AF', letterSpacing: '0.08em', marginBottom: 4 }}>Est. Time</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: '#111827' }}>{selectedItem.estTime}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, textTransform: 'uppercase', color: '#9CA3AF', letterSpacing: '0.08em', marginBottom: 4 }}>Skill Level</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: '#4F46E5' }}>{selectedItem.skillLevel}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(selectedItem.nistrefs || []).map((ref, i) => (
                  <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, background: '#EEF2FF', border: '1px solid #C7D2FE', color: '#4F46E5', borderRadius: 999, padding: '4px 12px' }}>{ref}</span>
                ))}
              </div>
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid #F3F4F6' }}>
              {selectedStatus === 'pending' && (
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => updateTaskStatus(selectedItem.id, 'in-progress')}>Mark as In Progress</button>
              )}
              {selectedStatus === 'in-progress' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <button className="btn-ghost" onClick={() => updateTaskStatus(selectedItem.id, 'pending')}>← Back to Pending</button>
                  <button style={{ background: '#10B981', color: 'white', border: 'none', borderRadius: 8, padding: '10px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onClick={() => { updateTaskStatus(selectedItem.id, 'fixed'); setTimeout(() => setJustFixedId(null), 500); }}>
                    {justFixedId === selectedItem.id ? <><CheckCircle size={18} /> Verified!</> : <><CheckCircle size={18} /> Mark as Fixed</>}
                  </button>
                </div>
              )}
              {selectedStatus === 'fixed' && (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 8, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle size={18} color="#10B981" />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#059669' }}>Remediation Complete</span>
                  </div>
                  <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => updateTaskStatus(selectedItem.id, 'pending')}>Reopen</button>
                </div>
              )}
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {selectedAssignee ? (
                  <> <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>Assigned to: </span><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#374151' }}>{selectedAssignee}</span><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#4F46E5', cursor: 'pointer' }} onClick={() => { setAssignTarget(selectedItem); setAssignModalOpen(true); }}>Change</span> </>
                ) : (
                  <> <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>Unassigned</span><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#4F46E5', cursor: 'pointer' }} onClick={() => { setAssignTarget(selectedItem); setAssignModalOpen(true); }}>+ Assign</span> </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PQC cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
        {PQC_ALGORITHMS.map(algo => (
          <div key={algo.id} className="card" style={{ padding: 20, cursor: 'pointer', transition: 'all 0.15s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#4F46E5'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(79,70,229,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: algo.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {algo.icon === 'Lock' && <Lock size={20} color={algo.iconColor} />}
                {algo.icon === 'PenLine' && <PenLine size={20} color={algo.iconColor} />}
                {algo.icon === 'ShieldCheck' && <ShieldCheck size={20} color={algo.iconColor} />}
              </div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>{algo.name}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{algo.purpose}</div>
                <span style={{ display: 'inline-block', marginTop: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, background: '#EEF2FF', border: '1px solid #C7D2FE', color: '#4F46E5', borderRadius: 999, padding: '3px 10px' }}>{algo.fips}</span>
              </div>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B7280', lineHeight: 1.6, marginBottom: 14 }}>{algo.description}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, paddingTop: 14, borderTop: '1px solid #F3F4F6' }}>
              {[{ l: 'Replaces', v: algo.replaces }, { l: 'Security', v: algo.securityLevel }, { l: 'Key Size', v: algo.keySize }, { l: 'Standardized', v: algo.standardDate }].map((d, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, textTransform: 'uppercase', color: '#9CA3AF', letterSpacing: '0.07em', marginBottom: 2 }}>{d.l}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#374151' }}>{d.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>Use for: {algo.useCase}</span>
              <ChevronRight size={14} color="#D1D5DB" />
            </div>
          </div>
        ))}
      </div>

      {/* Assign modal */}
      {assignModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={() => setAssignModalOpen(false)}>
          <div style={{ background: 'white', borderRadius: 12, width: 480, padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={24} color="#4F46E5" /></div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#111827' }}>Assign Remediation Task</div>
                {assignTarget && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Assigning: {assignTarget.domain}</div>}
              </div>
            </div>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {!assignTarget && (
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4, display: 'block' }}>Task to Assign</label>
                  <select value={assignForm.task} onChange={e => setAssignForm(f => ({ ...f, task: e.target.value }))} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #E5E7EB' }}>
                    <option value="">— Select task —</option>
                    {ALL_REMEDIATION_ITEMS.filter(i => taskStatuses[i.id] === 'pending').map(i => <option key={i.id} value={i.id}>{i.domain} — {i.vulnerability}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4, display: 'block' }}>Assign To</label>
                <select value={assignForm.member} onChange={e => setAssignForm(f => ({ ...f, member: e.target.value }))} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #E5E7EB' }}>
                  {TEAM_MEMBERS.map(m => <option key={m.value || 'blank'} value={m.value}>{m.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4, display: 'block' }}>Priority Override</label>
                <select value={assignForm.priority} onChange={e => setAssignForm(f => ({ ...f, priority: e.target.value }))} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #E5E7EB' }}>
                  {['Critical', 'High', 'Medium', 'Low'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4, display: 'block' }}>Due Date</label>
                <input type="date" value={assignForm.dueDate} onChange={e => setAssignForm(f => ({ ...f, dueDate: e.target.value }))} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #E5E7EB' }} />
              </div>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', marginBottom: 4, display: 'block' }}>Notes</label>
                <textarea rows={3} placeholder="Additional instructions..." value={assignForm.notes} onChange={e => setAssignForm(f => ({ ...f, notes: e.target.value }))} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #E5E7EB', fontFamily: "'Inter', sans-serif" }} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#374151' }}>
                <input type="checkbox" checked={assignForm.email} onChange={e => setAssignForm(f => ({ ...f, email: e.target.checked }))} /> Send email notification
              </label>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="btn-ghost" onClick={() => { setAssignModalOpen(false); setAssignTarget(null); }}>Cancel</button>
                <button className="btn-primary" onClick={handleAssign}>Assign Task</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: 'white', border: '1px solid #E5E7EB', borderRadius: 8, padding: '12px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 101, animation: 'fadeInUp 0.2s ease-out' }}>
          {toast.type === 'fixed' && <CheckCircle size={18} color="#10B981" />}
          {toast.type === 'export' && <Download size={18} color="#4F46E5" />}
          {toast.type === 'assign' && <Users size={18} color="#4F46E5" />}
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{toast.message}</span>
        </div>
      )}

      {/* Confetti — simple dots */}
      {confetti && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 102 }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', left: '50%', top: '50%', width: 8, height: 8, borderRadius: '50%',
              background: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'][i % 4],
              animation: 'confetti 0.6s ease-out forwards',
            }} />
          ))}
        </div>
      )}
    </div>
  );
};


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

const PAGE_NAMES = {
    dashboard: 'Security Dashboard', discovery: 'Asset Discovery', 'tls-analyzer': 'TLS Analyzer', cbom: 'CBOM Inventory',
    risk: 'Quantum Risk Assessment', remediation: 'Remediation Center', compliance: 'Compliance Mapping',
    certificates: 'Certificates & Labels', reports: 'Reports & Export', settings: 'Settings'
};

const AppShell = () => {
    const [page, setPage] = useState('login');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const nav = (p) => setPage(p);

    const renderPage = () => {
        switch (page) {
            case 'dashboard': return <DashboardPage nav={nav} />;
            case 'discovery': return <DiscoveryPage nav={nav} />;
            case 'tls-analyzer': return <TLSAnalyzerPage nav={nav} />;
            case 'cbom': return <CBOMPage nav={nav} />;
            case 'risk': return <RiskPage nav={nav} />;
            case 'remediation': return <RemediationPage nav={nav} />;
            case 'compliance': return <CompliancePage nav={nav} />;
            case 'certificates': return <CertificatesPage nav={nav} />;
            case 'reports': return <ReportsPage nav={nav} />;
            case 'settings': return <SettingsPage nav={nav} />;
            default: return <DashboardPage nav={nav} />;
        }
    };

    if (page === 'login') return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body, #root { background: #F8F9FC; color: #111827; font-family: 'Inter', sans-serif; min-height: 100vh; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #F1F3F9; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }
        @keyframes shimmer { 0% { background-position: -600px 0; } 100% { background-position: 600px 0; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
        @keyframes confetti { 0% { opacity: 1; transform: translate(-50%,-50%) scale(1); } 100% { opacity: 0; transform: translate(-50%,-50%) translateY(-60px) scale(0); } }
        .shimmer-block { background: linear-gradient(90deg, #F1F3F9 0px, #E8EBF2 150px, #F1F3F9 300px); background-size: 600px 100%; animation: shimmer 1.6s ease-in-out infinite; border-radius: 8px; }
        .page-animate { animation: fadeInUp 0.22s ease-out both; }
        .nav-link { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 500; color: #6B7280; transition: background 0.12s, color 0.12s; user-select: none; margin: 1px 0; text-decoration: none; }
        .nav-link:hover { background: #F3F4F6; color: #111827; }
        .nav-link.active { background: #EEF2FF; color: #4F46E5; font-weight: 600; }
        .nav-link.active svg { color: #4F46E5; }
        .card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
        .btn-primary { background: #4F46E5; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.15s; white-space: nowrap; }
        .btn-primary:hover { background: #4338CA; }
        .btn-ghost { background: transparent; color: #374151; border: 1px solid #E5E7EB; padding: 8px 14px; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.12s; white-space: nowrap; }
        .btn-ghost:hover { background: #F9FAFB; }
        table { border-collapse: collapse; width: 100%; }
        th { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.06em; padding: 10px 16px; background: #F9FAFB; border-bottom: 1px solid #E5E7EB; text-align: left; white-space: nowrap; }
        td { font-family: 'Inter', sans-serif; font-size: 13px; color: #374151; padding: 12px 16px; border-bottom: 1px solid #F3F4F6; white-space: nowrap; }
        tr:hover td { background: #FAFAFA; }
        tr:last-child td { border-bottom: none; }
        input, select { font-family: 'Inter', sans-serif; font-size: 13px; color: #111827; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 8px 12px; outline: none; transition: border 0.15s; }
        input:focus, select:focus { border-color: #4F46E5; background: #fff; box-shadow: 0 0 0 3px rgba(79,70,229,0.08); }
      `}</style>
            <LoginPage onLogin={() => nav('dashboard')} />
        </>
    );

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body, #root { background: #F8F9FC; color: #111827; font-family: 'Inter', sans-serif; min-height: 100vh; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #F1F3F9; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }
        @keyframes shimmer { 0% { background-position: -600px 0; } 100% { background-position: 600px 0; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
        @keyframes confetti { 0% { opacity: 1; transform: translate(-50%,-50%) scale(1); } 100% { opacity: 0; transform: translate(-50%,-50%) translateY(-60px) scale(0); } }
        .shimmer-block { background: linear-gradient(90deg, #F1F3F9 0px, #E8EBF2 150px, #F1F3F9 300px); background-size: 600px 100%; animation: shimmer 1.6s ease-in-out infinite; border-radius: 8px; }
        .page-animate { animation: fadeInUp 0.22s ease-out both; }
        .nav-link { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 500; color: #6B7280; transition: background 0.12s, color 0.12s; user-select: none; margin: 1px 0; text-decoration: none; }
        .nav-link:hover { background: #F3F4F6; color: #111827; }
        .nav-link.active { background: #EEF2FF; color: #4F46E5; font-weight: 600; }
        .nav-link.active svg { color: #4F46E5; }
        .card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
        .btn-primary { background: #4F46E5; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.15s; white-space: nowrap; }
        .btn-primary:hover { background: #4338CA; }
        .btn-ghost { background: transparent; color: #374151; border: 1px solid #E5E7EB; padding: 8px 14px; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.12s; white-space: nowrap; }
        .btn-ghost:hover { background: #F9FAFB; }
        table { border-collapse: collapse; width: 100%; }
        th { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.06em; padding: 10px 16px; background: #F9FAFB; border-bottom: 1px solid #E5E7EB; text-align: left; white-space: nowrap; }
        td { font-family: 'Inter', sans-serif; font-size: 13px; color: #374151; padding: 12px 16px; border-bottom: 1px solid #F3F4F6; white-space: nowrap; }
        tr:hover td { background: #FAFAFA; }
        tr:last-child td { border-bottom: none; }
        input, select { font-family: 'Inter', sans-serif; font-size: 13px; color: #111827; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 8px 12px; outline: none; transition: border 0.15s; }
        input:focus, select:focus { border-color: #4F46E5; background: #fff; box-shadow: 0 0 0 3px rgba(79,70,229,0.08); }
      `}</style>

            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F8F9FC' }}>
                <aside style={{
                    width: sidebarCollapsed ? 60 : 240, minWidth: sidebarCollapsed ? 60 : 240,
                    background: '#FFFFFF', borderRight: '1px solid #E5E7EB',
                    display: 'flex', flexDirection: 'column', transition: 'width 0.2s ease, min-width 0.2s ease',
                    overflow: 'hidden', zIndex: 40
                }}>
                    <div style={{ height: 56, borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
                        <ShieldCheck size={26} color="#4F46E5" style={{ flexShrink: 0 }} />
                        {!sidebarCollapsed && (
                            <div>
                                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>QuantumShield</div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>PNB Security Suite</div>
                            </div>
                        )}
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: sidebarCollapsed ? '16px 8px' : '16px 12px' }}>
                        {[
                            { sect: "MAIN" },
                            { p: 'dashboard', i: LayoutDashboard, l: 'Dashboard' },
                            { p: 'discovery', i: Radar, l: 'Asset Discovery' },
                            { p: 'tls-analyzer', i: Lock, l: 'TLS Analyzer' },
                            { p: 'cbom', i: ClipboardList, l: 'CBOM Inventory' },
                            { sect: "ANALYSIS" },
                            { p: 'risk', i: Atom, l: 'Quantum Risk' },
                            { p: 'remediation', i: Wrench, l: 'Remediation' },
                            { p: 'compliance', i: ShieldCheck, l: 'Compliance' },
                            { sect: "OUTPUTS" },
                            { p: 'certificates', i: Award, l: 'Certificates' },
                            { p: 'reports', i: FileText, l: 'Reports' },
                            { sect: "SYSTEM" },
                            { p: 'settings', i: Settings, l: 'Settings' }
                        ].map((n, i) => {
                            if (n.sect) {
                                if (sidebarCollapsed) return <div key={i} style={{ height: 16 }} />;
                                return <div key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '16px 16px 4px' }}>{n.sect}</div>;
                            }
                            const act = page === n.p;
                            return (
                                <div key={i} className={`nav-link ${act ? 'active' : ''}`} onClick={() => nav(n.p)} style={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start', padding: sidebarCollapsed ? '10px 0' : '8px 12px' }}>
                                    <n.i size={17} color={act ? '#4F46E5' : '#6B7280'} />
                                    {!sidebarCollapsed && <span>{n.l}</span>}
                                </div>
                            )
                        })}
                    </div>

                    <div onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ height: 48, borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background = '#F9FAFB'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        {sidebarCollapsed ? <ChevronRight size={16} color="#9CA3AF" /> : <ChevronLeft size={16} color="#9CA3AF" />}
                    </div>
                </aside>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <header style={{
                        height: 56, background: '#FFFFFF', borderBottom: '1px solid #E5E7EB',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0 24px', flexShrink: 0, zIndex: 30
                    }}>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: '#111827' }}>
                            {PAGE_NAMES[page]}
                        </div>

                        <div style={{ width: 340, background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Search size={15} color="#9CA3AF" />
                            <input type="text" placeholder="Search assets, ciphers, domains..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: 0, fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6B7280', boxShadow: 'none' }} />
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, background: '#F3F4F6', borderRadius: 4, padding: '2px 6px', color: '#9CA3AF' }}>⌘S</span>
                        </div>

                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 8, height: 8, background: '#10B981', borderRadius: 4, animation: 'pulseDot 2s infinite' }} />
                                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: '#10B981' }}>System Active</span>
                            </div>
                            <div style={{ position: 'relative', cursor: 'pointer' }}>
                                <Bell size={20} color="#6B7280" />
                                <div style={{ position: 'absolute', top: 0, right: 0, width: 6, height: 6, borderRadius: 3, background: '#EF4444' }} />
                            </div>
                            <div style={{ width: 1, height: 24, background: '#E5E7EB' }} />
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
                                <div style={{ width: 32, height: 32, borderRadius: 16, background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: 'white' }}>
                                    PS
                                </div>
                                <div>
                                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>PNB Security</div>
                                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>Admin</div>
                                </div>
                                <ChevronDown size={14} color="#9CA3AF" />
                            </div>
                        </div>
                    </header>

                    <main style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#F8F9FC' }}>
                        <div className="page-animate" key={page}>
                            {renderPage()}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default AppShell;


