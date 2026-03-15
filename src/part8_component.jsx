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
    let filename = '';
    
    if (exportFormat === 'pdf') {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(17, 24, 39);
      doc.text("QuantumShield Security Report", 20, 30);
      
      doc.setFontSize(14);
      doc.setTextColor(79, 70, 229);
      doc.text(currentType.title, 20, 42);
      
      doc.setFontSize(11);
      doc.setTextColor(107, 114, 128);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 50);
      doc.text(`Estimated Pages: ~${currentType.estimatedPages}`, 20, 56);
      doc.text(`Sections Included: ${Object.keys(sections).filter(k => sections[k]).join(', ')}`, 20, 62);
      doc.text(`Target Asset Scope: pnbindia.in (Corporate)`, 20, 68);
      
      doc.line(20, 75, 190, 75);
      
      doc.setFontSize(16);
      doc.setTextColor(17, 24, 39);
      doc.text("Executive Summary", 20, 90);
      doc.setFontSize(11);
      doc.setTextColor(55, 65, 81);
      doc.text(
        "This mathematically-guaranteed cryptographic inventory report demonstrates\n" +
        "the presence of legacy non-PQC resilient ciphers across internal networks.\n" +
        "We discovered 245 active certificates and a risk score marking of 67.4.",
        20, 100
      );
      
      filename = 'pnb-quantum-security-report.pdf';
      doc.save(filename);
    } else {
      let content = '';
      if (exportFormat === 'json') { content = JSON.stringify({ metadata: { type: currentType.id, format: exportFormat, generated: new Date().toISOString() }, summary: { totalAssets: 247, riskScore: 67.4 } }, null, 2); filename = 'pnb-cbom-report.json'; }
      else if (exportFormat === 'csv') { content = 'Asset,Vulnerability,Complexity,Status\ncorp.pnbindia.in,RSA Key Exchange,Hard,Pending'; filename = 'pnb-security-report.csv'; }
      else { content = '<?xml version="1.0"?><report><type>'+currentType.title+'</type></report>'; filename = 'pnb-report.xml'; }
      
      const blob = new Blob([content], {type: 'text/plain'}); const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
    }
    
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
