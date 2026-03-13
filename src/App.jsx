import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ShieldCheck, Radar, Lock, ClipboardList, Atom, Wrench, FileText, Award, Settings, Search, Bell, ChevronDown, ChevronLeft, ChevronRight, Zap, CheckCircle, AlertTriangle, XCircle, Activity, Globe, Code, Network, Server, LayoutDashboard, TrendingDown, TrendingUp, PenLine, SlidersHorizontal, Hash, GitBranch, Clock, X, Shield, Code2, SearchX, Plus, Check, ChevronUp, Download, ExternalLink, Copy, Info, ArrowRight, AlertCircle, RefreshCw, ChevronsUpDown } from 'lucide-react';
import { AreaChart, Area, LineChart, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Line } from 'recharts';

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


/* ═══════════════════════════════════════════════════════
   DASHBOARD PAGE — Fully Interactive
   ═══════════════════════════════════════════════════════ */

// ── SYNTHETIC DATA ──────────────────────────────────────
const riskTrendData = [
    { date: 'Feb 11', score: 78, critical: 42, high: 89, safe: 28 },
    { date: 'Feb 13', score: 76, critical: 41, high: 86, safe: 30 },
    { date: 'Feb 15', score: 74, critical: 39, high: 84, safe: 33 },
    { date: 'Feb 17', score: 75, critical: 40, high: 85, safe: 32 },
    { date: 'Feb 19', score: 72, critical: 38, high: 82, safe: 35 },
    { date: 'Feb 21', score: 70, critical: 37, high: 80, safe: 37 },
    { date: 'Feb 23', score: 71, critical: 38, high: 79, safe: 38 },
    { date: 'Feb 25', score: 69, critical: 37, high: 77, safe: 40 },
    { date: 'Feb 27', score: 68, critical: 36, high: 75, safe: 41 },
    { date: 'Mar 01', score: 67, critical: 36, high: 74, safe: 42 },
    { date: 'Mar 03', score: 68, critical: 37, high: 73, safe: 43 },
    { date: 'Mar 05', score: 66, critical: 35, high: 72, safe: 44 },
    { date: 'Mar 07', score: 67, critical: 36, high: 72, safe: 44 },
    { date: 'Mar 09', score: 67, critical: 36, high: 72, safe: 38 },
    { date: 'Mar 12', score: 67, critical: 36, high: 72, safe: 38 },
];

const riskDistribution = [
    { name: 'Critical', value: 36, color: '#EF4444' },
    { name: 'High Risk', value: 72, color: '#F97316' },
    { name: 'Medium Risk', value: 39, color: '#F59E0B' },
    { name: 'PQC Ready', value: 61, color: '#3B82F6' },
    { name: 'Quantum Safe', value: 38, color: '#10B981' },
];

const recentActivity = [
    { id: 1, icon: 'alert', title: 'Critical vulnerability detected', detail: 'vpn.pnbindia.in — RSA key exchange flagged', time: '4 min ago', color: '#EF4444', bg: '#FEF2F2' },
    { id: 2, icon: 'scan', title: 'Full scan completed', detail: '247 assets scanned · 36 critical found', time: '2 hr ago', color: '#4F46E5', bg: '#EEF2FF' },
    { id: 3, icon: 'award', title: 'Certificate issued', detail: 'corp.pnbindia.in — Fully Quantum Safe label', time: '5 hr ago', color: '#10B981', bg: '#ECFDF5' },
    { id: 4, icon: 'wrench', title: 'Remediation verified', detail: 'trade.pnbindia.in — TLS 1.1 deprecated', time: '8 hr ago', color: '#3B82F6', bg: '#EFF6FF' },
    { id: 5, icon: 'clock', title: 'Certificate expiring soon', detail: 'api.pnbindia.in — Expires in 3 days', time: '12 hr ago', color: '#F59E0B', bg: '#FFFBEB' },
    { id: 6, icon: 'scan', title: 'Scheduled scan triggered', detail: 'Subdomain discovery — pnbindia.in', time: '1 day ago', color: '#6B7280', bg: '#F9FAFB' },
];

const kpiCards = [
    { label: 'TOTAL ASSETS', value: 247, color: '#111827', icon: 'Shield', iconBg: '#F3F4F6', iconColor: '#6B7280', trend: '+12%', trendUp: true, trendColor: '#10B981' },
    { label: 'QUANTUM SAFE', value: 38, color: '#10B981', icon: 'CheckCircle', iconBg: '#ECFDF5', iconColor: '#10B981', trend: '+4%', trendUp: true, trendColor: '#10B981' },
    { label: 'PQC READY', value: 61, color: '#3B82F6', icon: 'Zap', iconBg: '#EFF6FF', iconColor: '#3B82F6', trend: '+8%', trendUp: true, trendColor: '#10B981' },
    { label: 'VULNERABLE', value: 112, color: '#F59E0B', icon: 'AlertTriangle', iconBg: '#FFFBEB', iconColor: '#F59E0B', trend: '-2%', trendUp: false, trendColor: '#10B981' },
    { label: 'CRITICAL RISK', value: 36, color: '#EF4444', icon: 'XCircle', iconBg: '#FEF2F2', iconColor: '#EF4444', trend: '-5%', trendUp: false, trendColor: '#10B981' },
    { label: 'AVG RISK SCORE', value: 67.4, color: '#8B5CF6', icon: 'Activity', iconBg: '#F5F3FF', iconColor: '#8B5CF6', trend: '-1.2', trendUp: false, trendColor: '#10B981' },
];

const hndlData = { yearsAtRisk: 7, crqcYear: 2031, dataVolume: '4.7 TB', records: '2.3M', firstEncrypted: 2017, riskScore: 73 };

const scanLogMessages = [
    { at: 0, msg: "→ Initializing scanner..." },
    { at: 10, msg: "→ Resolving pnbindia.in..." },
    { at: 20, msg: "→ Subdomain enumeration started" },
    { at: 30, msg: "→ Discovered: netbanking.pnbindia.in" },
    { at: 35, msg: "→ Discovered: api.pnbindia.in" },
    { at: 40, msg: "→ Discovered: vpn.pnbindia.in" },
    { at: 45, msg: "→ Discovered: mobile.pnbindia.in" },
    { at: 50, msg: "→ TLS handshake analysis in progress..." },
    { at: 60, msg: "→ Certificate chain validation..." },
    { at: 65, msg: "⚠ RSA-2048 detected on 89 endpoints" },
    { at: 70, msg: "⚠ TLS 1.2 still active on 114 assets" },
    { at: 75, msg: "→ PQC algorithm detection..." },
    { at: 80, msg: "✓ ML-KEM-768 found on 9 assets" },
    { at: 85, msg: "→ Generating CBOM entries..." },
    { at: 90, msg: "→ Running compliance checks..." },
    { at: 95, msg: "→ Calculating risk scores..." },
    { at: 100, msg: "✓ Scan complete — 247 assets analyzed" },
];

const bottomStats = [
    { label: 'ASSETS SCANNED TODAY', value: '247' },
    { label: 'SCANS THIS MONTH', value: '1,842' },
    { label: 'CERTIFICATES ISSUED', value: '38' },
    { label: 'CRITICAL FIXED (MTD)', value: '14' },
    { label: 'COMPLIANCE SCORE AVG', value: '51%' },
];

const kpiIconMap = { Shield: Shield, CheckCircle, Zap, AlertTriangle, XCircle, Activity };
const activityIconMap = { alert: AlertTriangle, scan: Radar, award: Award, wrench: Wrench, clock: Clock };

