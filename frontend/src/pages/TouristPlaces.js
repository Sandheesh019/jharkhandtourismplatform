import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';

const categoryConfig = {
  ECO:      { bg: '#c6f6d5', color: '#276749', gradient: 'linear-gradient(135deg, #1a6b4a, #38ef7d)', emoji: '🌿' },
  CULTURAL: { bg: '#feebc8', color: '#7b341e', gradient: 'linear-gradient(135deg, #7b341e, #f6ad55)', emoji: '🎭' },
  HERITAGE: { bg: '#e9d8fd', color: '#553c9a', gradient: 'linear-gradient(135deg, #44337a, #b794f4)', emoji: '🛕' },
};

export default function TouristPlaces() {
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    api.get('/places')
      .then(r => setPlaces(r.data))
      .catch(() => setError('Failed to load places. Make sure backend is running on port 8085.'));
  }, []);

  const openPlace = async (place) => {
    setSelected(place);
    const r = await api.get(`/reviews/place/${place.id}`);
    setReviews(r.data);
  };

  const openMaps = (place, e) => {
    e.stopPropagation();
    const query = place.latitude && place.longitude
      ? `${place.latitude},${place.longitude}`
      : `${place.name} ${place.district} Jharkhand`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  const submitReview = async () => {
    await api.post('/reviews', { ...review, place: { id: selected.id }, user: { id: user.userId || 1 } });
    const r = await api.get(`/reviews/place/${selected.id}`);
    setReviews(r.data);
    setReview({ rating: 5, comment: '' });
  };

  const filtered = filter ? places.filter(p => p.category === filter) : places;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏞️ Tourist Places</h2>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.filters}>
        {['', 'ECO', 'CULTURAL', 'HERITAGE'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ ...styles.filterBtn, ...(filter === f ? styles.filterActive : {}) }}>
            {f === '' ? 'All' : f === 'ECO' ? '🌿 ECO' : f === 'CULTURAL' ? '🎭 CULTURAL' : '🛕 HERITAGE'}
          </button>
        ))}
      </div>

      {filtered.length === 0 && !error && <p style={styles.empty}>No places found.</p>}

      <div style={styles.grid}>
        {filtered.map(p => {
          const cfg = categoryConfig[p.category] || { bg: '#e2e8f0', color: '#4a5568', gradient: 'linear-gradient(135deg,#e2e8f0,#cbd5e0)', emoji: '🏔️' };
          return (
            <div key={p.id} style={styles.card} onClick={() => openPlace(p)}>
              <div style={styles.cardImg}>
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    style={styles.img}
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.parentNode.querySelector('.placeholder').style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="placeholder"
                  style={{
                    ...styles.imgPlaceholder,
                    background: cfg.gradient,
                    display: p.imageUrl ? 'none' : 'flex',
                  }}
                >
                  <span style={{ fontSize: '2.8rem' }}>{cfg.emoji}</span>
                  <span style={styles.placeholderName}>{p.name}</span>
                </div>
              </div>
              <div style={styles.cardBody}>
                <span style={{ ...styles.badge, background: cfg.bg, color: cfg.color }}>{p.category}</span>
                <h3 style={styles.cardTitle}>{p.name}</h3>
                <p style={styles.cardDistrict}>📍 {p.district}</p>
                <p style={styles.cardDesc}>{p.description?.substring(0, 80)}...</p>
                <div style={styles.cardActions}>
                  <button style={styles.viewBtn}>View Details →</button>
                  <button style={styles.mapsBtn} onClick={e => openMaps(p, e)}>📍 Maps</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (() => {
        const cfg = categoryConfig[selected.category] || { bg: '#e2e8f0', color: '#4a5568', gradient: 'linear-gradient(135deg,#e2e8f0,#cbd5e0)', emoji: '🏔️' };
        return (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <button onClick={() => setSelected(null)} style={styles.close}>✕</button>

              {/* Modal image */}
              <div style={styles.modalImg}>
                {selected.imageUrl ? (
                  <img
                    src={selected.imageUrl}
                    alt={selected.name}
                    style={styles.modalImgEl}
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.parentNode.querySelector('.modal-placeholder').style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="modal-placeholder"
                  style={{
                    ...styles.modalImgPlaceholder,
                    background: cfg.gradient,
                    display: selected.imageUrl ? 'none' : 'flex',
                  }}
                >
                  <span style={{ fontSize: '3.5rem' }}>{cfg.emoji}</span>
                </div>
              </div>

              <h2 style={styles.modalTitle}>{selected.name}</h2>
              <span style={{ ...styles.badge, background: cfg.bg, color: cfg.color }}>{selected.category}</span>
              <p style={styles.modalMeta}>📍 {selected.location}, {selected.district}</p>
              <button style={styles.modalMapsBtn} onClick={e => openMaps(selected, e)}>
                📍 View on Google Maps
              </button>
              <p style={styles.modalDesc}>{selected.description}</p>
              <hr style={styles.hr} />
              <h3 style={styles.reviewTitle}>Reviews ({reviews.length})</h3>
              {reviews.length === 0 && <p style={styles.empty}>No reviews yet. Be the first!</p>}
              {reviews.map(r => (
                <div key={r.id} style={styles.reviewCard}>
                  <div style={styles.reviewHeader}>
                    <b>{r.user?.name || 'User'}</b>
                    <span style={styles.stars}>{'⭐'.repeat(r.rating)}</span>
                  </div>
                  <p style={styles.reviewComment}>{r.comment}</p>
                </div>
              ))}
              {user && (
                <div style={styles.addReview}>
                  <h4 style={{ marginBottom: '8px' }}>Add Your Review</h4>
                  <select value={review.rating} onChange={e => setReview({ ...review, rating: +e.target.value })} style={styles.select}>
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{'⭐'.repeat(n)} ({n})</option>)}
                  </select>
                  <textarea style={styles.textarea} placeholder="Share your experience..."
                    value={review.comment} onChange={e => setReview({ ...review, comment: e.target.value })} />
                  <button style={styles.submitBtn} onClick={submitReview}>Submit Review</button>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

const styles = {
  container: { padding: '32px 24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Poppins, sans-serif' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a365d', marginBottom: '20px' },
  error: { background: '#fff5f5', color: '#c53030', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fed7d7' },
  empty: { color: '#718096', textAlign: 'center', padding: '40px' },
  filters: { display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' },
  filterBtn: { padding: '7px 18px', border: '2px solid #e2e8f0', borderRadius: '20px', cursor: 'pointer', background: '#fff', fontFamily: 'Poppins,sans-serif', fontWeight: '500', color: '#4a5568' },
  filterActive: { border: '2px solid #ff6b35', background: '#fff5f0', color: '#ff6b35' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '20px' },

  card: { background: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', cursor: 'pointer' },
  cardImg: { height: '180px', overflow: 'hidden', position: 'relative' },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  imgPlaceholder: { height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  placeholderName: { color: '#fff', fontWeight: '700', fontSize: '0.82rem', textAlign: 'center', padding: '0 12px', textShadow: '0 1px 4px rgba(0,0,0,0.3)' },

  cardBody: { padding: '16px' },
  badge: { padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block', marginBottom: '8px' },
  cardTitle: { fontSize: '1rem', fontWeight: '700', color: '#1a365d', marginBottom: '4px' },
  cardDistrict: { fontSize: '0.85rem', color: '#718096', marginBottom: '6px' },
  cardDesc: { fontSize: '0.82rem', color: '#4a5568', lineHeight: '1.5', marginBottom: '12px' },
  cardActions: { display: 'flex', gap: '8px', alignItems: 'center' },
  viewBtn: { background: 'none', border: 'none', color: '#ff6b35', fontWeight: '600', cursor: 'pointer', padding: 0, fontFamily: 'Poppins,sans-serif', fontSize: '0.85rem' },
  mapsBtn: { background: 'linear-gradient(135deg,#2193b0,#6dd5ed)', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600', fontSize: '0.78rem' },

  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' },
  modal: { background: '#fff', borderRadius: '16px', maxWidth: '620px', width: '90%', maxHeight: '88vh', overflowY: 'auto', position: 'relative' },
  close: { position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.15)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', zIndex: 10, color: '#fff' },

  modalImg: { height: '220px', overflow: 'hidden', borderRadius: '16px 16px 0 0', position: 'relative' },
  modalImgEl: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  modalImgPlaceholder: { height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },

  modalTitle: { fontSize: '1.5rem', fontWeight: '700', color: '#1a365d', margin: '16px 24px 6px' },
  modalMeta: { color: '#718096', margin: '6px 24px' },
  modalMapsBtn: { display: 'inline-block', background: 'linear-gradient(135deg,#2193b0,#6dd5ed)', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600', fontSize: '0.85rem', margin: '8px 24px 4px' },
  modalDesc: { color: '#4a5568', lineHeight: '1.7', margin: '8px 24px 16px' },
  hr: { border: 'none', borderTop: '1px solid #e2e8f0', margin: '0 24px 16px' },
  reviewTitle: { fontWeight: '700', color: '#1a365d', marginBottom: '12px', padding: '0 24px' },
  reviewCard: { background: '#f7fafc', borderRadius: '8px', padding: '12px', marginBottom: '8px', margin: '0 24px 8px' },
  reviewHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' },
  stars: { fontSize: '0.85rem' },
  reviewComment: { color: '#4a5568', fontSize: '0.9rem' },
  addReview: { margin: '16px 24px 24px', background: '#f7fafc', padding: '16px', borderRadius: '8px' },
  select: { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '8px', fontFamily: 'Poppins,sans-serif' },
  textarea: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', minHeight: '80px', fontFamily: 'Poppins,sans-serif', boxSizing: 'border-box' },
  submitBtn: { marginTop: '8px', background: 'linear-gradient(135deg,#ff6b35,#e55a2b)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600' },

  badge: { padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block', marginBottom: '8px', marginLeft: '24px' },
};
