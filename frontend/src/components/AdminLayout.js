import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const NAV = [
  { label: '🏠 Dashboard',   path: '/admin' },
  { label: '🏞️ Places',     path: '/admin/places' },
  { label: '🏨 Hotels',     path: '/admin/hotels' },
  { label: '🎉 Events',     path: '/admin/events' },
  { label: '🚌 Transport',  path: '/admin/transport' },
  { label: '🆘 Emergency',  path: '/admin/emergency' },
  { label: '📋 Bookings',   path: '/admin/bookings' },
];

export default function AdminLayout({ children, active, color = '#2193b0', title, count, onAdd, showAdd = true, addOpen }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div style={s.page}>
      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={s.brand}>
          <span style={{ fontSize: '1.8rem' }}>🌿</span>
          <div>
            <div style={s.brandName}>Admin Panel</div>
            <div style={s.brandSub}>Jharkhand Tourism</div>
          </div>
        </div>
        <div style={s.adminBadge}>👑 {user?.name}</div>
        {NAV.map(n => (
          <button key={n.path}
            style={{ ...s.navBtn, ...(active === n.path ? { background: color, color: '#fff', boxShadow: `0 4px 12px ${color}55` } : {}) }}
            onClick={() => navigate(n.path)}>
            {n.label}
          </button>
        ))}
        <button style={s.siteBtn} onClick={() => navigate('/places')}>🌐 View Site</button>
        <button style={s.logoutBtn} onClick={() => { logout(); navigate('/'); }}>⬅ Logout</button>
      </div>

      {/* Main */}
      <div style={s.main}>
        <div style={{ ...s.header, borderBottom: `3px solid ${color}` }}>
          <div>
            <h2 style={s.headerTitle}>{title}</h2>
            <p style={s.headerSub}>{count} record{count !== 1 ? 's' : ''}</p>
          </div>
          {showAdd && (
            <button style={{ ...s.addBtn, background: color }} onClick={onAdd}>
              {addOpen ? '✕ Cancel' : '+ Add New'}
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

const s = {
  page: { display: 'flex', minHeight: '100vh', fontFamily: 'Poppins,sans-serif', background: '#f0f4f8' },
  sidebar: { width: '220px', minWidth: '220px', background: 'linear-gradient(180deg,#0f2027,#203a43)', padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: '6px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' },
  brand: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  brandName: { color: '#fff', fontWeight: '800', fontSize: '0.95rem', lineHeight: 1.2 },
  brandSub: { color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem' },
  adminBadge: { background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.25)', color: '#ffd200', borderRadius: '8px', padding: '7px 10px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px', textAlign: 'center' },
  navBtn: { padding: '10px 12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600', fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.04)', textAlign: 'left', transition: 'all 0.2s' },
  siteBtn: { marginTop: '8px', padding: '9px 12px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600', fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', background: 'transparent', textAlign: 'left' },
  logoutBtn: { padding: '9px 12px', border: '1px solid rgba(239,71,58,0.3)', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600', fontSize: '0.82rem', color: '#ef473a', background: 'rgba(239,71,58,0.08)', textAlign: 'left' },
  main: { flex: 1, padding: '28px', overflowY: 'auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px' },
  headerTitle: { fontSize: '1.4rem', fontWeight: '800', color: '#1a365d', margin: 0 },
  headerSub: { color: '#718096', fontSize: '0.82rem', margin: '3px 0 0' },
  addBtn: { color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '700', fontSize: '0.88rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
};
