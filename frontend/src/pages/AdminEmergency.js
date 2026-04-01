import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';
import AdminLayout from '../components/AdminLayout';

const typeIcon = { POLICE:'👮', HOSPITAL:'🏥', FIRE:'🚒', TOURIST_HELPLINE:'📞' };

export default function AdminEmergency() {
  const { user } = useAuth(); const navigate = useNavigate();
  const [data, setData] = useState([]); const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState(''); const [err, setErr] = useState('');

  useEffect(() => { if (!user || user.role !== 'ADMIN') { navigate('/'); return; } load(); }, []); // eslint-disable-line
  const load = () => { setLoading(true); api.get('/emergency').then(r => { setData(r.data); setLoading(false); }); };
  const flash = m => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const openAdd = () => { setEditId(null); setForm({}); setErr(''); setShowForm(true); };
  const openEdit = c => { setEditId(c.id); setForm({ name: c.name, type: c.type, phone: c.phone, district: c.district, address: c.address || '' }); setErr(''); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const closeForm = () => { setShowForm(false); setForm({}); setEditId(null); };

  const handleSubmit = async e => {
    e.preventDefault(); setErr('');
    try {
      if (editId) { await api.put(`/emergency/${editId}`, form); flash('✅ Contact updated!'); }
      else { await api.post('/emergency', form); flash('✅ Contact added!'); }
      closeForm(); load();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 403 || status === 401) {
        setErr('Session expired. Please logout and login again.');
      } else {
        const msg = error?.response?.data?.message || error?.response?.data || error?.message || 'Unknown error';
        setErr(`Failed to save: ${msg}`);
      }
    }
  };

  const handleDelete = async id => { if (!window.confirm('Delete?')) return; await api.delete(`/emergency/${id}`); flash('✅ Deleted.'); load(); };

  const f = (k, label, type = 'text', req = true) => (
    <div key={k} style={s.fw}><label style={s.lbl}>{label}</label>
      <input style={s.inp} type={type} placeholder={label} required={req} value={form[k] || ''} onChange={e => setForm({ ...form, [k]: e.target.value })} />
    </div>
  );

  return (
    <AdminLayout active="/admin/emergency" color="#cb2d3e" title="🆘 Emergency Contacts" count={data.length}
      onAdd={() => showForm && !editId ? closeForm() : openAdd()} showAdd addOpen={showForm && !editId}>
      {msg && <div style={s.msg}>{msg}</div>}
      {err && <div style={s.err}>⚠️ {err}</div>}

      {showForm && (
        <div style={s.formCard}>
          <div style={s.formHeader}>
            <h3 style={{ ...s.formTitle, color: '#cb2d3e' }}>{editId ? '✏️ Edit Contact' : '➕ Add Emergency Contact'}</h3>
            <button style={s.closeBtn} onClick={closeForm}>✕</button>
          </div>
          <form onSubmit={handleSubmit} style={s.grid}>
            {f('name','Contact Name')}
            <div style={s.fw}><label style={s.lbl}>Type</label>
              <select style={s.inp} value={form.type||''} onChange={e=>setForm({...form,type:e.target.value})} required>
                <option value="">Select</option><option>POLICE</option><option>HOSPITAL</option><option>FIRE</option><option value="TOURIST_HELPLINE">TOURIST HELPLINE</option>
              </select>
            </div>
            {f('phone','Phone Number')} {f('district','District')} {f('address','Address','text',false)}
            <button type="submit" style={{ ...s.saveBtn, background: '#cb2d3e', gridColumn: '1/-1' }}>
              {editId ? '💾 Update Contact' : '✅ Save Contact'}
            </button>
          </form>
        </div>
      )}

      {loading ? <div style={s.loading}>Loading...</div> : (
        <div style={s.list}>
          {data.map(c => (
            <div key={c.id} style={s.row}>
              <div style={{ ...s.imgBox, background: '#fff5f5' }}>
                <span style={{ fontSize: '1.8rem' }}>{typeIcon[c.type]||'🆘'}</span>
              </div>
              <div style={s.info}>
                <div style={s.rowTitle}>{c.name}</div>
                <div style={s.meta}><span style={{ ...s.badge, background: '#fff5f5', color: '#c53030' }}>{c.type}</span> &nbsp;|&nbsp; 📍 {c.district}</div>
                <div style={s.meta}>📞 {c.phone}</div>
                {c.address && <div style={s.desc}>{c.address}</div>}
              </div>
              <div style={s.btnGroup}>
                <button style={s.editBtn} onClick={() => openEdit(c)}>✏️ Edit</button>
                <button style={s.del} onClick={() => handleDelete(c.id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
          {data.length === 0 && <div style={s.empty}>📭 No contacts found.</div>}
        </div>
      )}
    </AdminLayout>
  );
}

// Also need PUT endpoint for emergency — add it to backend
const s = { fw:{display:'flex',flexDirection:'column'}, lbl:{fontSize:'0.75rem',fontWeight:'600',color:'#4a5568',marginBottom:'4px'}, inp:{padding:'9px 12px',border:'2px solid #e2e8f0',borderRadius:'8px',fontFamily:'Poppins,sans-serif',fontSize:'0.88rem',outline:'none',boxSizing:'border-box'}, formCard:{background:'#fff',borderRadius:'14px',padding:'24px',marginBottom:'20px',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',border:'2px solid #fff5f5'}, formHeader:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}, formTitle:{fontSize:'1.05rem',fontWeight:'700',margin:0}, closeBtn:{background:'#f0f4f8',border:'none',borderRadius:'6px',width:'28px',height:'28px',cursor:'pointer',fontSize:'0.9rem',color:'#718096'}, grid:{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px'}, saveBtn:{color:'#fff',border:'none',padding:'11px',borderRadius:'10px',cursor:'pointer',fontFamily:'Poppins,sans-serif',fontWeight:'700',fontSize:'0.92rem'}, msg:{background:'#f0fff4',color:'#276749',border:'1px solid #c6f6d5',borderRadius:'8px',padding:'10px 16px',marginBottom:'14px',fontWeight:'600'}, err:{background:'#fff5f5',color:'#c53030',border:'1px solid #fed7d7',borderRadius:'8px',padding:'10px 16px',marginBottom:'14px'}, loading:{textAlign:'center',color:'#718096',padding:'60px'}, list:{display:'flex',flexDirection:'column',gap:'12px'}, row:{background:'#fff',borderRadius:'12px',padding:'16px 20px',display:'flex',alignItems:'center',gap:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.06)'}, imgBox:{width:'56px',height:'56px',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}, info:{flex:1}, rowTitle:{fontWeight:'700',color:'#1a365d',fontSize:'0.95rem',marginBottom:'4px'}, meta:{fontSize:'0.82rem',color:'#718096',marginBottom:'2px'}, desc:{fontSize:'0.78rem',color:'#a0aec0'}, badge:{padding:'2px 8px',borderRadius:'12px',fontSize:'0.72rem',fontWeight:'600',display:'inline-block'}, btnGroup:{display:'flex',gap:'8px',flexShrink:0}, editBtn:{background:'#fff5f5',color:'#c53030',border:'1px solid #feb2b2',padding:'7px 14px',borderRadius:'8px',cursor:'pointer',fontFamily:'Poppins,sans-serif',fontWeight:'600',fontSize:'0.82rem'}, del:{background:'#fff5f5',color:'#c53030',border:'1px solid #fed7d7',padding:'7px 14px',borderRadius:'8px',cursor:'pointer',fontFamily:'Poppins,sans-serif',fontWeight:'600',fontSize:'0.82rem'}, empty:{textAlign:'center',color:'#718096',padding:'60px'} };
