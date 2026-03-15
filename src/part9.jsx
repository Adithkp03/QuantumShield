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


