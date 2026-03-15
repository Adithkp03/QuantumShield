/* REMEDIATION PAGE — Component */
const RemediationPage = ({ nav }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [taskStatuses, setTaskStatuses] = useState(() => {
    const map = {}; ALL_REMEDIATION_ITEMS.forEach(i => map[i.id] = i.taskStatus); return map;
  });
  const [showCompleted, setShowCompleted] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('priority');
  
  const filteredItems = useMemo(() => {
    let items = ALL_REMEDIATION_ITEMS;
    if (activeFilter !== 'all') items = items.filter(i => i.status === activeFilter);
    if (!showCompleted) items = items.filter(i => taskStatuses[i.id] !== 'fixed');
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      items = items.filter(i => i.domain.toLowerCase().includes(q) || i.vulnerability.toLowerCase().includes(q));
    }
    return items.sort((a,b) => {
      if (sortBy === 'priority') return a.priority - b.priority;
      if (sortBy === 'complexity') { const order = {Easy:0,Medium:1,Hard:2}; return order[a.complexity] - order[b.complexity]; }
      return 0;
    });
  }, [activeFilter, taskStatuses, showCompleted, searchText, sortBy]);

  const [selectedItem, setSelectedItem] = useState(filteredItems[0] || ALL_REMEDIATION_ITEMS[0]);
  useEffect(() => { if (filteredItems.length>0 && !filteredItems.find(i=>i.id===selectedItem.id)) setSelectedItem(filteredItems[0]); }, [filteredItems]);

  const counts = useMemo(() => ({
    all: ALL_REMEDIATION_ITEMS.length, critical: ALL_REMEDIATION_ITEMS.filter(i=>i.status==='critical').length,
    high: ALL_REMEDIATION_ITEMS.filter(i=>i.status==='high').length, medium: ALL_REMEDIATION_ITEMS.filter(i=>i.status==='medium').length
  }), []);

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignTarget, setAssignTarget] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [progressAnimated, setProgressAnimated] = useState(false);
  const [expandedStep, setExpandedStep] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [confettiDetails, setConfettiDetails] = useState(null);

  useEffect(() => { setTimeout(() => setProgressAnimated(true), 300); }, []);

  const updateTaskStatus = (id, newStatus) => {
    setTaskStatuses(prev => ({ ...prev, [id]: newStatus }));
    if (newStatus === 'fixed') {
      const btn = document.getElementById('btn-mark-fixed');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setConfettiDetails({ x: rect.left + rect.width/2, y: rect.top + rect.height/2 });
        setTimeout(() => setConfettiDetails(null), 600);
      }
      setToastMessage({ msg: `${selectedItem.domain} marked as fixed`, type: 'success' });
      setTimeout(()=>setToastMessage(null), 3000);
      setTimeout(()=>{
        const nextPending = filteredItems.find(i=>i.id!==id && taskStatuses[i.id]!=='fixed');
        if (nextPending) setSelectedItem(nextPending);
      }, 400);
    }
  };

  const handleExportPlan = () => {
    const csv = ['Priority,Domain,Type,Vulnerability,Complexity,Status,Est Time,Skill Level,Assignee,NIST Refs'];
    ALL_REMEDIATION_ITEMS.forEach(i => {
      csv.push(`${i.priority},${i.domain},${i.type},"${i.vulnerability}",${i.complexity},${taskStatuses[i.id]},${i.estTime},${i.skillLevel},${i.assignee||''},"${i.nistrefs.join(', ')}"`);
    });
    const blob = new Blob([csv.join('\\n')], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'pnb-remediation-plan.csv'; a.click();
    URL.revokeObjectURL(url);
    setToastMessage({ msg: `Plan exported — ${ALL_REMEDIATION_ITEMS.length} items`, type: 'info', icon: 'Download' });
    setTimeout(()=>setToastMessage(null), 3000);
  };

  const liveFixed = Object.values(taskStatuses).filter(s=>s==='fixed').length;
  const livePercentage = ((liveFixed / ALL_REMEDIATION_ITEMS.length) * 100).toFixed(1);

  const getStatusBadge = (st) => {
    if (st==='pending') return { bg:'#F9FAFB', border:'#E5E7EB', color:'#6B7280', label:'Pending' };
    if (st==='in-progress') return { bg:'#EFF6FF', border:'#BFDBFE', color:'#2563EB', label:'In Progress' };
    return { bg:'#ECFDF5', border:'#A7F3D0', color:'#059669', label:'Fixed ✓' };
  };

  return (
    <div style={{position:'relative'}}>
      <PageHeader title="Remediation Center" subtitle="Prioritized action plan to achieve quantum-safe cryptographic posture across all assets"
        actions={<><button className="btn-ghost" onClick={()=>{setAssignTarget(null);setAssignModalOpen(true);}}><Users size={14}/> Assign Tasks</button>
        <button className="btn-primary" onClick={handleExportPlan}><Download size={14}/> Export Plan</button></>} />

      {/* PROGRESS CARD */}
      <div className="card" style={{padding:'20px 24px',marginBottom:20}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div><p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:700,color:'#111827'}}>Overall Remediation Progress</p>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#9CA3AF',marginTop:3}}>{liveFixed} of {ALL_REMEDIATION_ITEMS.length} assets remediated · In progress: {Object.values(taskStatuses).filter(s=>s==='in-progress').length} · Pending: {Object.values(taskStatuses).filter(s=>s==='pending').length}</p></div>
          <div style={{textAlign:'right'}}><p style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#9CA3AF'}}>{liveFixed} of {ALL_REMEDIATION_ITEMS.length} assets</p>
          <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:28,fontWeight:800,color:'#4F46E5',lineHeight:1}}>{livePercentage}% <span style={{fontSize:11,fontWeight:500,color:'#9CA3AF'}}>Complete</span></div></div>
        </div>
        <div style={{height:10,background:'#F3F4F6',borderRadius:5,position:'relative'}}>
          <div style={{height:'100%',borderRadius:5,background:'linear-gradient(90deg, #4F46E5, #06B6D4)',width:`${progressAnimated?livePercentage:0}%`,transition:'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',boxShadow:'0 0 8px rgba(79,70,229,0.4)',position:'absolute'}}>
            <div style={{position:'absolute',right:-4,top:'50%',transform:'translateY(-50%)',width:8,height:8,borderRadius:4,background:'#4F46E5',boxShadow:'0 0 0 3px rgba(79,70,229,0.25)'}}/>
          </div>
        </div>
        <div style={{position:'relative',marginTop:6,display:'flex',justifyContent:'space-between'}}>
          {[{l:'25% Quick Wins',p:25},{l:'50% Core Systems',p:50},{l:'75% Deep Infra',p:75},{l:'100% Fully Safe',p:100}].map((m,i)=>
            <div key={i} style={{position:'absolute',left:`${m.p}%`,transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center'}}>
              <div style={{width:2,height:8,background:livePercentage>=m.p?'#4F46E5':'#E5E7EB',marginBottom:4}}/>
              <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:livePercentage>=m.p?600:500,color:livePercentage>=m.p?'#4F46E5':'#9CA3AF',whiteSpace:'nowrap'}}>{m.l}</span>
            </div>
          )}
        </div>
        <div style={{marginTop:30,paddingTop:12,borderTop:'1px solid #F3F4F6',display:'grid',gridTemplateColumns:'repeat(5,1fr)',textAlign:'center'}}>
          {[{v:liveFixed,l:'FIXED',c:'#10B981'},{v:Object.values(taskStatuses).filter(s=>s==='in-progress').length,l:'IN PROGRESS',c:'#4F46E5'},{v:Object.values(taskStatuses).filter(s=>s==='pending').length,l:'PENDING',c:'#9CA3AF'},{v:'Q3 2026',l:'EST. COMPLETION',c:'#111827'},{v:'142 hr',l:'TIME SAVED',c:'#8B5CF6'}].map((s,i)=>(
            <div key={i} style={{borderRight:i<4?'1px solid #F3F4F6':'none'}}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:'#9CA3AF',textTransform:'uppercase',marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN BODY 2-COL */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 0.85fr',gap:20,marginBottom:20}}>
        {/* LEFT: QUEUE */}
        <div className="card" style={{padding:0,overflow:'hidden',display:'flex',flexDirection:'column'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid #F3F4F6',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',gap:2}}>
              {[{k:'all',l:'All'},{k:'critical',l:'Critical'},{k:'high',l:'High'},{k:'medium',l:'Medium'}].map(t=>(
                <div key={t.k} onClick={()=>setActiveFilter(t.k)} style={{padding:'7px 14px',borderRadius:8,fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:activeFilter===t.k?600:500,cursor:'pointer',background:activeFilter===t.k?'#4F46E5':'transparent',color:activeFilter===t.k?'white':'#6B7280',transition:'background 0.12s'}} onMouseOver={e=>activeFilter!==t.k&&(e.currentTarget.style.background='#F3F4F6')} onMouseOut={e=>activeFilter!==t.k&&(e.currentTarget.style.background='transparent')}>
                  {t.l} ({counts[t.k]})
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <div style={{position:'relative'}}>
                <Search size={13} color="#6B7280" style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)'}}/>
                <input type="text" placeholder="Search..." value={searchText} onChange={e=>setSearchText(e.target.value)} style={{width:180,background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:6,padding:'6px 12px 6px 28px',fontFamily:"'Inter',sans-serif",fontSize:12,color:'#111827',outline:'none'}}/>
              </div>
              <label style={{display:'flex',alignItems:'center',gap:4,cursor:'pointer',fontFamily:"'Inter',sans-serif",fontSize:11,color:'#6B7280'}}>
                <input type="checkbox" checked={showCompleted} onChange={e=>setShowCompleted(e.target.checked)}/> Hide fixed
              </label>
            </div>
          </div>
          <div style={{overflowX:'auto',flex:1}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead style={{background:'#F9FAFB',borderBottom:'1px solid #E5E7EB'}}>
                <tr>
                  {[{l:'PRIORITY',w:90},{l:'ASSET',w:'auto'},{l:'VULNERABILITY',w:160},{l:'COMPLEXITY',w:100},{l:'STATUS',w:110}].map((h,i)=><th key={i} style={{padding:'10px 20px',textAlign:'left',fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.07em',width:h.w}}>{h.l}</th>)}
                </tr>
              </thead>
              <tbody>
                {filteredItems.slice(0,8).map(i=>{
                  const sel=selectedItem?.id===i.id; const st=taskStatuses[i.id]; const bdg=getStatusBadge(st); const dotc=st==='fixed'?'#10B981':i.status==='critical'?'#EF4444':i.status==='high'?'#F97316':'#F59E0B';
                  return (
                    <tr key={i.id} onClick={()=>setSelectedItem(i)} style={{cursor:'pointer',borderBottom:'1px solid #F9FAFB',background:sel?'#EEF2FF':'white',transition:'background 0.1s',opacity:st==='fixed'?0.6:1}} onMouseOver={e=>!sel&&(e.currentTarget.style.background='#FAFAFA')} onMouseOut={e=>!sel&&(e.currentTarget.style.background='white')}>
                      <td style={{padding:'14px 20px',display:'flex',alignItems:'center',gap:8,borderLeft:sel?'3px solid #4F46E5':'3px solid transparent'}}>
                        <div style={{width:10,height:10,borderRadius:5,background:dotc}}/>
                        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,fontWeight:700,color:dotc}}>{i.priority}</span>
                      </td>
                      <td style={{padding:'14px 16px'}}>
                        <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,color:'#111827'}}>{i.domain}</div>
                        <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,background:'#F3F4F6',border:'1px solid #E5E7EB',borderRadius:999,padding:'2px 8px',color:'#6B7280',marginTop:4,display:'inline-block'}}>{i.type}</span>
                      </td>
                      <td style={{padding:'14px 16px',fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:500,color:'#374151'}}>{i.vulnerability}</td>
                      <td style={{padding:'14px 16px',fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:i.complexity==='Easy'?'#10B981':i.complexity==='Medium'?'#F59E0B':'#EF4444'}}>{i.complexity}</td>
                      <td style={{padding:'14px 20px'}}><span onClick={e=>{if(st==='fixed')e.stopPropagation();}} style={{background:bdg.bg,border:`1px solid ${bdg.border}`,color:bdg.color,borderRadius:999,padding:'3px 10px',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,display:'inline-block'}}>{bdg.label}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{padding:'12px 20px',borderTop:'1px solid #F3F4F6',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF'}}>Showing {Math.min(filteredItems.length,8)} of {counts[activeFilter]} items</span>
            {activeFilter!=='all'&&<span onClick={()=>setActiveFilter('all')} style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#4F46E5',cursor:'pointer'}}>Clear filter</span>}
          </div>
        </div>

        {/* RIGHT: FIX GUIDE */}
        {selectedItem && (
          <div key={selectedItem.id} className="card page-animate" style={{padding:0,display:'flex',flexDirection:'column'}}>
            <div style={{padding:'18px 20px',borderBottom:'1px solid #F3F4F6',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:'#111827'}}>{selectedItem.domain}</span><Badge type={selectedItem.status}/></div>
              <ExternalLink size={16} color="#9CA3AF" style={{cursor:'pointer'}} title="View in TLS Analyzer" onClick={()=>nav('tls-analyzer')}/>
            </div>
            
            <div style={{padding:'18px 20px',flex:1,overflowY:'auto'}}>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:700,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6}}>VULNERABILITY</div>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#374151',lineHeight:1.7}}>{selectedItem.vulnDetail}</p>

              <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:700,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6,marginTop:16}}>REMEDIATION STEPS</div>
              <div style={{display:'flex',flexDirection:'column'}}>
                {selectedItem.steps.map((st,i)=>(
                  <div key={i} onClick={()=>setExpandedStep(expandedStep===i?null:i)} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'8px 4px',borderBottom:i<selectedItem.steps.length-1?'1px solid #F9FAFB':'none',cursor:'pointer',borderRadius:6,transition:'background 0.1s'}} onMouseOver={e=>e.currentTarget.style.background='#FAFAFA'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{width:24,height:24,borderRadius:12,background:'#EEF2FF',border:'1px solid #C7D2FE',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:'#4F46E5',flexShrink:0}}>{i+1}</div>
                    <div style={{flex:1,paddingTop:3}}>
                      <span style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:taskStatuses[selectedItem.id]==='fixed'?'#9CA3AF':'#374151',textDecoration:taskStatuses[selectedItem.id]==='fixed'?'line-through':'none',lineHeight:1.5}}>{st}</span>
                      {taskStatuses[selectedItem.id]==='fixed'&&<CheckCircle size={12} color="#10B981" style={{display:'inline',marginLeft:6,verticalAlign:'-2px'}}/>}
                      {expandedStep===i&&<div style={{background:'#F8F9FC',borderRadius:6,padding:'8px 12px',fontFamily:"'Inter',sans-serif",fontSize:11,color:'#6B7280',marginTop:4}}>Technical instruction placeholder for Step {i+1} execution.</div>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:700,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6,marginTop:16}}>CONFIGURATION PATCH</div>
              <div style={{position:'relative',background:'#F8F9FC',border:'1px solid #E5E7EB',borderRadius:8,padding:'14px 16px',overflowX:'auto'}}>
                <pre style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:'#374151',lineHeight:1.8,margin:0,whiteSpace:'pre-wrap'}}>
                  {selectedItem.configPatch.split('\\n').map((l,j)=><div key={j} style={{color:l.startsWith('#')?'#9CA3AF':(l.includes('ssl_')||l.includes('openssl'))?'#4F46E5':'#374151'}}>{l}</div>)}
                </pre>
                <div onClick={()=>{navigator.clipboard.writeText(selectedItem.configPatch);setCopiedCode(true);setTimeout(()=>setCopiedCode(false),2000);}} style={{position:'absolute',top:8,right:8,width:32,height:28,background:'white',border:'1px solid #E5E7EB',borderRadius:6,display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}}>
                  {copiedCode ? <Check size={13} color="#10B981"/> : <Copy size={13} color="#9CA3AF"/>}
                  {copiedCode&&<div style={{position:'absolute',bottom:'100%',marginBottom:4,background:'#111827',color:'white',padding:'4px 8px',borderRadius:4,fontSize:10,fontFamily:"'Inter',sans-serif",pointerEvents:'none',whiteSpace:'nowrap'}}>Copied!</div>}
                </div>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,background:'#F9FAFB',borderRadius:8,padding:'12px 16px',marginTop:16}}>
                {[{l:'COMPLEXITY',v:selectedItem.complexity,c:selectedItem.complexity==='Easy'?'#10B981':selectedItem.complexity==='Medium'?'#F59E0B':'#EF4444'},{l:'EST. TIME',v:selectedItem.estTime,c:'#111827'},{l:'SKILL LEVEL',v:selectedItem.skillLevel,c:'#4F46E5'}].map((e,i)=><div key={i}><div style={{fontFamily:"'Inter',sans-serif",fontSize:9,textTransform:'uppercase',color:'#9CA3AF',letterSpacing:'0.08em',marginBottom:4}}>{e.l}</div><div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:700,color:e.c}}>{e.v}</div></div>)}
              </div>

              <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:16}}>
                {selectedItem.nistrefs.map(r=><span key={r} style={{background:'#EEF2FF',border:'1px solid #C7D2FE',color:'#4F46E5',borderRadius:999,fontFamily:"'JetBrains Mono',monospace",fontSize:10,fontWeight:600,padding:'4px 12px'}}>{r}</span>)}
              </div>
            </div>

            <div style={{padding:'14px 20px',borderTop:'1px solid #F3F4F6'}}>
              {taskStatuses[selectedItem.id]==='pending' && <button className="btn-primary" style={{width:'100%',padding:'10px 0',justifyContent:'center'}} onClick={()=>updateTaskStatus(selectedItem.id,'in-progress')}>Mark as In Progress</button>}
              {taskStatuses[selectedItem.id]==='in-progress' && <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                <button className="btn-ghost" style={{justifyContent:'center'}} onClick={()=>updateTaskStatus(selectedItem.id,'pending')}>← Back to Pending</button>
                <button id="btn-mark-fixed" className="btn-primary" style={{justifyContent:'center',background:'#10B981',border:'none'}} onClick={()=>updateTaskStatus(selectedItem.id,'fixed')}>✓ Mark as Fixed</button>
              </div>}
              {taskStatuses[selectedItem.id]==='fixed' && <div style={{background:'#ECFDF5',border:'1px solid #A7F3D0',borderRadius:8,padding:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center'}}><CheckCircle size={18} color="#10B981" style={{marginRight:8}}/><span style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,color:'#059669'}}>Remediation Complete</span></div>
                <button className="btn-ghost" style={{padding:'4px 12px',minHeight:'auto'}} onClick={()=>updateTaskStatus(selectedItem.id,'pending')}>Reopen</button>
              </div>}

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                {selectedItem.assignee ? <div style={{fontFamily:"'Inter',sans-serif",fontSize:11}}><span style={{color:'#9CA3AF'}}>Assigned to: </span><span style={{fontWeight:600,color:'#374151'}}>{selectedItem.assignee}</span> <span style={{color:'#4F46E5',cursor:'pointer',marginLeft:4}} onClick={()=>{setAssignTarget(selectedItem);setAssignModalOpen(true);}}>Change</span></div>
                : <div style={{fontFamily:"'Inter',sans-serif",fontSize:11}}><span style={{color:'#9CA3AF'}}>Unassigned</span> <span style={{color:'#4F46E5',cursor:'pointer',marginLeft:4}} onClick={()=>{setAssignTarget(selectedItem);setAssignModalOpen(true);}}>+ Assign</span></div>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PQC ALGO CARDS */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:20}}>
        {PQC_ALGORITHMS.map(a=>(
          <div key={a.id} className="card" style={{padding:20,cursor:'pointer',transition:'all 0.15s'}} onMouseOver={e=>{e.currentTarget.style.borderColor='#4F46E5';e.currentTarget.style.boxShadow='0 4px 16px rgba(79,70,229,0.1)';e.currentTarget.style.transform='translateY(-1px)';}} onMouseOut={e=>{e.currentTarget.style.borderColor='#E5E7EB';e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.05)';e.currentTarget.style.transform='none';}}>
            <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:20,background:a.iconBg,display:'flex',alignItems:'center',justifyContent:'center'}}>{a.icon==='Lock'?<Lock size={20} color={a.iconColor}/>:a.icon==='PenLine'?<PenLine size={20} color={a.iconColor}/>:<ShieldCheck size={20} color={a.iconColor}/>}</div>
              <div>
                <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:700,color:'#111827'}}>{a.name}</p>
                <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#9CA3AF',marginTop:2}}>{a.purpose}</p>
                <div style={{background:'#EEF2FF',border:'1px solid #C7D2FE',color:'#4F46E5',borderRadius:999,fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:600,padding:'3px 10px',marginTop:6,display:'inline-block'}}>{a.fips}</div>
              </div>
            </div>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:'#6B7280',lineHeight:1.6,marginBottom:14}}>{a.description}</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,paddingTop:14,borderTop:'1px solid #F3F4F6'}}>
              {[{l:'Replaces',v:a.replaces},{l:'Security',v:a.securityLevel},{l:'Key Size',v:a.keySize},{l:'Standardized',v:a.standardDate}].map((d,i)=><div key={i}><div style={{fontFamily:"'Inter',sans-serif",fontSize:9,textTransform:'uppercase',color:'#9CA3AF',letterSpacing:'0.07em',marginBottom:2}}>{d.l}</div><div style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:'#374151'}}>{d.v}</div></div>)}
            </div>
            <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid #F9FAFB',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:'#9CA3AF'}}>Use for: {a.useCase}</span><ChevronRight size={14} color="#D1D5DB"/>
            </div>
          </div>
        ))}
      </div>

      {/* ASSIGN TASKS MODAL */}
      {assignModalOpen && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(4px)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className="card" style={{width:480,borderRadius:16,boxShadow:'0 20px 60px rgba(0,0,0,0.15)',padding:'24px',animation:'slideInUp 0.2s ease-out'}}>
            <Users size={24} color="#4F46E5"/>
            <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:18,fontWeight:700,color:'#111827',marginTop:12}}>Assign Remediation Task</h3>
            {assignTarget && <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:'#9CA3AF',marginTop:4}}>Assigning: {assignTarget.domain}</p>}
            <div style={{marginTop:20,display:'flex',flexDirection:'column',gap:14}}>
              {!assignTarget && <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Task to Assign</label><select style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',background:'#FAFAFA',fontFamily:"'Inter',sans-serif",fontSize:13}}><option value="">— Select pending item —</option>{ALL_REMEDIATION_ITEMS.filter(i=>taskStatuses[i.id]==='pending').map(i=><option key={i.id} value={i.id}>{i.domain} - {i.vulnerability}</option>)}</select></div>}
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Assign To</label><select style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',fontFamily:"'Inter',sans-serif",fontSize:13}}><option value="">— Select team member —</option><option value="Raj Kumar">Raj Kumar — Senior Security Engineer</option><option value="Priya Sharma">Priya Sharma — Systems Administrator</option><option value="Amit Patel">Amit Patel — Security Analyst</option></select></div>
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Priority Override</label><select style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',fontFamily:"'Inter',sans-serif",fontSize:13}}><option value="Critical">Critical</option><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option></select></div>
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Due Date</label><input type="date" defaultValue={new Date(Date.now()+12096e5).toISOString().split('T')[0]} style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',fontFamily:"'Inter',sans-serif",fontSize:13}}/></div>
              <div style={{display:'flex',flexDirection:'column'}}><label style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,marginBottom:6}}>Notes</label><textarea rows={3} placeholder="Additional instructions..." style={{padding:10,borderRadius:8,border:'1px solid #E5E7EB',fontFamily:"'Inter',sans-serif",fontSize:13,resize:'none'}}/></div>
              <label style={{display:'flex',alignItems:'center',gap:8,fontFamily:"'Inter',sans-serif",fontSize:13}}><input type="checkbox" defaultChecked/> Send email notification</label>
              <div style={{display:'flex',justifyContent:'flex-end',gap:10,marginTop:10}}><button className="btn-ghost" onClick={()=>setAssignModalOpen(false)}>Cancel</button><button className="btn-primary" onClick={()=>{setAssignTarget(null);setAssignModalOpen(false);setToastMessage({msg:'Task assigned successfully',type:'success'});setTimeout(()=>setToastMessage(null),3000);}}>Assign Task</button></div>
            </div>
          </div>
        </div>
      )}

      {/* CONFETTI */}
      {confettiDetails && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',pointerEvents:'none',zIndex:9999}}>
          {Array.from({length:12}).map((_,i)=>{
            const angle=(i/12)*Math.PI*2; const vx=Math.cos(angle)*60; const vy=Math.sin(angle)*60 - 30;
            return <div key={i} style={{position:'absolute',left:confettiDetails.x,top:confettiDetails.y,width:6,height:6,borderRadius:3,background:['#4F46E5','#10B981','#F59E0B','#EF4444'][i%4],transformOrigin:'center',animation:`confettiAnim${i} 0.6s ease-out forwards`}}/>
          })}
          <style>{Array.from({length:12}).map((_,i)=>{const angle=(i/12)*Math.PI*2; const vx=Math.cos(angle)*60; const vy=Math.sin(angle)*60 - 30; return `@keyframes confettiAnim${i} { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(${vx}px, ${vy}px) scale(0); opacity: 0; } }`;}).join('\\n')}</style>
        </div>
      )}

      {/* TOAST */}
      {toastMessage && (
        <div style={{position:'fixed',bottom:24,right:24,zIndex:200,background:'white',border:'1px solid #E5E7EB',borderRadius:12,padding:'14px 18px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',display:'flex',gap:10,alignItems:'center',animation:'slideInRight 0.3s ease-out',minWidth:280}}>
          {toastMessage.type==='success'?<CheckCircle size={18} color="#10B981"/>:<Download size={18} color="#4F46E5"/>}
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:'#111827',flex:1}}>{toastMessage.msg}</div>
          <X size={16} color="#9CA3AF" style={{cursor:'pointer'}} onClick={()=>setToastMessage(null)}/>
        </div>
      )}
    </div>
  );
};
