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
