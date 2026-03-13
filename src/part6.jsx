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
