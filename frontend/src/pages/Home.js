import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';

const places = [
  { name: 'Hundru Falls',       district: 'Ranchi',  desc: 'One of the highest waterfalls in Jharkhand, a breathtaking natural wonder', emoji: '💧', gradient: 'linear-gradient(135deg, #1a6b4a 0%, #2d9e6b 50%, #38ef7d 100%)' },
  { name: 'Betla National Park', district: 'Latehar', desc: 'Dense forests home to tigers, elephants and rich tribal heritage',           emoji: '🐘', gradient: 'linear-gradient(135deg, #134e5e 0%, #1a7a5e 50%, #71b280 100%)' },
  { name: 'Deoghar Temple',      district: 'Deoghar', desc: 'Sacred Baidyanath Jyotirlinga, one of the 12 holiest Shiva shrines',         emoji: '🛕', gradient: 'linear-gradient(135deg, #7b341e 0%, #c05621 50%, #f6ad55 100%)' },
  { name: 'Dassam Falls',        district: 'Ranchi',  desc: 'Majestic 44-metre waterfall surrounded by lush green forests',               emoji: '🌊', gradient: 'linear-gradient(135deg, #1a365d 0%, #2b6cb0 50%, #63b3ed 100%)' },
  { name: 'Parasnath Hill',      district: 'Giridih', desc: 'Highest peak in Jharkhand, a sacred Jain pilgrimage destination',            emoji: '⛰️', gradient: 'linear-gradient(135deg, #44337a 0%, #6b46c1 50%, #b794f4 100%)' },
  { name: 'Jonha Falls',         district: 'Ranchi',  desc: 'Serene waterfall with ancient Gautamdhara temple at its base',               emoji: '🌿', gradient: 'linear-gradient(135deg, #1d4a1d 0%, #276749 50%, #48bb78 100%)' },
];

