import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const navLinks = [
  { to: '/places',    label: '🏞️ Places',    color: '#38ef7d' },
  { to: '/hotels',    label: '🏨 Hotels',    color: '#6dd5ed' },
  { to: '/events',    label: '🎉 Events',    color: '#ffd200' },
  { to: '/transport', label: '🚌 Transport', color: '#c471ed' },
  { to: '/emergency', label: '🆘 Emergency', color: '#ef473a' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.role === 'ADMIN';

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        <span style={styles.brandIcon}>🌿</span>
        <span>Jharkhand Tourism</span>
      </Link>

      <div style={styles.links}>
        {navLinks.map(({ to, label, color }) => {
          const active = location.pathname === to;
          return (
            <Link key={to} to={to} style={{
              ...styles.link,
              color: active ? color : '#cbd5e0',
              background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
              borderBottom: active ? `2px solid ${color}` : '2px solid transparent',
            }}>
              {label}
            </Link>
          );
        })}

        {user ? (
          <>
            {isAdmin ? (
              <Link to="/admin" style={styles.adminLink}>⚙️ Admin</Link>
            ) : (
              <Link to="/bookings" style={{
                ...styles.link,
                color: location.pathname === '/bookings' ? '#71b280' : '#cbd5e0',
                background: location.pathname === '/bookings' ? 'rgba(255,255,255,0.08)' : 'transparent',
                borderBottom: location.pathname === '/bookings' ? '2px solid #71b280' : '2px solid transparent',
              }}>📋 Bookings</Link>
            )}
            <div style={styles.userBadge}>
              <span style={styles.roleTag}>{isAdmin ? '👑 Admin' : '👤 User'}</span>
              <span style={styles.userName}>{user.name}</span>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.loginBtn}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0 28px', height: '64px',
    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 60%, #2c5364 100%)',
    boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
    position: 'sticky', top: 0, zIndex: 999,
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: '8px',
    color: '#fff', textDecoration: 'none',
    fontWeight: '800', fontSize: '1.2rem', letterSpacing: '0.5px',
  },
  brandIcon: { fontSize: '1.5rem' },
  links: { display: 'flex', gap: '4px', alignItems: 'center' },
  link: {
    textDecoration: 'none', padding: '6px 12px',
    borderRadius: '6px 6px 0 0', fontSize: '0.88rem', fontWeight: '500',
    transition: 'all 0.2s', marginBottom: '-1px',
  },
  adminLink: {
    color: '#fbd38d', textDecoration: 'none', padding: '6px 12px',
    borderRadius: '6px', fontSize: '0.88rem', fontWeight: '600',
    background: 'rgba(251,211,141,0.12)', border: '1px solid rgba(251,211,141,0.25)',
  },
  userBadge: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '2px 12px', borderLeft: '1px solid rgba(255,255,255,0.1)',
    marginLeft: '4px',
  },
  roleTag: { fontSize: '0.68rem', color: '#ff6b35', fontWeight: '700', letterSpacing: '0.5px' },
  userName: { fontSize: '0.82rem', color: '#e2e8f0', fontWeight: '500' },
  loginBtn: {
    color: '#e2e8f0', textDecoration: 'none', padding: '7px 16px',
    borderRadius: '6px', fontSize: '0.88rem', fontWeight: '500',
    border: '1px solid rgba(255,255,255,0.25)',
  },
  registerBtn: {
    color: '#1a365d', textDecoration: 'none', padding: '7px 18px',
    borderRadius: '6px', fontSize: '0.88rem', fontWeight: '700',
    background: 'linear-gradient(135deg, #ff6b35, #ffd200)',
    boxShadow: '0 3px 10px rgba(255,107,53,0.4)',
  },
  logoutBtn: {
    background: 'rgba(239,71,58,0.15)', color: '#ef473a',
    border: '1px solid rgba(239,71,58,0.35)',
    padding: '7px 14px', borderRadius: '6px', cursor: 'pointer',
    fontSize: '0.85rem', fontWeight: '600',
  },
};
