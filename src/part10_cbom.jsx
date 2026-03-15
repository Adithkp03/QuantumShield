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