export default function Home() {
  // ALL hooks must be at the top — no hooks after conditional returns
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activePlace, setActivePlace] = useState(0);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regRole, setRegRole] = useState('USER');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'login') {
        const { data } = await api.post('/auth/login', { email: form.email, password: form.password });
        login(data);
        navigate(data.role === 'ADMIN' ? '/admin' : '/');
      } else {
        await api.post('/auth/register', { name: form.name, email: form.email, password: form.password, phone: form.phone, role: regRole });
        setRegSuccess(true);
        setTimeout(() => {
          setMode('login');
          setRegSuccess(false);
          setRegRole('USER');
          setForm({ name: '', email: '', password: '', phone: '' });
        }, 2000);
      }
    } catch {
      setError(mode === 'login' ? 'Invalid email or password.' : 'Registration failed. Email may already exist.');
    }
    setLoading(false);
  };

  // Logged-in dashboard (after all hooks)
  if (user) {
    return (
      <div style={styles.loggedInWrap}>
        <div style={styles.loggedInBox}>
          <div style={styles.loggedInAvatar}>{user.name?.[0]?.toUpperCase()}</div>
          <h2 style={styles.loggedInTitle}>Welcome back, {user.name}! 👋</h2>
          <p style={styles.loggedInSub}>Where would you like to go today?</p>
          <div style={styles.quickLinks}>
            {[
              { label: '🏞️ Places',    path: '/places' },
              { label: '🏨 Hotels',    path: '/hotels' },
              { label: '🎉 Events',    path: '/events' },
              { label: '🚌 Transport', path: '/transport' },
              { label: '📋 Bookings', path: '/bookings' },
              { label: '🆘 Emergency', path: '/emergency' },
            ].map(l => (
              <button key={l.path} style={styles.quickBtn} onClick={() => navigate(l.path)}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* LEFT — Auth Panel */}
      <div style={styles.left}>
        <div style={styles.leftInner}>

          <div style={styles.brand}>
            <span style={styles.brandIcon}>🌿</span>
            <div>
              <div style={styles.brandName}>Jharkhand Tourism</div>
              <div style={styles.brandTagline}>Smart Tourism Platform</div>
            </div>
          </div>

          <div style={styles.tabs}>
            <button style={{ ...styles.tab, ...(mode === 'login' ? styles.tabActive : {}) }}
              onClick={() => { setMode('login'); setError(''); setRegSuccess(false); }}>
              Login
            </button>
            <button style={{ ...styles.tab, ...(mode === 'register' ? styles.tabActive : {}) }}
              onClick={() => { setMode('register'); setError(''); setRegSuccess(false); }}>
              Register
            </button>
          </div>

          <h2 style={styles.formTitle}>
            {mode === 'login' ? 'Welcome Back 👋' : 'Create Account 🚀'}
          </h2>
          <p style={styles.formSub}>
            {mode === 'login'
              ? 'Sign in to explore the best of Jharkhand'
              : 'Join thousands of travellers discovering Jharkhand'}
          </p>

          {error && <div style={styles.errorBox}>⚠️ {error}</div>}

          {mode === 'register' && regSuccess ? (
            <div style={styles.successBox}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎉</div>
              <div style={{ fontWeight: '700', color: '#276749', fontSize: '1rem' }}>Account Created!</div>
              <div style={{ color: '#718096', fontSize: '0.85rem', marginTop: '4px' }}>Switching to login...</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              {mode === 'register' && (
                <>
                  {/* Role selector */}
                  <div style={styles.roleRow}>
                    <button type="button"
                      style={{ ...styles.roleBtn, ...(regRole === 'USER' ? styles.roleBtnUser : {}) }}
                      onClick={() => setRegRole('USER')}>
                      👤 User
                    </button>
                    <button type="button"
                      style={{ ...styles.roleBtn, ...(regRole === 'ADMIN' ? styles.roleBtnAdmin : {}) }}
                      onClick={() => setRegRole('ADMIN')}>
                      👑 Admin
                    </button>
                  </div>
                  <label style={styles.label}>Full Name</label>
                  <input style={styles.input} type="text" placeholder="Your full name" required
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <label style={styles.label}>Phone Number</label>
                  <input style={styles.input} type="tel" placeholder="10-digit mobile number"
                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </>
              )}
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} type="email" placeholder="you@example.com" required
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <label style={styles.label}>Password</label>
              <input style={styles.input} type="password" placeholder="Enter your password" required
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              <button style={styles.submitBtn} type="submit" disabled={loading}>
                {loading ? '⏳ Please wait...' : mode === 'login' ? '🔑 Sign In' : regRole === 'ADMIN' ? '👑 Register as Admin' : '🚀 Create Account'}
              </button>
            </form>
          )}

          <p style={styles.switchText}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <span style={styles.switchLink} onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
              {mode === 'login' ? 'Register here' : 'Login here'}
            </span>
          </p>

          {mode === 'login' && (
            <div style={styles.demoBox}>
              <div style={styles.demoTitle}>🔑 Demo Credentials</div>
              <div style={styles.demoRow}>
                <span style={styles.demoRole}>👑 Admin</span>
                <span style={styles.demoCred}>admin@tourism.com / password123</span>
              </div>
              <div style={styles.demoRow}>
                <span style={styles.demoRole}>👤 User</span>
                <span style={styles.demoCred}>rahul@gmail.com / password123</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT — Places Showcase */}
      <div style={styles.right}>
        <div style={{ ...styles.rightBg, background: places[activePlace].gradient }} />
        <div style={styles.rightOverlay} />
        <div style={styles.rightContent}>
          <div style={styles.showcaseHeader}>
            <div style={styles.showcaseBadge}>✨ Featured Destinations</div>
            <h2 style={styles.showcaseTitle}>Best of Jharkhand</h2>
            <p style={styles.showcaseSub}>Discover the land of forests, waterfalls & heritage</p>
          </div>

          <div style={styles.placeCards}>
            {places.map((p, i) => (
              <div key={i} style={{ ...styles.placeCard, ...(activePlace === i ? styles.placeCardActive : {}) }}
                onClick={() => setActivePlace(i)}>
                <div style={{ ...styles.placeCardBg, background: p.gradient }} />
                <div style={styles.placeCardContent}>
                  <span style={styles.placeEmoji}>{p.emoji}</span>
                  <div style={styles.placeInfo}>
                    <div style={styles.placeName}>{p.name}</div>
                    <div style={styles.placeDistrict}>📍 {p.district}</div>
                  </div>
                  {activePlace === i && <span style={styles.activeDot}>●</span>}
                </div>
                {activePlace === i && <div style={styles.placeDesc}>{p.desc}</div>}
              </div>
            ))}
          </div>

          <div style={styles.statsRow}>
            {[{ v: '24+', l: 'Districts' }, { v: '100+', l: 'Places' }, { v: '50+', l: 'Hotels' }, { v: '30+', l: 'Events' }].map(s => (
              <div key={s.l} style={styles.stat}>
                <div style={styles.statVal}>{s.v}</div>
                <div style={styles.statLbl}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' },
  left: { width: '440px', minWidth: '380px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', boxShadow: '4px 0 32px rgba(0,0,0,0.1)', zIndex: 2, overflowY: 'auto' },
  leftInner: { width: '100%', maxWidth: '360px' },
  brand: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' },
  brandIcon: { fontSize: '2.2rem' },
  brandName: { fontSize: '1.15rem', fontWeight: '800', color: '#1a365d', lineHeight: 1.2 },
  brandTagline: { fontSize: '0.72rem', color: '#718096', fontWeight: '500', letterSpacing: '0.5px' },
  tabs: { display: 'flex', background: '#f0f4f8', borderRadius: '10px', padding: '4px', marginBottom: '24px' },
  tab: { flex: 1, padding: '9px', border: 'none', borderRadius: '8px', background: 'transparent', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '0.9rem', color: '#718096' },
  tabActive: { background: '#fff', color: '#1a365d', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' },
  formTitle: { fontSize: '1.5rem', fontWeight: '800', color: '#1a365d', marginBottom: '4px' },
  formSub: { fontSize: '0.85rem', color: '#718096', marginBottom: '20px', lineHeight: '1.5' },
  errorBox: { background: '#fff5f5', color: '#c53030', border: '1px solid #fed7d7', borderRadius: '8px', padding: '10px 14px', fontSize: '0.85rem', marginBottom: '16px' },
  successBox: { textAlign: 'center', padding: '28px 16px', background: '#f0fff4', borderRadius: '10px', marginBottom: '12px', border: '1px solid #c6f6d5' },
  form: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: '0.8rem', fontWeight: '600', color: '#4a5568', marginBottom: '4px' },
  input: { padding: '11px 14px', marginBottom: '14px', border: '2px solid #e2e8f0', borderRadius: '8px', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', width: '100%' },
  submitBtn: { padding: '13px', marginTop: '4px', background: 'linear-gradient(135deg, #1a365d, #2b6cb0)', color: '#fff', border: 'none', borderRadius: '10px', fontFamily: 'Poppins, sans-serif', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(26,54,93,0.4)' },
  switchText: { textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: '#718096' },
  switchLink: { color: '#2b6cb0', fontWeight: '700', cursor: 'pointer' },
  roleRow: { display: 'flex', gap: '10px', marginBottom: '16px' },
  roleBtn: { flex: 1, padding: '10px', border: '2px solid #e2e8f0', borderRadius: '8px', background: '#f7fafc', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600', fontSize: '0.88rem', color: '#718096', transition: 'all 0.2s' },
  roleBtnUser: { border: '2px solid #2b6cb0', background: '#ebf8ff', color: '#2b6cb0' },
  roleBtnAdmin: { border: '2px solid #d69e2e', background: '#fffff0', color: '#b7791f' },
  demoBox: { marginTop: '20px', padding: '14px 16px', background: '#f7fafc', borderRadius: '10px', border: '1px dashed #cbd5e0' },
  demoTitle: { fontSize: '0.78rem', fontWeight: '700', color: '#4a5568', marginBottom: '8px' },
  demoRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' },
  demoRole: { fontSize: '0.75rem', fontWeight: '700', color: '#1a365d', minWidth: '60px' },
  demoCred: { fontSize: '0.73rem', color: '#718096' },
  right: { flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minHeight: '100vh' },
  rightBg: { position: 'absolute', inset: 0, transition: 'background 0.6s ease' },
  rightOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%)' },
  rightContent: { position: 'relative', zIndex: 1, padding: '40px 48px', width: '100%', maxWidth: '680px' },
  showcaseHeader: { marginBottom: '32px' },
  showcaseBadge: { display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 18px', borderRadius: '30px', fontSize: '0.82rem', fontWeight: '600', marginBottom: '14px', backdropFilter: 'blur(8px)' },
  showcaseTitle: { fontSize: '2.8rem', fontWeight: '800', color: '#fff', lineHeight: 1.15, marginBottom: '10px', textShadow: '0 2px 20px rgba(0,0,0,0.4)' },
  showcaseSub: { color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: '1.6' },
  placeCards: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' },
  placeCard: { position: 'relative', overflow: 'hidden', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.3s ease', backdropFilter: 'blur(4px)' },
  placeCardActive: { border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', transform: 'scale(1.01)' },
  placeCardBg: { position: 'absolute', inset: 0, opacity: 0.35 },
  placeCardContent: { position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px' },
  placeEmoji: { fontSize: '1.8rem', flexShrink: 0 },
  placeInfo: { flex: 1 },
  placeName: { color: '#fff', fontWeight: '700', fontSize: '0.95rem', lineHeight: 1.3 },
  placeDistrict: { color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', marginTop: '2px' },
  activeDot: { color: '#ffd200', fontSize: '0.7rem' },
  placeDesc: { position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', lineHeight: '1.6', padding: '0 18px 14px 18px' },
  statsRow: { display: 'flex', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' },
  stat: { flex: 1, textAlign: 'center', padding: '16px 8px', borderRight: '1px solid rgba(255,255,255,0.15)' },
  statVal: { fontSize: '1.5rem', fontWeight: '800', color: '#ffd200', lineHeight: 1 },
  statLbl: { fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', marginTop: '4px', fontWeight: '500' },
  loggedInWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', fontFamily: 'Poppins, sans-serif' },
  loggedInBox: { background: '#fff', borderRadius: '20px', padding: '48px 40px', textAlign: 'center', maxWidth: '520px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  loggedInAvatar: { width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a365d, #2b6cb0)', color: '#fff', fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' },
  loggedInTitle: { fontSize: '1.6rem', fontWeight: '800', color: '#1a365d', marginBottom: '8px' },
  loggedInSub: { color: '#718096', marginBottom: '28px' },
  quickLinks: { display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' },
  quickBtn: { padding: '10px 18px', background: 'linear-gradient(135deg, #1a365d, #2b6cb0)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '0.88rem' },
};
