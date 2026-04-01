import { useEffect, useState } from 'react';
import api from '../services/api';

const typeConfig = {
  BUS:   { gradient: 'linear-gradient(135deg, #11998e, #38ef7d)', icon: '🚌', shadow: 'rgba(17,153,142,0.35)' },
  TRAIN: { gradient: 'linear-gradient(135deg, #2193b0, #6dd5ed)', icon: '🚂', shadow: 'rgba(33,147,176,0.35)' },
  CAB:   { gradient: 'linear-gradient(135deg, #f7971e, #ffd200)', icon: '🚕', shadow: 'rgba(247,151,30,0.35)' },
  AUTO:  { gradient: 'linear-gradient(135deg, #8e2de2, #4a00e0)', icon: '🛺', shadow: 'rgba(142,45,226,0.35)' },
};

export default function Transport() {
  const [transports, setTransports] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  const loadAll = () => {
    setLoading(true);
    api.get('/transport')
      .then(r => { setTransports(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadAll(); }, []);

  const search = async () => {
    if (!from.trim() || !to.trim()) return;
    setLoading(true);
    const r = await api.get(`/transport/search?source=${from}&destination=${to}`);
    setTransports(r.data);
    setSearched(true);
    setLoading(false);
  };

  const reset = () => {
    setFrom(''); setTo(''); setSearched(false); loadAll();
  };

  // group by type for summary badges
  const types = [...new Set(transports.map(t => t.type))];

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerOverlay} />
        <div style={styles.headerContent}>
          <div style={styles.headerBadge}>🗺️ Travel Smart</div>
          <h1 style={styles.headerTitle}>Transport in Jharkhand</h1>
          <p style={styles.headerSub}>Find buses, trains, cabs and autos across all districts</p>

          {/* Search */}
          <div style={styles.searchBox}>
            <div style={styles.searchField}>
              <span style={styles.searchIcon}>📍</span>
              <input
                style={styles.searchInput} placeholder="From (e.g. Ranchi)"
                value={from} onChange={e => setFrom(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && search()}
              />
            </div>
            <div style={styles.searchArrow}>→</div>
            <div style={styles.searchField}>
              <span style={styles.searchIcon}>🏁</span>
              <input
                style={styles.searchInput} placeholder="To (e.g. Deoghar)"
                value={to} onChange={e => setTo(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && search()}
              />
            </div>
            <button style={styles.searchBtn} onClick={search}>🔍 Search</button>
            {searched && (
              <button style={styles.resetBtn} onClick={reset}>✕ Reset</button>
            )}
          </div>
        </div>
      </div>

      {/* Type filter badges */}
      <div style={styles.typeBadges}>
        {Object.entries(typeConfig).map(([type, cfg]) => (
          <div key={type} style={{ ...styles.typeBadge, background: cfg.gradient, boxShadow: `0 4px 12px ${cfg.shadow}` }}>
            <span style={styles.typeBadgeIcon}>{cfg.icon}</span>
            <span style={styles.typeBadgeLabel}>{type}</span>
            <span style={styles.typeBadgeCount}>
              {transports.filter(t => t.type === type).length}
            </span>
          </div>
        ))}
      </div>

      {/* Results */}
      <div style={styles.container}>
        {searched && (
          <div style={styles.resultInfo}>
            {transports.length > 0
              ? `✅ Found ${transports.length} option${transports.length > 1 ? 's' : ''} from ${from} to ${to}`
              : `❌ No transport found from ${from} to ${to}`}
          </div>
        )}

        {loading && <p style={styles.loading}>Loading transport options...</p>}

        {!loading && transports.length === 0 && (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>🚫</div>
            <p>No transport options found. Try a different route.</p>
          </div>
        )}

        <div style={styles.grid}>
          {transports.map(t => {
            const cfg = typeConfig[t.type] || typeConfig.BUS;
            return (
              <div key={t.id} style={styles.card}>
                {/* Top gradient strip */}
                <div style={{ ...styles.cardTop, background: cfg.gradient, boxShadow: `0 4px 16px ${cfg.shadow}` }}>
                  <span style={styles.cardIcon}>{cfg.icon}</span>
                  <div style={styles.cardTopInfo}>
                    <div style={styles.cardType}>{t.type}</div>
                    <div style={styles.cardOperator}>{t.operatorName}</div>
                  </div>
                  <div style={styles.fareTag}>₹{t.fare}</div>
                </div>

                {/* Route */}
                <div style={styles.route}>
                  <div style={styles.routeCity}>
                    <div style={styles.routeDot} />
                    <span style={styles.routeName}>{t.source}</span>
                  </div>
                  <div style={styles.routeLine}>- - - - -</div>
                  <div style={styles.routeCity}>
                    <div style={{ ...styles.routeDot, background: '#e53e3e' }} />
                    <span style={styles.routeName}>{t.destination}</span>
                  </div>
                </div>

                {/* Details */}
                <div style={styles.details}>
                  <div style={styles.detailRow}>
                    <span style={styles.detailIcon}>🕐</span>
                    <span style={styles.detailText}>{t.schedule}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailIcon}>📞</span>
                    <span style={styles.detailText}>{t.contactNumber}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { fontFamily: 'Poppins, sans-serif', background: '#f0f4f8', minHeight: '100vh' },

  header: {
    position: 'relative',
    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    padding: '48px 32px 80px', color: '#fff', overflow: 'hidden',
  },
  headerOverlay: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 80% 50%, rgba(17,153,142,0.2) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  headerContent: { maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 },
  headerBadge: {
    display: 'inline-block', background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.25)', padding: '5px 16px',
    borderRadius: '20px', fontSize: '0.82rem', fontWeight: '600', marginBottom: '12px',
  },
  headerTitle: { fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px', lineHeight: 1.2 },
  headerSub: { color: 'rgba(255,255,255,0.75)', marginBottom: '28px', fontSize: '0.95rem' },

  searchBox: {
    display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px', padding: '12px 16px',
  },
  searchField: {
    flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 12px',
  },
  searchIcon: { fontSize: '1rem', flexShrink: 0 },
  searchInput: {
    background: 'transparent', border: 'none', outline: 'none',
    color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem',
    width: '100%', '::placeholder': { color: 'rgba(255,255,255,0.6)' },
  },
  searchArrow: { color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', fontWeight: '700' },
  searchBtn: {
    background: 'linear-gradient(135deg, #11998e, #38ef7d)',
    color: '#fff', border: 'none', padding: '10px 20px',
    borderRadius: '8px', cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif', fontWeight: '700', fontSize: '0.88rem',
    boxShadow: '0 4px 12px rgba(17,153,142,0.4)', whiteSpace: 'nowrap',
  },
  resetBtn: {
    background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
    padding: '10px 16px', borderRadius: '8px', cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '0.85rem',
  },

  typeBadges: {
    display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap',
    padding: '0 32px', marginTop: '-28px', position: 'relative', zIndex: 2,
    marginBottom: '8px',
  },
  typeBadge: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '10px 20px', borderRadius: '30px', color: '#fff',
    fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '0.88rem',
  },
  typeBadgeIcon: { fontSize: '1.1rem' },
  typeBadgeLabel: {},
  typeBadgeCount: {
    background: 'rgba(255,255,255,0.25)', borderRadius: '12px',
    padding: '1px 8px', fontSize: '0.78rem',
  },

  container: { padding: '24px 32px', maxWidth: '1200px', margin: '0 auto' },
  resultInfo: {
    background: '#fff', borderRadius: '10px', padding: '12px 18px',
    marginBottom: '20px', fontWeight: '600', color: '#2d3748',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontSize: '0.9rem',
  },
  loading: { textAlign: 'center', color: '#718096', padding: '40px' },
  empty: { textAlign: 'center', padding: '60px 20px', color: '#718096' },
  emptyIcon: { fontSize: '3rem', marginBottom: '12px' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },

  card: {
    background: '#fff', borderRadius: '16px', overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardTop: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '16px 20px',
  },
  cardIcon: { fontSize: '2rem', flexShrink: 0 },
  cardTopInfo: { flex: 1 },
  cardType: { color: '#fff', fontWeight: '800', fontSize: '0.78rem', letterSpacing: '1px', opacity: 0.85 },
  cardOperator: { color: '#fff', fontWeight: '700', fontSize: '1rem', lineHeight: 1.3 },
  fareTag: {
    background: 'rgba(255,255,255,0.25)', color: '#fff',
    padding: '4px 12px', borderRadius: '20px',
    fontWeight: '800', fontSize: '1rem',
  },

  route: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '16px 20px', borderBottom: '1px solid #f0f4f8',
  },
  routeCity: { display: 'flex', alignItems: 'center', gap: '6px', flex: 1 },
  routeDot: { width: '10px', height: '10px', borderRadius: '50%', background: '#11998e', flexShrink: 0 },
  routeName: { fontWeight: '700', color: '#1a365d', fontSize: '0.92rem' },
  routeLine: { color: '#cbd5e0', fontSize: '0.75rem', letterSpacing: '2px', flex: 1, textAlign: 'center' },

  details: { padding: '12px 20px 16px', display: 'flex', flexDirection: 'column', gap: '6px' },
  detailRow: { display: 'flex', alignItems: 'flex-start', gap: '8px' },
  detailIcon: { fontSize: '0.9rem', flexShrink: 0, marginTop: '1px' },
  detailText: { fontSize: '0.82rem', color: '#4a5568', lineHeight: '1.5' },
};
