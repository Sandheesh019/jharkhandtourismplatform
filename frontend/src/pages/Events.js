import { useEffect, useState } from 'react';
import api from '../services/api';

const catStyle = {
  FESTIVAL: { bg: '#fed7e2', color: '#97266d', icon: '🎉' },
  CULTURAL:  { bg: '#feebc8', color: '#7b341e', icon: '🎭' },
  ECO:       { bg: '#c6f6d5', color: '#276749', icon: '🌿' },
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/events')
      .then(r => setEvents(r.data))
      .catch(() => setError('Failed to load events. Make sure backend is running on port 8085.'));
  }, []);

  const filtered = filter ? events.filter(e => e.category === filter) : events;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎉 Events & Festivals</h2>
      {error && <div style={styles.error}>{error}</div>}
      <div style={styles.filters}>
        {['', 'FESTIVAL', 'CULTURAL', 'ECO'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ ...styles.filterBtn, ...(filter === f ? styles.filterActive : {}) }}>
            {catStyle[f]?.icon || '🌐'} {f || 'All'}
          </button>
        ))}
      </div>
      {filtered.length === 0 && !error && <p style={styles.empty}>No events found.</p>}
      <div style={styles.grid}>
        {filtered.map(e => {
          const cs = catStyle[e.category] || { bg: '#e2e8f0', color: '#4a5568', icon: '📅' };
          return (
            <div key={e.id} style={styles.card}>
              <div style={{ ...styles.cardHeader, background: `linear-gradient(135deg, ${cs.color}22, ${cs.bg})` }}>
                <span style={styles.cardIcon}>{cs.icon}</span>
                <span style={{ ...styles.badge, background: cs.bg, color: cs.color }}>{e.category}</span>
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{e.name}</h3>
                <p style={styles.meta}>📍 {e.location}, {e.district}</p>
                <p style={styles.dates}>📅 {e.startDate} → {e.endDate}</p>
                <p style={styles.desc}>{e.description?.substring(0, 100)}...</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a365d', marginBottom: '20px' },
  error: { background: '#fff5f5', color: '#c53030', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fed7d7' },
  empty: { color: '#718096', textAlign: 'center', padding: '40px' },
  filters: { display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' },
  filterBtn: { padding: '7px 18px', border: '2px solid #e2e8f0', borderRadius: '20px', cursor: 'pointer', background: '#fff', fontFamily: 'Poppins,sans-serif', fontWeight: '500', color: '#4a5568' },
  filterActive: { border: '2px solid #ff6b35', background: '#fff5f0', color: '#ff6b35' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
  cardHeader: { padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardIcon: { fontSize: '2rem' },
  badge: { padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' },
  cardBody: { padding: '16px' },
  cardTitle: { fontSize: '1.05rem', fontWeight: '700', color: '#1a365d', marginBottom: '6px' },
  meta: { fontSize: '0.83rem', color: '#718096', marginBottom: '4px' },
  dates: { fontSize: '0.83rem', color: '#ff6b35', fontWeight: '600', marginBottom: '8px' },
  desc: { fontSize: '0.82rem', color: '#4a5568', lineHeight: '1.5' },
};
