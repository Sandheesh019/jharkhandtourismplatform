import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TouristPlaces from './pages/TouristPlaces';
import Hotels from './pages/Hotels';
import Events from './pages/Events';
import Transport from './pages/Transport';
import Emergency from './pages/Emergency';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';
import AdminPlaces from './pages/AdminPlaces';
import AdminHotels from './pages/AdminHotels';
import AdminEvents from './pages/AdminEvents';
import AdminTransport from './pages/AdminTransport';
import AdminEmergency from './pages/AdminEmergency';
import AdminBookings from './pages/AdminBookings';
import './App.css';

function Layout() {
  const location = useLocation();
  const hideNav = location.pathname === '/' || location.pathname.startsWith('/admin');
  return (
    <>
      {!hideNav && <Navbar />}
      <div style={{ minHeight: '100vh', background: hideNav ? 'none' : '#f5f5f5' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/places" element={<TouristPlaces />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/events" element={<Events />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/places" element={<AdminPlaces />} />
          <Route path="/admin/hotels" element={<AdminHotels />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/transport" element={<AdminTransport />} />
          <Route path="/admin/emergency" element={<AdminEmergency />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
