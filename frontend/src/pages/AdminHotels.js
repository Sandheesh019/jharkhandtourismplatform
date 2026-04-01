import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';
import AdminLayout from '../components/AdminLayout';

export default function AdminHotels() {
  const { user } = useAuth(); const navigate = useNavigate();
  const [data, setData] = useState([]); const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState(''); const [err, setErr] = useState('');

  useEffect(() => { if (!user || user.role !== 'ADMIN') { navigate('/'); return; } load(); }, []); // eslint-disable-line
  const load = () => { setLoading(true); api.get('/hotels').then(r => { setData(r.data); setLoading(false); }); };
  const flash = m => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const openAdd = () => { setEditId(null); setForm({}); setErr(''); setShowForm(true); };
  const openEdit = h => { setEditId(h.id); setForm({ name: h.name, address: h.address, district: h.district, phone: h.phone, pricePerNight: h.pricePerNight, totalRooms: h.totalRooms, availableRooms: h.availableRooms, amenities: h.amenities || '', imageUrl: h.imageUrl || '' }); setErr(''); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const closeForm = () => { setShowForm(false); setForm({}); setEditId(null); };

  const handleSubmit = async e => {
    e.preventDefault(); setErr('');
    const payload = { ...form, pricePerNight: +form.pricePerNight, totalRooms: +form.totalRooms, availableRooms: +form.availableRooms };
    try {
      if (editId) { await api.put(`/hotels/${editId}`, payload); flash('✅ Hotel updated!'); }
      else { await api.post('/hotels', payload); flash('✅ Hotel added!'); }
      closeForm(); load();
    } catch { setErr('Failed to save. Check all fields.'); }
  };

  const handleDelete = async id => { if (!window.confirm('Delete?')) return; await api.delete(`/hotels/${id}`); flash('✅ Deleted.'); load(); };

  const f = (k, label, type = 'text', req = true) => (
    <div key={k} style={s.fw}><label style={s.lbl}>{label}</label>
      <input style={s.inp} type={type} placeholder={label} required={req} value={form[k] || ''} onChange={e => setForm({ ...form, [k]: e.target.value })} />
    </div>
  );

  return (
    <AdminLayout active="/admin/hotels" color="#2193b0" title="🏨 Hotels" count={data.length}
      onAdd={() => showForm && !editId ? closeForm() : openAdd()} showAdd addOpen={showForm && !editId}>
      {msg && <div style={s.msg}>{msg}</div>}
      {err && <div style={s.err}>⚠️ {err}</div>}

      {showForm && (
        <div style={s.formCard}>
          <div style={s.formHeader}>
            <h3 style={{ ...s.formTitle, color: '#2193b0' }}>{editId ? '✏️ Edit Hotel' : '➕ Add New Hotel'}</h3>
            <button style={s.closeBtn} onClick={closeForm}>✕</button>
          </div>
          <form onSubmit={handleSubmit} style={s.grid}>
            {f('name','Hotel Name')} {f('address','Address')} {f('district','District')} {f('phone','Phone')}
            {f('pricePerNight','Price Per Night','number')} {f('totalRooms','Total Rooms','number')} {f('availableRooms','Available Rooms','number')}
            {f('amenities','Amenities','text',false)} {f('imageUrl','Image URL','url',false)}
            <button type="submit" style={{ ...s.saveBtn, background: '#2193b0', gridColumn: '1/-1' }}>
              {editId ? '💾 Update Hotel' : '✅ Save Hotel'}
            </button>
          </form>
        </div>
      )}

      {loading ? <div style={s.loading}>Loading...</div> : (
        <div style={s.list}>
          {data.map(h => (
            <div key={h.id} style={s.row}>
              <div style={s.imgBox}><span style={{ fontSize: '1.8rem' }}>🏨</span></div>
              <div style={s.info}>
                <div style={s.rowTitle}>{h.name}</div>
                <div style={s.meta}>📍 {h.district} &nbsp;|&nbsp; ₹{h.pricePerNight}/night &nbsp;|&nbsp; 📞 {h.phone}</div>
                <div style={s.meta}>
                  <span style={{ ...s.badge, background: h.availableRooms < 1 ? '#fff5f5' : h.availableRooms <= 5 ? '#fffaf0' : '#f0fff4', color: h.availableRooms < 1 ? '#c53030' : h.availableRooms <= 5 ? '#c05621' : '#276749' }}>
                    🛏️ {h.availableRooms}/{h.totalRooms} rooms
                  </span>
                </div>
                {h.amenities && <div style={s.desc}>✨ {h.amenities}</div>}
              </div>
              <div style={s.btnGroup}>
                <button style={s.editBtn} onClick={() => openEdit(h)}>✏️ Edit</button>
                <button style={s.del} onClick={() => handleDelete(h.id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
          {data.length === 0 && <div style={s.empty}>📭 No hotels found.</div>}
        </div>
      )}
    </AdminLayout>
  );
}

const s = { fw:{display:'flex',flexDirection:'column'}, lbl:{fontSize:'0.75rem',fontWeight:'600',color:'#4a5568',marginBottom:'4px'}, inp:{padding:'9px 12px',border:'2px solid #e2e8f0',borderRadius:'8px',fontFamily:'Poppins,sans-serif',fontSize:'0.88rem',outline:'none',boxSizing:'border-box'}, formCard:{background:'#fff',borderRadius:'14px',padding:'24px',marginBottom:'20px',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',border:'2px solid #ebf8ff'}, formHeader:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}, formTitle:{fontSize:'1.05rem',fontWeight:'700',margin:0}, closeBtn:{background:'#f0f4f8',border:'none',borderRadius:'6px',width:'28px',height:'28px',cursor:'pointer',fontSize:'0.9rem',color:'#718096'}, grid:{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px'}, saveBtn:{color:'#fff',border:'none',padding:'11px',borderRadius:'10px',cursor:'pointer',fontFamily:'Poppins,sans-serif',fontWeight:'700',fontSize:'0.92rem'}, msg:{background:'#f0fff4',color:'#276749',border:'1px solid #c6f6d5',borderRadius:'8px',padding:'10px 16px',marginBottom:'14px',fontWeight:'600'}, err:{background:'#fff5f5',color:'#c53030',border:'1px solid #fed7d7',borderRadius:'8px',padding:'10px 16px',marginBottom:'14px'}, loading:{textAlign:'center',color:'#718096',padding:'60px'}, list:{display:'flex',flexDirection:'column',gap:'12px'}, row:{background:'#fff',borderRadius:'12px',padding:'16px 20px',display:'flex',alignItems:'center',gap:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.06)'}, imgBox:{width:'56px',height:'56px',borderRadius:'10px',background:'#ebf8ff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}, info:{flex:1}, rowTitle:{fontWeight:'700',color:'#1a365d',fontSize:'0.95rem',marginBottom:'4px'}, meta:{fontSize:'0.82rem',color:'#718096',marginBottom:'2px'}, desc:{fontSize:'0.78rem',color:'#a0aec0'}, badge:{padding:'3px 10px',borderRadius:'12px',fontSize:'0.78rem',fontWeight:'600',display:'inline-block'}, btnGroup:{display:'flex',gap:'8px',flexShrink:0}, editBtn:{background:'#ebf8ff',color:'#2193b0',border:'1px solid #bee3f8',padding:'7px 14px',borderRadius:'8px',cursor:'pointer',fontFamily:'Poppins,sans-serif',fontWeight:'600',fontSize:'0.82rem'}, del:{background:'#fff5f5',color:'#c53030',border:'1px solid #fed7d7',padding:'7px 14px',borderRadius:'8px',cursor:'pointer',fontFamily:'Poppins,sans-serif',fontWeight:'600',fontSize:'0.82rem'}, empty:{textAlign:'center',color:'#718096',padding:'60px'} };
