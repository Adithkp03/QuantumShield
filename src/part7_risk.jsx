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
