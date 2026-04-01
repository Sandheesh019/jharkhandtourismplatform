import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';

const sections = [
  { label: 'Tourist Places', icon: '🏞️', path: '/admin/places',    color: '#11998e', gradient: 'linear-gradient(135deg,#11998e,#38ef7d)', desc: 'Add, view & delete tourist places' },
  { label: 'Hotels',         icon: '🏨', path: '/admin/hotels',    color: '#2193b0', gradient: 'linear-gradient(135deg,#2193b0,#6dd5ed)', desc: 'Manage hotel listings & rooms' },
  { label: 'Events',         icon: '🎉', path: '/admin/events',    color: '#f7971e', gradient: 'linear-gradient(135deg,#f7971e,#ffd200)', desc: 'Add festivals & cultural events' },
  { label: 'Transport',      icon: '🚌', path: '/admin/transport', color: '#8e2de2', gradient: 'linear-gradient(135deg,#8e2de2,#4a00e0)', desc: 'Manage bus, train & cab routes' },
  { label: 'Emergency',      icon: '🆘', path: '/admin/emergency', color: '#cb2d3e', gradient: 'linear-gradient(135deg,#cb2d3e,#ef473a)', desc: 'Police, hospital & helpline contacts' },
  { label: 'Bookings',       icon: '📋', path: '/admin/bookings',  color: '#134e5e', gradient: 'linear-gradient(135deg,#134e5e,#71b280)', desc: 'View all user booking statuses' },
];

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') { navigate('/'); return; }
    const eps = { places: 'places', hotels: 'hotels', events: 'events', transport: 'transport', emergency: 'emergency', bookings: 'bookings' };
    Object.entries(eps).forEach(([key, ep]) => {
      api.get(`/${ep}`).then(r => setCounts(c => ({ ...c, [key]: r.data.length }))).catch(() => {});
    });
  }, []); // eslint-disable-line

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={s.page}>
      {/* Top Bar */}
      <div style={s.topBar}>
        <div style={s.brand}>
          <span style={s.brandIcon}>🌿</span>
          <div>
            <div style={s.brandName}>Jharkhand Tourism</div>
            <div style={s.brandSub}>Admin Dashboard</div>
          </div>
        </div>
        <div style={s.topRight}>
          <div style={s.adminInfo}>
            <div style={s.adminAvatar}>{user?.name?.[0]?.toUpperCase()}</div>
            <div>
              <div style={s.adminName}>👑 {user?.name}</div>
              <div style={s.adminRole}>Administrator</div>
            </div>
          </div>
          <button style={s.siteBtn} onClick={() => navigate('/places')}>🌐 View Site</button>
          <button style={s.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div style={s.content}>
        <h2 style={s.title}>Welcome back, {user?.name}! 👋</h2>
        <p style={s.sub}>Manage all aspects of the Jharkhand Tourism platform</p>

        {/* Stats Row */}
        <div style={s.statsRow}>
          {sections.map(sec => (
            <div key={sec.path} style={{ ...s.statCard, borderTop: `3px solid ${sec.color}` }}>
              <div style={s.statIcon}>{sec.icon}</div>
              <div style={s.statCount}>{counts[sec.path.split('/')[2]] ?? '...'}</div>
              <div style={s.statLabel}>{sec.label}</div>
            </div>
          ))}
        </div>

        {/* Section Cards */}
        <h3 style={s.sectionHeading}>Manage Sections</h3>
        <div style={s.grid}>
          {sections.map(sec => (
            <div key={sec.path} style={s.card} onClick={() => navigate(sec.path)}>
              <div style={{ ...s.cardTop, background: sec.gradient }}>
                <span style={s.cardIcon}>{sec.icon}</span>
                {counts[sec.path.split('/')[2]] !== undefined && (
                  <span style={s.cardCount}>{counts[sec.path.split('/')[2]]} records</span>
                )}
              </div>
              <div style={s.cardBody}>
                <h3 style={s.cardTitle}>{sec.label}</h3>
                <p style={s.cardDesc}>{sec.desc}</p>
                <div style={{ ...s.cardBtn, background: sec.gradient }}>Manage →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: '#f0f4f8', fontFamily: 'Poppins, sans-serif' },
  topBar: { background: 'linear-gradient(135deg,#0f2027,#203a43)', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 16px rgba(0,0,0,0.3)' },
  brand: { display: 'flex', alignItems: 'center', gap: '12px' },
  brandIcon: { fontSize: '1.8rem' },
  brandName: { color: '#fff', fontWeight: '800', fontSize: '1rem', lineHeight: 1.2 },
  brandSub: { color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' },
  topRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  adminInfo: { display: 'flex', alignItems: 'center', gap: '10px' },
  adminAvatar: { width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#f7971e,#ffd200)', color: '#1a365d', fontWeight: '800', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  adminName: { color: '#ffd200', fontWeight: '700', fontSize: '0.85rem' },
  adminRole: { color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' },
  siteBtn: { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '7px 14px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600', fontSize: '0.82rem' },
  logoutBtn: { background: 'rgba(239,71,58,0.2)', color: '#ef473a', border: '1px solid rgba(239,71,58,0.3)', padding: '7px 14px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600', fontSize: '0.82rem' },
  content: { padding: '32px' },
  title: { fontSize: '1.8rem', fontWeight: '800', color: '#1a365d', marginBottom: '4px' },
  sub: { color: '#718096', marginBottom: '28px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '12px', marginBottom: '36px' },
  statCard: { background: '#fff', borderRadius: '12px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  statIcon: { fontSize: '1.5rem', marginBottom: '4px' },
  statCount: { fontSize: '1.8rem', fontWeight: '800', color: '#1a365d', lineHeight: 1 },
  statLabel: { fontSize: '0.72rem', color: '#718096', marginTop: '4px', fontWeight: '500' },
  sectionHeading: { fontSize: '1.1rem', fontWeight: '700', color: '#1a365d', marginBottom: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '20px' },
  card: { background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'transform 0.2s,box-shadow 0.2s' },
  cardTop: { height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' },
  cardIcon: { fontSize: '2.8rem', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' },
  cardCount: { background: 'rgba(255,255,255,0.25)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700' },
  cardBody: { padding: '18px 20px 20px' },
  cardTitle: { fontSize: '1.1rem', fontWeight: '700', color: '#1a365d', marginBottom: '6px' },
  cardDesc: { fontSize: '0.83rem', color: '#718096', marginBottom: '14px', lineHeight: '1.5' },
  cardBtn: { display: 'inline-block', color: '#fff', padding: '6px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600' },
};
