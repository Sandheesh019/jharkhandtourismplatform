import { useEffect, useState } from 'react';
import api from '../services/api';

const typeConfig = {
  POLICE:          { color: '#1565c0', bg: '#ebf8ff', icon: '👮' },
  HOSPITAL:        { color: '#c62828', bg: '#fff5f5', icon: '🏥' },
  FIRE:            { color: '#e65100', bg: '#fffaf0', icon: '🚒' },
  TOURIST_HELPLINE:{ color: '#276749', bg: '#f0fff4', icon: '🆘' },
};

export default function Emergency() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/emergency')
      .then(r => setContacts(r.data))
      .catch(() => setError('Failed to load emergency contacts. Make sure backend is running on port 8085.'));
  }, []);

  const filtered = filter ? contacts.filter(c => c.type === filter) : contacts;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🆘 Emergency Contacts</h2>
      <p style={styles.subtitle}>Quick access to emergency services across Jharkhand</p>
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.filters}>
        {['', 'POLICE', 'HOSPITAL', 'FIRE', 'TOURIST_HELPLINE'].map(t => {
          const cfg = typeConfig[t] || { color: '#4a5568', bg: '#f7fafc', icon: '📋' };
          return (
            <button key={t} onClick={() => setFilter(t)}
              style={{ ...styles.filterBtn, ...(filter === t ? { background: cfg.color, color: '#fff', border: `2px solid ${cfg.color}` } : {}) }}>
              {cfg.icon} {t ? t.replace('_', ' ') : 'All'}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && !error && <p style={styles.empty}>No contacts found.</p>}

      <div style={styles.grid}>
        {filtered.map(c => {
          const cfg = typeConfig[c.type] || { color: '#4a5568', bg: '#f7fafc', icon: '📋' };
          return (
            <div key={c.id} style={{ ...styles.card, borderTop: `4px solid ${cfg.color}`, background: cfg.bg }}>
              <div style={styles.cardHeader}>
                <span style={styles.icon}>{cfg.icon}</span>
                <span style={{ ...styles.typeBadge, background: cfg.color }}>{c.type?.replace('_', ' ')}</span>
              </div>
              <h3 style={styles.cardTitle}>{c.name}</h3>
              <p style={styles.district}>📍 {c.district}</p>
              <p style={styles.address}>{c.address}</p>
              <a href={`tel:${c.phone}`} style={{ ...styles.callBtn, background: cfg.color }}>
                📞 {c.phone}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a365d', marginBottom: '4px' },
  subtitle: { color: '#718096', marginBottom: '24px' },
  error: { background: '#fff5f5', color: '#c53030', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fed7d7' },
  empty: { color: '#718096', textAlign: 'center', padding: '40px' },
  filters: { display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' },
  filterBtn: { padding: '7px 16px', border: '2px solid #e2e8f0', borderRadius: '20px', cursor: 'pointer', background: '#fff', fontFamily: 'Poppins,sans-serif', fontWeight: '500', color: '#4a5568' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' },
  card: { borderRadius: '12px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  icon: { fontSize: '1.8rem' },
  typeBadge: { color: '#fff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '700' },
  cardTitle: { fontSize: '1rem', fontWeight: '700', color: '#1a365d', marginBottom: '4px' },
  district: { fontSize: '0.83rem', color: '#718096', marginBottom: '2px' },
  address: { fontSize: '0.8rem', color: '#718096', marginBottom: '12px' },
  callBtn: { display: 'inline-block', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none' },
};
