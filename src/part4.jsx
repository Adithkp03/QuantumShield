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
