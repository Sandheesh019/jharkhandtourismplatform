import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [booking, setBooking] = useState(null);
  const [form, setForm] = useState({ checkIn: '', checkOut: '', guests: 1 });
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const { user } = useAuth();

  const loadHotels = () => {
    api.get('/hotels')
      .then(r => setHotels(r.data))
      .catch(() => setError('Failed to load hotels. Make sure backend is running on port 8085.'));
  };

  useEffect(() => { loadHotels(); }, []);

  const book = async () => {
    if (!user || !user.userId) {
      setError('Please login to make a booking.');
      setBooking(null);
      return;
    }
    if (!form.checkIn || !form.checkOut) {
      setError('Please select check-in and check-out dates.');
      return;
    }
    const hotelRef = booking;
    const guestCount = form.guests;
    try {
      await api.post('/bookings', {
        userId: user.userId,
        type: 'HOTEL',
        referenceId: hotelRef.id,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: guestCount,
        totalAmount: hotelRef.pricePerNight * guestCount
      });
      await api.put(`/hotels/${hotelRef.id}/decrement-rooms?count=${guestCount}`);
      setBooking(null);
      setForm({ checkIn: '', checkOut: '', guests: 1 });
      setMsg(`✅ Booking confirmed for ${hotelRef.name}! ${guestCount} room(s) reserved.`);
      loadHotels(); // re-fetch to get real updated room count from DB
      setTimeout(() => setMsg(''), 5000);
    } catch (err) {
      const errMsg = err?.response?.data || err?.message || 'Unknown error';
      setError(`Booking failed: ${errMsg}`);
      setBooking(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏨 Hotels in Jharkhand</h2>
      {error && <div style={styles.error}>{error}</div>}
      {msg && <div style={styles.success}>{msg}</div>}
      {hotels.length === 0 && !error && <p style={styles.empty}>No hotels found.</p>}

      <div style={styles.grid}>
        {hotels.map(h => (
          <div key={h.id} style={styles.card}>
            <div style={styles.cardImg}>
              {h.imageUrl
                ? <img src={h.imageUrl} alt={h.name} style={styles.img} />
                : <div style={styles.imgPlaceholder}>🏨</div>}
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>{h.name}</h3>
              <p style={styles.meta}>📍 {h.address}, {h.district}</p>
              <p style={styles.meta}>📞 {h.phone}</p>
              <div style={styles.priceRow}>
                <span style={styles.price}>₹{h.pricePerNight}<span style={styles.perNight}>/night</span></span>
                <span style={{
                  ...styles.roomsBadge,
                  background: h.availableRooms < 1 ? '#fff5f5' : h.availableRooms <= 5 ? '#fffaf0' : '#f0fff4',
                  color: h.availableRooms < 1 ? '#c53030' : h.availableRooms <= 5 ? '#c05621' : '#276749'
                }}>
                  {h.availableRooms < 1 ? '❌ Full' : h.availableRooms <= 5 ? `⚠️ ${h.availableRooms} left` : `✅ ${h.availableRooms} rooms`}
                </span>
              </div>
              <p style={styles.roomCount}>{h.availableRooms} of {h.totalRooms} rooms available</p>
              {h.amenities && <p style={styles.amenities}>✨ {h.amenities}</p>}
              {user && user.role !== 'ADMIN' && (
                h.availableRooms < 1
                  ? <button style={styles.fullBtn} disabled>Fully Booked</button>
                  : <button style={styles.bookBtn} onClick={() => { setBooking(h); setForm({ checkIn: '', checkOut: '', guests: 1 }); }}>Book Now</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {booking && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Book — {booking.name}</h3>
            <p style={styles.modalSub}>📍 {booking.district} &nbsp;|&nbsp; ₹{booking.pricePerNight}/night &nbsp;|&nbsp; {booking.availableRooms} rooms left</p>
            <label style={styles.label}>Check-in Date</label>
            <input style={styles.input} type="date"
              value={form.checkIn} onChange={e => setForm({ ...form, checkIn: e.target.value })} />
            <label style={styles.label}>Check-out Date</label>
            <input style={styles.input} type="date"
              value={form.checkOut} onChange={e => setForm({ ...form, checkOut: e.target.value })} />
            <label style={styles.label}>Number of Guests</label>
            <input style={styles.input} type="number" min="1" max={booking.availableRooms}
              value={form.guests} onChange={e => setForm({ ...form, guests: +e.target.value })} />
            <div style={styles.summary}>
              <span>Room Booking: <b>{form.guests}</b></span>
              <span>Total: <b style={{ color: '#ff6b35' }}>₹{booking.pricePerNight * form.guests}</b></span>
            </div>
            <div style={styles.modalBtns}>
              <button style={styles.confirmBtn} onClick={book}>Confirm Booking</button>
              <button style={styles.cancelBtn} onClick={() => setBooking(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a365d', marginBottom: '24px' },
  error: { background: '#fff5f5', color: '#c53030', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fed7d7' },
  success: { background: '#f0fff4', color: '#276749', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #c6f6d5' },
  empty: { color: '#718096', textAlign: 'center', padding: '40px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
  cardImg: { height: '160px', background: '#e2e8f0' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  imgPlaceholder: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', background: 'linear-gradient(135deg,#ebf8ff,#bee3f8)' },
  cardBody: { padding: '16px' },
  cardTitle: { fontSize: '1.05rem', fontWeight: '700', color: '#1a365d', marginBottom: '6px' },
  meta: { fontSize: '0.83rem', color: '#718096', marginBottom: '3px' },
  priceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' },
  price: { fontSize: '1.3rem', fontWeight: '700', color: '#ff6b35' },
  perNight: { fontSize: '0.8rem', color: '#718096', fontWeight: '400' },
  roomsBadge: { fontSize: '0.82rem', fontWeight: '600', padding: '3px 10px', borderRadius: '6px' },
  roomCount: { fontSize: '0.75rem', color: '#718096', marginBottom: '8px' },
  amenities: { fontSize: '0.78rem', color: '#718096', marginBottom: '10px' },
  fullBtn: { width: '100%', padding: '10px', background: '#e2e8f0', color: '#a0aec0', border: 'none', borderRadius: '8px', fontFamily: 'Poppins,sans-serif', fontWeight: '600', cursor: 'not-allowed' },
  bookBtn: { width: '100%', padding: '10px', background: 'linear-gradient(135deg,#ff6b35,#e55a2b)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' },
  modal: { background: '#fff', padding: '32px', borderRadius: '16px', width: '90%', maxWidth: '420px' },
  modalTitle: { fontSize: '1.3rem', fontWeight: '700', color: '#1a365d', marginBottom: '4px' },
  modalSub: { color: '#718096', marginBottom: '20px', fontSize: '0.85rem' },
  label: { fontSize: '0.83rem', fontWeight: '600', color: '#4a5568', display: 'block', marginBottom: '2px' },
  input: { display: 'block', width: '100%', padding: '10px 14px', margin: '4px 0 14px', borderRadius: '8px', border: '2px solid #e2e8f0', fontFamily: 'Poppins,sans-serif', boxSizing: 'border-box' },
  summary: { display: 'flex', justifyContent: 'space-between', background: '#f7fafc', padding: '10px 14px', borderRadius: '8px', marginBottom: '12px', fontSize: '0.9rem', color: '#4a5568' },
  modalBtns: { display: 'flex', gap: '10px' },
  confirmBtn: { flex: 1, padding: '11px', background: 'linear-gradient(135deg,#ff6b35,#e55a2b)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontWeight: '600' },
  cancelBtn: { flex: 1, padding: '11px', background: '#f7fafc', color: '#4a5568', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif' },
};
