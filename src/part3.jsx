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
