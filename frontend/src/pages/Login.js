import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      if (data.role !== role) {
        setError(`This account is not registered as ${role}. Please select correct role.`);
        setLoading(false);
        return;
      }
      login(data);
      navigate(data.role === 'ADMIN' ? '/admin' : '/');
    } catch {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <div style={styles.logo}>🌿</div>
          <h1 style={styles.leftTitle}>Jharkhand Tourism</h1>
          <p style={styles.leftSub}>Discover the eco and cultural heritage of the land of forests</p>
          <div style={styles.features}>
            <div style={styles.feature}>🏞️ Explore 100+ Tourist Places</div>
            <div style={styles.feature}>🏨 Book Hotels Across Districts</div>
            <div style={styles.feature}>🎉 Attend Cultural Festivals</div>
            <div style={styles.feature}>🚌 Plan Your Transport</div>
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to your account</p>

          {/* Role Selector */}
          <div style={styles.roleSelector}>
            <button
              type="button"
              style={{ ...styles.roleBtn, ...(role === 'USER' ? styles.roleBtnActive : {}) }}
              onClick={() => setRole('USER')}
            >
              👤 User
            </button>
            <button
              type="button"
              style={{ ...styles.roleBtn, ...(role === 'ADMIN' ? styles.roleBtnActiveAdmin : {}) }}
              onClick={() => setRole('ADMIN')}
            >
              👑 Admin
            </button>
          </div>

          {error && <div style={styles.error}>⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input} type="email" placeholder="Enter your email"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
            />
            <label style={styles.label}>Password</label>
            <input
              style={styles.input} type="password" placeholder="Enter your password"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required
            />
            <button style={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Signing in...' : `Sign in as ${role}`}
            </button>
          </form>

          <div style={styles.hint}>
            {role === 'ADMIN'
              ? '👑 Admin: Manage places, hotels, events & more'
              : '👤 User: Browse places, book hotels & events'}
          </div>

          <p style={styles.registerText}>
            Don't have an account? <Link to="/register" style={styles.registerLink}>Register here</Link>
          </p>

          <div style={styles.demoBox}>
            <p style={styles.demoTitle}>Demo Credentials</p>
            <p style={styles.demoItem}>👑 Admin: admin@tourism.com / password123</p>
            <p style={styles.demoItem}>👤 User: rahul@gmail.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', minHeight: '100vh' },
  left: {
    flex: 1, background: 'linear-gradient(135deg, #1a365d 0%, #ff6b35 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px',
  },
  leftContent: { color: '#fff', maxWidth: '400px' },
  logo: { fontSize: '4rem', marginBottom: '16px' },
  leftTitle: { fontSize: '2.2rem', fontWeight: '700', marginBottom: '12px' },
  leftSub: { fontSize: '1rem', opacity: 0.85, marginBottom: '32px', lineHeight: '1.6' },
  features: { display: 'flex', flexDirection: 'column', gap: '12px' },
  feature: {
    background: 'rgba(255,255,255,0.15)', padding: '10px 16px',
    borderRadius: '8px', fontSize: '0.95rem', backdropFilter: 'blur(4px)',
  },
  right: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '40px', background: '#f0f4f8',
  },
  card: {
    background: '#fff', padding: '40px', borderRadius: '16px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.12)', width: '100%', maxWidth: '420px',
  },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a365d', marginBottom: '4px' },
  subtitle: { color: '#718096', marginBottom: '24px', fontSize: '0.95rem' },
  roleSelector: { display: 'flex', gap: '12px', marginBottom: '20px' },
  roleBtn: {
    flex: 1, padding: '10px', border: '2px solid #e2e8f0', borderRadius: '8px',
    background: '#f7fafc', cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
    fontSize: '0.95rem', fontWeight: '500', color: '#718096', transition: 'all 0.2s',
  },
  roleBtnActive: {
    border: '2px solid #ff6b35', background: '#fff5f0', color: '#ff6b35', fontWeight: '600',
  },
  roleBtnActiveAdmin: {
    border: '2px solid #1a365d', background: '#ebf4ff', color: '#1a365d', fontWeight: '600',
  },
  label: { fontSize: '0.85rem', fontWeight: '600', color: '#4a5568', marginBottom: '2px', display: 'block' },
  input: {
    display: 'block', width: '100%', padding: '11px 14px', margin: '4px 0 14px',
    borderRadius: '8px', border: '2px solid #e2e8f0', fontFamily: 'Poppins, sans-serif',
    fontSize: '0.95rem', boxSizing: 'border-box', transition: 'border-color 0.2s',
  },
  btn: {
    width: '100%', padding: '12px', marginTop: '4px',
    background: 'linear-gradient(135deg, #ff6b35, #e55a2b)',
    color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: '600',
    boxShadow: '0 4px 12px rgba(255,107,53,0.4)',
  },
  hint: {
    textAlign: 'center', marginTop: '12px', fontSize: '0.82rem',
    color: '#718096', background: '#f7fafc', padding: '8px', borderRadius: '6px',
  },
  error: {
    background: '#fff5f5', color: '#c53030', padding: '10px 14px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '0.88rem',
    border: '1px solid #fed7d7',
  },
  registerText: { textAlign: 'center', marginTop: '20px', color: '#718096', fontSize: '0.9rem' },
  registerLink: { color: '#ff6b35', fontWeight: '600' },
  demoBox: {
    marginTop: '20px', padding: '12px 16px', background: '#f7fafc',
    borderRadius: '8px', border: '1px dashed #cbd5e0',
  },
  demoTitle: { fontSize: '0.8rem', fontWeight: '700', color: '#4a5568', marginBottom: '6px' },
  demoItem: { fontSize: '0.78rem', color: '#718096', marginBottom: '2px' },
};
