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
