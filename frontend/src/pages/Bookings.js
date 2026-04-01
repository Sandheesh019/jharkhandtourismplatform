import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';

const statusConfig = {
  PENDING:   { color: '#d69e2e', bg: '#fffff0', border: '#f6e05e', label: '⏳ Pending' },
  CONFIRMED: { color: '#276749', bg: '#f0fff4', border: '#9ae6b4', label: '✅ Confirmed' },
  CANCELLED: { color: '#c53030', bg: '#fff5f5', border: '#feb2b2', label: '❌ Cancelled' },
};

const typeIcon = { HOTEL: '🏨', TRANSPORT: '🚌', EVENT: '🎉' };

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const userId = user.userId;
    if (!userId) { setError('Invalid user session. Please login again.'); setLoading(false); return; }
    api.get(`/bookings/user/${userId}`)
      .then(r => { setBookings(r.data); setLoading(false); })
      .catch(() => { setError('Failed to load bookings.'); setLoading(false); });
  }, [user]);

  const cancel = async (id) => {
    const booking = bookings.find(b => b.id === id);
    await api.put(`/bookings/${id}/status?status=CANCELLED`);
    if (booking?.type === 'HOTEL' && booking?.referenceId) {
      await api.put(`/hotels/${booking.referenceId}/increment-rooms?count=${booking.guests || 1}`);
    }
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b));
  };

  if (!user) return (
    <div style={styles.center}>
      <div style={styles.emptyBox}>
        <div style={styles.emptyIcon}>🔒</div>
        <h3>Please Login</h3>
        <p>You need to login to view your bookings.</p>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 My Bookings</h2>
      <p style={styles.subtitle}>Manage all your hotel, transport and event bookings</p>

      {error && <div style={styles.error}>{error}</div>}
      {loading && <p style={styles.loading}>Loading bookings...</p>}

      {!loading && bookings.length === 0 && !error && (
        <div style={styles.emptyBox}>
          <div style={styles.emptyIcon}>📭</div>
          <h3 style={{ color: '#1a365d' }}>No Bookings Yet</h3>
          <p style={{ color: '#718096' }}>Start exploring hotels, events and transport!</p>
        </div>
      )}

      <div style={styles.list}>
        {bookings.map(b => {
          const sc = statusConfig[b.status] || statusConfig.PENDING;
          return (
            <div key={b.id} style={{ ...styles.card, borderLeft: `4px solid ${sc.color}` }}>
              <div style={styles.cardTop}>
                <div style={styles.typeSection}>
                  <span style={styles.typeIcon}>{typeIcon[b.type] || '📋'}</span>
                  <div>
                    <h3 style={styles.cardTitle}>{b.type} Booking</h3>
                    <span style={styles.bookingId}>Booking #{b.id}</span>
                  </div>
                </div>
                <span style={{ ...styles.statusBadge, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                  {sc.label}
                </span>
              </div>

              <div style={styles.details}>
                {b.checkIn && (
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>📅 Check-in</span>
                    <span style={styles.detailValue}>{b.checkIn}</span>
                  </div>
                )}
                {b.checkOut && (
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>📅 Check-out</span>
                    <span style={styles.detailValue}>{b.checkOut}</span>
                  </div>
                )}
                {b.guests && (
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>👥 Guests</span>
                    <span style={styles.detailValue}>{b.guests}</span>
                  </div>
                )}
                {b.totalAmount > 0 && (
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>💰 Amount</span>
                    <span style={{ ...styles.detailValue, color: '#ff6b35', fontWeight: '700' }}>₹{b.totalAmount}</span>
                  </div>
                )}
                {b.bookedAt && (
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>🕐 Booked On</span>
                    <span style={styles.detailValue}>
                      {new Date(b.bookedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                )}
              </div>

              {b.status === 'CONFIRMED' && (
                <button style={styles.cancelBtn} onClick={() => cancel(b.id)}>Cancel Booking</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '32px 24px', maxWidth: '900px', margin: '0 auto' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a365d', marginBottom: '4px' },
  subtitle: { color: '#718096', marginBottom: '28px' },
  error: { background: '#fff5f5', color: '#c53030', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fed7d7' },
  loading: { color: '#718096', textAlign: 'center', padding: '40px' },
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' },
  emptyBox: { textAlign: 'center', padding: '60px 40px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  emptyIcon: { fontSize: '3rem', marginBottom: '16px' },
  list: { display: 'flex', flexDirection: 'column', gap: '16px' },
  card: { background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
  typeSection: { display: 'flex', alignItems: 'center', gap: '12px' },
  typeIcon: { fontSize: '2rem' },
  cardTitle: { fontSize: '1.05rem', fontWeight: '700', color: '#1a365d', marginBottom: '2px' },
  bookingId: { fontSize: '0.8rem', color: '#718096' },
  statusBadge: { padding: '5px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '600' },
  details: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', background: '#f7fafc', padding: '16px', borderRadius: '8px', marginBottom: '16px' },
  detailItem: { display: 'flex', flexDirection: 'column', gap: '2px' },
  detailLabel: { fontSize: '0.75rem', color: '#718096', fontWeight: '500' },
  detailValue: { fontSize: '0.9rem', color: '#2d3748', fontWeight: '600' },
  cancelBtn: { background: '#fff5f5', color: '#c53030', border: '1px solid #feb2b2', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600', fontSize: '0.88rem' },
};
