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
