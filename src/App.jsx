import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ShieldCheck, Radar, Lock, ClipboardList, Atom, Wrench, FileText, Award, Settings, Search, Bell, ChevronDown, ChevronLeft, ChevronRight, Zap, CheckCircle, AlertTriangle, XCircle, Activity, Globe, Code, Network, Server, LayoutDashboard, TrendingDown, TrendingUp, PenLine, SlidersHorizontal, Hash, GitBranch, Clock, X, Shield, Code2, SearchX, Plus, Check, ChevronUp, Download, ExternalLink, Copy, Info, ArrowRight, AlertCircle, RefreshCw, ChevronsUpDown, Users, User, Calendar, QrCode, Link, Eye, Star, BarChart2, Terminal, ClipboardCheck, Edit, Trash2, Send, Braces, Table } from 'lucide-react';
import { AreaChart, Area, LineChart, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Line } from 'recharts';
import { jsPDF } from 'jspdf';

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


/* REMEDIATION PAGE — Component */
const RemediationPage = ({ nav }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [taskStatuses, setTaskStatuses] = useState(() => {
    const map = {}; ALL_REMEDIATION_ITEMS.forEach(i => map[i.id] = i.taskStatus); return map;
  });
  const [showCompleted, setShowCompleted] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('priority');
  
  const filteredItems = useMemo(() => {
    let items = ALL_REMEDIATION_ITEMS;
    if (activeFilter !== 'all') items = items.filter(i => i.status === activeFilter);
    if (!showCompleted) items = items.filter(i => taskStatuses[i.id] !== 'fixed');
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      items = items.filter(i => i.domain.toLowerCase().includes(q) || i.vulnerability.toLowerCase().includes(q));
    }
    return items.sort((a,b) => {
      if (sortBy === 'priority') return a.priority - b.priority;
      if (sortBy === 'complexity') { const order = {Easy:0,Medium:1,Hard:2}; return order[a.complexity] - order[b.complexity]; }
      return 0;
    });
  }, [activeFilter, taskStatuses, showCompleted, searchText, sortBy]);

  const [selectedItem, setSelectedItem] = useState(filteredItems[0] || ALL_REMEDIATION_ITEMS[0]);
  useEffect(() => { if (filteredItems.length>0 && !filteredItems.find(i=>i.id===selectedItem.id)) setSelectedItem(filteredItems[0]); }, [filteredItems]);

  const counts = useMemo(() => ({
    all: ALL_REMEDIATION_ITEMS.length, critical: ALL_REMEDIATION_ITEMS.filter(i=>i.status==='critical').length,
    high: ALL_REMEDIATION_ITEMS.filter(i=>i.status==='high').length, medium: ALL_REMEDIATION_ITEMS.filter(i=>i.status==='medium').length
  }), []);

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignTarget, setAssignTarget] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [progressAnimated, setProgressAnimated] = useState(false);
  const [expandedStep, setExpandedStep] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [confettiDetails, setConfettiDetails] = useState(null);

  useEffect(() => { setTimeout(() => setProgressAnimated(true), 300); }, []);

  const updateTaskStatus = (id, newStatus) => {
    setTaskStatuses(prev => ({ ...prev, [id]: newStatus }));
    if (newStatus === 'fixed') {
      const btn = document.getElementById('btn-mark-fixed');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setConfettiDetails({ x: rect.left + rect.width/2, y: rect.top + rect.height/2 });
        setTimeout(() => setConfettiDetails(null), 600);
      }
      setToastMessage({ msg: `${selectedItem.domain} marked as fixed`, type: 'success' });
      setTimeout(()=>setToastMessage(null), 3000);
      setTimeout(()=>{
        const nextPending = filteredItems.find(i=>i.id!==id && taskStatuses[i.id]!=='fixed');
        if (nextPending) setSelectedItem(nextPending);
      }, 400);
    }
  };

  const handleExportPlan = () => {
    const csv = ['Priority,Domain,Type,Vulnerability,Complexity,Status,Est Time,Skill Level,Assignee,NIST Refs'];
    ALL_REMEDIATION_ITEMS.forEach(i => {
      csv.push(`${i.priority},${i.domain},${i.type},"${i.vulnerability}",${i.complexity},${taskStatuses[i.id]},${i.estTime},${i.skillLevel},${i.assignee||''},"${i.nistrefs.join(', ')}"`);
    });
    const blob = new Blob([csv.join('\\n')], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'pnb-remediation-plan.csv'; a.click();
    URL.revokeObjectURL(url);
    setToastMessage({ msg: `Plan exported — ${ALL_REMEDIATION_ITEMS.length} items`, type: 'info', icon: 'Download' });
    setTimeout(()=>setToastMessage(null), 3000);
  };

  const liveFixed = Object.values(taskStatuses).filter(s=>s==='fixed').length;
  const livePercentage = ((liveFixed / ALL_REMEDIATION_ITEMS.length) * 100).toFixed(1);

  const getStatusBadge = (st) => {
    if (st==='pending') return { bg:'#F9FAFB', border:'#E5E7EB', color:'#6B7280', label:'Pending' };
    if (st==='in-progress') return { bg:'#EFF6FF', border:'#BFDBFE', color:'#2563EB', label:'In Progress' };
    return { bg:'#ECFDF5', border:'#A7F3D0', color:'#059669', label:'Fixed ✓' };
  };

  return (
    <div style={{position:'relative'}}>
      <PageHeader title="Remediation Center" subtitle="Prioritized action plan to achieve quantum-safe cryptographic posture across all assets"
        actions={<><button className="btn-ghost" onClick={()=>{setAssignTarget(null);setAssignModalOpen(true);}}><Users size={14}/> Assign Tasks</button>
        <button className="btn-primary" onClick={handleExportPlan}><Download size={14}/> Export Plan</button></>} />

      {/* PROGRESS CARD */}
      <div className="card" style={{padding:'20px 24px',marginBottom:20}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div><p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:700,color:'#111827'}}>Overall Remediation Progress</p>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#9CA3AF',marginTop:3}}>{liveFixed} of {ALL_REMEDIATION_ITEMS.length} assets remediated · In progress: {Object.values(taskStatuses).filter(s=>s==='in-progress').length} · Pending: {Object.values(taskStatuses).filter(s=>s==='pending').length}</p></div>
          <div style={{textAlign:'right'}}><p style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#9CA3AF'}}>{liveFixed} of {ALL_REMEDIATION_ITEMS.length} assets</p>
          <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:28,fontWeight:800,color:'#4F46E5',lineHeight:1}}>{livePercentage}% <span style={{fontSize:11,fontWeight:500,color:'#9CA3AF'}}>Complete</span></div></div>
        </div>
        <div style={{height:10,background:'#F3F4F6',borderRadius:5,position:'relative'}}>
          <div style={{height:'100%',borderRadius:5,background:'linear-gradient(90deg, #4F46E5, #06B6D4)',width:`${progressAnimated?livePercentage:0}%`,transition:'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',boxShadow:'0 0 8px rgba(79,70,229,0.4)',position:'absolute'}}>
            <div style={{position:'absolute',right:-4,top:'50%',transform:'translateY(-50%)',width:8,height:8,borderRadius:4,background:'#4F46E5',boxShadow:'0 0 0 3px rgba(79,70,229,0.25)'}}/>
          </div>
        </div>
        <div style={{position:'relative',marginTop:6,display:'flex',justifyContent:'space-between'}}>
          {[{l:'25% Quick Wins',p:25},{l:'50% Core Systems',p:50},{l:'75% Deep Infra',p:75},{l:'100% Fully Safe',p:100}].map((m,i)=>
            <div key={i} style={{position:'absolute',left:`${m.p}%`,transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center'}}>
              <div style={{width:2,height:8,background:livePercentage>=m.p?'#4F46E5':'#E5E7EB',marginBottom:4}}/>
              <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:livePercentage>=m.p?600:500,color:livePercentage>=m.p?'#4F46E5':'#9CA3AF',whiteSpace:'nowrap'}}>{m.l}</span>
            </div>
          )}
        </div>
        <div style={{marginTop:30,paddingTop:12,borderTop:'1px solid #F3F4F6',display:'grid',gridTemplateColumns:'repeat(5,1fr)',textAlign:'center'}}>
          {[{v:liveFixed,l:'FIXED',c:'#10B981'},{v:Object.values(taskStatuses).filter(s=>s==='in-progress').length,l:'IN PROGRESS',c:'#4F46E5'},{v:Object.values(taskStatuses).filter(s=>s==='pending').length,l:'PENDING',c:'#9CA3AF'},{v:'Q3 2026',l:'EST. COMPLETION',c:'#111827'},{v:'142 hr',l:'TIME SAVED',c:'#8B5CF6'}].map((s,i)=>(
            <div key={i} style={{borderRight:i<4?'1px solid #F3F4F6':'none'}}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:'#9CA3AF',textTransform:'uppercase',marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN BODY 2-COL */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 0.85fr',gap:20,marginBottom:20}}>
        {/* LEFT: QUEUE */}
        <div className="card" style={{padding:0,overflow:'hidden',display:'flex',flexDirection:'column'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid #F3F4F6',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',gap:2}}>
              {[{k:'all',l:'All'},{k:'critical',l:'Critical'},{k:'high',l:'High'},{k:'medium',l:'Medium'}].map(t=>(
                <div key={t.k} onClick={()=>setActiveFilter(t.k)} style={{padding:'7px 14px',borderRadius:8,fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:activeFilter===t.k?600:500,cursor:'pointer',background:activeFilter===t.k?'#4F46E5':'transparent',color:activeFilter===t.k?'white':'#6B7280',transition:'background 0.12s'}} onMouseOver={e=>activeFilter!==t.k&&(e.currentTarget.style.background='#F3F4F6')} onMouseOut={e=>activeFilter!==t.k&&(e.currentTarget.style.background='transparent')}>
                  {t.l} ({counts[t.k]})
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <div style={{position:'relative'}}>
                <Search size={13} color="#6B7280" style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)'}}/>
                <input type="text" placeholder="Search..." value={searchText} onChange={e=>setSearchText(e.target.value)} style={{width:180,background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:6,padding:'6px 12px 6px 28px',fontFamily:"'Inter',sans-serif",fontSize:12,color:'#111827',outline:'none'}}/>
              </div>
              <label style={{display:'flex',alignItems:'center',gap:4,cursor:'pointer',fontFamily:"'Inter',sans-serif",fontSize:11,color:'#6B7280'}}>
                <input type="checkbox" checked={showCompleted} onChange={e=>setShowCompleted(e.target.checked)}/> Hide fixed
              </label>
            </div>
          </div>
          <div style={{overflowX:'auto',flex:1}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead style={{background:'#F9FAFB',borderBottom:'1px solid #E5E7EB'}}>
                <tr>
                  {[{l:'PRIORITY',w:90},{l:'ASSET',w:'auto'},{l:'VULNERABILITY',w:160},{l:'COMPLEXITY',w:100},{l:'STATUS',w:110}].map((h,i)=><th key={i} style={{padding:'10px 20px',textAlign:'left',fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.07em',width:h.w}}>{h.l}</th>)}
                </tr>
              </thead>
              <tbody>
                {filteredItems.slice(0,8).map(i=>{
                  const sel=selectedItem?.id===i.id; const st=taskStatuses[i.id]; const bdg=getStatusBadge(st); const dotc=st==='fixed'?'#10B981':i.status==='critical'?'#EF4444':i.status==='high'?'#F97316':'#F59E0B';
                  return (
                    <tr key={i.id} onClick={()=>setSelectedItem(i)} style={{cursor:'pointer',borderBottom:'1px solid #F9FAFB',background:sel?'#EEF2FF':'white',transition:'background 0.1s',opacity:st==='fixed'?0.6:1}} onMouseOver={e=>!sel&&(e.currentTarget.style.background='#FAFAFA')} onMouseOut={e=>!sel&&(e.currentTarget.style.background='white')}>
                      <td style={{padding:'14px 20px',display:'flex',alignItems:'center',gap:8,borderLeft:sel?'3px solid #4F46E5':'3px solid transparent'}}>
                        <div style={{width:10,height:10,borderRadius:5,background:dotc}}/>
                        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,fontWeight:700,color:dotc}}>{i.priority}</span>
                      </td>
                      <td style={{padding:'14px 16px'}}>
                        <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,color:'#111827'}}>{i.domain}</div>
                        <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,background:'#F3F4F6',border:'1px solid #E5E7EB',borderRadius:999,padding:'2px 8px',color:'#6B7280',marginTop:4,display:'inline-block'}}>{i.type}</span>
                      </td>
                      <td style={{padding:'14px 16px',fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:500,color:'#374151'}}>{i.vulnerability}</td>
                      <td style={{padding:'14px 16px',fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:i.complexity==='Easy'?'#10B981':i.complexity==='Medium'?'#F59E0B':'#EF4444'}}>{i.complexity}</td>
                      <td style={{padding:'14px 20px'}}><span onClick={e=>{if(st==='fixed')e.stopPropagation();}} style={{background:bdg.bg,border:`1px solid ${bdg.border}`,color:bdg.color,borderRadius:999,padding:'3px 10px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,display:'inline-block'}}>{bdg.label}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{padding:'12px 20px',borderTop:'1px solid #F3F4F6',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF'}}>Showing {Math.min(filteredItems.length,8)} of {counts[activeFilter]} items</span>
            {activeFilter!=='all'&&<span onClick={()=>setActiveFilter('all')} style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#4F46E5',cursor:'pointer'}}>Clear filter</span>}
          </div>
        </div>

        {/* RIGHT: FIX GUIDE */}
        {selectedItem && (
          <div key={selectedItem.id} className="card page-animate" style={{padding:0,display:'flex',flexDirection:'column'}}>
            <div style={{padding:'18px 20px',borderBottom:'1px solid #F3F4F6',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:'#111827'}}>{selectedItem.domain}</span><Badge type={selectedItem.status}/></div>
              <ExternalLink size={16} color="#9CA3AF" style={{cursor:'pointer'}} title="View in TLS Analyzer" onClick={()=>nav('tls-analyzer')}/>
            </div>
            
            <div style={{padding:'18px 20px',flex:1,overflowY:'auto'}}>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:700,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6}}>VULNERABILITY</div>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#374151',lineHeight:1.7}}>{selectedItem.vulnDetail}</p>

              <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:700,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6,marginTop:16}}>REMEDIATION STEPS</div>
              <div style={{display:'flex',flexDirection:'column'}}>
                {selectedItem.steps.map((st,i)=>(
                  <div key={i} onClick={()=>setExpandedStep(expandedStep===i?null:i)} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'8px 4px',borderBottom:i<selectedItem.steps.length-1?'1px solid #F9FAFB':'none',cursor:'pointer',borderRadius:6,transition:'background 0.1s'}} onMouseOver={e=>e.currentTarget.style.background='#FAFAFA'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{width:24,height:24,borderRadius:12,background:'#EEF2FF',border:'1px solid #C7D2FE',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:'#4F46E5',flexShrink:0}}>{i+1}</div>
                    <div style={{flex:1,paddingTop:3}}>
                      <span style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:taskStatuses[selectedItem.id]==='fixed'?'#9CA3AF':'#374151',textDecoration:taskStatuses[selectedItem.id]==='fixed'?'line-through':'none',lineHeight:1.5}}>{st}</span>
                      {taskStatuses[selectedItem.id]==='fixed'&&<CheckCircle size={12} color="#10B981" style={{display:'inline',marginLeft:6,verticalAlign:'-2px'}}/>}
                      {expandedStep===i&&<div style={{background:'#F8F9FC',borderRadius:6,padding:'8px 12px',fontFamily:"'Inter',sans-serif",fontSize:11,color:'#6B7280',marginTop:4}}>Technical instruction placeholder for Step {i+1} execution.</div>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:700,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6,marginTop:16}}>CONFIGURATION PATCH</div>
              <div style={{position:'relative',background:'#F8F9FC',border:'1px solid #E5E7EB',borderRadius:8,padding:'14px 16px',overflowX:'auto'}}>
                <pre style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:'#374151',lineHeight:1.8,margin:0,whiteSpace:'pre-wrap'}}>
                  {selectedItem.configPatch.split('\\n').map((l,j)=><div key={j} style={{color:l.startsWith('#')?'#9CA3AF':(l.includes('ssl_')||l.includes('openssl'))?'#4F46E5':'#374151'}}>{l}</div>)}
                </pre>
                <div onClick={()=>{navigator.clipboard.writeText(selectedItem.configPatch);setCopiedCode(true);setTimeout(()=>setCopiedCode(false),2000);}} style={{position:'absolute',top:8,right:8,width:32,height:28,background:'white',border:'1px solid #E5E7EB',borderRadius:6,display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}}>
                  {copiedCode ? <Check size={13} color="#10B981"/> : <Copy size={13} color="#9CA3AF"/>}
                  {copiedCode&&<div style={{position:'absolute',bottom:'100%',marginBottom:4,background:'#111827',color:'white',padding:'4px 8px',borderRadius:4,fontSize:10,fontFamily:"'Inter',sans-serif",pointerEvents:'none',whiteSpace:'nowrap'}}>Copied!</div>}
                </div>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,background:'#F9FAFB',borderRadius:8,padding:'12px 16px',marginTop:16}}>
                {[{l:'COMPLEXITY',v:selectedItem.complexity,c:selectedItem.complexity==='Easy'?'#10B981':selectedItem.complexity==='Medium'?'#F59E0B':'#EF4444'},{l:'EST. TIME',v:selectedItem.estTime,c:'#111827'},{l:'SKILL LEVEL',v:selectedItem.skillLevel,c:'#4F46E5'}].map((e,i)=><div key={i}><div style={{fontFamily:"'Inter',sans-serif",fontSize:9,textTransform:'uppercase',color:'#9CA3AF',letterSpacing:'0.08em',marginBottom:4}}>{e.l}</div><div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:700,color:e.c}}>{e.v}</div></div>)}
              </div>

              <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:16}}>
                {selectedItem.nistrefs.map(r=><span key={r} style={{background:'#EEF2FF',border:'1px solid #C7D2FE',color:'#4F46E5',borderRadius:999,fontFamily:"'JetBrains Mono',monospace",fontSize:10,fontWeight:600,padding:'4px 12px'}}>{r}</span>)}
              </div>
            </div>

            <div style={{padding:'14px 20px',borderTop:'1px solid #F3F4F6'}}>
              {taskStatuses[selectedItem.id]==='pending' && <button className="btn-primary" style={{width:'100%',padding:'10px 0',justifyContent:'center'}} onClick={()=>updateTaskStatus(selectedItem.id,'in-progress')}>Mark as In Progress</button>}
              {taskStatuses[selectedItem.id]==='in-progress' && <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                <button className="btn-ghost" style={{justifyContent:'center'}} onClick={()=>updateTaskStatus(selectedItem.id,'pending')}>← Back to Pending</button>
                <button id="btn-mark-fixed" className="btn-primary" style={{justifyContent:'center',background:'#10B981',border:'none'}} onClick={()=>updateTaskStatus(selectedItem.id,'fixed')}>✓ Mark as Fixed</button>
              </div>}
              {taskStatuses[selectedItem.id]==='fixed' && <div style={{background:'#ECFDF5',border:'1px solid #A7F3D0',borderRadius:8,padding:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center'}}><CheckCircle size={18} color="#10B981" style={{marginRight:8}}/><span style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,color:'#059669'}}>Remediation Complete</span></div>
                <button className="btn-ghost" style={{padding:'4px 12px',minHeight:'auto'}} onClick={()=>updateTaskStatus(selectedItem.id,'pending')}>Reopen</button>
              </div>}

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                {selectedItem.assignee ? <div style={{fontFamily:"'Inter',sans-serif",fontSize:11}}><span style={{color:'#9CA3AF'}}>Assigned to: </span><span style={{fontWeight:600,color:'#374151'}}>{selectedItem.assignee}</span> <span style={{color:'#4F46E5',cursor:'pointer',marginLeft:4}} onClick={()=>{setAssignTarget(selectedItem);setAssignModalOpen(true);}}>Change</span></div>
                : <div style={{fontFamily:"'Inter',sans-serif",fontSize:11}}><span style={{color:'#9CA3AF'}}>Unassigned</span> <span style={{color:'#4F46E5',cursor:'pointer',marginLeft:4}} onClick={()=>{setAssignTarget(selectedItem);setAssignModalOpen(true);}}>+ Assign</span></div>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PQC ALGO CARDS */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:20}}>
        {PQC_ALGORITHMS.map(a=>(
          <div key={a.id} className="card" style={{padding:20,cursor:'pointer',transition:'all 0.15s'}} onMouseOver={e=>{e.currentTarget.style.borderColor='#4F46E5';e.currentTarget.style.boxShadow='0 4px 16px rgba(79,70,229,0.1)';e.currentTarget.style.transform='translateY(-1px)';}} onMouseOut={e=>{e.currentTarget.style.borderColor='#E5E7EB';e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.05)';e.currentTarget.style.transform='none';}}>
            <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:20,background:a.iconBg,display:'flex',alignItems:'center',justifyContent:'center'}}>{a.icon==='Lock'?<Lock size={20} color={a.iconColor}/>:a.icon==='PenLine'?<PenLine size={20} color={a.iconColor}/>:<ShieldCheck size={20} color={a.iconColor}/>}</div>
              <div>
                <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:700,color:'#111827'}}>{a.name}</p>
                <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#9CA3AF',marginTop:2}}>{a.purpose}</p>
                <div style={{background:'#EEF2FF',border:'1px solid #C7D2FE',color:'#4F46E5',borderRadius:999,fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:600,padding:'3px 10px',marginTop:6,display:'inline-block'}}>{a.fips}</div>
              </div>
            </div>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#6B7280',lineHeight:1.6,marginBottom:14}}>{a.description}</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,paddingTop:14,borderTop:'1px solid #F3F4F6'}}>
              {[{l:'Replaces',v:a.replaces},{l:'Security',v:a.securityLevel},{l:'Key Size',v:a.keySize},{l:'Standardized',v:a.standardDate}].map((d,i)=><div key={i}><div style={{fontFamily:"'Inter',sans-serif",fontSize:9,textTransform:'uppercase',color:'#9CA3AF',letterSpacing:'0.07em',marginBottom:2}}>{d.l}</div><div style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:'#374151'}}>{d.v}</div></div>)}
            </div>
            <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid #F9FAFB',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF'}}>Use for: {a.useCase}</span><ChevronRight size={14} color="#D1D5DB"/>
            </div>
          </div>
        ))}
      </div>

      {/* ASSIGN TASKS MODAL */}
      {assignModalOpen && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(4px)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className="card" style={{width:480,borderRadius:16,boxShadow:'0 20px 60px rgba(0,0,0,0.15)',padding:'24px',animation:'slideInUp 0.2s ease-out'}}>
            <Users size={24} color="#4F46E5"/>
            <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:18,fontWeight:700,color:'#111827',marginTop:12}}>Assign Remediation Task</h3>
            {assignTarget && <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#9CA3AF',marginTop:4}}>Assigning: {assignTarget.domain}</p>}
            <div style={{marginTop:20,display:'flex',flexDirection:'column',gap:14}}>
              {!assignTarget && <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Task to Assign</label><select style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',background:'#FAFAFA',fontFamily:"'Inter',sans-serif",fontSize:13}}><option value="">— Select pending item —</option>{ALL_REMEDIATION_ITEMS.filter(i=>taskStatuses[i.id]==='pending').map(i=><option key={i.id} value={i.id}>{i.domain} - {i.vulnerability}</option>)}</select></div>}
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Assign To</label><select style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',fontFamily:"'Inter',sans-serif",fontSize:13}}><option value="">— Select team member —</option><option value="Raj Kumar">Raj Kumar — Senior Security Engineer</option><option value="Priya Sharma">Priya Sharma — Systems Administrator</option><option value="Amit Patel">Amit Patel — Security Analyst</option></select></div>
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Priority Override</label><select style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',fontFamily:"'Inter',sans-serif",fontSize:13}}><option value="Critical">Critical</option><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option></select></div>
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Due Date</label><input type="date" defaultValue={new Date(Date.now()+12096e5).toISOString().split('T')[0]} style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',fontFamily:"'Inter',sans-serif",fontSize:13}}/></div>
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Notes</label><textarea rows={3} placeholder="Additional instructions..." style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',fontFamily:"'Inter',sans-serif",fontSize:13,resize:'none'}}/></div>
              <label style={{display:'flex',alignItems:'center',gap:8,fontFamily:"'Inter',sans-serif",fontSize:13}}><input type="checkbox" defaultChecked/> Send email notification</label>
              <div style={{display:'flex',justifyContent:'flex-end',gap:10,marginTop:10}}><button className="btn-ghost" onClick={()=>setAssignModalOpen(false)}>Cancel</button><button className="btn-primary" onClick={()=>{setAssignTarget(null);setAssignModalOpen(false);setToastMessage({msg:'Task assigned successfully',type:'success'});setTimeout(()=>setToastMessage(null),3000);}}>Assign Task</button></div>
            </div>
          </div>
        </div>
      )}

      {/* CONFETTI */}
      {confettiDetails && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',pointerEvents:'none',zIndex:9999}}>
          {Array.from({length:12}).map((_,i)=>{
            const angle=(i/12)*Math.PI*2; const vx=Math.cos(angle)*60; const vy=Math.sin(angle)*60 - 30;
            return <div key={i} style={{position:'absolute',left:confettiDetails.x,top:confettiDetails.y,width:6,height:6,borderRadius:3,background:['#4F46E5','#10B981','#F59E0B','#EF4444'][i%4],transformOrigin:'center',animation:`confettiAnim${i} 0.6s ease-out forwards`}}/>
          })}
          <style>{Array.from({length:12}).map((_,i)=>{const angle=(i/12)*Math.PI*2; const vx=Math.cos(angle)*60; const vy=Math.sin(angle)*60 - 30; return `@keyframes confettiAnim${i} { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(${vx}px, ${vy}px) scale(0); opacity: 0; } }`;}).join('\\n')}</style>
        </div>
      )}

      {/* TOAST */}
      {toastMessage && (
        <div style={{position:'fixed',bottom:24,right:24,zIndex:200,background:'white',border:'1px solid #E5E7EB',borderRadius:12,padding:'14px 18px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',display:'flex',gap:10,alignItems:'center',animation:'slideInRight 0.3s ease-out',minWidth:280}}>
          {toastMessage.type==='success'?<CheckCircle size={18} color="#10B981"/>:<Download size={18} color="#4F46E5"/>}
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:'#111827',flex:1}}>{toastMessage.msg}</div>
          <X size={16} color="#9CA3AF" style={{cursor:'pointer'}} onClick={()=>setToastMessage(null)}/>
        </div>
      )}
    </div>
  );
};


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


