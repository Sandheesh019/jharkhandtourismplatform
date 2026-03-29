USE jharkhand_tourism;

-- Clear existing users so DataSeeder re-creates with correct BCrypt hashes
DELETE FROM bookings;
DELETE FROM reviews;
DELETE FROM users;

-- After running this, restart the Spring Boot app.
-- DataSeeder will auto-create all users with password: password123
