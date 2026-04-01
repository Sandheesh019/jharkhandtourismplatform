import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true); setError('');
    try {
      await api.post('/auth/register', form);
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch {
      setError('Registration failed. Email may already be registered.');
    }
    setLoading(false);
  };

  const fields = [
    { key: 'name',     label: 'Full Name',     type: 'text',     placeholder: 'Your full name',        icon: '👤' },
    { key: 'email',    label: 'Email Address', type: 'email',    placeholder: 'you@example.com',        icon: '📧' },
    { key: 'phone',    label: 'Phone Number',  type: 'tel',      placeholder: '10-digit mobile number', icon: '📱', required: false },
    { key: 'password', label: 'Password',      type: 'password', placeholder: 'Min. 6 characters',      icon: '🔒' },
  ];

  return (
    <div style={styles.page}>

      {/* LEFT — Form */}
      <div style={styles.left}>
        <div style={styles.leftInner}>

          <Link to="/" style={styles.backLink}>← Back to Home</Link>

          <div style={styles.brand}>
            <span style={styles.brandIcon}>🌿</span>
            <div>
              <div style={styles.brandName}>Jharkhand Tourism</div>
              <div style={styles.brandTag}>Smart Tourism Platform</div>
            </div>
          </div>

          {success ? (
            <div style={styles.successBox}>
              <div style={styles.successIcon}>🎉</div>
              <h3 style={styles.successTitle}>Account Created!</h3>
              <p style={styles.successSub}>Redirecting you to login...</p>
              <div style={styles.successBar}><div style={styles.successBarFill} /></div>
            </div>
          ) : (
            <>
              <h2 style={styles.title}>Create Account 🚀</h2>
              <p style={styles.sub}>Join thousands of travellers discovering Jharkhand</p>

              {error && <div style={styles.errorBox}>⚠️ {error}</div>}

              <form onSubmit={handleSubmit}>
                {fields.map(f => (
                  <div key={f.key} style={styles.fieldWrap}>
                    <label style={styles.label}>{f.label}</label>
                    <div style={styles.inputWrap}>
                      <span style={styles.inputIcon}>{f.icon}</span>
                      <input
                        style={styles.input}
                        type={f.type}
                        placeholder={f.placeholder}
                        required={f.required !== false}
                        value={form[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      />
                    </div>
                  </div>
                ))}

                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Confirm Password</label>
                  <div style={styles.inputWrap}>
                    <span style={styles.inputIcon}>🔐</span>
                    <input
                      style={{
                        ...styles.input,
                        borderColor: confirm && confirm !== form.password ? '#fc8181' : confirm && confirm === form.password ? '#68d391' : '#e2e8f0',
                      }}
                      type="password"
                      placeholder="Re-enter your password"
                      required
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                    />
                    {confirm && (
                      <span style={styles.matchIcon}>
                        {confirm === form.password ? '✅' : '❌'}
                      </span>
                    )}
                  </div>
                </div>

                <button style={styles.submitBtn} type="submit" disabled={loading}>
                  {loading ? '⏳ Creating account...' : '🚀 Create My Account'}
                </button>
              </form>

              <p style={styles.loginText}>
                Already have an account?{' '}
                <Link to="/" style={styles.loginLink}>Sign in here</Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* RIGHT — Visual */}
      <div style={styles.right}>
        <div style={styles.rightOverlay} />
        <div style={styles.rightContent}>
          <div style={styles.badge}>🌿 Join Us Today</div>
          <h2 style={styles.rightTitle}>Start Your<br />Jharkhand Journey</h2>
          <p style={styles.rightSub}>Create a free account and unlock access to everything</p>

          <div style={styles.perks}>
            {[
              { icon: '🏞️', title: 'Explore 100+ Places',   desc: 'Waterfalls, forests, temples & more' },
              { icon: '🏨', title: 'Book Hotels Instantly', desc: 'Best prices across all districts' },
              { icon: '🎉', title: 'Attend Events',         desc: 'Festivals, fairs & cultural shows' },
              { icon: '🚌', title: 'Plan Transport',        desc: 'Bus, train & cab options' },
            ].map(p => (
              <div key={p.title} style={styles.perk}>
                <div style={styles.perkIcon}>{p.icon}</div>
                <div>
                  <div style={styles.perkTitle}>{p.title}</div>
                  <div style={styles.perkDesc}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.statsRow}>
            {[{ v: '10K+', l: 'Travellers' }, { v: '100+', l: 'Places' }, { v: '50+', l: 'Hotels' }].map(s => (
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

  /* LEFT */
  left: {
    width: '480px', minWidth: '400px',
    background: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '40px 36px',
    boxShadow: '4px 0 32px rgba(0,0,0,0.1)',
    zIndex: 2, overflowY: 'auto',
  },
  leftInner: { width: '100%', maxWidth: '380px' },

  backLink: {
    display: 'inline-block', marginBottom: '24px',
    color: '#718096', fontSize: '0.82rem', fontWeight: '600',
    textDecoration: 'none',
  },
  brand: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' },
  brandIcon: { fontSize: '2.2rem' },
  brandName: { fontSize: '1.1rem', fontWeight: '800', color: '#1a365d', lineHeight: 1.2 },
  brandTag: { fontSize: '0.7rem', color: '#718096', fontWeight: '500', letterSpacing: '0.5px' },

  title: { fontSize: '1.6rem', fontWeight: '800', color: '#1a365d', marginBottom: '4px' },
  sub: { fontSize: '0.85rem', color: '#718096', marginBottom: '20px', lineHeight: '1.5' },

  errorBox: {
    background: '#fff5f5', color: '#c53030',
    border: '1px solid #fed7d7', borderRadius: '8px',
    padding: '10px 14px', fontSize: '0.85rem', marginBottom: '16px',
  },

  fieldWrap: { marginBottom: '14px' },
  label: { fontSize: '0.78rem', fontWeight: '700', color: '#4a5568', marginBottom: '5px', display: 'block', letterSpacing: '0.3px' },
  inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: '12px', fontSize: '1rem', zIndex: 1 },
  input: {
    width: '100%', padding: '11px 14px 11px 38px',
    border: '2px solid #e2e8f0', borderRadius: '10px',
    fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    background: '#fafbfc',
  },
  matchIcon: { position: 'absolute', right: '12px', fontSize: '0.9rem' },

  submitBtn: {
    width: '100%', padding: '13px', marginTop: '8px',
    background: 'linear-gradient(135deg, #11998e, #38ef7d)',
    color: '#fff', border: 'none', borderRadius: '10px',
    fontFamily: 'Poppins, sans-serif', fontWeight: '700', fontSize: '0.95rem',
    cursor: 'pointer', boxShadow: '0 4px 20px rgba(17,153,142,0.45)',
    letterSpacing: '0.3px',
  },

  loginText: { textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: '#718096' },
  loginLink: { color: '#11998e', fontWeight: '700', textDecoration: 'none' },

  /* Success state */
  successBox: { textAlign: 'center', padding: '32px 0' },
  successIcon: { fontSize: '3.5rem', marginBottom: '16px' },
  successTitle: { fontSize: '1.5rem', fontWeight: '800', color: '#276749', marginBottom: '8px' },
  successSub: { color: '#718096', marginBottom: '20px' },
  successBar: { height: '4px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' },
  successBarFill: {
    height: '100%', width: '100%',
    background: 'linear-gradient(135deg, #11998e, #38ef7d)',
    animation: 'none',
  },

  /* RIGHT */
  right: {
    flex: 1, position: 'relative',
    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 40%, #11998e 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  },
  rightOverlay: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 30% 70%, rgba(56,239,125,0.15) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  rightContent: {
    position: 'relative', zIndex: 1,
    padding: '48px', maxWidth: '520px', width: '100%',
  },

  badge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.25)',
    color: '#fff', padding: '6px 18px',
    borderRadius: '30px', fontSize: '0.82rem',
    fontWeight: '600', marginBottom: '20px',
    backdropFilter: 'blur(8px)',
  },
  rightTitle: {
    fontSize: '2.8rem', fontWeight: '800',
    color: '#fff', lineHeight: 1.15, marginBottom: '12px',
    textShadow: '0 2px 20px rgba(0,0,0,0.3)',
  },
  rightSub: { color: 'rgba(255,255,255,0.75)', fontSize: '1rem', marginBottom: '36px', lineHeight: '1.6' },

  perks: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' },
  perk: {
    display: 'flex', alignItems: 'center', gap: '16px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px', padding: '14px 18px',
    backdropFilter: 'blur(4px)',
  },
  perkIcon: { fontSize: '1.8rem', flexShrink: 0 },
  perkTitle: { color: '#fff', fontWeight: '700', fontSize: '0.92rem', marginBottom: '2px' },
  perkDesc: { color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem' },

  statsRow: {
    display: 'flex',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '12px', overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(8px)',
  },
  stat: {
    flex: 1, textAlign: 'center', padding: '16px 8px',
    borderRight: '1px solid rgba(255,255,255,0.15)',
  },
  statVal: { fontSize: '1.5rem', fontWeight: '800', color: '#38ef7d', lineHeight: 1 },
  statLbl: { fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', fontWeight: '500' },
};