/* CERTIFICATES PAGE — Component */
const CertificatesPage = ({ nav }) => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [kpisAnimated, setKpisAnimated] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [issuanceStep, setIssuanceStep] = useState(null);
  const [verifyState, setVerifyState] = useState('idle');
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifyInput, setVerifyInput] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => { setTimeout(() => setKpisAnimated(true), 300); }, []);

  const filteredCerts = useMemo(() => {
    let certs = CERTIFICATES;
    if (filterType !== 'all') certs = certs.filter(c => c.type === filterType);
    if (searchText.trim()) certs = certs.filter(c => c.domain?.toLowerCase().includes(searchText.toLowerCase()));
    return certs;
  }, [filterType, searchText]);

  const showToast = (msg, type='success') => { setToastMessage({msg, type}); setTimeout(() => setToastMessage(null), 3000); };
  const copyText = (txt, id) => { navigator.clipboard.writeText(txt); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000); };

  const handleDownloadCert = (cert) => {
    setDownloadingId(cert.id);
    const content = `══════════════════════════════════\\nQuantumShield Digital Certificate\\n══════════════════════════════════\\nCertificate ID: ${cert.serialNumber}\\nDomain: ${cert.domain}\\nType: ${cert.type === 'quantum-safe' ? 'Fully Quantum Safe' : 'PQC Ready'}\\nIssued: ${cert.issuedFull}\\nExpires: ${cert.expiresFull}\\nKey Exchange: ${cert.keyExchange}\\nCertificate Algorithm: ${cert.certAlgo}\\nTLS Version: ${cert.tlsVersion}\\nIssued By: ${cert.issuedBy}\\nVerification URL: ${cert.verificationUrl}\\n\\nNIST Standards Compliance:\\n- FIPS 203 (ML-KEM): ${cert.keyExchange?.includes('KEM') ? 'Yes' : 'N/A'}\\n- FIPS 204 (ML-DSA): ${cert.certAlgo?.includes('DSA') ? 'Yes' : 'N/A'}\\n- FIPS 205 (SLH-DSA): ${cert.certAlgo?.includes('SLH') ? 'Yes' : 'N/A'}\\n\\nThis certificate was issued by QuantumShield\\nPunjab National Bank Cybersecurity Platform\\n══════════════════════════════════`;
    const blob = new Blob([content], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${cert.domain}-certificate.txt`;
    setTimeout(() => { a.click(); URL.revokeObjectURL(url); setDownloadingId(null); showToast(`${cert.domain} certificate downloaded`); }, 800);
  };

  const handleVerify = () => {
    if(!verifyInput.trim()) return;
    setVerifyState('verifying');
    setTimeout(() => {
      const q = verifyInput.toLowerCase().trim();
      const found = CERTIFICATES.find(c => c.domain?.toLowerCase() === q || c.serialNumber?.toLowerCase() === q);
      setVerifyResult(found); setVerifyState(found ? 'found' : 'not-found');
    }, 1500);
  };

  const startIssuance = () => {
    setIssuanceStep('scanning');
    setTimeout(() => { setIssuanceStep('validating');
      setTimeout(() => { setIssuanceStep('issuing');
        setTimeout(() => { setIssuanceStep('recording');
          setTimeout(() => { setIssuanceStep('complete');
            setTimeout(() => {
              setIssueModalOpen(false); setIssuanceStep(null); showToast(`Certificate issued successfully`);
            }, 600);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  };

  return (
    <div style={{position:'relative'}}>
      <PageHeader title="Certificates & Labels" subtitle="Digital quantum-safety certifications issued to compliant assets"
        actions={<><button className="btn-ghost" onClick={()=>setVerifyModalOpen(true)}>Verification Portal</button>
        <button className="btn-primary" onClick={()=>setIssueModalOpen(true)}>+ Issue Certificate</button></>} />

      {/* KPI CARDS */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:20}}>
        {CERT_KPIS.map((k,i)=>{
          const selected = filterType === (i===0?'all':i===1?'quantum-safe':'pqc-ready');
          return (
            <div key={i} className="card" onClick={()=>setFilterType(i===0?'all':i===1?'quantum-safe':'pqc-ready')} style={{padding:'20px 24px',cursor:'pointer',border:`1px solid ${selected?k.iconColor:'#E5E7EB'}`,boxShadow:selected?`0 0 0 3px ${k.iconColor}15`:'0 1px 4px rgba(0,0,0,0.05)',transition:'all 0.15s'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:10.5,fontWeight:600,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.07em'}}>{k.label}</div>
                <div style={{width:32,height:32,borderRadius:16,background:k.iconBg,display:'flex',alignItems:'center',justifyContent:'center'}}>{k.icon==='Award'?<Award size={16} color={k.iconColor}/>:k.icon==='ShieldCheck'?<ShieldCheck size={16} color={k.iconColor}/>:<Zap size={16} color={k.iconColor}/>}</div>
              </div>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:36,fontWeight:800,color:k.valueColor,marginTop:12}}>{kpisAnimated?k.value:0}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#9CA3AF',marginTop:8}}>{k.sub}</div>
            </div>
          )
        })}
      </div>

      {/* FILTER & SEARCH */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div style={{display:'flex',gap:4}}>
          {[{v:'all',l:'All'},{v:'quantum-safe',l:'Quantum Safe'},{v:'pqc-ready',l:'PQC Ready'},{v:'in-review',l:'In Review'}].map(t=>(
            <div key={t.v} onClick={()=>setFilterType(t.v)} style={{padding:'7px 14px',borderRadius:8,fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:filterType===t.v?600:500,cursor:'pointer',background:filterType===t.v?'#4F46E5':'transparent',color:filterType===t.v?'white':'#6B7280',transition:'background 0.12s'}} onMouseOver={e=>filterType!==t.v&&(e.currentTarget.style.background='#F3F4F6')} onMouseOut={e=>filterType!==t.v&&(e.currentTarget.style.background='transparent')}>{t.l} ({CERTIFICATES.filter(c=>t.v==='all'?true:c.type===t.v).length})</div>
          ))}
        </div>
        <div style={{position:'relative'}}>
          <Search size={13} color="#6B7280" style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)'}}/>
          <input type="text" placeholder="Search domain..." value={searchText} onChange={e=>setSearchText(e.target.value)} style={{width:220,background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:8,padding:'7px 12px 7px 30px',fontFamily:"'Inter',sans-serif",fontSize:12,color:'#111827',outline:'none'}}/>
        </div>
      </div>

      {/* CERTIFICATE GRID */}
      {filteredCerts.length === 0 ? (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:240,gap:12}}>
          <Award size={48} color="#D1D5DB" />
          <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:600,color:'#374151'}}>No certificates found</p>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#9CA3AF'}}>Try adjusting your search or filter</p>
          <button className="btn-ghost" onClick={()=>{setFilterType('all');setSearchText('');}}>Clear filters</button>
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:20}}>
          {filteredCerts.map((cert, idx) => {
            const stIcon = CERT_STYLES[cert.type];
            return (
              <div key={cert.id} className="card page-animate" style={{padding:0,overflow:'hidden',opacity:cert.type==='in-review'?0.75:1,transition:'all 0.15s ease',animationDelay:`${idx*0.1}s`}} onMouseOver={e=>{if(cert.type!=='in-review'){e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)';e.currentTarget.style.transform='translateY(-2px)';}}} onMouseOut={e=>{if(cert.type!=='in-review'){e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.05)';e.currentTarget.style.transform='none';}}}>
                <div style={{height:100,background:stIcon.bannerBg,borderBottom:`1px solid ${stIcon.bannerBorder}`,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
                  <ShieldCheck size={44} color={stIcon.iconColor} style={cert.type==='quantum-safe'?{filter:'drop-shadow(0 0 8px rgba(5,150,105,0.4))'}:cert.type==='in-review'?{opacity:0.4}:{}}/>
                  {cert.type==='quantum-safe' && Array.from({length:3}).map((_,i)=><div key={i} style={{position:'absolute',width:4,height:4,borderRadius:2,background:'#059669',opacity:0.3,left:`${20+i*30}%`,top:`${20+i*20}%`,animation:`pulse 2s infinite ${i*0.6}s`}}/>)}
                </div>
                <div style={{padding:'16px 18px'}}>
                  <div style={{marginBottom:10,height:18}}>{cert.type==='in-review' ? <div className="shimmer-block" style={{height:18,width:140,borderRadius:4}}/> : <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:700,color:'#111827'}}>{cert.domain}</span>}</div>
                  <div style={{marginBottom:14}}><span style={{background:stIcon.badgeBg,color:stIcon.badgeColor,border:`1px solid ${stIcon.badgeBorder}`,borderRadius:999,padding:'3px 10px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600}}>{stIcon.badgeLabel}</span></div>
                  <div><div style={{fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:600,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:4}}>ISSUED / EXPIRES</div>
                  <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:'#374151'}}>{cert.type==='in-review'?'—':`${cert.issuedDate} / ${cert.expiresIn}`}</div></div>
                  <div style={{height:1,background:'#F3F4F6',margin:'12px 0'}}/>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span onClick={()=>{if(cert.type!=='in-review'){setSelectedCert(cert);setDetailModalOpen(true);}}} style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:cert.type==='in-review'?'#D1D5DB':'#4F46E5',cursor:cert.type==='in-review'?'default':'pointer'}} onMouseOver={e=>{if(cert.type!=='in-review')e.currentTarget.style.textDecoration='underline'}} onMouseOut={e=>e.currentTarget.style.textDecoration='none'}>View Details</span>
                    <div onClick={()=>{if(cert.type!=='in-review')handleDownloadCert(cert)}} style={{color:cert.type==='in-review'?'#D1D5DB':'#9CA3AF',cursor:cert.type==='in-review'?'not-allowed':'pointer'}} onMouseOver={e=>{if(cert.type!=='in-review')e.currentTarget.style.color='#4F46E5'}} onMouseOut={e=>{if(cert.type!=='in-review')e.currentTarget.style.color='#9CA3AF'}}>
                      {downloadingId===cert.id?<RefreshCw size={16} style={{animation:'spin 1s linear infinite'}}/>:<Download size={16}/>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CRITERIA CARD */}
      <div className="card" style={{padding:24,marginBottom:20}}>
        <div style={{marginBottom:20}}>
          <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:700,color:'#111827'}}>Certification Criteria</p>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#9CA3AF',marginTop:3}}>Assets must meet ALL criteria to receive each label</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32}}>
          {['quantumSafe', 'pqcReady'].map((type, i)=>{
            const crit = CERT_CRITERIA[type];
            return (
              <div key={i}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                  <div style={{width:36,height:36,borderRadius:18,background:crit.iconBg,display:'flex',alignItems:'center',justifyContent:'center'}}>{crit.icon==='ShieldCheck'?<ShieldCheck size={20} color={crit.iconColor}/>:<Zap size={20} color={crit.iconColor}/>}</div>
                  <div><p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,fontWeight:700,color:'#111827'}}>{crit.title}</p><p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF',marginTop:1}}>All 5 criteria required</p></div>
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                  {crit.items.map((item, j)=>(
                    <div key={j} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:j<crit.items.length-1?'1px solid #F9FAFB':'none'}}>
                      <CheckCircle size={16} color="#059669" style={{flexShrink:0}}/><span style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#374151'}}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <div style={{marginTop:20,paddingTop:20,borderTop:'1px solid #F3F4F6',background:'#FFFBEB',border:'1px solid #FDE68A',borderRadius:8,padding:'12px 16px',display:'flex',alignItems:'flex-start',gap:10}}>
          <Info size={16} color="#F59E0B" style={{flexShrink:0,marginTop:2}}/><span style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#374151',lineHeight:1.6}}>Assets with a PQC Ready certificate can be upgraded to Fully Quantum Safe by migrating to ML-DSA or SLH-DSA certificate signatures and removing all classical key exchange fallbacks.</span>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {detailModalOpen && selectedCert && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(4px)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={e=>{if(e.target===e.currentTarget)setDetailModalOpen(false)}}>
          <div className="card" style={{width:560,maxHeight:'85vh',borderRadius:16,boxShadow:'0 20px 60px rgba(0,0,0,0.15)',padding:0,overflowY:'auto',animation:'slideInUp 0.2s ease-out'}}>
            <div style={{height:80,background:CERT_STYLES[selectedCert.type].bannerBg,display:'flex',alignItems:'center',justifyContent:'center'}}><ShieldCheck size={40} color={CERT_STYLES[selectedCert.type].iconColor}/></div>
            <div style={{padding:'20px 24px 0'}}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div><div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:20,fontWeight:800,color:'#111827'}}>{selectedCert.domain}</div><div style={{marginTop:6}}><span style={{background:CERT_STYLES[selectedCert.type].badgeBg,color:CERT_STYLES[selectedCert.type].badgeColor,border:`1px solid ${CERT_STYLES[selectedCert.type].badgeBorder}`,borderRadius:999,padding:'3px 10px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600}}>{CERT_STYLES[selectedCert.type].badgeLabel}</span></div></div>
                <X size={24} color="#6B7280" style={{cursor:'pointer'}} onClick={()=>setDetailModalOpen(false)}/>
              </div>
            </div>
            <div style={{padding:'20px 24px'}}>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:700,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:12}}>CERTIFICATE DETAILS</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                {[{l:'Certificate ID',v:<span onClick={()=>copyText(selectedCert.id,'cid')} style={{color:'#4F46E5',fontFamily:"'JetBrains Mono',monospace",cursor:'pointer'}}>{selectedCert.id} {copiedId==='cid'?<Check size={10} color="#10B981" style={{display:'inline'}}/>:<Copy size={10} color="#9CA3AF" style={{display:'inline'}}/>}</span>},
                  {l:'Issued By',v:selectedCert.issuedBy},{l:'Issue Date',v:selectedCert.issuedFull},{l:'Expiry Date',v:selectedCert.expiresFull},{l:'Key Exchange',v:<span style={{color:selectedCert.type==='quantum-safe'?'#059669':'#2563EB'}}>{selectedCert.keyExchange}</span>},{l:'Cert Algorithm',v:<span style={{color:selectedCert.type==='quantum-safe'?'#059669':'#2563EB'}}>{selectedCert.certAlgo}</span>},{l:'TLS Version',v:<span style={{background:'#ECFDF5',color:'#059669',border:'1px solid #A7F3D0',borderRadius:999,padding:'2px 8px',fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>{selectedCert.tlsVersion}</span>},
                  {l:'Serial Number',v:<span onClick={()=>copyText(selectedCert.serialNumber,'sid')} style={{color:'#374151',fontFamily:"'JetBrains Mono',monospace",cursor:'pointer'}}>{selectedCert.serialNumber.slice(0,18)}... {copiedId==='sid'?<Check size={10} color="#10B981" style={{display:'inline'}}/>:<Copy size={10} color="#9CA3AF" style={{display:'inline'}}/>}</span>}].map((d,i)=>(
                  <div key={i}><div style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:'#6B7280',marginBottom:2}}>{d.l}</div><div style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:'#111827'}}>{d.v}</div></div>
                ))}
              </div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:700,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,marginTop:20}}>CERTIFICATION CHECKLIST</div>
              <div style={{display:'flex',flexDirection:'column'}}>
                {selectedCert.criteria.map((c,i)=><div key={i} style={{padding:'8px 0',borderBottom:'1px solid #F9FAFB',display:'flex',alignItems:'center',gap:10}}><CheckCircle size={16} color="#059669"/><span style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#374151'}}>{c}</span></div>)}
              </div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:700,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,marginTop:20}}>NIST PQC COMPLIANCE</div>
              {[{l:'FIPS 203',n:'Key Encapsulation',v:selectedCert.keyExchange.includes('KEM')},{l:'FIPS 204',n:'Digital Signatures',v:selectedCert.certAlgo.includes('DSA')},{l:'FIPS 205',n:'Stateless Signatures',v:selectedCert.certAlgo.includes('SLH')}].map((s,i)=>(
                <div key={i} style={{padding:'8px 0',borderBottom:'1px solid #F9FAFB',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div><span style={{background:'#EEF2FF',border:'1px solid #C7D2FE',color:'#4F46E5',borderRadius:999,fontFamily:"'JetBrains Mono',monospace",fontSize:10,fontWeight:600,padding:'2px 8px',marginRight:8}}>{s.l}</span><span style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#374151'}}>{s.n}</span></div>
                  {s.v?<div style={{display:'flex',alignItems:'center',gap:4}}><Check size={14} color="#059669"/><span style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,color:'#059669'}}>Compliant</span></div>:<span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF'}}>— Not Applicable</span>}
                </div>
              ))}
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:700,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,marginTop:20}}>VERIFICATION</div>
              <div style={{background:'#F9FAFB',borderRadius:8,padding:'12px 14px',display:'flex',alignItems:'center',gap:8}}>
                <Link size={14} color="#4F46E5"/><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:'#4F46E5',flex:1}}>{selectedCert.verificationUrl.slice(0,40)}...</span>
                <Copy size={14} color="#9CA3AF" style={{cursor:'pointer'}} onClick={()=>copyText(selectedCert.verificationUrl,'vurl')}/>
                <ExternalLink size={14} color="#9CA3AF" style={{cursor:'pointer'}} onClick={()=>window.open(selectedCert.verificationUrl,'_blank')}/>
              </div>
              <div style={{marginTop:12,width:80,height:80,background:'#F3F4F6',border:'1px solid #E5E7EB',borderRadius:8,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <QrCode size={32} color="#9CA3AF"/><span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:'#9CA3AF',marginTop:4}}>QR Code</span>
              </div>
            </div>
            <div style={{padding:'16px 24px',borderTop:'1px solid #F3F4F6',display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button className="btn-ghost" onClick={()=>{handleDownloadCert(selectedCert);setDetailModalOpen(false);}}>Download Certificate</button>
              <button className="btn-ghost" onClick={()=>{nav('tls-analyzer');setDetailModalOpen(false);}}>View in TLS Analyzer</button>
              <button className="btn-primary" onClick={()=>{navigator.clipboard.writeText(selectedCert.verificationUrl);showToast('Verification link copied to clipboard');setDetailModalOpen(false);}}>Share Verification Link</button>
            </div>
          </div>
        </div>
      )}

      {/* ISSUE CERTIFICATE MODAL */}
      {issueModalOpen && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(4px)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className="card" style={{width:520,borderRadius:16,boxShadow:'0 20px 60px rgba(0,0,0,0.15)',padding:'24px',animation:'slideInUp 0.2s ease-out'}}>
            <Award size={24} color="#4F46E5"/>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:18,fontWeight:700,color:'#111827',marginTop:12}}>Issue New Certificate</p>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#9CA3AF',marginTop:4}}>Validate and certify an asset's quantum-safety posture</p>
            <div style={{marginTop:24,display:'flex',flexDirection:'column',gap:14}}>
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Target Asset</label>
              <select style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',fontFamily:"'Inter',sans-serif",fontSize:13}}>
                <optgroup label="Eligible"><option>secure-api.pnbindia.in</option><option>pqc-test.pnbindia.in</option></optgroup>
              </select></div>
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Certificate Type</label>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                <label style={{display:'flex',alignItems:'center',gap:8,fontFamily:"'Inter',sans-serif",fontSize:13}}><input type="radio" name="ctype" defaultChecked/> Fully Quantum Safe — requires all PQC criteria</label>
                <label style={{display:'flex',alignItems:'center',gap:8,fontFamily:"'Inter',sans-serif",fontSize:13}}><input type="radio" name="ctype"/> PQC Ready — requires hybrid + TLS 1.3</label>
              </div></div>
              <div style={{background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:8,padding:12,display:'flex',alignItems:'flex-start',gap:10}}><Info size={16} color="#4F46E5" style={{flexShrink:0,marginTop:2}}/><div><p style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:'#374151'}}>Pre-issuance validation will run automatically</p><p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#6B7280',marginTop:4}}>✓ TLS scans ✓ Keystore verification ✓ Criteria validation</p></div></div>
              <label style={{display:'flex',alignItems:'center',gap:8,fontFamily:"'Inter',sans-serif",fontSize:13}}><input type="checkbox" defaultChecked/> Run full TLS scan before issuing</label>
              <label style={{display:'flex',alignItems:'center',gap:8,fontFamily:"'Inter',sans-serif",fontSize:13}}><input type="checkbox" defaultChecked/> Send notification on issue</label>
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Notes / Reason for Issuance</label><textarea rows={3} placeholder="Optional notes..." style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',fontFamily:"'Inter',sans-serif",fontSize:13,resize:'none'}}/></div>

              {issuanceStep && (
                <div style={{background:'#F9FAFB',borderRadius:8,padding:14,marginTop:10}}>
                  {[{s:'scanning',lp:'Running TLS scan...',lc:'TLS scan complete'},{s:'validating',lp:'Validating PQC criteria...',lc:'All 5 criteria passed'},{s:'issuing',lp:'Generating certificate...',lc:'Certificate generated'},{s:'recording',lp:'Recording in CBOM...',lc:'CBOM entry created'}].map((st,i)=>{
                    const steps=['scanning','validating','issuing','recording','complete']; const curI=steps.indexOf(issuanceStep); const stateI=i;
                    return <div key={i} style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}><div style={{width:16}}>{curI>stateI?<CheckCircle size={14} color="#10B981" style={{animation:'transform scale 0→1 0.2s'}}/>:curI===stateI?<RefreshCw size={14} color="#4F46E5" style={{animation:'spin 1s linear infinite'}}/>:<div style={{width:14,height:14,borderRadius:7,border:'1px dashed #D1D5DB'}}/>}</div><span style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:curI>stateI?'#10B981':curI===stateI?'#4F46E5':'#9CA3AF'}}>{curI>stateI?st.lc:st.lp}</span></div>
                  })}
                  <div style={{height:4,background:'#E5E7EB',borderRadius:2,marginTop:10,overflow:'hidden'}}><div style={{height:'100%',background:'#4F46E5',width:`${['scanning','validating','issuing','recording','complete'].indexOf(issuanceStep)*25}%`,transition:'width 0.4s'}}/></div>
                </div>
              )}

              <div style={{display:'flex',justifyContent:'flex-end',gap:10,marginTop:10}}><button className="btn-ghost" onClick={()=>setIssueModalOpen(false)}>Cancel</button><button className="btn-primary" onClick={startIssuance} disabled={!!issuanceStep}>{issuanceStep?<><RefreshCw size={14} style={{animation:'spin 1s linear infinite'}}/> Issuing...</>:'Validate & Issue'}</button></div>
            </div>
          </div>
        </div>
      )}

      {/* VERIFY MODAL */}
      {verifyModalOpen && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(4px)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className="card" style={{width:480,borderRadius:16,boxShadow:'0 20px 60px rgba(0,0,0,0.15)',padding:'24px',animation:'slideInUp 0.2s ease-out'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}><Search size={24} color="#4F46E5"/><X size={20} color="#9CA3AF" style={{cursor:'pointer'}} onClick={()=>{setVerifyModalOpen(false);setVerifyState('idle');setVerifyInput('');}}/></div>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:18,fontWeight:700,color:'#111827',marginTop:12}}>Certificate Verification Portal</p>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#9CA3AF',marginTop:4}}>Verify the authenticity of any QuantumShield certificate</p>
            <div style={{marginTop:24}}>
              <input type="text" placeholder="QS-2026-001-CORP or corp.pnbindia.in" value={verifyInput} onChange={e=>setVerifyInput(e.target.value)} style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #E5E7EB',fontFamily:"'Inter',sans-serif",fontSize:14,marginBottom:12,outline:'none'}}/>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF',marginBottom:16}}>Try: corp.pnbindia.in or QS-2026-002-CDN</p>
              <button className="btn-primary" style={{width:'100%',justifyContent:'center',padding:'12px 0'}} onClick={handleVerify}>Verify Certificate</button>
            </div>
            {verifyState==='verifying' && <div style={{marginTop:24,textAlign:'center',padding:20}}><div style={{display:'flex',justifyContent:'center',gap:6,marginBottom:12}}>{Array.from({length:3}).map((_,i)=><div key={i} style={{width:8,height:8,borderRadius:4,background:'#4F46E5',animation:`bounce 1s infinite ${i*0.2}s`}}/>)}</div><p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#6B7280'}}>Checking certificate registry...</p></div>}
            {verifyState==='found' && verifyResult && <div style={{marginTop:24,background:'#ECFDF5',border:'1px solid #A7F3D0',borderRadius:12,padding:16,animation:'slideInUp 0.3s ease-out'}}><div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}><CheckCircle size={32} color="#059669" style={{animation:'scaleIn 0.3s ease-out'}}/><span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:'#059669'}}>Certificate Verified</span></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>{[{l:'Domain',v:verifyResult.domain},{l:'Type',v:verifyResult.type==='quantum-safe'?'Fully Quantum Safe':'PQC Ready'},{l:'Issued By',v:verifyResult.issuedBy},{l:'Expires',v:verifyResult.expiresFull}].map((d,i)=><div key={i}><div style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:'#059669',opacity:0.8,marginBottom:2}}>{d.l}</div><div style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:'#065F46'}}>{d.v}</div></div>)}</div><button className="btn-ghost" style={{width:'100%',justifyContent:'center'}} onClick={()=>{setVerifyModalOpen(false);setSelectedCert(verifyResult);setDetailModalOpen(true);}}>View Full Details</button></div>}
            {verifyState==='not-found' && <div style={{marginTop:24,background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:12,padding:16,animation:'slideInUp 0.3s ease-out'}}><div style={{display:'flex',alignItems:'flex-start',gap:12}}><XCircle size={32} color="#DC2626" style={{flexShrink:0}}/><div><p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:'#DC2626'}}>Certificate Not Found</p><p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#991B1B',marginTop:4,marginBottom:12}}>No valid certificate exists for this domain or ID</p><div style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#B91C1C',listStylePosition:'inside'}}><ul style={{paddingLeft:16,margin:0,opacity:0.8}}><li>Check that the domain is spelled correctly</li><li>The certificate may have expired</li><li>Contact security@pnb.co.in for assistance</li></ul></div></div></div></div>}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATIONS */}
      {toastMessage && (
        <div style={{position:'fixed',bottom:24,right:24,zIndex:200,background:'white',border:`1px solid #E5E7EB`,borderRadius:12,padding:'14px 18px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',display:'flex',gap:10,alignItems:'center',animation:'slideInRight 0.3s ease-out',minWidth:280}}>
          <CheckCircle size={18} color="#10B981"/>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:'#111827',flex:1}}>{toastMessage.msg}</div>
          <X size={16} color="#9CA3AF" style={{cursor:'pointer'}} onClick={()=>setToastMessage(null)}/>
        </div>
      )}

      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`}</style>
    </div>
  );
};


const RISK_DATA = {
  overallScore: 78.2,
  vulnerableAssets: 184,
  totalAssets: 247,
  byCategory: [
    { label: 'Network', color: '#4F46E5', count: 82, pct: 33 },
    { label: 'Storage', color: '#F59E0B', count: 65, pct: 26 },
    { label: 'Compute', color: '#10B981', count: 54, pct: 22 },
    { label: 'Identity', color: '#EF4444', count: 46, pct: 19 }
  ],
  sixMonthTrend: [
    { month: 'Oct', score: 85.1 },
    { month: 'Nov', score: 84.5 },
    { month: 'Dec', score: 82.3 },
    { month: 'Jan', score: 81.0 },
    { month: 'Feb', score: 79.8 },
    { month: 'Mar', score: 78.2 }
  ],
  lastImprovement: '1.6 pts'
};

const TOP_CRITICAL_ASSETS = [
  { rank: 1, domain: 'vpn.pnbindia.in', exposure: 'Customer Data', score: 96, status: 'critical' },
  { rank: 2, domain: 'api.pnbindia.in', exposure: 'Financial Txns', score: 92, status: 'critical' },
  { rank: 3, domain: 'db-main.pnbindia.in', exposure: 'PII Records', score: 88, status: 'high' }
];

const HNDL_DATA = {
  firstEncryptedYear: 2017,
  crqcRiskMap: {
    2028: { dataAtRisk: '8.4 TB', records: '4.2M', risk: 'CRITICAL', color: '#EF4444' },
    2029: { dataAtRisk: '7.1 TB', records: '3.8M', risk: 'CRITICAL', color: '#EF4444' },
    2030: { dataAtRisk: '5.9 TB', records: '3.1M', risk: 'HIGH', color: '#F97316' },
    2031: { dataAtRisk: '4.7 TB', records: '2.3M', risk: 'HIGH', color: '#F97316' },
    2032: { dataAtRisk: '3.8 TB', records: '1.9M', risk: 'MEDIUM', color: '#F59E0B' },
    2033: { dataAtRisk: '2.9 TB', records: '1.5M', risk: 'MEDIUM', color: '#F59E0B' },
    2034: { dataAtRisk: '1.8 TB', records: '0.9M', risk: 'LOW', color: '#10B981' },
    2035: { dataAtRisk: '1.1 TB', records: '0.4M', risk: 'LOW', color: '#10B981' }
  },
  timeline: [
    { year: 2017, type: 'start', event: 'Initial Encrypted Data' },
    { year: 2024, type: 'milestone', event: 'NIST Finalizes PQC' },
    { year: 2026, type: 'current', event: 'Current Day Analysis' },
    { year: 2031, type: 'threat', event: 'Estimated CRQC Emergence' }
  ]
};

const RISK_MATRIX_ASSETS = [
  { domain: 'vpn.pnbindia.in', status: 'critical', x: 85, y: 92, r: 8 },
  { domain: 'api.pnbindia.in', status: 'critical', x: 78, y: 88, r: 6 },
  { domain: 'files.pnbindia.in', status: 'high', x: 65, y: 75, r: 5 },
  { domain: 'intranet.pnbindia.in', status: 'medium', x: 45, y: 55, r: 4 },
  { domain: 'public.pnbindia.in', status: 'pqc-ready', x: 25, y: 35, r: 4 },
  { domain: 'static.pnbindia.in', status: 'quantum-safe', x: 10, y: 15, r: 3 }
];

const ALGO_VULN_TABLE = [
  { algo: 'RSA-2048', shors: true, grovers: false, nistrec: 'Replace with ML-KEM', urgent: true },
  { algo: 'ECDH (P-256)', shors: true, grovers: false, nistrec: 'Replace with ML-KEM', urgent: true },
  { algo: 'AES-128', shors: false, grovers: true, nistrec: 'Upgrade to AES-256', urgent: false },
  { algo: 'AES-256', shors: false, grovers: false, nistrec: 'Safe against Grover\'s', urgent: false },
  { algo: 'SHA-256', shors: false, grovers: true, nistrec: 'Acceptable but consider SHA-384+', urgent: false }
];

const KEY_EXCHANGE_DIST_RISK = [
  { name: 'RSA Transport', count: 112, color: '#EF4444' },
  { name: 'ECDH', count: 85, color: '#F97316' },
  { name: 'Hybrid', count: 32, color: '#3B82F6' },
  { name: 'ML-KEM-768', count: 18, color: '#10B981' }
];

const ALL_CBOM_COMPONENTS = [
  { id: 'CBOM-001', asset: 'vpn.pnb.in', type: 'Gateway', tlsVer: '1.2', algorithm: 'RSA-2048', riskScore: 96, status: 'critical' },
  { id: 'CBOM-002', asset: 'api.pnb.in', type: 'API', tlsVer: '1.2', algorithm: 'ECDH', riskScore: 92, status: 'critical' },
  { id: 'CBOM-003', asset: 'portal.pnb.in', type: 'Web', tlsVer: '1.3', algorithm: 'Hybrid', riskScore: 45, status: 'pqc-ready' },
  { id: 'CBOM-004', asset: 'static.pnb.in', type: 'CDN', tlsVer: '1.3', algorithm: 'ML-KEM', riskScore: 12, status: 'quantum-safe' }
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


/* REPORTS PAGE — DATA CONSTANTS */
const REPORT_TYPES = [
  { id: 'full', title: 'Full Security Report', subtitle: 'All sections, complete detail', icon: 'FileText', sections: ['cbom', 'tls', 'risk', 'remediation', 'compliance'], estimatedPages: 24, estimatedSize: '2.4 MB' },
  { id: 'executive', title: 'Executive Summary', subtitle: '2-page overview for management', icon: 'BarChart2', sections: ['risk', 'compliance'], estimatedPages: 2, estimatedSize: '180 KB' },
  { id: 'technical', title: 'Technical Deep Dive', subtitle: 'Raw data, all cipher details', icon: 'Terminal', sections: ['cbom', 'tls', 'remediation'], estimatedPages: 38, estimatedSize: '4.1 MB' },
  { id: 'compliance', title: 'Compliance Report', subtitle: 'Framework gap analysis', icon: 'ClipboardCheck', sections: ['compliance', 'risk'], estimatedPages: 12, estimatedSize: '980 KB' },
];

const REPORT_SECTIONS = [
  { id: 'cbom', label: 'CBOM Inventory', defaultOn: true },
  { id: 'tls', label: 'TLS Analysis Results', defaultOn: true },
  { id: 'risk', label: 'Quantum Risk Assessment', defaultOn: true },
  { id: 'remediation', label: 'Remediation Plan', defaultOn: true },
  { id: 'compliance', label: 'Compliance Mapping', defaultOn: true },
  { id: 'rawdata', label: 'Raw Data Export', defaultOn: false },
];

const EXPORT_FORMATS = [
  { id: 'pdf', label: 'PDF', icon: 'FileText' },
  { id: 'json', label: 'JSON', icon: 'Braces' },
  { id: 'csv', label: 'CSV', icon: 'Table' },
  { id: 'xml', label: 'XML', icon: 'Code' },
];

const SCHEDULED_REPORTS = [
  { id: 'SCH-001', name: 'Weekly Full Security Report', type: 'full', frequency: 'Weekly', nextRun: 'Mar 19, 2026 — 02:00 IST', format: 'PDF', recipients: ['ciso@pnb.co.in', 'security@pnb.co.in'], active: true },
  { id: 'SCH-002', name: 'Monthly Executive Summary', type: 'executive', frequency: 'Monthly', nextRun: 'Apr 01, 2026 — 08:00 IST', format: 'PDF', recipients: ['board@pnb.co.in'], active: true },
  { id: 'SCH-003', name: 'Daily Compliance Check', type: 'compliance', frequency: 'Daily', nextRun: 'Mar 13, 2026 — 00:00 IST', format: 'JSON', recipients: ['compliance@pnb.co.in'], active: false },
];

const RECENT_REPORTS = [
  { id: 'RPT-001', name: 'Full Security Report — Mar 12', type: 'full', generatedAt: 'Mar 12, 2026 18:00', format: 'PDF', size: '2.3 MB', pages: 24, generatedBy: 'raj.kumar' },
  { id: 'RPT-002', name: 'Executive Summary — Mar 05', type: 'executive', generatedAt: 'Mar 05, 2026 09:00', format: 'PDF', size: '175 KB', pages: 2, generatedBy: 'admin' },
  { id: 'RPT-003', name: 'Compliance Report — Feb 28', type: 'compliance', generatedAt: 'Feb 28, 2026 17:30', format: 'PDF', size: '960 KB', pages: 11, generatedBy: 'deepa.singh' },
  { id: 'RPT-004', name: 'CBOM Export — Feb 26', type: 'technical', generatedAt: 'Feb 26, 2026 14:00', format: 'JSON', size: '1.2 MB', pages: null, generatedBy: 'raj.kumar' },
];


/* REPORTS PAGE — Component */
const ReportsPage = ({ nav }) => {
  const [reportType, setReportType] = useState('full');
  const [dateFrom, setDateFrom] = useState('2026-02-12');
  const [dateTo, setDateTo] = useState('2026-03-12');
  const [sections, setSections] = useState(() => {
    const map = {}; REPORT_SECTIONS.forEach(s => map[s.id] = s.defaultOn); return map;
  });
  const [exportFormat, setExportFormat] = useState('pdf');
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [scheduledModalOpen, setScheduledModalOpen] = useState(false);
  const [recentReportsOpen, setRecentReportsOpen] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  const toggleSection = (id) => {
    setSections(prev => ({ ...prev, [id]: !prev[id] }));
    setPreviewKey(k => k + 1);
  };

  useEffect(() => {
    const type = REPORT_TYPES.find(t => t.id === reportType);
    if (type) {
      const newSections = {};
      REPORT_SECTIONS.forEach(s => newSections[s.id] = type.sections.includes(s.id));
      setSections(newSections);
      setPreviewKey(k => k + 1);
    }
  }, [reportType]);

  const currentType = REPORT_TYPES.find(t => t.id === reportType);
  const activeSectionsCount = Object.values(sections).filter(Boolean).length;

  const showToast = (msg, type='success') => { setToastMessage({msg, type}); setTimeout(() => setToastMessage(null), 3000); };

  const downloadReport = () => {
    let content = '', filename = '';
    if (exportFormat === 'pdf') { content = 'QuantumShield PDF Export Simulation\n\nReport Type: ' + currentType.title; filename = 'pnb-quantum-security-report.txt'; }
    else if (exportFormat === 'json') { content = JSON.stringify({ metadata: { type: currentType.id, format: exportFormat, generated: new Date().toISOString() }, summary: { totalAssets: 247, riskScore: 67.4 } }, null, 2); filename = 'pnb-cbom-report.json'; }
    else if (exportFormat === 'csv') { content = 'Asset,Vulnerability,Complexity,Status\ncorp.pnbindia.in,RSA Key Exchange,Hard,Pending'; filename = 'pnb-security-report.csv'; }
    else { content = '<?xml version="1.0"?><report><type>'+currentType.title+'</type></report>'; filename = 'pnb-report.xml'; }
    
    const blob = new Blob([content], {type: 'text/plain'}); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
    
    setGenerating(false); setGenerationStep(0);
    showToast(`Report downloaded successfully: ${exportFormat.toUpperCase()} · ${currentType.estimatedPages} pages`);
  };

  const handleGenerate = () => {
    if(new Date(dateTo) < new Date(dateFrom)) { showToast('End date must be after start date', 'error'); return; }
    setGenerating(true); setGenerationStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step++; setGenerationStep(step);
      if (step === 6) { clearInterval(interval); setTimeout(downloadReport, 600); }
    }, 600);
  };

  const GENERATION_STEPS = [
    "Collecting asset data...",
    "Analyzing cryptographic inventory...",
    "Running compliance checks...",
    "Generating charts and tables...",
    `Compiling ${exportFormat.toUpperCase()} document...`
  ];

  return (
    <div style={{position:'relative'}}>
      <PageHeader title="Reports & Export" subtitle="Generate, schedule, and export cryptographic audit reports"
        actions={<><button className="btn-ghost" onClick={()=>setScheduledModalOpen(true)}>Scheduled Reports</button>
        <button className="btn-primary" onClick={handleGenerate} disabled={generating}>{generating?<><RefreshCw size={14} style={{animation:'spin 1s linear infinite'}}/> Generating...</>:<>↓ Generate Now</>}</button></>} />

      <div style={{display:'grid',gridTemplateColumns:'400px 1fr',gap:20,marginBottom:20}}>
        {/* LEFT PANEL: BUILDER */}
        <div className="card" style={{padding:20,display:'flex',flexDirection:'column',gap:20}}>
          
          <div>
            <SectionTitle>Report Type</SectionTitle>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:10}}>
              {REPORT_TYPES.map(type => {
                const sel = reportType === type.id;
                return (
                  <div key={type.id} onClick={()=>setReportType(type.id)} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',borderRadius:8,border:sel?'1.5px solid #4F46E5':'1px solid #E5E7EB',background:sel?'#F5F3FF':'white',boxShadow:sel?'0 0 0 3px rgba(79,70,229,0.06)':'none',cursor:'pointer',transition:'all 0.15s'}} onMouseOver={e=>!sel&&(e.currentTarget.style.background='#FAFAFA',e.currentTarget.style.borderColor='#D1D5DB')} onMouseOut={e=>!sel&&(e.currentTarget.style.background='white',e.currentTarget.style.borderColor='#E5E7EB')}>
                    <div style={{flexShrink:0,width:20,height:20,borderRadius:10,border:`2px solid ${sel?'#4F46E5':'#D1D5DB'}`,display:'flex',alignItems:'center',justifyContent:'center',background:'white'}}>
                      <div style={{width:10,height:10,borderRadius:5,background:'#4F46E5',transform:`scale(${sel?1:0})`,transition:'transform 0.15s ease'}}/>
                    </div>
                    <div>
                      <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,color:sel?'#111827':'#374151'}}>{type.title}</div>
                      <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF',marginTop:1}}>{type.subtitle}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <SectionTitle>Date Range</SectionTitle>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:10}}>
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:'#6B7280',marginBottom:4}}>From</label><input type="date" value={dateFrom} onChange={e=>{setDateFrom(e.target.value);setPreviewKey(k=>k+1);}} style={{background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:8,padding:'8px 12px',fontFamily:"'Inter',sans-serif",fontSize:13,color:'#374151',outline:'none'}} onFocus={e=>e.target.style.borderColor='#4F46E5'} onBlur={e=>e.target.style.borderColor='#E5E7EB'}/></div>
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:'#6B7280',marginBottom:4}}>To</label><input type="date" value={dateTo} onChange={e=>{setDateTo(e.target.value);setPreviewKey(k=>k+1);}} style={{background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:8,padding:'8px 12px',fontFamily:"'Inter',sans-serif",fontSize:13,color:'#374151',outline:'none'}} onFocus={e=>e.target.style.borderColor='#4F46E5'} onBlur={e=>e.target.style.borderColor='#E5E7EB'}/>
                {new Date(dateTo) < new Date(dateFrom) && <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#EF4444',marginTop:4}}>End date must be after start date</span>}
              </div>
            </div>
          </div>

          <div>
            <div style={{display:'flex',alignItems:'center'}}>
              <SectionTitle>Include Sections</SectionTitle>
              <span style={{background:'#F3F4F6',color:'#6B7280',borderRadius:999,fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:500,padding:'2px 8px',marginLeft:6}}>{activeSectionsCount}/6 selected</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:0,marginTop:10}}>
              {REPORT_SECTIONS.map(sec => {
                const checked = sections[sec.id];
                return (
                  <div key={sec.id} onClick={()=>toggleSection(sec.id)} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 4px',borderBottom:'1px solid #F9FAFB',cursor:'pointer',borderRadius:4,transition:'0.1s'}} onMouseOver={e=>e.currentTarget.style.background='#FAFAFA'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{width:18,height:18,borderRadius:4,background:checked?'#4F46E5':'white',border:`1.5px solid ${checked?'#4F46E5':'#D1D5DB'}`,display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.12s'}}>
                      {checked && <Check size={12} color="white" style={{transform:'scale(1)'}}/>}
                    </div>
                    <span style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:checked?'#374151':'#6B7280'}}>{sec.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <SectionTitle>Export Format</SectionTitle>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:10}}>
              {EXPORT_FORMATS.map(fmt => {
                const sel = exportFormat === fmt.id;
                return (
                  <div key={fmt.id} onClick={()=>{setExportFormat(fmt.id);setPreviewKey(k=>k+1);}} style={{padding:10,borderRadius:8,border:`${sel?'1.5px':'1px'} solid ${sel?'#4F46E5':'#E5E7EB'}`,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6,fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,color:sel?'#4F46E5':'#374151',background:'white',boxShadow:sel?'0 0 0 3px rgba(79,70,229,0.08)':'none',transition:'all 0.12s'}} onMouseOver={e=>!sel&&(e.currentTarget.style.background='#F9FAFB',e.currentTarget.style.borderColor='#D1D5DB')} onMouseOut={e=>!sel&&(e.currentTarget.style.background='white',e.currentTarget.style.borderColor='#E5E7EB')}>
                    {fmt.icon==='FileText'?<FileText size={16}/>:fmt.icon==='Braces'?<Braces size={16}/>:fmt.icon==='Table'?<Table size={16}/>:<Code size={16}/>}
                    {fmt.label}
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{marginTop:'auto'}}>
            <button style={{width:'100%',padding:12,background:generating?'#6366F1':'#4F46E5',color:'white',border:'none',borderRadius:8,cursor:generating?'not-allowed':'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',gap:8,transition:'background 0.15s'}} onClick={handleGenerate} disabled={generating}>
              {generating ? <><RefreshCw size={16} style={{animation:'spin 1s linear infinite'}}/> Generating...</> : 'Generate Report'}
            </button>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
              <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF'}}>~{currentType.estimatedPages} pages</span>
              <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF'}}>{currentType.estimatedSize}</span>
            </div>
            <button style={{background:'transparent',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:6,fontFamily:"'Inter',sans-serif",fontSize:12,color:'#4F46E5',marginTop:16}} onClick={()=>setRecentReportsOpen(true)} onMouseOver={e=>e.currentTarget.style.textDecoration='underline'} onMouseOut={e=>e.currentTarget.style.textDecoration='none'}>
              <Clock size={13}/> View recent reports (4)
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: PREVIEW */}
        <div className="card" style={{padding:20,minHeight:600,display:'flex',flexDirection:'column'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:700,color:'#111827'}}>Preview</span>
            <span style={{background:'#F3F4F6',border:'1px solid #E5E7EB',borderRadius:6,padding:'4px 12px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,color:'#374151'}}>{exportFormat.toUpperCase()} · {currentType.title}</span>
          </div>

          <div style={{flex:1,background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:8,padding:24,overflow:'hidden',position:'relative',display:'flex',flexDirection:'column'}}>
            
            {/* DOCUMENT SIMULATION */}
            <div key={previewKey} className="page-animate" style={{flex:1,display:'flex',flexDirection:'column'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
                <div><div className="shimmer-block" style={{height:12,width:80,marginBottom:6}}/><div className="shimmer-block" style={{height:8,width:120}}/></div>
                <div className="shimmer-block" style={{height:10,width:60}}/>
              </div>
              <div className="shimmer-block" style={{height:20,width:280,marginBottom:4}}/>
              <div className="shimmer-block" style={{height:12,width:180,marginBottom:20}}/>

              {(sections.risk || sections.cbom) && <><div className="shimmer-block" style={{height:10,width:140,marginBottom:10}}/><div className="shimmer-block" style={{height:8,width:'90%',marginBottom:4}}/><div className="shimmer-block" style={{height:8,width:'95%',marginBottom:4}}/><div className="shimmer-block" style={{height:8,width:'70%',marginBottom:16}}/></>}
              
              {sections.risk && <div style={{height:120,width:'100%',background:'#E5E7EB',borderRadius:4,marginBottom:16,position:'relative',animation:'shimmer 2s infinite linear',backgroundImage:'linear-gradient(to right, #E5E7EB 0%, #F3F4F6 20%, #E5E7EB 40%, #E5E7EB 100%)',backgroundSize:'1000px 100%'}}>
                <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF',position:'absolute',top:12,left:12}}>Chart Area</span>
              </div>}

              {(sections.tls || sections.cbom) && <div style={{marginBottom:16}}>{Array.from({length:5}).map((_,i)=><div key={i} className="shimmer-block" style={{height:8,width:`${85+Math.random()*15}%`,marginBottom:12}}/>)}
                <div style={{height:100,width:'100%',background:'#E5E7EB',borderRadius:4,position:'relative',animation:'shimmer 2s infinite linear',backgroundImage:'linear-gradient(to right, #E5E7EB 0%, #F3F4F6 20%, #E5E7EB 40%, #E5E7EB 100%)',backgroundSize:'1000px 100%'}}>
                  <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF',position:'absolute',top:12,left:12}}>Table Area</span>
                </div>
              </div>}

              {sections.compliance && <><div className="shimmer-block" style={{height:10,width:120,marginBottom:8}}/><div className="shimmer-block" style={{height:8,width:'85%',marginBottom:6}}/><div className="shimmer-block" style={{height:8,width:'65%',marginBottom:16}}/></>}
              {sections.remediation && <><div className="shimmer-block" style={{height:10,width:160,marginBottom:8}}/><div className="shimmer-block" style={{height:8,width:'95%',marginBottom:6}}/><div className="shimmer-block" style={{height:8,width:'80%',marginBottom:16}}/></>}

              <div style={{marginTop:'auto',paddingTop:16,borderTop:'1px solid #E5E7EB',display:'flex',justifyContent:'space-between'}}>
                <div className="shimmer-block" style={{height:8,width:160}}/><div className="shimmer-block" style={{height:8,width:40}}/>
              </div>
            </div>

            {/* GENERATION OVERLAY */}
            {generating && (
              <div className="page-animate" style={{position:'absolute',inset:0,background:'rgba(255,255,255,0.9)',backdropFilter:'blur(4px)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,zIndex:10,borderRadius:8}}>
                <div style={{position:'relative',width:80,height:80}}>
                  <svg viewBox="0 0 100 100" style={{width:'100%',height:'100%',transform:'rotate(-90deg)'}}>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#EEF2FF" strokeWidth="8"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#4F46E5" strokeWidth="8" strokeDasharray="251" strokeDashoffset={251 - (251*generationStep*20)/100} style={{transition:'stroke-dashoffset 0.5s ease'}}/>
                  </svg>
                  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:'#4F46E5'}}>{generationStep*20}%</div>
                </div>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:'#374151',textAlign:'center'}}>{GENERATION_STEPS[Math.min(generationStep-1,4)]}</div>
                <div style={{display:'flex',flexDirection:'column',gap:6,marginTop:10}}>
                  {GENERATION_STEPS.map((st,i)=>{
                    const done=generationStep>i+1; const pend=generationStep<i+1;
                    return (
                      <div key={i} style={{display:'flex',alignItems:'center',gap:8,opacity:pend?0.4:1,transition:'opacity 0.3s'}}>
                        {done?<CheckCircle size={14} color="#10B981" style={{animation:'scaleIn 0.2s'}}/>:<div style={{width:14,height:14,borderRadius:7,border:pend?'1px solid #D1D5DB':'1px dashed #4F46E5'}}/>}
                        <span style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:done?'#6B7280':pend?'#9CA3AF':'#374151'}}>{st}</span>
                      </div>
                    )
                  })}
                </div>
                <div style={{width:200,height:4,background:'#EEF2FF',borderRadius:2,marginTop:10,overflow:'hidden'}}><div style={{height:'100%',background:'#4F46E5',width:`${(generationStep/5)*100}%`,transition:'width 0.5s ease'}}/></div>
              </div>
            )}
          </div>
          <div style={{textAlign:'center',marginTop:12,fontFamily:"'Inter',sans-serif",fontSize:12,color:'#9CA3AF'}}>Preview updates when you adjust settings</div>
        </div>
      </div>

      {/* SCHEDULED MODAL */}
      {scheduledModalOpen && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(4px)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className="card" style={{width:620,borderRadius:16,boxShadow:'0 20px 60px rgba(0,0,0,0.15)',padding:'24px',animation:'slideInUp 0.2s ease-out'}}>
            <Calendar size={24} color="#4F46E5"/>
            <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:18,fontWeight:700,color:'#111827',marginTop:12}}>Scheduled Reports</h3>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#9CA3AF',marginTop:4}}>Automated report generation and delivery</p>
            
            <div style={{display:'flex',flexDirection:'column',gap:10,margin:'20px 0'}}>
              {SCHEDULED_REPORTS.map(sch=>{
                const typeColors = {full:'#4F46E5',executive:'#3B82F6',technical:'#F59E0B',compliance:'#8B5CF6'};
                const tc = typeColors[sch.type] || '#4F46E5';
                return (
                  <div key={sch.id} style={{background:'white',border:'1px solid #E5E7EB',borderRadius:10,padding:'14px 16px',display:'flex',gap:12}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,color:'#111827'}}>{sch.name}</span>
                        <div style={{width:24,height:14,borderRadius:7,background:sch.active?'#4F46E5':'#E5E7EB',position:'relative',cursor:'pointer'}}><div style={{width:10,height:10,borderRadius:5,background:'white',position:'absolute',top:2,left:sch.active?12:2,transition:'left 0.2s'}}/></div>
                      </div>
                      <div style={{display:'flex',gap:12,marginTop:4}}>
                        <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#6B7280',display:'flex',alignItems:'center',gap:4}}><Clock size={12} color="#9CA3AF"/> {sch.frequency}</span>
                        <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#6B7280',display:'flex',alignItems:'center',gap:4}}><Calendar size={12} color="#9CA3AF"/> Next: {sch.nextRun}</span>
                      </div>
                      <div style={{display:'flex',gap:8,marginTop:6}}>
                        <span style={{background:'#F3F4F6',color:'#374151',padding:'2px 8px',borderRadius:4,fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600}}>{sch.format}</span>
                        {sch.recipients.map(r=><span key={r} style={{background:'#EEF2FF',color:'#4F46E5',padding:'2px 8px',borderRadius:999,fontFamily:"'Inter',sans-serif",fontSize:10}}>{r}</span>)}
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'flex-start',gap:4}}>
                      <Edit size={14} color="#9CA3AF" style={{cursor:'pointer'}}/><Trash2 size={14} color="#9CA3AF" style={{cursor:'pointer'}}/>
                    </div>
                  </div>
                )
              })}
              <div style={{background:'#F9FAFB',border:'2px dashed #E5E7EB',borderRadius:10,padding:14,textAlign:'center',cursor:'pointer'}} onMouseOver={e=>e.currentTarget.style.background='#F3F4F6'} onMouseOut={e=>e.currentTarget.style.background='#F9FAFB'}>
                <Plus size={16} color="#9CA3AF" style={{display:'inline',verticalAlign:'-3px',marginRight:4}}/><span style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#6B7280'}}>Add new scheduled report</span>
              </div>
            </div>

            <div style={{display:'flex',justifyContent:'flex-end',gap:8,borderTop:'1px solid #F3F4F6',paddingTop:16}}>
              <button className="btn-ghost" onClick={()=>setScheduledModalOpen(false)}>Close</button>
              <button className="btn-primary" onClick={()=>setScheduledModalOpen(false)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* RECENT REPORTS MODAL */}
      {recentReportsOpen && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(4px)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className="card" style={{width:520,borderRadius:16,boxShadow:'0 20px 60px rgba(0,0,0,0.15)',padding:'24px',animation:'slideInUp 0.2s ease-out'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:700,color:'#111827'}}>Recent Reports (4)</span>
              <X size={20} color="#9CA3AF" style={{cursor:'pointer'}} onClick={()=>setRecentReportsOpen(false)}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:16}}>
              {RECENT_REPORTS.map(r=>{
                const iconMap = {PDF:{i:FileText,c:'#EF4444',bg:'#FEF2F2'},JSON:{i:Braces,c:'#4F46E5',bg:'#EEF2FF'},CSV:{i:Table,c:'#10B981',bg:'#ECFDF5'}};
                const ic = iconMap[r.format]||iconMap.PDF; const Icon=ic.i;
                return (
                  <div key={r.id} style={{background:'white',border:'1px solid #E5E7EB',borderRadius:8,padding:'12px 14px',display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:36,height:36,borderRadius:18,background:ic.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Icon size={18} color={ic.c}/></div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,color:'#111827'}}>{r.name}</div>
                      <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF',marginTop:2}}>{r.generatedAt} · {r.size} {r.pages?`· ${r.pages} pages `:''}· by {r.generatedBy}</div>
                    </div>
                    <Download size={15} color="#9CA3AF" style={{cursor:'pointer'}} onMouseOver={e=>e.currentTarget.style.color='#4F46E5'} onMouseOut={e=>e.currentTarget.style.color='#9CA3AF'} onClick={()=>{showToast(`Redownloading ${r.name}`);setTimeout(()=>setRecentReportsOpen(false),800);}}/>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMessage && (
        <div style={{position:'fixed',bottom:24,right:24,zIndex:200,background:'white',border:'1px solid #E5E7EB',borderRadius:12,padding:'14px 18px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',display:'flex',gap:10,alignItems:'center',animation:'slideInRight 0.3s ease-out',minWidth:280}}>
          {toastMessage.type==='error'?<AlertTriangle size={18} color="#EF4444"/>:<CheckCircle size={18} color="#10B981"/>}
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:'#111827',flex:1}}>{toastMessage.msg}</div>
          <X size={16} color="#9CA3AF" style={{cursor:'pointer'}} onClick={()=>setToastMessage(null)}/>
        </div>
      )}
    </div>
  );
};


/* SETTINGS PAGE — Component */
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    slack: true,
    browser: false,
    criticalOnly: true
  });

  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast("Settings saved successfully");
    }, 800);
  };

  const TABS = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'security', label: 'Security & PQC', icon: ShieldCheck },
    { id: 'api', label: 'API & Integrations', icon: Code },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="page-animate">
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Organization Profile</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6B7280', marginBottom: 20 }}>Manage your organization's core identity and deployment environment.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Organization Name</label>
                <input type="text" defaultValue="Punjab National Bank" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Domain Scope</label>
                <input type="text" defaultValue="pnbindia.in" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Deployment Environment</label>
                <select>
                  <option>Production (On-Premise)</option>
                  <option>DR Site (Cloud Hybrid)</option>
                  <option>Testing / Sandbox</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="page-animate">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Team Management</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6B7280' }}>Manage access for security analysts and administrators.</p>
              </div>
              <button className="btn-primary" style={{ padding: '6px 12px' }}>+ Invite Member</button>
            </div>
            
            <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB' }}>
                    <th style={{ padding: '10px 16px', fontSize: 11, textAlign: 'left', color: '#6B7280' }}>USER</th>
                    <th style={{ padding: '10px 16px', fontSize: 11, textAlign: 'left', color: '#6B7280' }}>ROLE</th>
                    <th style={{ padding: '10px 16px', fontSize: 11, textAlign: 'right', color: '#6B7280' }}>ACCESS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Raj Kumar', email: 'raj.kumar@pnb.co.in', role: 'Security Admin', access: 'Full' },
                    { name: 'Deepa Singh', email: 'deepa.s@pnb.co.in', role: 'Cryptographic Auditor', access: 'Read/Write' },
                    { name: 'Amit Varma', email: 'amit.v@pnb.co.in', role: 'Systems Engineer', access: 'Restricted' }
                  ].map((m, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: '#9CA3AF' }}>{m.email}</div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 12 }}>{m.role}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <span style={{ fontSize: 11, background: '#EEF2FF', color: '#4F46E5', padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>{m.access}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="page-animate">
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Quantum-Safe Policy</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6B7280', marginBottom: 20 }}>Define the strictness level for PQC compliance across the fleet.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ border: '1.5px solid #4F46E5', background: '#F5F3FF', padding: 16, borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Enforcement Mode: Strict</span>
                  <span style={{ fontSize: 11, background: '#4F46E5', color: 'white', padding: '2px 8px', borderRadius: 4 }}>RECOMMENDED</span>
                </div>
                <p style={{ fontSize: 12, color: '#4338CA' }}>Alert on any non-hybrid PQC key exchanges. Do not allow legacy RSA {'<'} 3072 bits or ECC {'<'} 256 bits.</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ fontSize: 13, fontWeight: 500 }}>Auto-Alert on NIST Standard Mismatch</label>
                  <div style={{ width: 36, height: 20, background: '#4F46E5', borderRadius: 10, position: 'relative', cursor: 'pointer' }}><div style={{ width: 14, height: 14, background: 'white', borderRadius: 7, position: 'absolute', top: 3, right: 3 }} /></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ fontSize: 13, fontWeight: 500 }}>Require Multi-Sig for Local CA Issuance</label>
                  <div style={{ width: 36, height: 20, background: '#E5E7EB', borderRadius: 10, position: 'relative', cursor: 'pointer' }}><div style={{ width: 14, height: 14, background: 'white', borderRadius: 7, position: 'absolute', top: 3, left: 3 }} /></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="page-animate">
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>API & Integration Keys</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6B7280', marginBottom: 20 }}>Connect QuantumShield scanning results to your SIEM or SOAR.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 16, border: '1px solid #E5E7EB', borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Production API Key</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>Created 3 months ago</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <code style={{ flex: 1, background: '#F3F4F6', padding: '8px 12px', borderRadius: 6, fontSize: 12, color: '#4F46E5', letterSpacing: '0.05em' }}>qs_live_••••••••••••••••••••••••••••••••</code>
                  <button className="btn-ghost" style={{ padding: '4px 10px' }}>Copy</button>
                  <button className="btn-ghost" style={{ padding: '4px 10px', color: '#EF4444', borderColor: '#FEE2E2' }}>Revoke</button>
                </div>
              </div>
              
              <div style={{ padding: 16, border: '1px dashed #E5E7EB', borderRadius: 10, textAlign: 'center' }}>
                <button className="btn-ghost" style={{ border: 'none', color: '#4F46E5', margin: '0 auto' }}>+ Generate new integration key</button>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="page-animate">
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Notification Preferences</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6B7280', marginBottom: 20 }}>Configure where and how you receive security alerts.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Object.entries({
                email: 'Email Alerts (Reports & Critical Fixes)',
                slack: 'Slack Webhook (Real-time scans)',
                browser: 'Browser Push Notifications',
                criticalOnly: 'Only notify for CRITICAL risk score changes'
              }).map(([key, label]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ fontSize: 13, fontWeight: 500 }}>{label}</label>
                  <div 
                    onClick={() => setNotificationSettings(p => ({...p, [key]: !p[key]}))}
                    style={{ 
                      width: 36, height: 20, 
                      background: notificationSettings[key] ? '#4F46E5' : '#E5E7EB', 
                      borderRadius: 10, position: 'relative', cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ 
                      width: 14, height: 14, background: 'white', borderRadius: 7, 
                      position: 'absolute', top: 3, 
                      left: notificationSettings[key] ? 19 : 3,
                      transition: 'left 0.2s'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <PageHeader 
        title="Settings" 
        subtitle="Manage platform preferences, team access, and security policies" 
        actions={<button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {TABS.map(tab => (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500,
                background: activeTab === tab.id ? '#F5F3FF' : 'transparent',
                color: activeTab === tab.id ? '#4F46E5' : '#6B7280',
                transition: 'all 0.15s'
              }}
              onMouseOver={e => activeTab !== tab.id && (e.currentTarget.style.background = '#F9FAFB')}
              onMouseOut={e => activeTab !== tab.id && (e.currentTarget.style.background = 'transparent')}
            >
              <tab.icon size={16} />
              {tab.label}
            </div>
          ))}
        </div>

        <div className="card" style={{ minHeight: 400 }}>
          {renderTabContent()}
        </div>
      </div>

      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, background: '#111827', color: 'white', 
          padding: '12px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)', animation: 'slideInRight 0.3s ease-out',
          display: 'flex', alignItems: 'center', gap: 10, zIndex: 1000
        }}>
          <CheckCircle size={16} color="#10B981" />
          {toast}
        </div>
      )}
    </div>
  );
};


const CBOMPage = ({ nav }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const cbomData = [
    { id: 'CBOM-001', domain: 'vpn.pnbindia.in', type: 'Gateway', tls: '1.2', keyExchange: 'RSA-2048', cert: 'RSA', status: 'critical' },
    { id: 'CBOM-002', domain: 'api.pnbindia.in', type: 'API', tls: '1.2', keyExchange: 'ECDH', cert: 'RSA', status: 'critical' },
    { id: 'CBOM-003', domain: 'files.pnbindia.in', type: 'Storage', tls: '1.3', keyExchange: 'Hybrid', cert: 'ECC', status: 'high' },
    { id: 'CBOM-004', domain: 'intranet.pnbindia.in', type: 'Internal', tls: '1.3', keyExchange: 'Hybrid', cert: 'ECC', status: 'medium' },
    { id: 'CBOM-005', domain: 'public.pnbindia.in', type: 'Web', tls: '1.3', keyExchange: 'ML-KEM', cert: 'ML-DSA', status: 'pqc-ready' },
    { id: 'CBOM-006', domain: 'static.pnbindia.in', type: 'CDN', tls: '1.3', keyExchange: 'ML-KEM', cert: 'ML-DSA', status: 'quantum-safe' }
  ];

  const filteredData = cbomData.filter(item => {
    if (filterType !== 'All' && item.status !== filterType.toLowerCase()) return false;
    if (searchTerm && !item.domain.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-animate">
      <PageHeader 
        title="CBOM Inventory" 
        subtitle="Cryptographic Bill of Materials for all discovered assets"
        actions={
          <button className="btn-primary" onClick={() => nav('reports')}>Export CBOM</button>
        }
      />
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {['All', 'Critical', 'High', 'Medium', 'PQC-Ready', 'Quantum-Safe'].map(type => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 20,
                  border: '1px solid #E5E7EB',
                  background: filterType === type ? '#4F46E5' : 'transparent',
                  color: filterType === type ? 'white' : '#6B7280',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                {type}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="#9CA3AF" style={{ position: 'absolute', top: 10, left: 10 }} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '8px 12px 8px 32px', border: '1px solid #E5E7EB', borderRadius: 8, width: 250 }} 
            />
          </div>
        </div>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <th style={{ padding: '12px 0', fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>ID</th>
              <th style={{ padding: '12px 0', fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>DOMAIN</th>
              <th style={{ padding: '12px 0', fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>TYPE</th>
              <th style={{ padding: '12px 0', fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>TLS</th>
              <th style={{ padding: '12px 0', fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>KEY EXCHANGE</th>
              <th style={{ padding: '12px 0', fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>CERTIFICATE</th>
              <th style={{ padding: '12px 0', fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9CA3AF' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '16px 0', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#6B7280' }}>{item.id}</td>
                <td style={{ padding: '16px 0', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{item.domain}</td>
                <td style={{ padding: '16px 0', fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#374151' }}>{item.type}</td>
                <td style={{ padding: '16px 0', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#374151' }}>{item.tls}</td>
                <td style={{ padding: '16px 0', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#374151' }}>{item.keyExchange}</td>
                <td style={{ padding: '16px 0', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#374151' }}>{item.cert}</td>
                <td style={{ padding: '16px 0' }}><Badge type={item.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const CompliancePage = ({ nav }) => {
  return (
    <div className="page-animate">
      <PageHeader 
        title="Compliance & Standards" 
        subtitle="Track adherence to NIST PQC standards and internal security policies"
        actions={
          <button className="btn-primary" onClick={() => nav('reports')}>Generate Compliance Report</button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 16 }}>NIST PQC Readiness</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { title: 'FIPS 203 (ML-KEM)', desc: 'Standardized key encapsulation mechanism', status: '34% Adopted', progress: 34 },
              { title: 'FIPS 204 (ML-DSA)', desc: 'Primary digital signature standard', status: '12% Adopted', progress: 12 },
              { title: 'FIPS 205 (SLH-DSA)', desc: 'Stateless hash-based signatures', status: '5% Adopted', progress: 5 }
            ].map(std => (
              <div key={std.title}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#374151' }}>{std.title}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B7280' }}>{std.desc}</div>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#4F46E5' }}>{std.status}</div>
                </div>
                <div style={{ height: 6, background: '#F3F4F6', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${std.progress}%`, background: '#4F46E5', borderRadius: 3 }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Internal Policies</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { id: 'SEC-001', title: 'TLS 1.3 Minimum Requirement', passed: 180, total: 247 },
              { id: 'SEC-002', title: 'No Deprecated Cipher Suites', passed: 195, total: 247 },
              { id: 'SEC-003', title: 'PFS Enabled on External Endpoints', passed: 210, total: 247 },
              { id: 'SEC-004', title: 'Hybrid Key Exchange Configured', passed: 45, total: 247 }
            ].map(policy => (
              <div key={policy.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: 8 }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4F46E5', marginBottom: 4 }}>{policy.id}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{policy.title}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: policy.passed === policy.total ? '#10B981' : '#F59E0B' }}>
                    {Math.round((policy.passed / policy.total) * 100)}%
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#6B7280' }}>Compliant Devices</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


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
                                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>{import.meta.env.VITE_APP_TITLE || 'QuantumShield'}</div>
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