// ── DASHBOARD COMPONENT ─────────────────────────────────
const DashboardPage = ({ nav }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('30d');
    const [activeSlice, setActiveSlice] = useState(null);
    const [scanModalOpen, setScanModalOpen] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanLog, setScanLog] = useState([]);
    const [gaugeAnimated, setGaugeAnimated] = useState(false);
    const [kpiValues, setKpiValues] = useState(kpiCards.map(() => 0));
    const [scanToggles, setScanToggles] = useState([true, true, false]);
    const scanLogRef = useRef(null);

    // KPI count-up
    useEffect(() => {
        const duration = 1200;
        let start = null;
        const animate = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const e = 1 - Math.pow(1 - p, 3);
            setKpiValues(kpiCards.map(c => Number.isInteger(c.value) ? Math.floor(e * c.value) : parseFloat((e * c.value).toFixed(1))));
            if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, []);

    // Gauge entrance
    useEffect(() => { const t = setTimeout(() => setGaugeAnimated(true), 500); return () => clearTimeout(t); }, []);

    // Scan simulation
    useEffect(() => {
        if (!scanning) return;
        let cur = 0;
        const iv = setInterval(() => {
            cur += 1;
            setScanProgress(cur);
            const m = scanLogMessages.find(x => x.at === cur);
            if (m) setScanLog(prev => [...prev, m.msg]);
            if (cur >= 100) {
                clearInterval(iv);
                setTimeout(() => { setScanModalOpen(false); setScanning(false); setScanProgress(0); setScanLog([]); }, 800);
            }
        }, 120);
        return () => clearInterval(iv);
    }, [scanning]);

    // Auto-scroll scan log
    useEffect(() => { if (scanLogRef.current) scanLogRef.current.scrollTop = scanLogRef.current.scrollHeight; }, [scanLog]);

    const filteredData = selectedPeriod === '7d' ? riskTrendData.slice(-7) : riskTrendData;
    const totalAssets = riskDistribution.reduce((s, d) => s + d.value, 0);
    const gaugeScore = hndlData.riskScore;
    const gaugeArcLength = Math.PI * 90;

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* ── PAGE HEADER ── */}
                <PageHeader
                    title="Security Dashboard"
                    subtitle="Last full scan: 2 hours ago · Next scheduled: in 22 hours"
                    actions={<>
                        <button className="btn-primary" onClick={() => setScanModalOpen(true)}>▶ Run New Scan</button>
                        <button className="btn-ghost">↓ Export Report</button>
                    </>}
                />

                {/* ── ROW 1: KPI CARDS ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
                    {kpiCards.map((card, i) => {
                        const Icon = kpiIconMap[card.icon];
                        return (
                            <div key={i} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'box-shadow 0.15s' }}
                                onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
                                onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10.5, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{card.label}</div>
                                    <div style={{ width: 32, height: 32, borderRadius: 16, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {Icon && <Icon size={15} color={card.iconColor} />}
                                    </div>
                                </div>
                                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 30, fontWeight: 800, color: card.color, marginTop: 12 }}>
                                    {kpiValues[i]}
                                </div>
                                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    {card.trendUp ? <TrendingUp size={12} color={card.trendColor} /> : <TrendingDown size={12} color={card.trendColor} />}
                                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: card.trendColor }}>{card.trend}</span>
                                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF' }}>vs last scan</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── ROW 2: TREND + DONUT ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
                    {/* Security Posture Trend */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <div>
                                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Security Posture Trend</p>
                                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>Overall quantum risk score over time</p>
                            </div>
                            <select value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)}
                                style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 6, padding: '5px 10px', fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#374151', cursor: 'pointer', outline: 'none' }}>
                                <option value="7d">Last 7 days</option>
                                <option value="30d">Last 30 days</option>
                                <option value="90d">Last 90 days</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={240}>
                            <AreaChart data={filteredData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.12} />
                                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="safeGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.12} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                                <XAxis dataKey="date" tick={{ fontFamily: 'Inter', fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                                <YAxis domain={[0, 100]} tick={{ fontFamily: 'Inter', fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontFamily: 'Inter', fontSize: 12 }}
                                    labelStyle={{ color: '#111827', fontWeight: 600, marginBottom: 4 }}
                                    itemStyle={{ color: '#6B7280' }}
                                    cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                                />
                                <Legend wrapperStyle={{ fontFamily: 'Inter', fontSize: 11, paddingTop: 12, color: '#6B7280' }} iconType="circle" iconSize={8} />
                                <ReferenceLine y={50} stroke="#E5E7EB" strokeDasharray="4 4" label={{ value: 'Safe threshold', fill: '#9CA3AF', fontSize: 10, fontFamily: 'Inter' }} />
                                <Area type="monotone" dataKey="score" name="Risk Score" stroke="#EF4444" strokeWidth={2.5} fill="url(#riskGrad)" dot={false}
                                    activeDot={{ r: 5, fill: '#EF4444', stroke: '#fff', strokeWidth: 2 }}
                                    isAnimationActive={true} animationBegin={300} animationDuration={1000} animationEasing="ease-out" />
                                <Area type="monotone" dataKey="safe" name="Safe Assets" stroke="#10B981" strokeWidth={2} fill="url(#safeGrad)" dot={false}
                                    activeDot={{ r: 4, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
                                    isAnimationActive={true} animationBegin={300} animationDuration={1000} animationEasing="ease-out" />
                                <Line type="monotone" dataKey="critical" name="Critical" stroke="#F97316" strokeWidth={1.5} dot={false} strokeDasharray="4 4"
                                    activeDot={{ r: 4, fill: '#F97316', stroke: '#fff', strokeWidth: 2 }}
                                    isAnimationActive={true} animationBegin={300} animationDuration={1000} animationEasing="ease-out" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Asset Risk Distribution Donut */}
                    <div className="card">
                        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Asset Risk Distribution</p>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#9CA3AF', marginTop: 2, marginBottom: 8 }}>{totalAssets} total assets · as of today</p>

                        <div style={{ position: 'relative' }}>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={58} outerRadius={85} paddingAngle={3} dataKey="value"
                                        startAngle={90} endAngle={-270} animationBegin={200} animationDuration={800}>
                                        {riskDistribution.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} stroke="none"
                                                style={{ cursor: 'pointer', filter: activeSlice === i ? 'brightness(1.1)' : 'none', outline: 'none' }}
                                                onMouseEnter={() => setActiveSlice(i)} onMouseLeave={() => setActiveSlice(null)} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                                        formatter={(val, name) => [`${val} assets`, name]} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none' }}>
                                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: '#111827' }}>{totalAssets}</div>
                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF' }}>assets</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                            {riskDistribution.map((d, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '2px 4px', borderRadius: 4, transition: 'background 0.12s', background: activeSlice === i ? '#F9FAFB' : 'transparent' }}
                                    onMouseEnter={() => setActiveSlice(i)} onMouseLeave={() => setActiveSlice(null)}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ width: 8, height: 8, borderRadius: 4, background: d.color, display: 'inline-block' }} />
                                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#374151' }}>{d.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#111827' }}>{d.value}</span>
                                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF' }}>{(d.value / totalAssets * 100).toFixed(0)}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── ROW 3: HNDL GAUGE + ACTIVITY ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 20 }}>
                    {/* HNDL Exposure Meter */}
                    <div className="card">
                        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>HNDL Exposure Meter</p>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#9CA3AF', marginTop: 2, marginBottom: 16 }}>Harvest Now, Decrypt Later — Risk Index</p>

                        <div style={{ textAlign: 'center' }}>
                            <svg viewBox="0 0 220 155" style={{ width: '100%', maxWidth: 220, margin: '0 auto', display: 'block' }}>
                                <defs>
                                    <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#10B981" />
                                        <stop offset="35%" stopColor="#F59E0B" />
                                        <stop offset="65%" stopColor="#F97316" />
                                        <stop offset="100%" stopColor="#EF4444" />
                                    </linearGradient>
                                </defs>
                                {/* Background arc */}
                                <path d="M 20,120 A 90,90 0 0,1 200,120" fill="none" stroke="#F3F4F6" strokeWidth="16" strokeLinecap="round" />
                                {/* Colored fill arc */}
                                <path d="M 20,120 A 90,90 0 0,1 200,120" fill="none" stroke="url(#gaugeGrad)" strokeWidth="16" strokeLinecap="round"
                                    pathLength="100" strokeDasharray="100"
                                    strokeDashoffset={gaugeAnimated ? (100 - gaugeScore) : 100}
                                    style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
                                {/* Needle */}
                                <line x1="110" y1="120" x2="35" y2="120" stroke="#111827" strokeWidth="2.5" strokeLinecap="round"
                                    style={{ transformOrigin: '110px 120px', transform: `rotate(${gaugeAnimated ? (gaugeScore / 100 * 180) : 0}deg)`, transition: 'transform 1.5s ease-out' }} />
                                {/* Center hub */}
                                <circle cx="110" cy="120" r="6" fill="white" stroke="#111827" strokeWidth="2" />
                                {/* Scale labels */}
                                <text x="20" y="145" textAnchor="middle" style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fill: '#9CA3AF' }}>0</text>
                                <text x="110" y="20" textAnchor="middle" style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fill: '#9CA3AF' }}>50</text>
                                <text x="200" y="145" textAnchor="middle" style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fill: '#9CA3AF' }}>100</text>
                            </svg>
                            <div style={{ marginTop: 8 }}>
                                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 36, fontWeight: 800, color: '#EF4444' }}>{gaugeScore}</span>
                                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: '#9CA3AF' }}>/100</span>
                            </div>
                            <div style={{ marginTop: 6 }}>
                                <Badge type="critical">HIGH RISK</Badge>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
                            {[
                                { l: 'YEARS AT RISK', v: `${hndlData.yearsAtRisk} years` },
                                { l: 'CRQC EMERGENCE', v: `~${hndlData.crqcYear}` },
                                { l: 'DATA VOLUME', v: hndlData.dataVolume },
                                { l: 'RECORDS EXPOSED', v: hndlData.records },
                            ].map((s, i) => (
                                <div key={i}>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>{s.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Recent Activity</p>
                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#4F46E5', cursor: 'pointer' }}>View all →</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {recentActivity.map((a, i) => {
                                const AIcon = activityIconMap[a.icon] || Radar;
                                return (
                                    <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 4px', borderBottom: i < recentActivity.length - 1 ? '1px solid #F9FAFB' : 'none', borderRadius: 8, transition: 'background 0.12s', cursor: 'pointer' }}
                                        onMouseOver={e => e.currentTarget.style.background = '#FAFAFA'}
                                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                                        <div style={{ width: 36, height: 36, borderRadius: 18, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <AIcon size={16} color={a.color} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{a.title}</div>
                                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{a.detail}</div>
                                        </div>
                                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF', whiteSpace: 'nowrap', flexShrink: 0 }}>{a.time}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: 12, textAlign: 'center' }}>
                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#4F46E5', cursor: 'pointer' }}>Load more activity</span>
                        </div>
                    </div>
                </div>

                {/* ── ROW 4: QUICK ACTIONS ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                    {[
                        { l: 'Start Deep Scan', sub: 'Discover all internet-facing assets', i: Radar, bg: '#EEF2FF', c: '#4F46E5', p: 'discovery', border: '#E5E7EB', hBorder: '#4F46E5', hShadow: 'rgba(79,70,229,0.1)' },
                        { l: 'View CBOM Report', sub: '847 cryptographic components', i: FileText, bg: '#EFF6FF', c: '#3B82F6', p: 'cbom', border: '#E5E7EB', hBorder: '#3B82F6', hShadow: 'rgba(59,130,246,0.1)' },
                        { l: 'Issue Certificates', sub: '12 assets ready for certification', i: Award, bg: '#ECFDF5', c: '#10B981', p: 'certificates', border: '#E5E7EB', hBorder: '#10B981', hShadow: 'rgba(16,185,129,0.1)' },
                        { l: '36 Critical Alerts', sub: 'Immediate attention required', i: AlertTriangle, bg: '#FEF2F2', c: '#EF4444', p: 'risk', border: '#FECACA', hBorder: '#EF4444', hShadow: 'rgba(239,68,68,0.1)' },
                    ].map((a, i) => (
                        <div key={i} onClick={() => nav(a.p)}
                            style={{ background: '#fff', border: `1px solid ${a.border}`, borderRadius: 12, padding: 18, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseOver={e => { e.currentTarget.style.borderColor = a.hBorder; e.currentTarget.style.boxShadow = `0 4px 16px ${a.hShadow}`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = a.border; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                            <div style={{ width: 40, height: 40, borderRadius: 20, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <a.i size={20} color={a.c} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{a.l}</div>
                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{a.sub}</div>
                            </div>
                            <ChevronRight size={14} color="#D1D5DB" />
                        </div>
                    ))}
                </div>

                {/* ── ROW 5: STATS BAR ── */}
                <div className="card" style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                        {bottomStats.map((s, i) => (
                            <React.Fragment key={i}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: '#111827' }}>{s.value}</div>
                                </div>
                                {i < bottomStats.length - 1 && <div style={{ width: 1, height: 32, background: '#E5E7EB' }} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── SCAN MODAL ── */}
            {scanModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={e => { if (e.target === e.currentTarget && !scanning) { setScanModalOpen(false); } }}>
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                    <div className="page-animate" style={{ background: '#fff', borderRadius: 16, width: 520, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
                        {!scanning ? (
                            <>
                                <Radar size={24} color="#4F46E5" />
                                <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 700, color: '#111827', marginTop: 12 }}>Configure New Scan</h2>
                                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Set target and scan parameters</p>

                                <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    <div>
                                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Target Domain / IP</div>
                                        <input type="text" defaultValue="pnbindia.in" placeholder="pnbindia.in" style={{ width: '100%' }} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                        <div>
                                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Scan Depth</div>
                                            <select style={{ width: '100%' }}>
                                                <option>Standard (recommended)</option>
                                                <option>Quick (surface only)</option>
                                                <option>Deep (comprehensive)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Asset Type</div>
                                            <select style={{ width: '100%' }}>
                                                <option>All Types</option>
                                                <option>Web Servers only</option>
                                                <option>APIs only</option>
                                                <option>VPN only</option>
                                            </select>
                                        </div>
                                    </div>
                                    {['Include Subdomain Enumeration', 'TLS Certificate Deep Scan', 'Aggressive Port Discovery'].map((label, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: '#111827' }}>{label}</span>
                                            <div onClick={() => setScanToggles(prev => prev.map((v, j) => j === idx ? !v : v))}
                                                style={{ width: 40, height: 22, borderRadius: 11, background: scanToggles[idx] ? '#4F46E5' : '#E5E7EB', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                                                <div style={{ position: 'absolute', top: 2, left: scanToggles[idx] ? 20 : 2, width: 18, height: 18, borderRadius: 9, background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                                            </div>
                                        </div>
                                    ))}
                                    <div style={{ marginTop: 8, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                        <button className="btn-ghost" onClick={() => setScanModalOpen(false)}>Cancel</button>
                                        <button className="btn-primary" onClick={() => { setScanning(true); setScanLog([]); setScanProgress(0); }}>▶ Start Scan</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'inline-block', animation: 'spin 1.5s linear infinite' }}>
                                        <Radar size={32} color="#4F46E5" />
                                    </div>
                                    <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 700, color: '#111827', marginTop: 12 }}>Scanning pnbindia.in...</h2>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#9CA3AF' }}>Progress</span>
                                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#4F46E5' }}>{scanProgress}%</span>
                                    </div>
                                    <div style={{ height: 8, background: '#F3F4F6', borderRadius: 4, marginTop: 6, overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${scanProgress}%`, background: '#4F46E5', borderRadius: 4, transition: 'width 0.3s ease' }} />
                                    </div>
                                </div>
                                <div ref={scanLogRef} style={{ marginTop: 16, height: 160, overflowY: 'auto', background: '#F8F9FC', borderRadius: 8, padding: 12 }}>
                                    {scanLog.map((line, i) => (
                                        <div key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: line.startsWith('⚠') ? '#F59E0B' : line.startsWith('✓') ? '#10B981' : '#374151', lineHeight: 1.8 }}>
                                            {line}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};


/* ═══════════════════════════════════════════════════════
   ASSET DISCOVERY PAGE — Fully Interactive
   ═══════════════════════════════════════════════════════ */

const ALL_ASSETS = [
    { id: 1, domain: 'api.pnbindia.in', ip: '103.45.12.67', port: 443, type: 'API', tls: '1.2', keyExchange: 'ECDH-RSA', cert: 'RSA-2048', status: 'critical', riskScore: 91, lastScanned: '2 hr ago', cipher: 'TLS_RSA_WITH_AES_256_CBC_SHA' },
    { id: 2, domain: 'vpn.pnbindia.in', ip: '103.45.12.71', port: 4500, type: 'VPN', tls: '1.2', keyExchange: 'RSA', cert: 'RSA-2048', status: 'critical', riskScore: 95, lastScanned: '2 hr ago', cipher: 'TLS_RSA_WITH_AES_128_CBC_SHA' },
    { id: 3, domain: 'payments.pnbindia.in', ip: '103.45.12.89', port: 443, type: 'API', tls: '1.2', keyExchange: 'ECDH-RSA', cert: 'RSA-2048', status: 'critical', riskScore: 88, lastScanned: '2 hr ago', cipher: 'TLS_ECDHE_RSA_AES_256_GCM_SHA384' },
    { id: 4, domain: 'legacy.pnbindia.in', ip: '103.45.12.44', port: 443, type: 'Web Server', tls: '1.1', keyExchange: 'RSA', cert: 'RSA-1024', status: 'critical', riskScore: 98, lastScanned: '3 hr ago', cipher: 'TLS_RSA_WITH_RC4_128_SHA' },
    { id: 5, domain: 'b2b-api.pnbindia.in', ip: '103.45.12.102', port: 8443, type: 'API', tls: '1.2', keyExchange: 'DHE-RSA', cert: 'RSA-2048', status: 'critical', riskScore: 87, lastScanned: '3 hr ago', cipher: 'TLS_DHE_RSA_AES_128_CBC_SHA' },
    { id: 6, domain: 'netbanking.pnbindia.in', ip: '103.45.12.68', port: 443, type: 'Web Server', tls: '1.2', keyExchange: 'ECDHE-RSA', cert: 'RSA-2048', status: 'high', riskScore: 74, lastScanned: '2 hr ago', cipher: 'TLS_ECDHE_RSA_AES_256_GCM_SHA384' },
    { id: 7, domain: 'sso.pnbindia.in', ip: '103.45.12.75', port: 443, type: 'API', tls: '1.2', keyExchange: 'ECDHE-RSA', cert: 'ECDSA-P256', status: 'high', riskScore: 71, lastScanned: '2 hr ago', cipher: 'TLS_ECDHE_RSA_AES_128_GCM_SHA256' },
    { id: 8, domain: 'trade.pnbindia.in', ip: '103.45.12.91', port: 443, type: 'Web Server', tls: '1.2', keyExchange: 'DHE-RSA', cert: 'RSA-2048', status: 'high', riskScore: 78, lastScanned: '4 hr ago', cipher: 'TLS_DHE_RSA_AES_256_GCM_SHA384' },
    { id: 9, domain: 'forex.pnbindia.in', ip: '103.45.12.93', port: 443, type: 'Web Server', tls: '1.2', keyExchange: 'ECDHE-RSA', cert: 'RSA-2048', status: 'high', riskScore: 76, lastScanned: '4 hr ago', cipher: 'TLS_ECDHE_RSA_AES_256_GCM_SHA384' },
    { id: 10, domain: 'admin.pnbindia.in', ip: '103.45.12.55', port: 8443, type: 'Web Server', tls: '1.2', keyExchange: 'ECDHE-RSA', cert: 'RSA-2048', status: 'high', riskScore: 73, lastScanned: '5 hr ago', cipher: 'TLS_ECDHE_RSA_AES_128_GCM_SHA256' },
    { id: 11, domain: 'mobilebank.pnbindia.in', ip: '103.45.12.110', port: 443, type: 'API', tls: '1.2', keyExchange: 'ECDHE-RSA', cert: 'ECDSA-P256', status: 'high', riskScore: 69, lastScanned: '5 hr ago', cipher: 'TLS_ECDHE_RSA_CHACHA20_POLY1305' },
    { id: 12, domain: 'ib.pnbindia.in', ip: '103.45.12.58', port: 443, type: 'Web Server', tls: '1.2', keyExchange: 'ECDHE-RSA', cert: 'RSA-2048', status: 'high', riskScore: 72, lastScanned: '6 hr ago', cipher: 'TLS_ECDHE_RSA_AES_256_GCM_SHA384' },
    { id: 13, domain: 'mobile.pnbindia.in', ip: '103.45.12.70', port: 443, type: 'Web Server', tls: '1.3', keyExchange: 'ECDHE', cert: 'ECDSA-P384', status: 'medium', riskScore: 52, lastScanned: '2 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 14, domain: 'docs.pnbindia.in', ip: '103.45.12.80', port: 443, type: 'Web Server', tls: '1.3', keyExchange: 'ECDHE', cert: 'ECDSA-P256', status: 'medium', riskScore: 48, lastScanned: '6 hr ago', cipher: 'TLS_AES_128_GCM_SHA256' },
    { id: 15, domain: 'internal.pnbindia.in', ip: '103.45.12.85', port: 443, type: 'Web Server', tls: '1.3', keyExchange: 'ECDHE', cert: 'ECDSA-P384', status: 'medium', riskScore: 44, lastScanned: '7 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 16, domain: 'portal.pnbindia.in', ip: '103.45.12.96', port: 443, type: 'Web Server', tls: '1.3', keyExchange: 'X25519', cert: 'ECDSA-P256', status: 'medium', riskScore: 46, lastScanned: '8 hr ago', cipher: 'TLS_CHACHA20_POLY1305_SHA256' },
    { id: 17, domain: 'loans.pnbindia.in', ip: '103.45.12.114', port: 443, type: 'Web Server', tls: '1.3', keyExchange: 'ECDHE', cert: 'ECDSA-P256', status: 'medium', riskScore: 51, lastScanned: '9 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 18, domain: 'cards.pnbindia.in', ip: '103.45.12.117', port: 443, type: 'API', tls: '1.3', keyExchange: 'X25519', cert: 'ECDSA-P384', status: 'medium', riskScore: 43, lastScanned: '10 hr ago', cipher: 'TLS_AES_128_GCM_SHA256' },
    { id: 19, domain: 'corp.pnbindia.in', ip: '103.45.12.72', port: 443, type: 'Web Server', tls: '1.3', keyExchange: 'X25519Kyber768', cert: 'ECDSA-P384', status: 'pqc-ready', riskScore: 18, lastScanned: '2 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 20, domain: 'static.pnbindia.in', ip: '103.45.12.82', port: 443, type: 'Web Server', tls: '1.3', keyExchange: 'X25519Kyber768', cert: 'ECDSA-P256', status: 'pqc-ready', riskScore: 15, lastScanned: '3 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 21, domain: 'reporting.pnbindia.in', ip: '103.45.12.99', port: 443, type: 'API', tls: '1.3', keyExchange: 'X25519Kyber768', cert: 'ECDSA-P384', status: 'pqc-ready', riskScore: 14, lastScanned: '5 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 22, domain: 'analytics.pnbindia.in', ip: '103.45.12.107', port: 443, type: 'API', tls: '1.3', keyExchange: 'X25519Kyber768', cert: 'ECDSA-P384', status: 'pqc-ready', riskScore: 16, lastScanned: '8 hr ago', cipher: 'TLS_CHACHA20_POLY1305_SHA256' },
    { id: 23, domain: 'gateway.pnbindia.in', ip: '103.45.12.112', port: 443, type: 'API', tls: '1.3', keyExchange: 'X25519Kyber768', cert: 'ECDSA-P256', status: 'pqc-ready', riskScore: 13, lastScanned: '10 hr ago', cipher: 'TLS_AES_128_GCM_SHA256' },
    { id: 24, domain: 'cdn.pnbindia.in', ip: '103.45.12.76', port: 443, type: 'Web Server', tls: '1.3', keyExchange: 'ML-KEM-768', cert: 'ML-DSA-65', status: 'quantum-safe', riskScore: 5, lastScanned: '2 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 25, domain: 'assets.pnbindia.in', ip: '103.45.12.83', port: 443, type: 'Web Server', tls: '1.3', keyExchange: 'ML-KEM-768', cert: 'ML-DSA-65', status: 'quantum-safe', riskScore: 4, lastScanned: '3 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 26, domain: 'media.pnbindia.in', ip: '103.45.12.88', port: 443, type: 'Web Server', tls: '1.3', keyExchange: 'ML-KEM-1024', cert: 'SLH-DSA', status: 'quantum-safe', riskScore: 3, lastScanned: '4 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 27, domain: 'secure-api.pnbindia.in', ip: '103.45.12.103', port: 443, type: 'API', tls: '1.3', keyExchange: 'ML-KEM-768', cert: 'ML-DSA-65', status: 'quantum-safe', riskScore: 5, lastScanned: '5 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 28, domain: 'pqc-test.pnbindia.in', ip: '103.45.12.118', port: 443, type: 'API', tls: '1.3', keyExchange: 'ML-KEM-1024', cert: 'ML-DSA-87', status: 'quantum-safe', riskScore: 2, lastScanned: '6 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 29, domain: 'infra.pnbindia.in', ip: '103.45.12.121', port: 8443, type: 'Web Server', tls: '1.3', keyExchange: 'ML-KEM-768', cert: 'ML-DSA-65', status: 'quantum-safe', riskScore: 4, lastScanned: '7 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
    { id: 30, domain: 'cloud.pnbindia.in', ip: '103.45.12.125', port: 443, type: 'Web Server', tls: '1.3', keyExchange: 'ML-KEM-1024', cert: 'SLH-DSA', status: 'quantum-safe', riskScore: 3, lastScanned: '8 hr ago', cipher: 'TLS_AES_256_GCM_SHA384' },
];

const ASSET_STATS = [
    { label: 'WEB SERVERS', count: 94, sub: 'Active HTTPS endpoints', icon: Globe, iconBg: '#EFF6FF', iconColor: '#3B82F6', type: 'Web Server' },
    { label: 'API ENDPOINTS', count: 87, sub: 'REST & SOAP interfaces', icon: Code2, iconBg: '#EEF2FF', iconColor: '#4F46E5', type: 'API' },
    { label: 'VPN GATEWAYS', count: 23, sub: 'TLS-based tunnels', icon: Network, iconBg: '#F5F3FF', iconColor: '#8B5CF6', type: 'VPN' },
    { label: 'OTHER', count: 43, sub: 'Load balancers, proxies', icon: Server, iconBg: '#FFFBEB', iconColor: '#F59E0B', type: 'Other' },
];

const STATUS_ORDER = { critical: 0, high: 1, medium: 2, 'pqc-ready': 3, 'quantum-safe': 4 };
const TYPE_ICONS = { 'Web Server': { icon: Globe, bg: '#EFF6FF', c: '#3B82F6' }, 'API': { icon: Code2, bg: '#EEF2FF', c: '#4F46E5' }, 'VPN': { icon: Network, bg: '#F5F3FF', c: '#8B5CF6' } };
const TLS_COLORS = { '1.3': { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' }, '1.2': { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' }, '1.1': { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' }, '1.0': { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' } };
const ROWS_PER_PAGE = 8;

const SCAN_LOG_STEPS = [
    { at: 5, msg: '→ Resolving target domain...', c: '#6B7280' },
    { at: 12, msg: '→ Subdomain enumeration started', c: '#6B7280' },
    { at: 20, msg: '→ Discovered: netbanking.pnbindia.in', c: '#6B7280' },
    { at: 25, msg: '→ Discovered: api.pnbindia.in', c: '#6B7280' },
    { at: 30, msg: '→ Discovered: vpn.pnbindia.in', c: '#6B7280' },
    { at: 35, msg: '→ Discovered: 24 more subdomains', c: '#6B7280' },
    { at: 42, msg: '→ TLS handshake analysis in progress...', c: '#6B7280' },
    { at: 50, msg: '⚠ RSA-2048 detected on 89 endpoints', c: '#F59E0B' },
    { at: 58, msg: '⚠ TLS 1.2 active on 114 assets', c: '#F59E0B' },
    { at: 65, msg: '→ PQC algorithm fingerprinting...', c: '#6B7280' },
    { at: 72, msg: '✓ ML-KEM-768 confirmed on 9 assets', c: '#10B981' },
    { at: 80, msg: '→ Certificate chain validation...', c: '#6B7280' },
    { at: 88, msg: '→ Generating CBOM entries...', c: '#6B7280' },
    { at: 95, msg: '→ Calculating risk scores...', c: '#6B7280' },
    { at: 100, msg: '✓ Scan complete — 247 assets analyzed', c: '#10B981' },
];

const DiscoveryPage = ({ nav }) => {
    // ── State ──
    const [scanTarget, setScanTarget] = useState('');
    const [scanDepth, setScanDepth] = useState('standard');
    const [includeSubdomains, setIncludeSubdomains] = useState(true);
    const [scanCommonPorts, setScanCommonPorts] = useState(true);
    const [deepCertAnalysis, setDeepCertAnalysis] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'riskScore', dir: 'desc' });
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [scanning, setScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanLog, setScanLog] = useState([]);
    const [scanComplete, setScanComplete] = useState(false);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [newScanModalOpen, setNewScanModalOpen] = useState(false);
    const [modalToggles, setModalToggles] = useState([true, true]);
    const [statValues, setStatValues] = useState(ASSET_STATS.map(() => 0));
    const [dots, setDots] = useState('');

    // ── Stat card count-up ──
    useEffect(() => {
        const dur = 800; let start = null;
        const anim = ts => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / dur, 1);
            const e = 1 - Math.pow(1 - p, 3);
            setStatValues(ASSET_STATS.map(s => Math.floor(e * s.count)));
            if (p < 1) requestAnimationFrame(anim);
        };
        requestAnimationFrame(anim);
    }, []);

    // ── Scan simulation ──
    useEffect(() => {
        if (!scanning) return;
        let cur = 0;
        const iv = setInterval(() => {
            cur += 1; setScanProgress(cur);
            const s = SCAN_LOG_STEPS.find(x => x.at === cur);
            if (s) setScanLog(prev => [...prev, s]);
            if (cur >= 100) { clearInterval(iv); setTimeout(() => { setScanning(false); setScanComplete(true); setScanProgress(0); setScanLog([]); }, 1200); }
        }, 60);
        return () => clearInterval(iv);
    }, [scanning]);

    // ── Dots animation ──
    useEffect(() => {
        if (!scanning) { setDots(''); return; }
        const iv = setInterval(() => setDots(p => p.length >= 3 ? '' : p + '.'), 500);
        return () => clearInterval(iv);
    }, [scanning]);

    // ── Toast auto-dismiss ──
    useEffect(() => { if (!scanComplete) return; const t = setTimeout(() => setScanComplete(false), 5000); return () => clearTimeout(t); }, [scanComplete]);

    // ── Reset page on filter change ──
    useEffect(() => { setCurrentPage(1); }, [filterText, statusFilter, typeFilter, sortConfig]);

    // ── Filtering + Sorting ──
    const filteredAssets = useMemo(() => {
        let res = [...ALL_ASSETS];
        if (filterText.trim()) {
            const f = filterText.toLowerCase();
            res = res.filter(a => a.domain.toLowerCase().includes(f) || a.type.toLowerCase().includes(f) || a.ip.includes(f));
        }
        if (statusFilter !== 'all') res = res.filter(a => a.status === statusFilter);
        if (typeFilter !== 'all') res = res.filter(a => a.type === typeFilter);
        res.sort((a, b) => {
            let c = 0;
            if (sortConfig.key === 'riskScore') c = a.riskScore - b.riskScore;
            else if (sortConfig.key === 'domain') c = a.domain.localeCompare(b.domain);
            else if (sortConfig.key === 'status') c = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
            else if (sortConfig.key === 'tls') c = a.tls.localeCompare(b.tls);
            else if (sortConfig.key === 'port') c = a.port - b.port;
            else if (sortConfig.key === 'ip') c = a.ip.localeCompare(b.ip);
            else if (sortConfig.key === 'type') c = a.type.localeCompare(b.type);
            return sortConfig.dir === 'desc' ? -c : c;
        });
        return res;
    }, [filterText, statusFilter, typeFilter, sortConfig]);

    const totalPages = Math.ceil(filteredAssets.length / ROWS_PER_PAGE);
    const pageData = filteredAssets.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);
    const pageIds = pageData.map(a => a.id);
    const selectedOnPage = pageIds.filter(id => selectedRows.includes(id));
    const allPageSelected = selectedOnPage.length === pageIds.length && pageIds.length > 0;
    const somePageSelected = selectedOnPage.length > 0 && !allPageSelected;

    // ── Helpers ──
    const handleSort = key => setSortConfig(prev => ({ key, dir: prev.key === key && prev.dir === 'desc' ? 'asc' : 'desc' }));
    const handleSelectAll = () => { if (allPageSelected) setSelectedRows(prev => prev.filter(id => !pageIds.includes(id))); else setSelectedRows(prev => [...new Set([...prev, ...pageIds])]); };
    const toggleRow = id => setSelectedRows(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const startScan = () => { setScanning(true); setScanProgress(0); setScanLog([]); setScanComplete(false); };
    const handleExport = () => {
        const csv = ['Domain,IP,Port,Type,TLS,Key Exchange,Certificate,Status,Risk Score,Last Scanned', ...filteredAssets.map(a => `${a.domain},${a.ip},${a.port},${a.type},${a.tls},${a.keyExchange},${a.cert},${a.status},${a.riskScore},${a.lastScanned}`)].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob);
        const link = document.createElement('a'); link.href = url; link.download = 'asset-discovery.csv'; link.click(); URL.revokeObjectURL(url);
    };
    const getPageNums = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        const p = [1];
        if (currentPage > 3) p.push('...');
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) p.push(i);
        if (currentPage < totalPages - 2) p.push('...');
        if (totalPages > 1) p.push(totalPages);
        return p;
    };
    const SortHeader = ({ label, sortKey, w }) => (
        <th style={{ width: w, cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort(sortKey)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: sortConfig.key === sortKey ? '#4F46E5' : undefined }}>{label}</span>
                {sortConfig.key === sortKey && (sortConfig.dir === 'desc' ? <ChevronDown size={12} color="#4F46E5" /> : <ChevronUp size={12} color="#4F46E5" />)}
            </div>
        </th>
    );
    const CBox = ({ checked, indeterminate, onClick }) => (
        <div onClick={onClick} style={{ width: 18, height: 18, borderRadius: 4, background: checked || indeterminate ? '#4F46E5' : 'white', border: checked || indeterminate ? '1.5px solid #4F46E5' : '1.5px solid #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.12s', flexShrink: 0 }}>
            {checked && <Check size={12} color="white" strokeWidth={3} />}
            {indeterminate && !checked && <div style={{ width: 10, height: 2, background: 'white', borderRadius: 1 }} />}
        </div>
    );
    const pqcChecks = (a) => [
        { n: 'ML-KEM-768/1024', ok: ['ML-KEM-768', 'ML-KEM-1024'].some(x => a.keyExchange.includes(x)) },
        { n: 'ML-DSA-65/87', ok: ['ML-DSA-65', 'ML-DSA-87'].includes(a.cert) },
        { n: 'SLH-DSA', ok: a.cert === 'SLH-DSA' },
        { n: 'Hybrid Key Exchange', ok: a.keyExchange.includes('Kyber') },
        { n: 'X25519Kyber768', ok: a.keyExchange === 'X25519Kyber768' },
        { n: 'TLS 1.3', ok: a.tls === '1.3' },
    ];
    const statusMsg = { critical: 'Immediate attention required', high: 'Quantum vulnerability detected', medium: 'Partial quantum risk', 'pqc-ready': 'Transitioning to quantum safety', 'quantum-safe': 'Fully quantum safe' };
    const actions = (st) => {
        if (st === 'quantum-safe') return [{ t: 'No action required', d: 'Asset is fully quantum safe', ok: true }];
        if (st === 'pqc-ready') return [{ t: 'Complete ML-DSA certificate migration', d: 'Finalize PQC certificate deployment' }];
        if (st === 'medium') return [{ t: 'Enable hybrid PQC key exchange', d: 'Add X25519Kyber768 support' }, { t: 'Schedule certificate replacement', d: 'Plan migration to ML-DSA or SLH-DSA' }];
        return [{ t: 'Upgrade TLS to 1.3', d: 'Disable TLS 1.2 fallback' }, { t: 'Replace key exchange with ML-KEM-768', d: 'Migrate from classical key exchange' }, { t: 'Update certificate to ML-DSA or SLH-DSA', d: 'Replace RSA/ECDSA certificates' }];
    };

    return (
        <>
            <style>{`@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* ── PAGE HEADER ── */}
                <PageHeader title="Asset Discovery" subtitle="Discover and enumerate all internet-facing assets across domains, IPs, and CIDR ranges"
                    actions={<><button className="btn-primary" onClick={() => setNewScanModalOpen(true)}><Plus size={15} /> New Scan Target</button></>} />

                {/* ── SCAN CONFIG CARD ── */}
                <div className="card">
                    <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Configure Scan Target</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 180px', gap: 12, marginTop: 14 }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} color="#9CA3AF" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 14, zIndex: 1 }} />
                            <input type="text" value={scanTarget} onChange={e => setScanTarget(e.target.value)} placeholder="netbanking.pnbindia.in  or  103.45.0.0/24" style={{ width: '100%', paddingLeft: 40, padding: '10px 16px 10px 40px' }} />
                        </div>
                        <div>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginBottom: 4 }}>Scan Depth</div>
                            <select value={scanDepth} onChange={e => setScanDepth(e.target.value)} style={{ width: '100%' }}>
                                <option value="quick">Quick</option><option value="standard">Standard</option><option value="deep">Deep</option>
                            </select>
                        </div>
                        <div>
                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginBottom: 4 }}>Asset Type</div>
                            <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value === 'all' ? 'all' : e.target.value); }} style={{ width: '100%' }}>
                                <option value="all">All Types</option><option value="Web Server">Web Servers</option><option value="API">APIs</option><option value="VPN">VPN</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                        <div style={{ display: 'flex', gap: 20 }}>
                            {[{ l: 'Include Subdomains', v: includeSubdomains, s: setIncludeSubdomains }, { l: 'Scan Common Ports', v: scanCommonPorts, s: setScanCommonPorts }, { l: 'Deep Certificate Analysis', v: deepCertAnalysis, s: setDeepCertAnalysis }].map((o, i) => (
                                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: '#374151' }}>
                                    <CBox checked={o.v} onClick={() => o.s(!o.v)} /> {o.l}
                                </label>
                            ))}
                        </div>
                        <button className="btn-primary" onClick={startScan} disabled={scanning} style={scanning ? { background: '#6366F1', cursor: 'not-allowed' } : {}}>
                            {scanning ? <><Radar size={14} style={{ animation: 'spin 1.5s linear infinite' }} /> Scanning...</> : '▶ Start Scan'}
                        </button>
                    </div>
                    {scanning && (
                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500, color: '#374151' }}>Scanning{dots}</span>
                                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#4F46E5' }}>{scanProgress}%</span>
                            </div>
                            <div style={{ height: 6, background: '#EEF2FF', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${scanProgress}%`, background: 'linear-gradient(90deg,#4F46E5,#06B6D4)', borderRadius: 3, transition: 'width 0.3s ease' }} />
                            </div>
                            {scanLog.length > 0 && (
                                <div style={{ marginTop: 10, maxHeight: 80, overflow: 'hidden' }}>
                                    {scanLog.slice(-3).map((l, i) => (
                                        <div key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: l.c, fontWeight: l.msg.startsWith('⚠') || l.msg.startsWith('✓') ? 500 : 400, lineHeight: 1.7 }}>{l.msg}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── STAT CARDS ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {ASSET_STATS.map((s, i) => {
                        const active = typeFilter === s.type;
                        return (
                            <div key={i} onClick={() => setTypeFilter(typeFilter === s.type ? 'all' : s.type)}
                                style={{ background: '#fff', border: `1px solid ${active ? '#4F46E5' : '#E5E7EB'}`, borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'all 0.15s', boxShadow: active ? '0 0 0 3px rgba(79,70,229,0.08)' : '0 1px 4px rgba(0,0,0,0.05)' }}
                                onMouseOver={e => { if (!active) e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
                                onMouseOut={e => { if (!active) e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}>
                                <div style={{ width: 44, height: 44, borderRadius: 22, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <s.icon size={20} color={s.iconColor} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</div>
                                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 26, fontWeight: 800, color: '#111827' }}>{statValues[i]}</div>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{s.sub}</div>
                                </div>
                                {active && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, background: '#EEF2FF', color: '#4F46E5', padding: '2px 8px', borderRadius: 999, fontWeight: 600 }}>filtered</span>}
                            </div>
                        );
                    })}
                </div>

                {/* ── RESULTS TABLE ── */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Discovery Results</span>
                            <span style={{ background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE', borderRadius: 999, padding: '3px 10px', fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600 }}>{filteredAssets.length} assets</span>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={14} color="#9CA3AF" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 10 }} />
                                <input type="text" placeholder="Filter results..." value={filterText} onChange={e => setFilterText(e.target.value)} style={{ width: 220, paddingLeft: 30 }} />
                            </div>
                            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ minWidth: 140 }}>
                                <option value="all">All Status</option><option value="critical">Critical Only</option><option value="high">High Risk</option><option value="medium">Medium Risk</option><option value="pqc-ready">PQC Ready</option><option value="quantum-safe">Quantum Safe</option>
                            </select>
                            <button className="btn-ghost" onClick={handleExport} style={{ padding: '8px 12px' }}><Download size={15} /> Export</button>
                            <button className="btn-ghost" style={{ padding: '8px 10px' }}><SlidersHorizontal size={16} /></button>
                        </div>
                    </div>

                    {/* Bulk actions */}
                    {selectedRows.length > 0 && (
                        <div style={{ background: '#EEF2FF', borderBottom: '1px solid #C7D2FE', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#4F46E5' }}>{selectedRows.length} assets selected</span>
                            <button className="btn-ghost" style={{ padding: '5px 10px', fontSize: 12 }}><Wrench size={13} /> Bulk Remediate</button>
                            <button className="btn-ghost" style={{ padding: '5px 10px', fontSize: 12 }}><Download size={13} /> Export Selected</button>
                            <button className="btn-ghost" style={{ padding: '5px 10px', fontSize: 12 }}><ClipboardList size={13} /> Add to CBOM</button>
                            <div style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => setSelectedRows([])}><X size={16} color="#6B7280" /></div>
                        </div>
                    )}

                    {/* Table */}
                    {filteredAssets.length === 0 ? (
                        <div style={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                            <SearchX size={40} color="#D1D5DB" />
                            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 600, color: '#374151' }}>No assets match your filters</p>
                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#9CA3AF' }}>Try adjusting the search or filter criteria</p>
                            <button className="btn-ghost" onClick={() => { setFilterText(''); setStatusFilter('all'); setTypeFilter('all'); }}>Clear all filters</button>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: 44 }}><CBox checked={allPageSelected} indeterminate={somePageSelected} onClick={handleSelectAll} /></th>
                                        <SortHeader label="ASSET / DOMAIN" sortKey="domain" w={240} />
                                        <SortHeader label="IP ADDRESS" sortKey="ip" w={140} />
                                        <SortHeader label="PORT" sortKey="port" w={80} />
                                        <SortHeader label="TYPE" sortKey="type" w={120} />
                                        <SortHeader label="TLS VERSION" sortKey="tls" w={110} />
                                        <SortHeader label="QUANTUM STATUS" sortKey="status" w={140} />
                                        <th style={{ width: 120 }}>LAST SCANNED</th>
                                    </tr>
                                </thead>
                                <tbody key={currentPage + filterText + statusFilter + typeFilter}>
                                    {pageData.map(a => {
                                        const sel = selectedRows.includes(a.id);
                                        const ti = TYPE_ICONS[a.type] || TYPE_ICONS['Web Server'];
                                        const TIcon = ti.icon;
                                        const tc = TLS_COLORS[a.tls] || TLS_COLORS['1.2'];
                                        return (
                                            <tr key={a.id} onClick={() => { setSelectedAsset(a); setDetailDrawerOpen(true); }} style={{ background: sel ? '#EEF2FF' : undefined, cursor: 'pointer' }}>
                                                <td style={{ width: 44 }} onClick={e => e.stopPropagation()}><CBox checked={sel} onClick={() => toggleRow(a.id)} /></td>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                        <div style={{ width: 32, height: 32, borderRadius: 16, background: ti.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                            <TIcon size={15} color={ti.c} />
                                                        </div>
                                                        <div>
                                                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                                {a.domain}
                                                                {a.status === 'quantum-safe' && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, background: '#ECFDF5', color: '#059669', padding: '1px 5px', borderRadius: 999, fontWeight: 600 }}>✓ PQC</span>}
                                                            </div>
                                                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF' }}>{a.cert} cert</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: '#374151' }}>{a.ip}</td>
                                                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: '#374151', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 6, padding: '2px 8px' }}>{a.port}</span></td>
                                                <td><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500, color: '#374151', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 999, padding: '3px 10px' }}>{a.type}</span></td>
                                                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600, background: tc.bg, color: tc.color, border: `1px solid ${tc.border}`, borderRadius: 999, padding: '3px 10px' }}>TLS {a.tls}</span></td>
                                                <td><Badge type={a.status} /></td>
                                                <td style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#9CA3AF' }}>{a.lastScanned}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredAssets.length > 0 && (
                        <div style={{ padding: '14px 20px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#9CA3AF' }}>
                                Showing {(currentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filteredAssets.length)} of {filteredAssets.length} assets
                                {(filterText || statusFilter !== 'all' || typeFilter !== 'all') && ` (filtered from ${ALL_ASSETS.length} total)`}
                            </span>
                            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', border: '1px solid #E5E7EB', borderRadius: 6, cursor: currentPage === 1 ? 'default' : 'pointer', opacity: currentPage === 1 ? 0.4 : 1 }}><ChevronLeft size={14} color="#374151" /></button>
                                {getPageNums().map((pg, i) => pg === '...' ? <span key={i} style={{ padding: '0 4px', fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#9CA3AF' }}>...</span> : (
                                    <button key={i} onClick={() => setCurrentPage(pg)} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: pg === currentPage ? '#4F46E5' : 'white', color: pg === currentPage ? 'white' : '#374151', border: pg === currentPage ? '1px solid #4F46E5' : '1px solid #E5E7EB', borderRadius: 6, fontFamily: "'Inter',sans-serif", fontSize: 12, cursor: 'pointer' }}>{pg}</button>
                                ))}
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', border: '1px solid #E5E7EB', borderRadius: 6, cursor: currentPage === totalPages ? 'default' : 'pointer', opacity: currentPage === totalPages ? 0.4 : 1 }}><ChevronRight size={14} color="#374151" /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── DETAIL DRAWER ── */}
            {detailDrawerOpen && selectedAsset && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 80 }} onClick={() => setDetailDrawerOpen(false)}>
                    <div onClick={e => e.stopPropagation()} style={{ position: 'fixed', right: 0, top: 0, height: '100vh', width: 480, background: 'white', zIndex: 90, boxShadow: '-8px 0 32px rgba(0,0,0,0.12)', overflowY: 'auto', animation: 'slideInRight 0.25s ease-out' }}>
                        {/* Drawer header */}
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                {(() => { const ti = TYPE_ICONS[selectedAsset.type] || TYPE_ICONS['Web Server']; const TI = ti.icon; return <div style={{ width: 40, height: 40, borderRadius: 20, background: ti.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TI size={18} color={ti.c} /></div>; })()}
                                <div>
                                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: '#111827' }}>{selectedAsset.domain}</div>
                                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{selectedAsset.ip}:{selectedAsset.port}</div>
                                </div>
                            </div>
                            <div onClick={() => setDetailDrawerOpen(false)} style={{ cursor: 'pointer', padding: 4 }}><X size={20} color="#6B7280" /></div>
                        </div>

                        {/* Drawer body */}
                        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {/* Status banner */}
                            <div style={{ background: BADGE_STYLES[selectedAsset.status].bg, borderLeft: `4px solid ${BADGE_STYLES[selectedAsset.status].color}`, padding: '12px 16px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Badge type={selectedAsset.status} />
                                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#374151' }}>{statusMsg[selectedAsset.status]}</span>
                                </div>
                                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: BADGE_STYLES[selectedAsset.status].color }}>{selectedAsset.riskScore}/100</span>
                            </div>

                            {/* TLS Certificate */}
                            <div>
                                <SectionTitle>TLS Certificate</SectionTitle>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    {[{ l: 'SUBJECT CN', v: selectedAsset.domain }, { l: 'CERT ALGORITHM', v: selectedAsset.cert }, { l: 'KEY SIZE', v: selectedAsset.cert.includes('RSA') ? '2048-bit' : '256-bit' }, { l: 'ISSUER', v: 'DigiCert Inc' }, { l: 'VALID UNTIL', v: 'Mar 2025' }, { l: 'TLS VERSION', v: 'TLS ' + selectedAsset.tls }].map((r, i) => (
                                        <div key={i}>
                                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{r.l}</div>
                                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: '#111827' }}>{r.v}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Key Exchange */}
                            <div>
                                <SectionTitle>Key Exchange & Cipher</SectionTitle>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 600, color: '#111827' }}>{selectedAsset.keyExchange}</span>
                                    {(selectedAsset.status === 'critical' || selectedAsset.status === 'high') && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#DC2626' }}>⚠ Broken by Shor's Algorithm</span>}
                                    {selectedAsset.status === 'quantum-safe' && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#059669' }}>✓ Quantum Safe</span>}
                                </div>
                                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#374151', background: '#F8F9FC', borderRadius: 6, padding: '8px 12px', wordBreak: 'break-all' }}>{selectedAsset.cipher}</div>
                            </div>

                            {/* PQC Status */}
                            <div>
                                <SectionTitle>Post-Quantum Status</SectionTitle>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {pqcChecks(selectedAsset).map((c, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                {c.ok ? <CheckCircle size={16} color="#10B981" /> : <XCircle size={16} color="#DC2626" />}
                                                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#374151' }}>{c.n}</span>
                                            </div>
                                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500, color: c.ok ? '#10B981' : '#DC2626' }}>{c.ok ? 'Detected' : 'Not Detected'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recommended Actions */}
                            <div>
                                <SectionTitle>Recommended Actions</SectionTitle>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {actions(selectedAsset.status).map((a, i) => (
                                        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                            {a.ok ? <CheckCircle size={18} color="#10B981" style={{ marginTop: 2, flexShrink: 0 }} /> : <div style={{ width: 22, height: 22, borderRadius: 11, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, color: '#4F46E5', flexShrink: 0 }}>{i + 1}</div>}
                                            <div>
                                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{a.t}</div>
                                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{a.d}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Drawer footer */}
                        <div style={{ borderTop: '1px solid #F3F4F6', padding: '16px 24px', display: 'flex', gap: 8 }}>
                            {selectedAsset.status !== 'quantum-safe' ? (<>
                                <button className="btn-primary" onClick={() => { setDetailDrawerOpen(false); nav('tls-analyzer'); }}><ExternalLink size={14} /> View Full TLS Analysis</button>
                                <button className="btn-ghost" onClick={() => { setDetailDrawerOpen(false); nav('remediation'); }}><Wrench size={14} /> Start Remediation</button>
                            </>) : (<>
                                <button className="btn-primary" onClick={() => { setDetailDrawerOpen(false); nav('certificates'); }}><Award size={14} /> View Certificate</button>
                                <button className="btn-ghost" onClick={() => { setDetailDrawerOpen(false); nav('tls-analyzer'); }}><ExternalLink size={14} /> View TLS Details</button>
                            </>)}
                        </div>
                    </div>
                </div>
            )}

            {/* ── NEW SCAN TARGET MODAL ── */}
            {newScanModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) setNewScanModalOpen(false); }}>
                    <div className="page-animate" style={{ background: '#fff', borderRadius: 16, width: 480, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                        <Plus size={24} color="#4F46E5" />
                        <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 700, color: '#111827', marginTop: 12 }}>Add New Scan Target</h2>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Configure a new domain or IP range to monitor</p>
                        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div>
                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Target Name</div>
                                <input type="text" placeholder="PNB Payment Gateway" style={{ width: '100%' }} />
                            </div>
                            <div>
                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Domain / IP / CIDR</div>
                                <input type="text" placeholder="payments.pnbindia.in" style={{ width: '100%' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Category</div>
                                    <select style={{ width: '100%' }}><option>Corporate Banking</option><option>Retail Banking</option><option>API Gateway</option><option>VPN Infrastructure</option><option>CDN</option><option>Other</option></select>
                                </div>
                                <div>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Priority</div>
                                    <select style={{ width: '100%' }}><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select>
                                </div>
                            </div>
                            <div>
                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Notes / Description</div>
                                <textarea rows={3} placeholder="Additional context about this asset..." style={{ width: '100%', fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#111827', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '8px 12px', outline: 'none', resize: 'vertical' }} />
                            </div>
                            {['Auto-scan on add', 'Include in scheduled scans'].map((l, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: '#111827' }}>{l}</span>
                                    <div onClick={() => setModalToggles(p => p.map((v, j) => j === idx ? !v : v))} style={{ width: 40, height: 22, borderRadius: 11, background: modalToggles[idx] ? '#4F46E5' : '#E5E7EB', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                                        <div style={{ position: 'absolute', top: 2, left: modalToggles[idx] ? 20 : 2, width: 18, height: 18, borderRadius: 9, background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                                    </div>
                                </div>
                            ))}
                            <div style={{ marginTop: 8, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                <button className="btn-ghost" onClick={() => setNewScanModalOpen(false)}>Cancel</button>
                                <button className="btn-primary" onClick={() => { setNewScanModalOpen(false); setScanComplete(true); }}>Add Target</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── SCAN COMPLETE TOAST ── */}
            {scanComplete && (
                <div style={{ position: 'fixed', bottom: 24, right: 24, background: 'white', border: '1px solid #A7F3D0', borderRadius: 12, padding: '14px 18px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', display: 'flex', gap: 12, alignItems: 'center', zIndex: 200, animation: 'slideInUp 0.3s ease-out' }}>
                    <CheckCircle size={20} color="#10B981" />
                    <div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>Scan Complete</div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#6B7280' }}>247 assets discovered · 36 critical found</div>
                    </div>
                    <div onClick={() => setScanComplete(false)} style={{ cursor: 'pointer', marginLeft: 8 }}><X size={16} color="#9CA3AF" /></div>
                </div>
            )}
        </>
    );
};


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


const ALL_CBOM_COMPONENTS = [
  { id:'CBOM-001', asset:'api.pnbindia.in',          algorithm:'RSA-PKCS1-SHA256',   keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'ECDH-RSA',       status:'critical',    riskScore:91, certExpiry:'15 Mar 2025', expired:true,  type:'API',        issuer:'DigiCert Inc' },
  { id:'CBOM-002', asset:'netbanking.pnbindia.in',   algorithm:'ECDSA-SHA384',        keySize:'256-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'high',        riskScore:74, certExpiry:'01 Jun 2026', expired:false, type:'Web Server', issuer:'Sectigo CA' },
  { id:'CBOM-003', asset:'vpn.pnbindia.in',          algorithm:'RSA-PKCS1-SHA1',      keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'RSA',            status:'critical',    riskScore:95, certExpiry:'01 Jan 2026', expired:false, type:'VPN',        issuer:'Entrust CA' },
  { id:'CBOM-004', asset:'mobile.pnbindia.in',       algorithm:'ECDH-SHA256',         keySize:'256-bit',   tlsVer:'1.3', keyExchange:'ECDHE',          status:'medium',      riskScore:52, certExpiry:'15 Aug 2026', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-005', asset:'corp.pnbindia.in',         algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:18, certExpiry:'01 Feb 2027', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-006', asset:'payments.pnbindia.in',     algorithm:'RSA-2048',            keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'ECDH-RSA',       status:'critical',    riskScore:88, certExpiry:'30 Sep 2025', expired:false, type:'API',        issuer:'GlobalSign' },
  { id:'CBOM-007', asset:'sso.pnbindia.in',          algorithm:'ECDSA-P256',          keySize:'256-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'high',        riskScore:71, certExpiry:'10 Dec 2025', expired:false, type:'API',        issuer:'Sectigo CA' },
  { id:'CBOM-008', asset:'cdn.pnbindia.in',          algorithm:'ML-DSA-65',           keySize:'3309-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-768',     status:'quantum-safe',riskScore:5,  certExpiry:'01 Mar 2027', expired:false, type:'Web Server', issuer:'PNB PQC CA' },
  { id:'CBOM-009', asset:'trade.pnbindia.in',        algorithm:'DHE-RSA-2048',        keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'DHE-RSA',        status:'high',        riskScore:78, certExpiry:'20 Jul 2025', expired:false, type:'Web Server', issuer:'DigiCert Inc' },
  { id:'CBOM-010', asset:'forex.pnbindia.in',        algorithm:'AES-128-CBC',         keySize:'128-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'medium',      riskScore:49, certExpiry:'05 Nov 2025', expired:false, type:'Web Server', issuer:'Sectigo CA' },
  { id:'CBOM-011', asset:'legacy.pnbindia.in',       algorithm:'RSA-PKCS1-SHA1',      keySize:'1024-bit',  tlsVer:'1.1', keyExchange:'RSA',            status:'critical',    riskScore:98, certExpiry:'01 Dec 2024', expired:true,  type:'Web Server', issuer:'Comodo CA' },
  { id:'CBOM-012', asset:'b2b-api.pnbindia.in',      algorithm:'RSA-PKCS1-SHA256',    keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'DHE-RSA',        status:'critical',    riskScore:87, certExpiry:'14 Aug 2025', expired:false, type:'API',        issuer:'GlobalSign' },
  { id:'CBOM-013', asset:'admin.pnbindia.in',        algorithm:'RSA-PKCS1-SHA256',    keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'high',        riskScore:73, certExpiry:'30 Oct 2025', expired:false, type:'Web Server', issuer:'DigiCert Inc' },
  { id:'CBOM-014', asset:'ib.pnbindia.in',           algorithm:'RSA-PKCS1-SHA256',    keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'high',        riskScore:72, certExpiry:'22 Sep 2025', expired:false, type:'Web Server', issuer:'Sectigo CA' },
  { id:'CBOM-015', asset:'mobilebank.pnbindia.in',   algorithm:'ECDSA-P256',          keySize:'256-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'high',        riskScore:69, certExpiry:'18 Jan 2026', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-016', asset:'docs.pnbindia.in',         algorithm:'ECDSA-P256',          keySize:'256-bit',   tlsVer:'1.3', keyExchange:'X25519',         status:'medium',      riskScore:48, certExpiry:'01 Apr 2026', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-017', asset:'internal.pnbindia.in',     algorithm:'ECDSA-P384',          keySize:'384-bit',   tlsVer:'1.3', keyExchange:'ECDHE',          status:'medium',      riskScore:44, certExpiry:'15 May 2026', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-018', asset:'portal.pnbindia.in',       algorithm:'ECDSA-P256',          keySize:'256-bit',   tlsVer:'1.3', keyExchange:'X25519',         status:'medium',      riskScore:46, certExpiry:'01 Jul 2026', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-019', asset:'loans.pnbindia.in',        algorithm:'ECDSA-P256',          keySize:'256-bit',   tlsVer:'1.3', keyExchange:'ECDHE',          status:'medium',      riskScore:51, certExpiry:'20 Aug 2026', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-020', asset:'cards.pnbindia.in',        algorithm:'ECDSA-P384',          keySize:'384-bit',   tlsVer:'1.3', keyExchange:'X25519',         status:'medium',      riskScore:43, certExpiry:'10 Sep 2026', expired:false, type:'API',        issuer:'Sectigo CA' },
  { id:'CBOM-021', asset:'static.pnbindia.in',       algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:15, certExpiry:'01 Feb 2027', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-022', asset:'reporting.pnbindia.in',    algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:14, certExpiry:'01 Mar 2027', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-023', asset:'analytics.pnbindia.in',    algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:16, certExpiry:'15 Mar 2027', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-024', asset:'gateway.pnbindia.in',      algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:13, certExpiry:'01 Apr 2027', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-025', asset:'assets.pnbindia.in',       algorithm:'ML-DSA-65',           keySize:'3309-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-768',     status:'quantum-safe',riskScore:4,  certExpiry:'15 Mar 2027', expired:false, type:'Web Server', issuer:'PNB PQC CA' },
  { id:'CBOM-026', asset:'media.pnbindia.in',        algorithm:'SLH-DSA',             keySize:'7856-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-1024',    status:'quantum-safe',riskScore:3,  certExpiry:'01 Apr 2027', expired:false, type:'Web Server', issuer:'PNB PQC CA' },
  { id:'CBOM-027', asset:'secure-api.pnbindia.in',   algorithm:'ML-DSA-65',           keySize:'3309-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-768',     status:'quantum-safe',riskScore:5,  certExpiry:'15 Apr 2027', expired:false, type:'API',        issuer:'PNB PQC CA' },
  { id:'CBOM-028', asset:'pqc-test.pnbindia.in',     algorithm:'ML-DSA-87',           keySize:'4627-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-1024',    status:'quantum-safe',riskScore:2,  certExpiry:'01 May 2027', expired:false, type:'API',        issuer:'PNB PQC CA' },
  { id:'CBOM-029', asset:'infra.pnbindia.in',        algorithm:'ML-DSA-65',           keySize:'3309-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-768',     status:'quantum-safe',riskScore:4,  certExpiry:'01 May 2027', expired:false, type:'Web Server', issuer:'PNB PQC CA' },
  { id:'CBOM-030', asset:'cloud.pnbindia.in',        algorithm:'SLH-DSA',             keySize:'7856-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-1024',    status:'quantum-safe',riskScore:3,  certExpiry:'15 May 2027', expired:false, type:'Web Server', issuer:'PNB PQC CA' },
  // Critical/High mix — branch/region assets
  { id:'CBOM-031', asset:'branch1.pnbindia.in',      algorithm:'RSA-PKCS1-SHA256',    keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'RSA',            status:'critical',    riskScore:90, certExpiry:'20 Mar 2025', expired:true,  type:'Web Server', issuer:'DigiCert Inc' },
  { id:'CBOM-032', asset:'branch2.pnbindia.in',      algorithm:'RSA-PKCS1-SHA1',      keySize:'1024-bit',  tlsVer:'1.1', keyExchange:'RSA',            status:'critical',    riskScore:96, certExpiry:'10 Feb 2025', expired:true,  type:'Web Server', issuer:'Comodo CA' },
  { id:'CBOM-033', asset:'branch3.pnbindia.in',      algorithm:'RSA-PKCS1-SHA256',    keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'DHE-RSA',        status:'critical',    riskScore:85, certExpiry:'01 Apr 2025', expired:false, type:'Web Server', issuer:'GlobalSign' },
  { id:'CBOM-034', asset:'region1.pnbindia.in',      algorithm:'RSA-2048',            keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'ECDH-RSA',       status:'critical',    riskScore:89, certExpiry:'15 Jun 2025', expired:false, type:'Web Server', issuer:'DigiCert Inc' },
  { id:'CBOM-035', asset:'region2.pnbindia.in',      algorithm:'DHE-RSA-2048',        keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'DHE-RSA',        status:'high',        riskScore:76, certExpiry:'01 Jul 2025', expired:false, type:'Web Server', issuer:'GlobalSign' },
  { id:'CBOM-036', asset:'region3.pnbindia.in',      algorithm:'ECDSA-SHA384',        keySize:'256-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'high',        riskScore:70, certExpiry:'22 Aug 2025', expired:false, type:'Web Server', issuer:'Sectigo CA' },
  { id:'CBOM-037', asset:'api-v2.pnbindia.in',       algorithm:'RSA-PKCS1-SHA256',    keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'high',        riskScore:75, certExpiry:'30 Sep 2025', expired:false, type:'API',        issuer:'DigiCert Inc' },
  { id:'CBOM-038', asset:'api-v3.pnbindia.in',       algorithm:'ECDSA-SHA384',        keySize:'256-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'high',        riskScore:68, certExpiry:'15 Oct 2025', expired:false, type:'API',        issuer:'Sectigo CA' },
  { id:'CBOM-039', asset:'svc1.pnbindia.in',         algorithm:'RSA-2048',            keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'RSA',            status:'critical',    riskScore:92, certExpiry:'05 May 2025', expired:false, type:'API',        issuer:'GlobalSign' },
  { id:'CBOM-040', asset:'svc2.pnbindia.in',         algorithm:'RSA-PKCS1-SHA256',    keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'DHE-RSA',        status:'critical',    riskScore:86, certExpiry:'18 Jun 2025', expired:false, type:'API',        issuer:'DigiCert Inc' },
  // Medium risk assets
  { id:'CBOM-041', asset:'app1.pnbindia.in',         algorithm:'ECDH-SHA256',         keySize:'256-bit',   tlsVer:'1.3', keyExchange:'ECDHE',          status:'medium',      riskScore:50, certExpiry:'01 Sep 2026', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-042', asset:'app2.pnbindia.in',         algorithm:'AES-128-CBC',         keySize:'128-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'medium',      riskScore:47, certExpiry:'15 Oct 2026', expired:false, type:'Web Server', issuer:'Sectigo CA' },
  { id:'CBOM-043', asset:'app3.pnbindia.in',         algorithm:'ECDSA-P256',          keySize:'256-bit',   tlsVer:'1.3', keyExchange:'X25519',         status:'medium',      riskScore:45, certExpiry:'01 Nov 2026', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-044', asset:'partner1.pnbindia.in',     algorithm:'ECDSA-P384',          keySize:'384-bit',   tlsVer:'1.3', keyExchange:'ECDHE',          status:'medium',      riskScore:42, certExpiry:'20 Dec 2026', expired:false, type:'API',        issuer:'Sectigo CA' },
  { id:'CBOM-045', asset:'partner2.pnbindia.in',     algorithm:'ECDH-SHA256',         keySize:'256-bit',   tlsVer:'1.3', keyExchange:'X25519',         status:'medium',      riskScore:53, certExpiry:'10 Jan 2027', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-046', asset:'svc3.pnbindia.in',         algorithm:'AES-128-CBC',         keySize:'128-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'medium',      riskScore:48, certExpiry:'25 Feb 2026', expired:false, type:'API',        issuer:'Sectigo CA' },
  { id:'CBOM-047', asset:'branch4.pnbindia.in',      algorithm:'ECDSA-P256',          keySize:'256-bit',   tlsVer:'1.3', keyExchange:'ECDHE',          status:'medium',      riskScore:46, certExpiry:'01 Mar 2026', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-048', asset:'region4.pnbindia.in',      algorithm:'ECDSA-P384',          keySize:'384-bit',   tlsVer:'1.3', keyExchange:'X25519',         status:'medium',      riskScore:41, certExpiry:'15 Apr 2026', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-049', asset:'branch5.pnbindia.in',      algorithm:'ECDH-SHA256',         keySize:'256-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'medium',      riskScore:55, certExpiry:'14 Mar 2026', expired:false, type:'Web Server', issuer:'Sectigo CA' },
  { id:'CBOM-050', asset:'app4.pnbindia.in',         algorithm:'AES-128-CBC',         keySize:'128-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'medium',      riskScore:50, certExpiry:'20 Mar 2026', expired:false, type:'Web Server', issuer:'Sectigo CA' },
  // PQC-ready assets
  { id:'CBOM-051', asset:'api-v4.pnbindia.in',       algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:17, certExpiry:'01 May 2027', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-052', asset:'svc4.pnbindia.in',         algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:16, certExpiry:'15 May 2027', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-053', asset:'partner3.pnbindia.in',     algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:19, certExpiry:'01 Jun 2027', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-054', asset:'region5.pnbindia.in',      algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:15, certExpiry:'15 Jun 2027', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-055', asset:'branch6.pnbindia.in',      algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:14, certExpiry:'01 Jul 2027', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-056', asset:'app5.pnbindia.in',         algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:18, certExpiry:'15 Jul 2027', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-057', asset:'partner4.pnbindia.in',     algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:12, certExpiry:'01 Aug 2027', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-058', asset:'svc5.pnbindia.in',         algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:11, certExpiry:'15 Aug 2027', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-059', asset:'region6.pnbindia.in',      algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:13, certExpiry:'01 Sep 2027', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-060', asset:'branch7.pnbindia.in',      algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:16, certExpiry:'15 Sep 2027', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-061', asset:'api-v5.pnbindia.in',       algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:15, certExpiry:'01 Oct 2027', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-062', asset:'app6.pnbindia.in',         algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:17, certExpiry:'15 Oct 2027', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  // More quantum-safe
  { id:'CBOM-063', asset:'secure-gw.pnbindia.in',    algorithm:'ML-DSA-87',           keySize:'4627-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-1024',    status:'quantum-safe',riskScore:2,  certExpiry:'01 Jun 2027', expired:false, type:'API',        issuer:'PNB PQC CA' },
  { id:'CBOM-064', asset:'pqc-prod.pnbindia.in',     algorithm:'ML-DSA-65',           keySize:'3309-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-768',     status:'quantum-safe',riskScore:4,  certExpiry:'15 Jun 2027', expired:false, type:'Web Server', issuer:'PNB PQC CA' },
  { id:'CBOM-065', asset:'vault.pnbindia.in',        algorithm:'SLH-DSA',             keySize:'7856-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-1024',    status:'quantum-safe',riskScore:1,  certExpiry:'01 Jul 2027', expired:false, type:'API',        issuer:'PNB PQC CA' },
  // More critical/high
  { id:'CBOM-066', asset:'branch8.pnbindia.in',      algorithm:'RSA-PKCS1-SHA1',      keySize:'1024-bit',  tlsVer:'1.0', keyExchange:'RSA',            status:'critical',    riskScore:99, certExpiry:'01 Nov 2024', expired:true,  type:'Web Server', issuer:'Comodo CA' },
  { id:'CBOM-067', asset:'branch9.pnbindia.in',      algorithm:'RSA-PKCS1-SHA256',    keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'RSA',            status:'critical',    riskScore:89, certExpiry:'12 Mar 2026', expired:false, type:'Web Server', issuer:'DigiCert Inc' },
  { id:'CBOM-068', asset:'region7.pnbindia.in',      algorithm:'RSA-2048',            keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'ECDH-RSA',       status:'critical',    riskScore:87, certExpiry:'25 Mar 2026', expired:false, type:'Web Server', issuer:'GlobalSign' },
  { id:'CBOM-069', asset:'svc6.pnbindia.in',         algorithm:'DHE-RSA-2048',        keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'DHE-RSA',        status:'high',        riskScore:77, certExpiry:'01 Apr 2026', expired:false, type:'API',        issuer:'DigiCert Inc' },
  { id:'CBOM-070', asset:'svc7.pnbindia.in',         algorithm:'ECDSA-SHA384',        keySize:'256-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'high',        riskScore:72, certExpiry:'15 Apr 2026', expired:false, type:'API',        issuer:'Sectigo CA' },
  { id:'CBOM-071', asset:'partner5.pnbindia.in',     algorithm:'RSA-PKCS1-SHA256',    keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'DHE-RSA',        status:'high',        riskScore:74, certExpiry:'01 May 2026', expired:false, type:'Web Server', issuer:'GlobalSign' },
  { id:'CBOM-072', asset:'app7.pnbindia.in',         algorithm:'ECDSA-SHA384',        keySize:'256-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'high',        riskScore:68, certExpiry:'15 May 2026', expired:false, type:'Web Server', issuer:'Sectigo CA' },
  // Medium
  { id:'CBOM-073', asset:'branch10.pnbindia.in',     algorithm:'ECDSA-P256',          keySize:'256-bit',   tlsVer:'1.3', keyExchange:'ECDHE',          status:'medium',      riskScore:44, certExpiry:'01 Jun 2026', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-074', asset:'region8.pnbindia.in',      algorithm:'ECDSA-P384',          keySize:'384-bit',   tlsVer:'1.3', keyExchange:'X25519',         status:'medium',      riskScore:40, certExpiry:'15 Jun 2026', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-075', asset:'app8.pnbindia.in',         algorithm:'AES-128-CBC',         keySize:'128-bit',   tlsVer:'1.2', keyExchange:'ECDHE-RSA',      status:'medium',      riskScore:51, certExpiry:'01 Jul 2026', expired:false, type:'Web Server', issuer:'Sectigo CA' },
  { id:'CBOM-076', asset:'svc8.pnbindia.in',         algorithm:'ECDH-SHA256',         keySize:'256-bit',   tlsVer:'1.3', keyExchange:'ECDHE',          status:'medium',      riskScore:54, certExpiry:'15 Jul 2026', expired:false, type:'API',        issuer:"Let's Encrypt" },
  // More PQC-ready
  { id:'CBOM-077', asset:'partner6.pnbindia.in',     algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:14, certExpiry:'01 Nov 2027', expired:false, type:'API',        issuer:"Let's Encrypt" },
  { id:'CBOM-078', asset:'branch11.pnbindia.in',     algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:16, certExpiry:'15 Nov 2027', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  { id:'CBOM-079', asset:'region9.pnbindia.in',      algorithm:'ML-KEM-768',          keySize:'1184-bit',  tlsVer:'1.3', keyExchange:'X25519Kyber768', status:'pqc-ready',   riskScore:15, certExpiry:'01 Dec 2027', expired:false, type:'Web Server', issuer:"Let's Encrypt" },
  // Critical tail
  { id:'CBOM-080', asset:'branch12.pnbindia.in',     algorithm:'RSA-PKCS1-SHA1',      keySize:'1024-bit',  tlsVer:'1.0', keyExchange:'RSA',            status:'critical',    riskScore:97, certExpiry:'15 Oct 2024', expired:true,  type:'Web Server', issuer:'Comodo CA' },
  { id:'CBOM-081', asset:'svc9.pnbindia.in',         algorithm:'RSA-2048',            keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'RSA',            status:'critical',    riskScore:90, certExpiry:'01 Sep 2025', expired:false, type:'API',        issuer:'GlobalSign' },
  { id:'CBOM-082', asset:'region10.pnbindia.in',     algorithm:'RSA-PKCS1-SHA256',    keySize:'2048-bit',  tlsVer:'1.2', keyExchange:'DHE-RSA',        status:'high',        riskScore:73, certExpiry:'10 Apr 2026', expired:false, type:'Web Server', issuer:'DigiCert Inc' },
  // Quantum safe tail
  { id:'CBOM-083', asset:'pqc-staging.pnbindia.in',  algorithm:'ML-DSA-65',           keySize:'3309-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-768',     status:'quantum-safe',riskScore:5,  certExpiry:'01 Aug 2027', expired:false, type:'Web Server', issuer:'PNB PQC CA' },
  { id:'CBOM-084', asset:'secure-cdn.pnbindia.in',   algorithm:'SLH-DSA',             keySize:'7856-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-1024',    status:'quantum-safe',riskScore:2,  certExpiry:'15 Aug 2027', expired:false, type:'Web Server', issuer:'PNB PQC CA' },
  { id:'CBOM-085', asset:'pqc-api.pnbindia.in',      algorithm:'ML-DSA-87',           keySize:'4627-bit',  tlsVer:'1.3', keyExchange:'ML-KEM-1024',    status:'quantum-safe',riskScore:1,  certExpiry:'01 Sep 2027', expired:false, type:'API',        issuer:'PNB PQC CA' },
];

const ALGO_DISTRIBUTION = [
  { algo:'RSA-PKCS1-SHA256', count:89,  safe:false, color:'#EF4444' },
  { algo:'ECDSA-SHA384',     count:67,  safe:false, color:'#F97316' },
  { algo:'ECDH-SHA256',      count:54,  safe:false, color:'#F97316' },
  { algo:'AES-128-CBC',      count:43,  safe:false, color:'#F59E0B' },
  { algo:'RSA-PKCS1-SHA1',   count:31,  safe:false, color:'#EF4444' },
  { algo:'DHE-RSA-2048',     count:28,  safe:false, color:'#F97316' },
  { algo:'ECDSA-P256',       count:22,  safe:false, color:'#F59E0B' },
  { algo:'AES-256-GCM',      count:18,  safe:true,  color:'#10B981' },
  { algo:'ML-KEM-768',       count:14,  safe:true,  color:'#059669' },
  { algo:'ML-DSA-65',        count:9,   safe:true,  color:'#059669' },
  { algo:'SLH-DSA',          count:5,   safe:true,  color:'#059669' },
  { algo:'ML-DSA-87',        count:3,   safe:true,  color:'#059669' },
];

const TLS_DISTRIBUTION = [
  { name:'TLS 1.0', value:8,   color:'#DC2626' },
  { name:'TLS 1.1', value:19,  color:'#EA580C' },
  { name:'TLS 1.2', value:172, color:'#F59E0B' },
  { name:'TLS 1.3', value:48,  color:'#10B981' },
];

const KEY_EXCHANGE_DIST = [
  { name:'RSA',            count:89,  safe:false },
  { name:'ECDHE-RSA',      count:94,  safe:false },
  { name:'DHE-RSA',        count:43,  safe:false },
  { name:'ECDHE',          count:27,  safe:false },
  { name:'X25519',         count:18,  safe:false },
  { name:'X25519Kyber768', count:38,  safe:true  },
  { name:'ML-KEM-768',     count:24,  safe:true  },
  { name:'ML-KEM-1024',    count:14,  safe:true  },
];


const CBOMPage = ({ nav }) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'riskScore', dir: 'desc' });
  const [expandedRow, setExpandedRow] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [kpiAnimated, setKpiAnimated] = useState(false);
  const [toast, setToast] = useState(null);
  const tableRef = useRef(null);

  const ROWS_PER_PAGE = 10;

  // KPI count-up animation
  useEffect(() => { const t = setTimeout(() => setKpiAnimated(true), 50); return () => clearTimeout(t); }, []);

  const AnimatedNumber = ({ value, color }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
      if (!kpiAnimated) { setDisplay(0); return; }
      const dur = 600; const start = performance.now(); const target = value;
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, [kpiAnimated, value]);
    return <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 36, fontWeight: 800, color, marginTop: 12, display: 'block' }}>{display}</span>;
  };

  // Filter + Sort + Paginate
  const filtered = useMemo(() => {
    let data = ALL_CBOM_COMPONENTS;
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      data = data.filter(c => c.id.toLowerCase().includes(q) || c.asset.toLowerCase().includes(q) || c.algorithm.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q));
    }
    if (statusFilter === 'expiring') {
      data = data.filter(c => { const d = new Date(c.certExpiry); const now = new Date(); const diff = (d - now) / (1000*60*60*24); return diff >= 0 && diff <= 30; });
    } else if (statusFilter === 'pqc-all') {
      data = data.filter(c => c.status === 'quantum-safe' || c.status === 'pqc-ready');
    } else if (statusFilter !== 'all') {
      data = data.filter(c => c.status === statusFilter);
    }
    data = [...data].sort((a, b) => {
      const dir = sortConfig.dir === 'desc' ? -1 : 1;
      if (sortConfig.key === 'riskScore') return (a.riskScore - b.riskScore) * dir;
      if (sortConfig.key === 'id') return a.id.localeCompare(b.id) * dir;
      if (sortConfig.key === 'asset') return a.asset.localeCompare(b.asset) * dir;
      if (sortConfig.key === 'algorithm') return a.algorithm.localeCompare(b.algorithm) * dir;
      if (sortConfig.key === 'tlsVer') return a.tlsVer.localeCompare(b.tlsVer) * dir;
      if (sortConfig.key === 'status') {
        const order = { critical: 0, high: 1, medium: 2, 'pqc-ready': 3, 'quantum-safe': 4 };
        return ((order[a.status] || 0) - (order[b.status] || 0)) * dir;
      }
      return 0;
    });
    return data;
  }, [searchText, statusFilter, sortConfig]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const pageData = filtered.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  useEffect(() => setCurrentPage(1), [searchText, statusFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => prev.key === key ? { key, dir: prev.dir === 'desc' ? 'asc' : 'desc' } : { key, dir: 'desc' });
  };

  const toggleRow = (id) => setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  const toggleSelectAll = () => {
    if (selectAll) { setSelectedRows([]); setSelectAll(false); }
    else { setSelectedRows(pageData.map(c => c.id)); setSelectAll(true); }
  };

  useEffect(() => {
    const allOnPage = pageData.every(c => selectedRows.includes(c.id));
    setSelectAll(pageData.length > 0 && allOnPage);
  }, [selectedRows, pageData]);

  const copyId = (e, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // Export functions
  const exportCSV = (rows) => {
    const data = rows || ALL_CBOM_COMPONENTS;
    const headers = 'COMP ID,Asset,Algorithm,Key Size,TLS Version,Key Exchange,Quantum Status,Risk Score,Cert Expiry,Issuer';
    const csv = [headers, ...data.map(c => `${c.id},${c.asset},${c.algorithm},${c.keySize},${c.tlsVer},${c.keyExchange},${c.status},${c.riskScore},${c.certExpiry},${c.issuer}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'cbom-inventory.csv'; a.click(); URL.revokeObjectURL(url);
    showToast('cbom-inventory.csv downloaded');
  };

  const exportJSON = () => {
    const envelope = { bomFormat: 'CycloneDX', specVersion: '1.5', version: 1, metadata: { timestamp: new Date().toISOString(), component: { name: 'PNB Public Assets' } }, components: ALL_CBOM_COMPONENTS };
    const blob = new Blob([JSON.stringify(envelope, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'cbom-cyclonedx.json'; a.click(); URL.revokeObjectURL(url);
    showToast('cbom-cyclonedx.json downloaded');
  };

  const exportXML = () => {
    let xml = '<?xml version="1.0"?>\n<bom xmlns="http://cyclonedx.org/schema/bom/1.5" version="1">\n  <components>\n';
    ALL_CBOM_COMPONENTS.forEach(c => { xml += `    <component type="cryptographic-asset">\n      <name>${c.asset}</name>\n      <algorithm>${c.algorithm}</algorithm>\n      <keySize>${c.keySize}</keySize>\n      <tlsVersion>${c.tlsVer}</tlsVersion>\n      <keyExchange>${c.keyExchange}</keyExchange>\n      <status>${c.status}</status>\n      <riskScore>${c.riskScore}</riskScore>\n    </component>\n`; });
    xml += '  </components>\n</bom>';
    const blob = new Blob([xml], { type: 'application/xml' }); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'cbom-cyclonedx.xml'; a.click(); URL.revokeObjectURL(url);
    showToast('cbom-cyclonedx.xml downloaded');
  };

  const exportPDF = () => { showToast('PDF generation initiated...'); };

  // Color helpers
  const getAlgoColor = (algo) => {
    if (/^ML-KEM|^ML-DSA|^SLH-DSA/.test(algo)) return '#059669';
    if (/X25519Kyber/.test(algo)) return '#2563EB';
    if (/^RSA/.test(algo)) return '#DC2626';
    if (/^ECDH|^ECDSA|^DHE/.test(algo)) return '#D97706';
    if (/AES-128/.test(algo)) return '#7C3AED';
    return '#374151';
  };

  const getKeySizeColor = (ks) => {
    const num = parseInt(ks);
    if (num >= 3000) return '#059669';
    if (num >= 256 && num <= 384) return '#D97706';
    if (num < 256) return '#DC2626';
    return '#D97706';
  };

  const getKexColor = (kex) => {
    if (/^ML-KEM/.test(kex)) return '#059669';
    if (/X25519Kyber/.test(kex)) return '#2563EB';
    if (kex === 'RSA') return '#DC2626';
    if (/DHE-RSA/.test(kex)) return '#EA580C';
    return '#D97706';
  };

  const getTlsPill = (ver) => {
    const styles = {
      '1.3': { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
      '1.2': { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
      '1.1': { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
      '1.0': { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
    };
    return styles[ver] || styles['1.2'];
  };

  const getScoreColor = (s) => {
    if (s >= 90) return '#DC2626';
    if (s >= 70) return '#EA580C';
    if (s >= 50) return '#7C3AED';
    if (s >= 20) return '#D97706';
    return '#059669';
  };

  const getTypeIcon = (type) => {
    if (type === 'API') return { Icon: Code2, bg: '#EEF2FF', color: '#4F46E5' };
    if (type === 'VPN') return { Icon: Network, bg: '#F5F3FF', color: '#8B5CF6' };
    return { Icon: Globe, bg: '#EFF6FF', color: '#3B82F6' };
  };

  const isSafe = (status) => status === 'quantum-safe' || status === 'pqc-ready';

  // Pagination
  const getPages = () => {
    const pages = []; const tp = totalPages;
    if (tp <= 7) { for (let i = 1; i <= tp; i++) pages.push(i); return pages; }
    pages.push(1, 2, 3);
    if (currentPage > 5) pages.push('...');
    for (let i = Math.max(4, currentPage - 1); i <= Math.min(tp - 1, currentPage + 1); i++) { if (!pages.includes(i)) pages.push(i); }
    if (currentPage < tp - 4) pages.push('...');
    if (!pages.includes(tp)) pages.push(tp);
    return pages;
  };

  const SortHeader = ({ label, sortKey, width, align }) => (
    <th onClick={() => handleSort(sortKey)} style={{ width, cursor: 'pointer', textAlign: align || 'left', color: sortConfig.key === sortKey ? '#4F46E5' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
        {label}
        {sortConfig.key === sortKey ? (sortConfig.dir === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />) : <ChevronsUpDown size={12} style={{ opacity: 0.4 }} />}
      </div>
    </th>
  );

  const kpiCards = [
    { l: 'TOTAL COMPONENTS', v: 847, c: '#6B7280', vc: '#111827', Icon: Hash, onClick: null },
    { l: 'UNIQUE ALGORITHMS', v: 23, c: '#4F46E5', vc: '#4F46E5', Icon: GitBranch, onClick: null },
    { l: 'EXPIRING < 30 DAYS', v: 12, c: '#F59E0B', vc: '#F59E0B', Icon: Clock, onClick: () => { setStatusFilter('expiring'); tableRef.current?.scrollIntoView({ behavior: 'smooth' }); } },
    { l: 'PQC COMPONENTS', v: 14, c: '#10B981', vc: '#10B981', Icon: ShieldCheck, onClick: () => { setStatusFilter('pqc-all'); tableRef.current?.scrollIntoView({ behavior: 'smooth' }); } },
  ];

  return (
    <div>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 20 }}>
        {kpiCards.map((k, i) => (
          <div key={i} onClick={k.onClick} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', cursor: k.onClick ? 'pointer' : 'default', transition: 'box-shadow 0.15s' }}
            onMouseOver={e => { if (k.onClick) e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k.l}</div>
              <k.Icon size={20} color={k.c} />
            </div>
            <AnimatedNumber value={k.v} color={k.vc} />
          </div>
        ))}
      </div>

      {/* Export Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#6B7280' }}>Cryptographic Bill of Materials</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF' }}> · CycloneDX v1.5 Format</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ display: 'flex', border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
            {['JSON', 'XML', 'CSV'].map((fmt, i) => (
              <button key={fmt} onClick={fmt === 'JSON' ? exportJSON : fmt === 'XML' ? exportXML : () => exportCSV()} style={{
                padding: '8px 14px', background: '#fff', border: 'none', borderRight: i < 2 ? '1px solid #E5E7EB' : 'none',
                fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer'
              }} onMouseOver={e => e.currentTarget.style.background = '#F9FAFB'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>{fmt}</button>
            ))}
          </div>
          <button className="btn-primary" onClick={exportPDF} style={{ marginLeft: 8 }}>
            <Download size={14} /> PDF Report
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div ref={tableRef} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
        {/* Card Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Cryptographic Components</span>
            <span style={{ background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE', borderRadius: 999, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, padding: '3px 10px' }}>
              {filtered.length} components
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} color="#9CA3AF" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 10, pointerEvents: 'none' }} />
              <input type="text" placeholder="Search components..." value={searchText} onChange={e => setSearchText(e.target.value)}
                style={{ width: 260, paddingLeft: 34, background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '7px 12px 7px 34px' }} />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              style={{ minWidth: 150, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, padding: '7px 32px 7px 12px', fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151', appearance: 'auto' }}>
              <option value="all">All Components</option>
              <option value="critical">Critical Only</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="pqc-ready">PQC Ready</option>
              <option value="quantum-safe">Quantum Safe</option>
              <option value="expiring">Expiring Soon</option>
              <option value="pqc-all">All PQC</option>
            </select>
            <div style={{ width: 32, height: 32, border: '1px solid #E5E7EB', borderRadius: 6, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              onMouseOver={e => e.currentTarget.style.background = '#F9FAFB'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
              <SlidersHorizontal size={16} color="#6B7280" />
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedRows.length > 0 && (
          <div style={{ background: '#EEF2FF', borderBottom: '1px solid #C7D2FE', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeInUp 0.15s ease-out' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#4F46E5' }}>
              {selectedRows.length} component{selectedRows.length !== 1 ? 's' : ''} selected
            </span>
            <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => exportCSV(ALL_CBOM_COMPONENTS.filter(c => selectedRows.includes(c.id)))}>
              <Download size={12} /> Export Selected
            </button>
            <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => nav('remediation')}>
              <Wrench size={12} /> Bulk Remediate
            </button>
            <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => nav('tls-analyzer')}>
              <Lock size={12} /> View in TLS Analyzer
            </button>
            <div style={{ flex: 1 }} />
            <X size={16} color="#4F46E5" style={{ cursor: 'pointer' }} onClick={() => setSelectedRows([])} />
          </div>
        )}

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
              <AlertTriangle size={48} color="#D1D5DB" />
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, color: '#374151', marginTop: 12 }}>No components match your criteria</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Try adjusting the search term or risk filter</div>
              <button className="btn-ghost" style={{ marginTop: 16 }} onClick={() => { setSearchText(''); setStatusFilter('all'); }}>Clear all filters</button>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th style={{ width: 44 }}>
                    <input type="checkbox" checked={selectAll} ref={el => { if (el) el.indeterminate = selectedRows.length > 0 && !selectAll; }}
                      onChange={toggleSelectAll} style={{ cursor: 'pointer' }} />
                  </th>
                  <SortHeader label="COMP ID" sortKey="id" width={110} />
                  <SortHeader label="ASSET" sortKey="asset" width={undefined} />
                  <SortHeader label="ALGORITHM" sortKey="algorithm" width={180} />
                  <th style={{ width: 110 }}>KEY SIZE</th>
                  <SortHeader label="TLS VER" sortKey="tlsVer" width={90} />
                  <th style={{ width: 160 }}>KEY EXCHANGE</th>
                  <SortHeader label="QUANTUM STATUS" sortKey="status" width={140} />
                  <SortHeader label="RISK SCORE" sortKey="riskScore" width={100} align="right" />
                </tr>
              </thead>
              <tbody key={searchText + statusFilter + currentPage}>
                {pageData.map((c) => {
                  const typeInfo = getTypeIcon(c.type);
                  const isSelected = selectedRows.includes(c.id);
                  const isExpanded = expandedRow === c.id;
                  const tlsStyle = getTlsPill(c.tlsVer);
                  const scoreColor = getScoreColor(c.riskScore);

                  return (
                    <React.Fragment key={c.id}>
                      <tr onClick={() => setExpandedRow(isExpanded ? null : c.id)}
                        style={{ background: isSelected ? '#EEF2FF' : isExpanded ? '#F8F9FC' : '#fff', cursor: 'pointer', transition: 'background 0.1s', borderBottom: isExpanded ? '2px solid #C7D2FE' : undefined }}
                        onMouseOver={e => { if (!isSelected && !isExpanded) e.currentTarget.style.background = '#FAFAFA'; }}
                        onMouseOut={e => { if (!isSelected && !isExpanded) e.currentTarget.style.background = '#fff'; }}>
                        <td onClick={e => e.stopPropagation()}>
                          <input type="checkbox" checked={isSelected} onChange={() => toggleRow(c.id)} style={{ cursor: 'pointer' }} />
                        </td>
                        <td style={{ position: 'relative' }}>
                          <span onClick={e => copyId(e, c.id)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: '#4F46E5', cursor: 'pointer', transition: 'background 0.2s', padding: '2px 4px', borderRadius: 4, background: copiedId === c.id ? '#EEF2FF' : 'transparent' }}
                            onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'} onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}>
                            {c.id}
                          </span>
                          {copiedId === c.id && (
                            <span style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', background: '#4F46E5', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4, fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap', animation: 'fadeInUp 0.15s ease-out' }}>Copied!</span>
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 20, height: 20, borderRadius: 10, background: typeInfo.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <typeInfo.Icon size={11} color={typeInfo.color} />
                            </div>
                            <div>
                              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{c.asset}</div>
                              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{c.issuer}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: getAlgoColor(c.algorithm), fontWeight: /^ML-|^SLH-|X25519Kyber/.test(c.algorithm) ? 600 : 400 }}>{c.algorithm}</td>
                        <td style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: getKeySizeColor(c.keySize) }}>{c.keySize}</td>
                        <td>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, background: tlsStyle.bg, color: tlsStyle.color, border: `1px solid ${tlsStyle.border}`, borderRadius: 999, padding: '2px 8px', display: 'inline-block' }}>{c.tlsVer}</span>
                        </td>
                        <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: getKexColor(c.keyExchange), fontWeight: /^ML-KEM|X25519Kyber|^RSA$/.test(c.keyExchange) ? 600 : 400 }}>{c.keyExchange}</td>
                        <td><Badge type={c.status} /></td>
                        <td style={{ textAlign: 'right', position: 'relative' }}>
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 800, color: scoreColor }}>{c.riskScore}</span>
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: '#F3F4F6', borderRadius: 1 }}>
                            <div style={{ width: c.riskScore + '%', height: '100%', background: scoreColor, borderRadius: 1, transition: 'width 0.3s ease' }} />
                          </div>
                        </td>
                      </tr>
                      {/* Expanded Row */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={9} style={{ padding: 0, background: '#F8F9FC', borderBottom: '1px solid #E5E7EB' }}>
                            <div style={{ padding: '16px 20px', animation: 'fadeInUp 0.2s ease-out' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
                                {/* Certificate Details */}
                                <div>
                                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Certificate Details</div>
                                  {[['Subject', c.asset], ['Issuer', c.issuer], ['Valid Until', c.certExpiry], ['Type', c.type]].map(([l, v], i) => (
                                    <div key={i} style={{ marginBottom: 6 }}>
                                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF' }}>{l}</div>
                                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: l === 'Valid Until' && c.expired ? '#DC2626' : '#374151', fontWeight: 500 }}>{v}{c.expired && l === 'Valid Until' ? ' (EXPIRED)' : ''}</div>
                                    </div>
                                  ))}
                                </div>
                                {/* Cryptographic Profile */}
                                <div>
                                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Cryptographic Profile</div>
                                  {[['Algorithm', c.algorithm, getAlgoColor(c.algorithm)], ['Key Size', c.keySize, getKeySizeColor(c.keySize)], ['Key Exchange', c.keyExchange, getKexColor(c.keyExchange)], ['TLS Version', c.tlsVer, getTlsPill(c.tlsVer).color]].map(([l, v, clr], i) => (
                                    <div key={i} style={{ marginBottom: 6 }}>
                                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF' }}>{l}</div>
                                      <div style={{ fontFamily: l === 'Algorithm' || l === 'Key Exchange' ? "'JetBrains Mono', monospace" : "'Inter', sans-serif", fontSize: 11, color: clr, fontWeight: 600 }}>{v}</div>
                                    </div>
                                  ))}
                                </div>
                                {/* Quantum Assessment */}
                                <div>
                                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Quantum Assessment</div>
                                  {[["Shor's Risk", !isSafe(c.status)], ["Grover's Risk", !isSafe(c.status)], ['PQC Detected', isSafe(c.status)], ['HNDL Exposed', !isSafe(c.status)]].map(([l, bad], i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                      {(l === 'PQC Detected') ? (bad ? <CheckCircle size={12} color="#059669" /> : <XCircle size={12} color="#DC2626" />) : (bad ? <XCircle size={12} color="#DC2626" /> : <CheckCircle size={12} color="#059669" />)}
                                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#374151' }}>{l}: {(l === 'PQC Detected') ? (bad ? 'Yes' : 'No') : (bad ? 'Yes' : 'No')}</span>
                                    </div>
                                  ))}
                                </div>
                                {/* NIST Standards */}
                                <div>
                                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>NIST Standards</div>
                                  {isSafe(c.status) ? (
                                    [['FIPS 203 (ML-KEM)', /ML-KEM/.test(c.algorithm) || /ML-KEM/.test(c.keyExchange)], ['FIPS 204 (ML-DSA)', /ML-DSA/.test(c.algorithm)], ['FIPS 205 (SLH-DSA)', /SLH-DSA/.test(c.algorithm)]].map(([std, applies], i) => (
                                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                        {applies ? <CheckCircle size={12} color="#059669" /> : <span style={{ color: '#9CA3AF', fontSize: 11 }}>—</span>}
                                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: applies ? '#059669' : '#9CA3AF' }}>{std}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <>
                                      {['FIPS 203', 'FIPS 204', 'FIPS 205'].map((f, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                          <XCircle size={12} color="#DC2626" />
                                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#DC2626' }}>Not {f} compliant</span>
                                        </div>
                                      ))}
                                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#4F46E5', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); nav('remediation'); }}>Upgrade required →</span>
                                    </>
                                  )}
                                </div>
                                {/* Actions */}
                                <div>
                                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Actions</div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <button className="btn-primary" style={{ fontSize: 11, padding: '5px 10px' }} onClick={e => { e.stopPropagation(); nav('tls-analyzer'); }}>View TLS Analysis</button>
                                    {!isSafe(c.status) && <button className="btn-ghost" style={{ fontSize: 11, padding: '5px 10px' }} onClick={e => { e.stopPropagation(); nav('remediation'); }}>Start Remediation</button>}
                                    <button className="btn-ghost" style={{ fontSize: 11, padding: '5px 10px' }} onClick={e => {
                                      e.stopPropagation();
                                      const blob = new Blob([JSON.stringify(c, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob);
                                      const a = document.createElement('a'); a.href = url; a.download = `${c.id}.json`; a.click(); URL.revokeObjectURL(url);
                                      showToast(`${c.id}.json exported`);
                                    }}>Export Component</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Footer */}
        {filtered.length > 0 && (
          <div style={{ padding: '14px 20px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF' }}>
              Showing {(currentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} of {filtered.length} components
              {filtered.length < ALL_CBOM_COMPONENTS.length && ` (filtered from ${ALL_CBOM_COMPONENTS.length})`}
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 6, cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.4 : 1 }}>
                <ChevronLeft size={14} color="#6B7280" />
              </button>
              {getPages().map((p, i) => (
                <button key={i} onClick={() => typeof p === 'number' && setCurrentPage(p)}
                  style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: p === currentPage ? '#4F46E5' : '#F9FAFB', color: p === currentPage ? '#fff' : '#6B7280', border: p === currentPage ? 'none' : '1px solid #E5E7EB', borderRadius: 6, fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: typeof p === 'number' ? 'pointer' : 'default' }}>
                  {p}
                </button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 6, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.4 : 1 }}>
                <ChevronRight size={14} color="#6B7280" />
              </button>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF', marginLeft: 8 }}>{totalPages} pages</span>
            </div>
          </div>
        )}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Algorithm Distribution */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Algorithm Distribution</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ALGO_DISTRIBUTION} layout="vertical" margin={{ top: 0, right: 20, left: 90, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" tick={{ fontFamily: 'Inter', fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="algo" tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#374151' }} axisLine={false} tickLine={false} width={85} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(val) => [val + ' assets', 'Usage']} cursor={{ fill: '#F9FAFB' }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={16}>
                {ALGO_DISTRIBUTION.map((entry, i) => <Cell key={i} fill={entry.color} fillOpacity={0.85} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: 4, background: '#EF4444' }} /><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#6B7280' }}>Quantum Vulnerable</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: 4, background: '#059669' }} /><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#6B7280' }}>Quantum Safe</span></div>
          </div>
        </div>

        {/* TLS Version Distribution */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>TLS Version Distribution</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF' }}>247 assets total</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ position: 'relative' }}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={TLS_DISTRIBUTION} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270} animationDuration={800}>
                    {TLS_DISTRIBUTION.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter', fontSize: 12 }} formatter={(val) => [val + ' assets (' + Math.round(val / 247 * 100) + '%)', '']} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800, color: '#111827' }}>247</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>assets</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
              {TLS_DISTRIBUTION.map((t, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 5, background: t.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#111827', minWidth: 50 }}>{t.name}</span>
                    <div style={{ flex: 1, height: 4, background: '#F3F4F6', borderRadius: 2 }}>
                      <div style={{ width: (t.value / 247 * 100) + '%', height: '100%', background: t.color, borderRadius: 2, transition: 'width 0.5s ease' }} />
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: '#111827', minWidth: 24, textAlign: 'right' }}>{t.value}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF', marginLeft: 1, minWidth: 36 }}>{Math.round(t.value / 247 * 1000) / 10}%</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F3F4F6' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#059669', marginBottom: 4 }}>Quantum Safe Ready: 48 (19.4%)</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#DC2626' }}>Needs Upgrade: 199 (80.6%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CBOM Metadata Panel */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 20 }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16 }}>CBOM Metadata</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Document Info</div>
            {[['Format', 'CycloneDX v1.5'], ['Serial', 'urn:uuid:pnb-cbom-2026-03'], ['Version', '1'], ['Generated', 'Mar 12, 2026 10:24 AM IST']].map(([l, v], i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF' }}>{l}</div>
                <div style={{ fontFamily: l === 'Serial' ? "'JetBrains Mono', monospace" : "'Inter', sans-serif", fontSize: 11, color: '#374151', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Coverage</div>
            {[['Total Assets', '247'], ['Components Mapped', '847'], ['Coverage', '100%']].map(([l, v], i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF' }}>{l}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#374151', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
            <div style={{ height: 4, background: '#F3F4F6', borderRadius: 2, marginTop: 4 }}><div style={{ width: '100%', height: '100%', background: '#10B981', borderRadius: 2 }} /></div>
          </div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Risk Summary</div>
            {[['Critical', 36, '#DC2626'], ['High', 72, '#EA580C'], ['Medium', 39, '#7C3AED'], ['PQC Ready', 61, '#2563EB'], ['Safe', 38, '#059669']].map(([l, v, c], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: c }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#374151' }}>{l}: {v} components</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Standards Compliance</div>
            {[['CycloneDX 1.5', true, 'Compliant'], ['NIST SP 800-208', false, '14% compliant'], ['RBI Framework', false, '42% compliant'], ['OWASP CycloneDX', true, 'Valid']].map(([l, ok, v], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                {ok ? <CheckCircle size={12} color="#059669" /> : <XCircle size={12} color="#DC2626" />}
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#374151' }}>{l}: <span style={{ color: ok ? '#059669' : '#DC2626', fontWeight: 600 }}>{v}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: '12px 18px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 8, animation: 'fadeInUp 0.2s ease-out', zIndex: 1000 }}>
          <CheckCircle size={16} color="#10B981" />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#374151', fontWeight: 500 }}>{toast}</span>
        </div>
      )}
    </div>
  );
};


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


const RiskPage = ({ nav }) => {
  const [crqcYear, setCrqcYear] = useState(2031);
  const [scoreAnimated, setScoreAnimated] = useState(0);
  const [matrixTooltip, setMatrixTooltip] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [reportGenerating, setReportGenerating] = useState(false);
  const [toast, setToast] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configCrqc, setConfigCrqc] = useState(2031);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [rankPage, setRankPage] = useState(1);
  const [rankSearch, setRankSearch] = useState('');

  const currentHNDL = HNDL_DATA.crqcRiskMap[crqcYear];
  const yearsExposed = crqcYear - HNDL_DATA.firstEncryptedYear;

  useEffect(() => {
    let start = 0; const end = RISK_DATA.overallScore; const dur = 1500; const step = end / (dur / 16);
    const timer = setInterval(() => { start += step; if (start >= end) { setScoreAnimated(end); clearInterval(timer); } else { setScoreAnimated(parseFloat(start.toFixed(1))); } }, 16);
    setTimeout(() => setBarsAnimated(true), 300);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleGenerateReport = () => {
    setReportGenerating(true);
    setTimeout(() => {
      const report = `PNB QuantumShield — Quantum Risk Report\nGenerated: ${new Date().toLocaleString()}\n\nOVERALL RISK SCORE: ${RISK_DATA.overallScore}/100 (HIGH)\nVulnerable Assets: ${RISK_DATA.vulnerableAssets} of ${RISK_DATA.totalAssets}\n\nTOP CRITICAL ASSETS:\n${TOP_CRITICAL_ASSETS.map(a => `  ${a.rank}. ${a.domain} — Score: ${a.score} — ${a.exposure}`).join('\n')}\n\nHNDL EXPOSURE:\nData at risk: ${currentHNDL.dataAtRisk}\nRecords: ${currentHNDL.records}\nProjected CRQC: ${crqcYear}\n\nRECOMMENDED ACTIONS:\n1. Replace all RSA key exchanges with ML-KEM-768\n2. Upgrade TLS 1.0/1.1 endpoints to TLS 1.3\n3. Deploy hybrid PQC certificates on critical assets\n4. Implement crypto-agility framework\n5. Establish continuous CBOM monitoring`;
      const blob = new Blob([report], { type: 'text/plain' }); const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'quantum-risk-report.txt'; a.click(); URL.revokeObjectURL(url);
      setReportGenerating(false); showToast('Risk report downloaded');
    }, 1800);
  };

  const matrixColors = { critical:'#EF4444', high:'#F97316', medium:'#F59E0B', 'pqc-ready':'#3B82F6', 'quantum-safe':'#10B981' };
  const getScoreColor = (s) => { if (s >= 90) return '#DC2626'; if (s >= 70) return '#EA580C'; if (s >= 50) return '#7C3AED'; if (s >= 20) return '#D97706'; return '#059669'; };

  const tabStyle = (t) => ({ padding: '10px 18px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: activeTab === t ? 600 : 500, color: activeTab === t ? '#4F46E5' : '#6B7280', borderBottom: activeTab === t ? '2px solid #4F46E5' : '2px solid transparent', background: 'none', border: 'none', borderBottomStyle: 'solid', borderBottomWidth: 2, borderBottomColor: activeTab === t ? '#4F46E5' : 'transparent', transition: 'color 0.15s' });

  const sliderStyle = `
    .crqc-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 3px; background: linear-gradient(90deg, #EF4444, #F97316, #F59E0B, #6B7280); outline: none; cursor: pointer; }
    .crqc-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #fff; border: 2px solid #4F46E5; box-shadow: 0 2px 8px rgba(0,0,0,0.15); cursor: pointer; }
    .crqc-slider::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #fff; border: 2px solid #4F46E5; box-shadow: 0 2px 8px rgba(0,0,0,0.15); cursor: pointer; }
    .dot-pulse { animation: pulseDot 2s infinite; }
  `;

  const renderOverview = () => (
    <>
      {/* ROW 1: 3 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Risk Score Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center', minHeight: 280 }}>
          <div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 72, fontWeight: 800, color: '#EF4444' }}>{scoreAnimated}</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 400, color: '#9CA3AF', verticalAlign: 'baseline', marginLeft: 4 }}>/100</span>
          </div>
          <div style={{ marginTop: 14, background: '#FFF7ED', color: '#EA580C', border: '1px solid #FED7AA', borderRadius: 999, padding: '5px 16px', fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>HIGH RISK</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9CA3AF', marginTop: 16, maxWidth: 220, lineHeight: 1.6 }}>{RISK_DATA.vulnerableAssets} of {RISK_DATA.totalAssets} assets have quantum-vulnerable configurations</div>
          <div style={{ marginTop: 20, width: '100%' }}>
            {RISK_DATA.byCategory.filter(c => c.label !== 'Unscanned').map((cat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: cat.color, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#6B7280', width: 64, textAlign: 'left' }}>{cat.label}</span>
                <div style={{ flex: 1, height: 4, background: '#F3F4F6', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: barsAnimated ? (cat.count / 247 * 100) + '%' : '0%', background: cat.color, borderRadius: 2, transition: `width 1s ease-out ${i * 0.1}s` }} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#374151', width: 24, textAlign: 'right' }}>{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* By Category Card */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>By Category</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>247 total assets</div>
          <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', marginTop: 16 }}>
            {RISK_DATA.byCategory.map((cat, i) => (
              <div key={i} style={{ width: barsAnimated ? cat.pct + '%' : '0%', background: cat.color, transition: `width 1s ease-out ${i * 0.08}s` }} title={`${cat.label}: ${cat.pct}%`} />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 16 }}>
            {RISK_DATA.byCategory.map((cat, i) => (
              <div key={i} onMouseEnter={() => setHoveredCategory(cat.label)} onMouseLeave={() => setHoveredCategory(null)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 4px', borderBottom: '1px solid #F9FAFB', cursor: 'pointer', borderRadius: 6, transition: 'background 0.1s', background: hoveredCategory === cat.label ? '#FAFAFA' : 'transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: cat.color }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: hoveredCategory === cat.label ? 600 : 500, color: hoveredCategory === cat.label ? '#111827' : '#374151' }}>{cat.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: '#111827' }}>{cat.count}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF', background: '#F3F4F6', borderRadius: 999, padding: '1px 6px' }}>{cat.pct}%</span>
                  <div style={{ width: 40, height: 3, background: '#F3F4F6', borderRadius: 1.5 }}><div style={{ width: cat.pct + '%', height: '100%', background: cat.color, borderRadius: 1.5 }} /></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#374151' }}>Total</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: '#111827' }}>247 assets</span>
          </div>
        </div>

        {/* 6-Month Trend Card */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 12 }}>6-Month Trend</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={RISK_DATA.sixMonthTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs><linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} /><stop offset="95%" stopColor="#EF4444" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontFamily: 'Inter', fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 85]} tick={{ fontFamily: 'Inter', fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(val) => [val.toFixed(1), 'Risk Score']} labelStyle={{ color: '#111827', fontWeight: 600 }} cursor={{ stroke: '#E5E7EB' }} />
              <Area type="monotone" dataKey="score" stroke="#EF4444" strokeWidth={2.5} fill="url(#scoreGrad)" dot={false} activeDot={{ r: 5, fill: '#EF4444', stroke: '#fff', strokeWidth: 2 }} animationDuration={1200} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <TrendingDown size={16} color="#10B981" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#10B981' }}>↓ {RISK_DATA.lastImprovement} improvement from last month</span>
            <span style={{ color: '#D1D5DB', margin: '0 4px' }}>·</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>Target: &lt;50 by Q4 2026</span>
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F3F4F6', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, textAlign: 'center' }}>
            {[['78.2', '#EF4444', '6 MONTHS AGO'], ['4.8', '#10B981', 'TOTAL DROP'], ['50', '#3B82F6', 'Q4 TARGET']].map(([v, c, l], i) => (
              <div key={i}><div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: c }}>{v}</div><div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', marginTop: 2 }}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* HNDL Calculator */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: '#111827' }}>Harvest Now, Decrypt Later — Exposure Calculator</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Estimate total sensitive data at risk based on estimated CRQC emergence timeline</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr', gap: 32, marginTop: 20, alignItems: 'start' }}>
          {/* Left */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>Encrypted data on record since</div>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: '#111827' }}>2017</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#6B7280', marginLeft: 8 }}>({yearsExposed} years exposed)</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF', marginBottom: 12 }}>Estimated CRQC emergence</div>
              <style>{sliderStyle}</style>
              <input type="range" className="crqc-slider" min={2028} max={2035} step={1} value={crqcYear} onChange={e => setCrqcYear(Number(e.target.value))} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                {[2028,2029,2030,2031,2032,2033,2034,2035].map(y => <span key={y} style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: '#9CA3AF' }}>{y}</span>)}
              </div>
              <div style={{ marginTop: 12 }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 36, fontWeight: 800, color: currentHNDL.color }}>{crqcYear}</span>
                <span style={{ marginLeft: 8, background: currentHNDL.color + '15', color: currentHNDL.color, border: `1px solid ${currentHNDL.color}30`, borderRadius: 999, padding: '4px 12px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{currentHNDL.risk}</span>
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B7280', marginTop: 8 }}>{yearsExposed} years of encrypted data potentially decryptable in {crqcYear - 2026} years</div>
            </div>
          </div>
          {/* Middle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['DATA VOLUME AT RISK', '~' + currentHNDL.dataAtRisk, '#EF4444'], ['SENSITIVE RECORDS', currentHNDL.records, '#F97316'], ['YEARS OF INTERCEPTION', yearsExposed + ' years', '#F59E0B']].map(([l, v, c], i) => (
              <div key={i} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', color: '#9CA3AF', letterSpacing: '0.08em', marginBottom: 6 }}>{l}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: c, transition: 'color 0.2s' }}>{v}</div>
              </div>
            ))}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF', lineHeight: 1.5, fontStyle: 'italic', marginTop: 4 }}>* Estimates based on observed traffic patterns and known digital banking usage data</div>
          </div>
          {/* Right — Timeline */}
          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, minHeight: 200 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 600, marginBottom: 14 }}>HNDL Timeline 2017 → {crqcYear}</div>
            <div style={{ position: 'relative', paddingLeft: 24 }}>
              <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, #10B981, #F59E0B, #EF4444)', borderRadius: 1 }} />
              {HNDL_DATA.timeline.filter(e => e.year <= crqcYear + 1).map((ev, i) => {
                const dotColors = { start: '#10B981', milestone: '#3B82F6', warning: '#F59E0B', positive: '#10B981', current: '#4F46E5', threat: '#EF4444' };
                const isCurrent = ev.type === 'current'; const isThreat = ev.type === 'threat';
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: -20, top: 2, width: 10, height: 10, borderRadius: 5, background: dotColors[ev.type], border: '2px solid #fff', boxShadow: isCurrent ? '0 0 0 3px rgba(79,70,229,0.3)' : 'none' }} className={isCurrent ? 'dot-pulse' : ''} />
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, color: isCurrent ? '#4F46E5' : isThreat ? '#DC2626' : '#9CA3AF' }}>{ev.year}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: isCurrent || isThreat ? 600 : 500, color: isCurrent ? '#111827' : isThreat ? '#DC2626' : '#374151', marginTop: 1 }}>{isThreat ? '⚠ ' : ''}{ev.event}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {crqcYear < 2031 && (
              <div style={{ background: '#FEF2F2', borderRadius: 6, padding: '8px 12px', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                <AlertTriangle size={12} color="#DC2626" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#DC2626' }}>Earlier CRQC = more data at risk</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ROW 3: Matrix + Top Assets */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Risk Matrix */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Risk Matrix</span>
            <div style={{ display: 'flex', gap: 12 }}>
              {[['Critical','#EF4444'],['High','#F97316'],['Medium','#F59E0B'],['PQC Ready','#3B82F6'],['Safe','#10B981']].map(([l,c],i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 4, background: c }} /><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#6B7280' }}>{l}</span></div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', height: 320, border: '1px solid #F3F4F6', borderRadius: 8, overflow: 'hidden' }}>
            {/* Quadrant backgrounds */}
            <div style={{ position: 'absolute', top: 0, left: '50%', right: 0, bottom: '50%', background: 'rgba(239,68,68,0.04)' }}><span style={{ position: 'absolute', top: 6, right: 6, fontFamily: "'Inter', sans-serif", fontSize: 9, color: 'rgba(239,68,68,0.4)' }}>CRITICAL ZONE</span></div>
            <div style={{ position: 'absolute', top: 0, left: 0, right: '50%', bottom: '50%', background: 'rgba(245,158,11,0.04)' }}><span style={{ position: 'absolute', top: 6, left: 6, fontFamily: "'Inter', sans-serif", fontSize: 9, color: 'rgba(245,158,11,0.4)' }}>MONITOR</span></div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', right: 0, bottom: 0, background: 'rgba(245,158,11,0.04)' }}><span style={{ position: 'absolute', bottom: 6, right: 6, fontFamily: "'Inter', sans-serif", fontSize: 9, color: 'rgba(245,158,11,0.4)' }}>WATCH</span></div>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: '50%', bottom: 0, background: 'rgba(16,185,129,0.04)' }}><span style={{ position: 'absolute', bottom: 6, left: 6, fontFamily: "'Inter', sans-serif", fontSize: 9, color: 'rgba(16,185,129,0.4)' }}>SAFE ZONE</span></div>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: '#F3F4F6' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#F3F4F6' }} />
            {/* Dots */}
            {RISK_MATRIX_ASSETS.map((a, i) => (
              <div key={i} onMouseEnter={() => setMatrixTooltip(a)} onMouseLeave={() => setMatrixTooltip(null)}
                style={{ position: 'absolute', left: a.x + '%', bottom: a.y + '%', width: a.r * 2, height: a.r * 2, borderRadius: '50%', background: (matrixColors[a.status] || '#999') + 'CC', border: `2px solid ${matrixColors[a.status] || '#999'}`, cursor: 'pointer', transform: 'translate(-50%, 50%)', transition: 'transform 0.15s', zIndex: matrixTooltip?.domain === a.domain ? 10 : 1, ...(matrixTooltip?.domain === a.domain ? { transform: 'translate(-50%, 50%) scale(1.4)' } : {}) }} />
            ))}
            {/* Axes */}
            <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF' }}>Likelihood of Quantum Attack →</div>
            <div style={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF', whiteSpace: 'nowrap' }}>Business Impact →</div>
            {/* Tooltip */}
            {matrixTooltip && (
              <div style={{ position: 'absolute', top: 8, right: 8, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, padding: '12px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 20, minWidth: 200 }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#111827' }}>{matrixTooltip.domain}</div>
                <div style={{ marginTop: 4 }}><Badge type={matrixTooltip.status} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', marginTop: 8 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>Likelihood:</span><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#374151' }}>{matrixTooltip.x}%</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>Impact:</span><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#374151' }}>{matrixTooltip.y}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Top Critical Assets */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Top Critical Assets</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#4F46E5', cursor: 'pointer' }} onClick={() => nav('discovery')}>View all →</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {TOP_CRITICAL_ASSETS.map((a, i) => (
              <div key={i} onClick={() => nav('tls-analyzer')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 2px', borderBottom: i < TOP_CRITICAL_ASSETS.length - 1 ? '1px solid #F9FAFB' : 'none', cursor: 'pointer', borderRadius: 8, transition: 'background 0.1s' }} onMouseOver={e => e.currentTarget.style.background = '#FAFAFA'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ width: 24, textAlign: 'right', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 800, color: '#E5E7EB' }}>{a.rank}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.domain}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF' }}>{a.exposure}</div>
                </div>
                <div style={{ width: 64, height: 3, background: '#F3F4F6', borderRadius: 1.5, flexShrink: 0 }}>
                  <div style={{ width: barsAnimated ? a.score + '%' : '0%', height: '100%', background: getScoreColor(a.score), borderRadius: 1.5, transition: `width 800ms ease-out ${i * 80}ms` }} />
                </div>
                <Badge type={a.status} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B7280' }}>36 critical · 72 high risk</span>
            <button onClick={() => nav('remediation')} style={{ background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE', borderRadius: 6, padding: '5px 12px', fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Remediate All →</button>
          </div>
        </div>
      </div>
    </>
  );

  const renderAlgorithmAnalysis = () => (
    <div key="algo" className="page-animate">
      <div style={{ background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: 12, padding: '16px 20px', marginBottom: 20, display: 'flex', gap: 12 }}>
        <Info size={20} color="#4F46E5" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#111827' }}>Quantum Algorithm Vulnerability Analysis</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B7280', marginTop: 2 }}>Shows which cryptographic algorithms are vulnerable to Shor's Algorithm (key systems) and Grover's Algorithm (symmetric systems)</div>
        </div>
      </div>
      <div className="card" style={{ padding: 0, marginBottom: 20 }}>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead><tr><th>ALGORITHM</th><th>VULNERABLE TO SHOR'S</th><th>VULNERABLE TO GROVER'S</th><th>NIST RECOMMENDATION</th><th>ACTION</th></tr></thead>
            <tbody>
              {ALGO_VULN_TABLE.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, color: '#374151' }}>{r.algo}</td>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{r.shors ? <><XCircle size={18} color="#DC2626" /><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: '#DC2626' }}>YES</span></> : <><CheckCircle size={18} color="#10B981" /><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: '#10B981' }}>NO</span></>}</div></td>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{r.grovers ? <><XCircle size={18} color="#DC2626" /><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: '#DC2626' }}>YES</span></> : <><CheckCircle size={18} color="#10B981" /><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: '#10B981' }}>NO</span></>}</div></td>
                  <td style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: r.nistrec.startsWith('Replace') ? '#DC2626' : r.nistrec.startsWith('Upgrade') || r.nistrec.startsWith('Use') ? '#F59E0B' : '#10B981' }}>{r.nistrec}</td>
                  <td>{r.urgent ? <span style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: 999, padding: '3px 10px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600 }}>Immediate</span> : <span style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', borderRadius: 999, padding: '3px 10px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600 }}>Acceptable</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Algorithms by Quantum Safety</div>
          <div style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={[{ name: 'Vulnerable', value: 210 }, { name: 'Safe', value: 37 }]} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270} animationDuration={800}><Cell fill="#EF4444" /><Cell fill="#10B981" /></Pie><Tooltip contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter', fontSize: 12 }} /></PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800, color: '#EF4444' }}>15%</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9CA3AF' }}>PQC Ready</div>
            </div>
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Key Exchange Methods in Use</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={KEY_EXCHANGE_DIST_RISK} layout="vertical" margin={{ top: 0, right: 20, left: 80, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" tick={{ fontFamily: 'Inter', fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#374151' }} axisLine={false} tickLine={false} width={75} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter', fontSize: 12 }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={14}>{KEY_EXCHANGE_DIST_RISK.map((e, i) => <Cell key={i} fill={e.color} fillOpacity={0.85} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderAssetRanking = () => {
    const sorted = [...ALL_CBOM_COMPONENTS].sort((a, b) => b.riskScore - a.riskScore);
    const filt = rankSearch.trim() ? sorted.filter(c => c.asset.toLowerCase().includes(rankSearch.toLowerCase()) || c.id.toLowerCase().includes(rankSearch.toLowerCase())) : sorted;
    const perPage = 15; const tp = Math.ceil(filt.length / perPage); const pd = filt.slice((rankPage - 1) * perPage, rankPage * perPage);
    const getRankColor = (r) => { if (r <= 10) return '#EF4444'; if (r <= 36) return '#F97316'; if (r <= 108) return '#F59E0B'; return '#9CA3AF'; };
    return (
      <div key="ranking" className="page-animate">
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>All Assets — Risk Ranked</span>
              <span style={{ background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE', borderRadius: 999, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, padding: '3px 10px' }}>{filt.length} assets</span>
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={14} color="#9CA3AF" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 10, pointerEvents: 'none' }} />
              <input type="text" placeholder="Search assets..." value={rankSearch} onChange={e => { setRankSearch(e.target.value); setRankPage(1); }} style={{ width: 220, paddingLeft: 34 }} />
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table><thead><tr><th style={{ width: 60 }}>RANK</th><th>ASSET</th><th style={{ width: 80 }}>TYPE</th><th style={{ width: 80 }}>TLS VER</th><th style={{ width: 160 }}>ALGORITHM</th><th style={{ width: 100, textAlign: 'right' }}>RISK SCORE</th><th style={{ width: 120 }}>STATUS</th><th style={{ width: 90 }}>ACTION</th></tr></thead>
              <tbody>{pd.map((c, i) => { const rank = (rankPage - 1) * perPage + i + 1; return (
                <tr key={c.id}><td style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: getRankColor(rank) }}>{rank}</td><td style={{ fontWeight: 600, color: '#111827' }}>{c.asset}</td><td>{c.type}</td><td><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, background: c.tlsVer === '1.3' ? '#ECFDF5' : c.tlsVer === '1.2' ? '#FFFBEB' : '#FEF2F2', color: c.tlsVer === '1.3' ? '#059669' : c.tlsVer === '1.2' ? '#D97706' : '#DC2626', border: `1px solid ${c.tlsVer === '1.3' ? '#A7F3D0' : c.tlsVer === '1.2' ? '#FDE68A' : '#FECACA'}`, borderRadius: 999, padding: '2px 8px' }}>{c.tlsVer}</span></td><td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{c.algorithm}</td><td style={{ textAlign: 'right', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 800, color: getScoreColor(c.riskScore) }}>{c.riskScore}</td><td><Badge type={c.status} /></td><td><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#4F46E5', cursor: 'pointer' }} onClick={() => nav('tls-analyzer')}>Analyze →</span></td></tr>
              ); })}</tbody>
            </table>
          </div>
          <div style={{ padding: '14px 20px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9CA3AF' }}>Showing {(rankPage-1)*perPage+1}–{Math.min(rankPage*perPage,filt.length)} of {filt.length}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setRankPage(p => Math.max(1, p-1))} disabled={rankPage===1} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 6, cursor: rankPage===1?'not-allowed':'pointer', opacity: rankPage===1?0.4:1 }}><ChevronLeft size={14} color="#6B7280" /></button>
              {Array.from({ length: Math.min(tp, 5) }, (_, i) => i + 1).map(p => <button key={p} onClick={() => setRankPage(p)} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: rankPage===p?'#4F46E5':'#F9FAFB', color: rankPage===p?'#fff':'#6B7280', border: rankPage===p?'none':'1px solid #E5E7EB', borderRadius: 6, fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: 'pointer' }}>{p}</button>)}
              {tp > 5 && <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 6, fontFamily: "'Inter', sans-serif", fontSize: 12 }}>...</button>}
              <button onClick={() => setRankPage(p => Math.min(tp, p+1))} disabled={rankPage===tp} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 6, cursor: rankPage===tp?'not-allowed':'pointer', opacity: rankPage===tp?0.4:1 }}><ChevronRight size={14} color="#6B7280" /></button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageHeader title="Quantum Risk Assessment" subtitle="Organization-wide quantum vulnerability scoring and HNDL exposure analysis"
        actions={<><button className="btn-ghost" onClick={() => setShowConfigModal(true)}>Configure Parameters</button><button className="btn-primary" onClick={handleGenerateReport} disabled={reportGenerating}>{reportGenerating ? <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Generating...</> : <>↓ Risk Report</>}</button></>} />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #E5E7EB', marginBottom: 20 }}>
        <button style={tabStyle('overview')} onClick={() => setActiveTab('overview')}>Overview</button>
        <button style={tabStyle('algorithm-analysis')} onClick={() => setActiveTab('algorithm-analysis')}>Algorithm Analysis</button>
        <button style={tabStyle('asset-ranking')} onClick={() => setActiveTab('asset-ranking')}>Asset Ranking <span style={{ background: '#F3F4F6', color: '#6B7280', borderRadius: 999, padding: '1px 6px', fontFamily: "'Inter', sans-serif", fontSize: 10, marginLeft: 4 }}>247</span></button>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'algorithm-analysis' && renderAlgorithmAnalysis()}
      {activeTab === 'asset-ranking' && renderAssetRanking()}

      {/* Config Modal */}
      {showConfigModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowConfigModal(false)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, width: 480, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Configure Risk Parameters</div>
            {[['CRQC Emergence Year', <input type="number" value={configCrqc} onChange={e => setConfigCrqc(Number(e.target.value))} min={2028} max={2040} style={{ width: '100%' }} />],
              ['Sensitivity Level', <select style={{ width: '100%' }}><option>Low</option><option>Medium</option><option selected>High</option><option>Critical</option></select>],
              ['Include Internal Assets', <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 36, height: 20, borderRadius: 10, background: '#4F46E5', cursor: 'pointer', padding: 2 }}><div style={{ width: 16, height: 16, borderRadius: 8, background: '#fff', marginLeft: 16 }} /></div><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151' }}>Enabled</span></div>],
              ['Risk Model', <select style={{ width: '100%' }}><option>Conservative</option><option selected>Standard</option><option>Aggressive</option></select>]
            ].map(([label, input], i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
                {input}
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
              <button className="btn-ghost" onClick={() => setShowConfigModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => { setCrqcYear(configCrqc); setShowConfigModal(false); showToast('Parameters applied'); }}>Apply Parameters</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: '12px 18px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 8, animation: 'fadeInUp 0.2s ease-out', zIndex: 1000 }}>
          <CheckCircle size={16} color="#10B981" />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#374151', fontWeight: 500 }}>{toast}</span>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};




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




