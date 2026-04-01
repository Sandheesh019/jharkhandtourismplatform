import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';
import AdminLayout from '../components/AdminLayout';

const statusConfig = {
  CONFIRMED: { color: '#276749', bg: '#f0fff4', border: '#9ae6b4', label: '✅ Confirmed' },
  PENDING:   { color: '#d69e2e', bg: '#fffff0', border: '#f6e05e', label: '⏳ Pending' },
  CANCELLED: { color: '#c53030', bg: '#fff5f5', border: '#feb2b2', label: '❌ Cancelled' },
};
const typeIcon = { HOTEL: '🏨', TRANSPORT: '🚌', EVENT: '🎉' };

export default function AdminBookings() {
  const { user } = useAuth(); const navigate = useNavigate();
  const [data, setData] = useState([]); const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [msg, setMsg] = useState('');

  useEffect(() => { if (!user || user.role !== 'ADMIN') { navigate('/'); return; } load(); }, []); // eslint-disable-line
  const load = () => { setLoading(true); api.get('/bookings').then(r => { setData(r.data); setLoading(false); }); };
  const flash = m => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const handleDelete = async id => {
    if (!window.confirm('Delete this booking?')) return;
    await api.delete(`/bookings/${id}`); flash('✅ Booking deleted.'); load();
  };

  const handleStatusChange = async (id, status) => {
    await api.put(`/bookings/${id}/status?status=${status}`);
    setData(data.map(b => b.id === id ? { ...b, status } : b));
    flash(`✅ Status updated to ${status}`);
  };

  const filtered = filter === 'ALL' ? data : data.filter(b => b.status === filter);

  const counts = {
    ALL: data.length,
    CONFIRMED: data.filter(b => b.status === 'CONFIRMED').length,
    PENDING: data.filter(b => b.status === 'PENDING').length,
    CANCELLED: data.filter(b => b.status === 'CANCELLED').length,
  };

  return (
    <AdminLayout active="/admin/bookings" color="#134e5e" title="📋 All Bookings" count={data.length} showAdd={false}>
      {msg && <div style={s.msg}>{msg}</div>}

      {/* Filter Tabs */}
      <div style={s.filterRow}>
        {['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'].map(f => (
          <button key={f} style={{ ...s.filterBtn, ...(filter === f ? s.filterActive : {}) }}
            onClick={() => setFilter(f)}>
            {f === 'ALL' ? '📋' : f === 'CONFIRMED' ? '✅' : f === 'PENDING' ? '⏳' : '❌'} {f} ({counts[f]})
          </button>
        ))}
      </div>

      {loading ? <div style={s.loading}>Loading...</div> : (
        <div style={s.list}>
          {filtered.map(b => {
            const sc = statusConfig[b.status] || statusConfig.PENDING;
            return (
              <div key={b.id} style={{ ...s.row, borderLeft: `4px solid ${sc.color}` }}>
                <div style={{ ...s.imgBox, background: sc.bg }}>
                  <span style={{ fontSize: '1.8rem' }}>{typeIcon[b.type] || '📋'}</span>
                </div>
                <div style={s.info}>
                  <div style={s.rowTitle}>
                    {b.type} Booking &nbsp;
                    <span style={s.bookingId}>#{b.id}</span>
                  </div>
                  <div style={s.meta}>👤 <b>{b.user?.name || 'Unknown'}</b> &nbsp;|&nbsp; 👥 {b.guests} guest{b.guests > 1 ? 's' : ''}</div>
                  {b.checkIn && <div style={s.meta}>📅 {b.checkIn} → {b.checkOut}</div>}
                  {b.totalAmount > 0 && <div style={s.meta}>💰 ₹{b.totalAmount}</div>}
                  {b.bookedAt && <div style={s.desc}>🕐 Booked: {new Date(b.bookedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>}
                </div>
                <div style={s.actions}>
                  <span style={{ ...s.statusBadge, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                    {sc.label}
                  </span>
                  {b.status !== 'CONFIRMED' && (
                    <button style={{ ...s.actionBtn, background: '#f0fff4', color: '#276749', border: '1px solid #9ae6b4' }}
                      onClick={() => handleStatusChange(b.id, 'CONFIRMED')}>✅ Confirm</button>
                  )}
                  {b.status !== 'CANCELLED' && (
                    <button style={{ ...s.actionBtn, background: '#fff5f5', color: '#c53030', border: '1px solid #feb2b2' }}
                      onClick={() => handleStatusChange(b.id, 'CANCELLED')}>❌ Cancel</button>
                  )}
                  <button style={s.del} onClick={() => handleDelete(b.id)}>🗑️</button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <div style={s.empty}>📭 No {filter !== 'ALL' ? filter.toLowerCase() : ''} bookings found.</div>}
        </div>
      )}
    </AdminLayout>
  );
}

const s = { msg:{background:'#f0fff4',color:'#276749',border:'1px solid #c6f6d5',borderRadius:'8px',padding:'10px 16px',marginBottom:'14px',fontWeight:'600'}, filterRow:{display:'flex',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}, filterBtn:{padding:'8px 16px',border:'2px solid #e2e8f0',borderRadius:'20px',cursor:'pointer',background:'#fff',fontFamily:'Poppins,sans-serif',fontWeight:'600',fontSize:'0.82rem',color:'#4a5568'}, filterActive:{border:'2px solid #134e5e',background:'#e6fffa',color:'#134e5e'}, loading:{textAlign:'center',color:'#718096',padding:'60px'}, list:{display:'flex',flexDirection:'column',gap:'12px'}, row:{background:'#fff',borderRadius:'12px',padding:'16px 20px',display:'flex',alignItems:'center',gap:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.06)'}, imgBox:{width:'56px',height:'56px',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}, info:{flex:1}, rowTitle:{fontWeight:'700',color:'#1a365d',fontSize:'0.95rem',marginBottom:'4px'}, bookingId:{fontSize:'0.78rem',color:'#718096',fontWeight:'400'}, meta:{fontSize:'0.82rem',color:'#718096',marginBottom:'2px'}, desc:{fontSize:'0.75rem',color:'#a0aec0',marginTop:'2px'}, actions:{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'6px',flexShrink:0}, statusBadge:{padding:'4px 12px',borderRadius:'20px',fontSize:'0.78rem',fontWeight:'700',whiteSpace:'nowrap'}, actionBtn:{padding:'5px 12px',borderRadius:'6px',cursor:'pointer',fontFamily:'Poppins,sans-serif',fontWeight:'600',fontSize:'0.75rem',whiteSpace:'nowrap'}, del:{background:'#fff5f5',color:'#c53030',border:'1px solid #fed7d7',padding:'5px 10px',borderRadius:'6px',cursor:'pointer',fontFamily:'Poppins,sans-serif',fontWeight:'600',fontSize:'0.82rem'}, empty:{textAlign:'center',color:'#718096',padding:'60px'} };
