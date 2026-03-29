-- -- ============================================================
-- --  Smart Tourism Enablement Platform - Jharkhand
-- --  MySQL Database Script
-- --  Run this in MySQL Workbench or mysql CLI
-- -- ============================================================

-- CREATE DATABASE IF NOT EXISTS jharkhand_tourism;
-- USE jharkhand_tourism;

-- -- ============================================================
-- -- TABLE: users
-- -- ============================================================
-- CREATE TABLE IF NOT EXISTS users (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(150) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     phone VARCHAR(15),
--     role ENUM('USER', 'ADMIN') DEFAULT 'USER'
-- );

-- -- ============================================================
-- -- TABLE: tourist_places
-- -- ============================================================
-- CREATE TABLE IF NOT EXISTS tourist_places (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(150) NOT NULL,
--     description TEXT,
--     location VARCHAR(200),
--     district VARCHAR(100),
--     image_url VARCHAR(500),
--     category VARCHAR(50),   -- ECO, CULTURAL, HERITAGE
--     latitude DOUBLE,
--     longitude DOUBLE
-- );

-- -- ============================================================
-- -- TABLE: reviews
-- -- ============================================================
-- CREATE TABLE IF NOT EXISTS reviews (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     user_id BIGINT NOT NULL,
--     place_id BIGINT NOT NULL,
--     rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
--     comment TEXT,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (place_id) REFERENCES tourist_places(id) ON DELETE CASCADE
-- );

-- -- ============================================================
-- -- TABLE: hotels
-- -- ============================================================
-- CREATE TABLE IF NOT EXISTS hotels (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(150) NOT NULL,
--     address VARCHAR(300),
--     district VARCHAR(100),
--     phone VARCHAR(15),
--     price_per_night DOUBLE,
--     total_rooms INT,
--     available_rooms INT,
--     image_url VARCHAR(500),
--     amenities TEXT
-- );

-- -- ============================================================
-- -- TABLE: events
-- -- ============================================================
-- CREATE TABLE IF NOT EXISTS events (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(150) NOT NULL,
--     description TEXT,
--     location VARCHAR(200),
--     district VARCHAR(100),
--     start_date DATE,
--     end_date DATE,
--     image_url VARCHAR(500),
--     category VARCHAR(50)    -- FESTIVAL, CULTURAL, ECO
-- );

-- -- ============================================================
-- -- TABLE: transports
-- -- ============================================================
-- CREATE TABLE IF NOT EXISTS transports (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     type VARCHAR(50),        -- BUS, TRAIN, CAB, AUTO
--     `from` VARCHAR(100),
--     `to` VARCHAR(100),
--     operator_name VARCHAR(150),
--     contact_number VARCHAR(15),
--     fare DOUBLE,
--     schedule VARCHAR(200)
-- );

-- -- ============================================================
-- -- TABLE: emergency_contacts
-- -- ============================================================
-- CREATE TABLE IF NOT EXISTS emergency_contacts (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(150),
--     phone VARCHAR(15),
--     type VARCHAR(50),        -- POLICE, HOSPITAL, FIRE, TOURIST_HELPLINE
--     district VARCHAR(100),
--     address VARCHAR(300)
-- );

-- -- ============================================================
-- -- TABLE: bookings
-- -- ============================================================
-- CREATE TABLE IF NOT EXISTS bookings (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     user_id BIGINT NOT NULL,
--     type ENUM('HOTEL', 'TRANSPORT', 'EVENT') NOT NULL,
--     reference_id BIGINT,
--     check_in DATE,
--     check_out DATE,
--     guests INT DEFAULT 1,
--     total_amount DOUBLE,
--     status ENUM('PENDING', 'CONFIRMED', 'CANCELLED') DEFAULT 'PENDING',
--     booked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );


-- -- ============================================================
-- -- SAMPLE DATA
-- -- ============================================================

-- -- Users (passwords are BCrypt of "password123")
-- -- Admin secret key for registration: jharkhand@admin2024
-- INSERT INTO users (name, email, password, phone, role) VALUES
-- ('Admin User',  'admin@tourism.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543210', 'ADMIN'),
-- ('Rahul Kumar', 'rahul@gmail.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9123456780', 'USER'),
-- ('Priya Singh', 'priya@gmail.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9234567891', 'USER'),
-- ('Amit Sharma', 'amit@gmail.com',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9345678902', 'USER'),
-- ('Vishnu Admin','vishnu@admin.com',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9000000001', 'ADMIN');

-- -- Tourist Places
-- INSERT INTO tourist_places (name, description, location, district, category, latitude, longitude) VALUES
-- ('Betla National Park',     'One of the first national parks in India with tigers, elephants and diverse wildlife.',         'Betla, Latehar',       'Latehar',   'ECO',      23.6500, 84.1200),
-- ('Hundru Falls',            'Stunning 98m waterfall on the Subarnarekha river, a popular picnic spot.',                     'Ranchi-Purulia Road',  'Ranchi',    'ECO',      23.3500, 85.6500),
-- ('Dassam Falls',            'Beautiful 44m waterfall surrounded by dense forests near Ranchi.',                             'Taimara, Ranchi',      'Ranchi',    'ECO',      23.2800, 85.7200),
-- ('Pahari Mandir',           'Famous Shiva temple atop a hill in Ranchi offering panoramic city views.',                     'Ranchi City',          'Ranchi',    'CULTURAL', 23.3441, 85.3096),
-- ('Jagannath Temple',        '17th century temple built by Thakur Ani Nath Shahdeo, resembling Puri Jagannath.',             'Jagannath Nagar',      'Ranchi',    'HERITAGE', 23.3200, 85.2900),
-- ('Deoghar Baidyanath Dham', 'One of the 12 Jyotirlingas, a major Hindu pilgrimage site attracting millions.',               'Deoghar',              'Deoghar',   'HERITAGE', 24.4850, 86.6940),
-- ('Rajrappa Temple',         'Ancient Chhinnamasta temple at the confluence of Damodar and Bhairavi rivers.',                'Ramgarh',              'Ramgarh',   'HERITAGE', 23.6400, 85.8200),
-- ('Netarhat',                'Queen of Chotanagpur - a scenic hill station at 3700 ft with sunrise/sunset views.',           'Netarhat',             'Latehar',   'ECO',      23.4800, 84.2700),
-- ('Panchghagh Falls',        'Five streams merging into one waterfall, ideal for nature lovers.',                            'Khunti',               'Khunti',    'ECO',      23.0700, 85.2800),
-- ('Hazaribagh Wildlife Sanctuary', 'Rich biodiversity sanctuary with tigers, leopards and migratory birds.',                 'Hazaribagh',           'Hazaribagh','ECO',      23.9900, 85.3600),
-- ('Topchanchi Lake',         'Serene lake surrounded by forests, perfect for boating and bird watching.',                    'Dhanbad',              'Dhanbad',   'ECO',      23.7800, 86.3200),
-- ('Macluskieganj',           'Heritage town known as the Chota England, with colonial-era bungalows.',                       'Ramgarh',              'Ramgarh',   'HERITAGE', 23.5200, 85.3500);

-- -- Reviews
-- INSERT INTO reviews (user_id, place_id, rating, comment) VALUES
-- (2, 1, 5, 'Amazing wildlife experience! Saw elephants up close. Must visit.'),
-- (3, 1, 4, 'Great park but roads need improvement. Overall wonderful.'),
-- (2, 2, 5, 'Hundru Falls is breathtaking! Best waterfall I have seen.'),
-- (4, 3, 4, 'Dassam Falls is beautiful, especially during monsoon season.'),
-- (3, 6, 5, 'Baidyanath Dham is spiritually uplifting. A must-visit pilgrimage.'),
-- (2, 8, 5, 'Netarhat sunrise is absolutely magical. Peaceful and serene.'),
-- (4, 4, 4, 'Pahari Mandir view of Ranchi city is stunning at night.');

-- -- Hotels
-- INSERT INTO hotels (name, address, district, phone, price_per_night, total_rooms, available_rooms, amenities) VALUES
-- ('Hotel Capitol Hill',      'Main Road, Ranchi',            'Ranchi',    '0651-2330011', 2500.00, 60,  45, 'WiFi, AC, Restaurant, Parking, Room Service'),
-- ('BNR Hotel Ranchi',        'Station Road, Ranchi',         'Ranchi',    '0651-2460011', 3200.00, 80,  30, 'WiFi, AC, Restaurant, Bar, Gym, Pool'),
-- ('Hotel Yuvraj',            'Main Road, Ranchi',            'Ranchi',    '0651-2331122', 1800.00, 40,  20, 'WiFi, AC, Restaurant, Parking'),
-- ('Hotel Chanakya BNR',      'Station Road, Dhanbad',        'Dhanbad',   '0326-2300011', 2200.00, 55,  35, 'WiFi, AC, Restaurant, Parking'),
-- ('Hotel Natraj',            'Bank More, Dhanbad',           'Dhanbad',   '0326-2310022', 1500.00, 30,  18, 'WiFi, AC, Parking'),
-- ('Hotel Deoghar Inn',       'Tower Chowk, Deoghar',         'Deoghar',   '06432-222011', 1200.00, 35,  25, 'WiFi, AC, Restaurant'),
-- ('Netarhat Forest Retreat', 'Near Viewpoint, Netarhat',     'Latehar',   '9431100001',   3500.00, 20,  12, 'WiFi, Restaurant, Bonfire, Nature Walks'),
-- ('Hotel Hazaribagh Lake',   'Near Lake, Hazaribagh',        'Hazaribagh','06546-222033', 1800.00, 45,  30, 'WiFi, AC, Restaurant, Lake View'),
-- ('Hotel Bokaro Steel',      'City Centre, Bokaro',          'Bokaro',    '06542-233011', 2000.00, 50,  28, 'WiFi, AC, Restaurant, Gym'),
-- ('Betla Eco Resort',        'Near Betla Gate, Latehar',     'Latehar',   '9431200002',   2800.00, 25,  15, 'WiFi, Restaurant, Safari Booking, Nature Trails');

-- -- Events
-- INSERT INTO events (name, description, location, district, start_date, end_date, category) VALUES
-- ('Sarhul Festival',         'Spring festival celebrating nature worship with Sal flowers, tribal dance and music.',         'Ranchi',               'Ranchi',    '2025-03-28', '2025-03-30', 'FESTIVAL'),
-- ('Karma Festival',          'Tribal festival worshipping the Karma tree for prosperity and good harvest.',                  'Across Jharkhand',     'Ranchi',    '2025-09-05', '2025-09-06', 'FESTIVAL'),
-- ('Tusu Parab',              'Winter harvest festival celebrated by Kurmi and Mahato communities with songs.',               'Purulia Border',       'Bokaro',    '2025-01-14', '2025-01-15', 'FESTIVAL'),
-- ('Jharkhand Mahotsav',      'State cultural festival showcasing tribal art, dance, music and handicrafts.',                 'Ranchi',               'Ranchi',    '2025-11-15', '2025-11-20', 'CULTURAL'),
-- ('Shravan Mela Deoghar',    'Massive annual pilgrimage fair at Baidyanath Dham during the holy month of Shravan.',          'Deoghar',              'Deoghar',   '2025-07-10', '2025-08-08', 'FESTIVAL'),
-- ('Betla Eco Tourism Fair',  'Eco-tourism fair promoting wildlife conservation and forest culture of Jharkhand.',             'Betla National Park',  'Latehar',   '2025-02-10', '2025-02-12', 'ECO'),
-- ('Tribal Dance Festival',   'Celebration of Jharkhand tribal dances - Chhau, Jhumair, Paika and Natua.',                   'Jamshedpur',           'East Singhbhum', '2025-04-05', '2025-04-07', 'CULTURAL'),
-- ('Ranchi Flower Show',      'Annual flower show at Ranchi Horticultural Garden with rare Jharkhand flora.',                 'Ranchi',               'Ranchi',    '2025-02-20', '2025-02-25', 'ECO'),
-- ('Manda Festival',          'Fire-walking festival observed by Kurmi community as a mark of devotion.',                    'Hazaribagh',           'Hazaribagh','2025-04-13', '2025-04-14', 'FESTIVAL'),
-- ('Jawa Festival',           'Tribal festival where young girls worship nature and pray for good husbands.',                 'Across Jharkhand',     'Ranchi',    '2025-08-15', '2025-08-16', 'CULTURAL');

-- -- Transport
-- INSERT INTO transports (type, source, destination, operator_name, contact_number, fare, schedule) VALUES
-- ('BUS',   'Ranchi',      'Deoghar',      'JSRTC',                 '0651-2460100', 280.00,  'Daily 6:00 AM, 10:00 AM, 2:00 PM'),
-- ('BUS',   'Ranchi',      'Jamshedpur',   'JSRTC',                 '0651-2460100', 220.00,  'Daily 7:00 AM, 11:00 AM, 3:00 PM, 7:00 PM'),
-- ('BUS',   'Ranchi',      'Dhanbad',      'JSRTC',                 '0651-2460100', 200.00,  'Daily 6:30 AM, 12:00 PM, 5:00 PM'),
-- ('BUS',   'Ranchi',      'Hazaribagh',   'JSRTC',                 '0651-2460100', 120.00,  'Daily 8:00 AM, 1:00 PM, 6:00 PM'),
-- ('BUS',   'Ranchi',      'Netarhat',     'JSRTC',                 '0651-2460100', 180.00,  'Daily 7:00 AM, 1:00 PM'),
-- ('TRAIN', 'Ranchi',      'Deoghar',      'Indian Railways',       '139',          350.00,  'Ranchi-Patna Express: 6:15 AM daily'),
-- ('TRAIN', 'Ranchi',      'Jamshedpur',   'Indian Railways',       '139',          180.00,  'Howrah-Ranchi Express: 5:45 AM daily'),
-- ('TRAIN', 'Ranchi',      'Dhanbad',      'Indian Railways',       '139',          220.00,  'Ranchi-Dhanbad Intercity: 7:00 AM daily'),
-- ('CAB',   'Ranchi',      'Betla',        'Jharkhand Cab Service', '9431000001',   1800.00, 'On demand, 24x7'),
-- ('CAB',   'Ranchi',      'Netarhat',     'Jharkhand Cab Service', '9431000001',   1500.00, 'On demand, 24x7'),
-- ('CAB',   'Ranchi',      'Deoghar',      'Ola/Uber Jharkhand',    '9431000002',   2200.00, 'On demand, 24x7'),
-- ('CAB',   'Jamshedpur',  'Ranchi',       'Ola/Uber Jharkhand',    '9431000002',   2000.00, 'On demand, 24x7'),
-- ('AUTO',  'Ranchi',      'Pahari Mandir','Local Auto Stand',      '9431000003',   80.00,   'Available 6:00 AM - 9:00 PM'),
-- ('BUS',   'Dhanbad',     'Hazaribagh',   'JSRTC',                 '0651-2460100', 100.00,  'Daily 8:00 AM, 12:00 PM, 4:00 PM'),
-- ('TRAIN', 'Dhanbad',     'Jamshedpur',   'Indian Railways',       '139',          150.00,  'Multiple trains daily');

-- -- Emergency Contacts
-- INSERT INTO emergency_contacts (name, phone, type, district, address) VALUES
-- ('Ranchi Police Control Room',          '0651-2210011', 'POLICE',          'Ranchi',         'Police Headquarters, Doranda, Ranchi'),
-- ('Dhanbad Police Control Room',         '0326-2300100', 'POLICE',          'Dhanbad',        'SP Office, Dhanbad'),
-- ('Deoghar Police Station',              '06432-222100', 'POLICE',          'Deoghar',        'Deoghar Town Police Station'),
-- ('Jamshedpur Police Control Room',      '0657-2220100', 'POLICE',          'East Singhbhum', 'SP Office, Jamshedpur'),
-- ('Hazaribagh Police Control Room',      '06546-222100', 'POLICE',          'Hazaribagh',     'SP Office, Hazaribagh'),
-- ('RIMS Hospital Ranchi',                '0651-2542100', 'HOSPITAL',        'Ranchi',         'Bariatu Road, Ranchi'),
-- ('Rajendra Institute of Medical Sciences','0651-2542100','HOSPITAL',       'Ranchi',         'Bariatu, Ranchi'),
-- ('Dhanbad District Hospital',           '0326-2310200', 'HOSPITAL',        'Dhanbad',        'Bank More, Dhanbad'),
-- ('Deoghar Sadar Hospital',              '06432-222200', 'HOSPITAL',        'Deoghar',        'Deoghar Town'),
-- ('MGM Medical College Jamshedpur',      '0657-2430200', 'HOSPITAL',        'East Singhbhum', 'Sakchi, Jamshedpur'),
-- ('Hazaribagh Sadar Hospital',           '06546-222200', 'HOSPITAL',        'Hazaribagh',     'Hazaribagh Town'),
-- ('Ranchi Fire Station',                 '0651-2210101', 'FIRE',            'Ranchi',         'Main Road, Ranchi'),
-- ('Dhanbad Fire Station',                '0326-2300101', 'FIRE',            'Dhanbad',        'Dhanbad Town'),
-- ('Jharkhand Tourist Helpline',          '1800-345-6100', 'TOURIST_HELPLINE','Ranchi',        'Tourism Bhawan, Ranchi (Toll Free)'),
-- ('Jharkhand Tourism Office Ranchi',     '0651-2490070', 'TOURIST_HELPLINE','Ranchi',         'Paryatan Bhawan, Doranda, Ranchi'),
-- ('Tourist Helpline Deoghar',            '06432-222300', 'TOURIST_HELPLINE','Deoghar',        'Near Baidyanath Temple, Deoghar'),
-- ('Tourist Helpline Netarhat',           '9431100099',   'TOURIST_HELPLINE','Latehar',        'Netarhat Forest Rest House'),
-- ('National Emergency',                  '112',          'POLICE',          'Jharkhand',      'All Districts - National Emergency Number'),
-- ('Ambulance',                           '108',          'HOSPITAL',        'Jharkhand',      'All Districts - Free Ambulance Service'),
-- ('Fire Emergency',                      '101',          'FIRE',            'Jharkhand',      'All Districts - Fire Emergency');

-- -- Sample Bookings
-- INSERT INTO bookings (user_id, type, reference_id, check_in, check_out, guests, total_amount, status) VALUES
-- (2, 'HOTEL',     1, '2025-02-10', '2025-02-12', 2, 5000.00,  'CONFIRMED'),
-- (2, 'HOTEL',     7, '2025-03-15', '2025-03-17', 2, 7000.00,  'PENDING'),
-- (3, 'HOTEL',     2, '2025-01-20', '2025-01-22', 3, 6400.00,  'CONFIRMED'),
-- (3, 'EVENT',     5, '2025-07-10', '2025-07-10', 4, 0.00,     'CONFIRMED'),
-- (4, 'TRANSPORT', 9, '2025-02-05', '2025-02-05', 2, 1800.00,  'CONFIRMED'),
-- (2, 'EVENT',     1, '2025-03-28', '2025-03-28', 3, 0.00,     'PENDING');


-- -- ============================================================
-- -- VERIFY DATA
-- -- ============================================================
-- SELECT 'users'              AS `table`, COUNT(*) AS count FROM users
-- UNION ALL
-- SELECT 'tourist_places',    COUNT(*) FROM tourist_places
-- UNION ALL
-- SELECT 'reviews',           COUNT(*) FROM reviews
-- UNION ALL
-- SELECT 'hotels',            COUNT(*) FROM hotels
-- UNION ALL
-- SELECT 'events',            COUNT(*) FROM events
-- UNION ALL
-- SELECT 'transports',        COUNT(*) FROM transports
-- UNION ALL
-- SELECT 'emergency_contacts',COUNT(*) FROM emergency_contacts
-- UNION ALL
-- SELECT 'bookings',          COUNT(*) FROM bookings;

-- ============================================================
--  Smart Tourism Enablement Platform - Jharkhand
--  MySQL Database Script
--  Run this in MySQL Workbench or mysql CLI
-- ============================================================

CREATE DATABASE IF NOT EXISTS jharkhand_tourism;
USE jharkhand_tourism;

-- ============================================================
-- TABLE: users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    role ENUM('USER', 'ADMIN') DEFAULT 'USER'
);

-- ============================================================
-- TABLE: tourist_places
-- ============================================================
CREATE TABLE IF NOT EXISTS tourist_places (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(200),
    district VARCHAR(100),
    image_url VARCHAR(500),
    category VARCHAR(50),   -- ECO, CULTURAL, HERITAGE
    latitude DOUBLE,
    longitude DOUBLE
);

-- ============================================================
-- TABLE: reviews
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    place_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (place_id) REFERENCES tourist_places(id) ON DELETE CASCADE
);

-- ============================================================
-- TABLE: hotels
-- ============================================================
CREATE TABLE IF NOT EXISTS hotels (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address VARCHAR(300),
    district VARCHAR(100),
    phone VARCHAR(15),
    price_per_night DOUBLE,
    total_rooms INT,
    available_rooms INT,
    image_url VARCHAR(500),
    amenities TEXT
);

-- ============================================================
-- TABLE: events
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(200),
    district VARCHAR(100),
    start_date DATE,
    end_date DATE,
    image_url VARCHAR(500),
    category VARCHAR(50)    -- FESTIVAL, CULTURAL, ECO
);

-- ============================================================
-- TABLE: transports
-- ============================================================
 DROP TABLE IF EXISTS transports;
CREATE TABLE transports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50),
    source VARCHAR(100),
    destination VARCHAR(100),
    operator_name VARCHAR(150),
    contact_number VARCHAR(15),
    fare DOUBLE,
    schedule VARCHAR(200)
);

-- ============================================================
-- TABLE: emergency_contacts
-- ============================================================
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150),
    phone VARCHAR(15),
    type VARCHAR(50),        -- POLICE, HOSPITAL, FIRE, TOURIST_HELPLINE
    district VARCHAR(100),
    address VARCHAR(300)
);

-- ============================================================
-- TABLE: bookings
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type ENUM('HOTEL', 'TRANSPORT', 'EVENT') NOT NULL,
    reference_id BIGINT,
    check_in DATE,
    check_out DATE,
    guests INT DEFAULT 1,
    total_amount DOUBLE,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELLED') DEFAULT 'PENDING',
    booked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- ============================================================
-- SAMPLE DATA
-- ============================================================

-- Users (passwords are BCrypt of "password123")
INSERT INTO users (name, email, password, phone, role) VALUES
('Admin User',  'admin@tourism.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543210', 'ADMIN'),
('Rahul Kumar', 'rahul@gmail.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9123456780', 'USER'),
('Priya Singh', 'priya@gmail.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9234567891', 'USER'),
('Amit Sharma', 'amit@gmail.com',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9345678902', 'USER');

-- Tourist Places
INSERT INTO tourist_places (name, description, location, district, category, latitude, longitude) VALUES
('Betla National Park',     'One of the first national parks in India with tigers, elephants and diverse wildlife.',         'Betla, Latehar',       'Latehar',   'ECO',      23.6500, 84.1200),
('Hundru Falls',            'Stunning 98m waterfall on the Subarnarekha river, a popular picnic spot.',                     'Ranchi-Purulia Road',  'Ranchi',    'ECO',      23.3500, 85.6500),
('Dassam Falls',            'Beautiful 44m waterfall surrounded by dense forests near Ranchi.',                             'Taimara, Ranchi',      'Ranchi',    'ECO',      23.2800, 85.7200),
('Pahari Mandir',           'Famous Shiva temple atop a hill in Ranchi offering panoramic city views.',                     'Ranchi City',          'Ranchi',    'CULTURAL', 23.3441, 85.3096),
('Jagannath Temple',        '17th century temple built by Thakur Ani Nath Shahdeo, resembling Puri Jagannath.',             'Jagannath Nagar',      'Ranchi',    'HERITAGE', 23.3200, 85.2900),
('Deoghar Baidyanath Dham', 'One of the 12 Jyotirlingas, a major Hindu pilgrimage site attracting millions.',               'Deoghar',              'Deoghar',   'HERITAGE', 24.4850, 86.6940),
('Rajrappa Temple',         'Ancient Chhinnamasta temple at the confluence of Damodar and Bhairavi rivers.',                'Ramgarh',              'Ramgarh',   'HERITAGE', 23.6400, 85.8200),
('Netarhat',                'Queen of Chotanagpur - a scenic hill station at 3700 ft with sunrise/sunset views.',           'Netarhat',             'Latehar',   'ECO',      23.4800, 84.2700),
('Panchghagh Falls',        'Five streams merging into one waterfall, ideal for nature lovers.',                            'Khunti',               'Khunti',    'ECO',      23.0700, 85.2800),
('Hazaribagh Wildlife Sanctuary', 'Rich biodiversity sanctuary with tigers, leopards and migratory birds.',                 'Hazaribagh',           'Hazaribagh','ECO',      23.9900, 85.3600),
('Topchanchi Lake',         'Serene lake surrounded by forests, perfect for boating and bird watching.',                    'Dhanbad',              'Dhanbad',   'ECO',      23.7800, 86.3200),
('Macluskieganj',           'Heritage town known as the Chota England, with colonial-era bungalows.',                       'Ramgarh',              'Ramgarh',   'HERITAGE', 23.5200, 85.3500);

-- Reviews
INSERT INTO reviews (user_id, place_id, rating, comment) VALUES
(2, 1, 5, 'Amazing wildlife experience! Saw elephants up close. Must visit.'),
(3, 1, 4, 'Great park but roads need improvement. Overall wonderful.'),
(2, 2, 5, 'Hundru Falls is breathtaking! Best waterfall I have seen.'),
(4, 3, 4, 'Dassam Falls is beautiful, especially during monsoon season.'),
(3, 6, 5, 'Baidyanath Dham is spiritually uplifting. A must-visit pilgrimage.'),
(2, 8, 5, 'Netarhat sunrise is absolutely magical. Peaceful and serene.'),
(4, 4, 4, 'Pahari Mandir view of Ranchi city is stunning at night.');

-- Hotels
INSERT INTO hotels (name, address, district, phone, price_per_night, total_rooms, available_rooms, amenities) VALUES
('Hotel Capitol Hill',      'Main Road, Ranchi',            'Ranchi',    '0651-2330011', 2500.00, 60,  45, 'WiFi, AC, Restaurant, Parking, Room Service'),
('BNR Hotel Ranchi',        'Station Road, Ranchi',         'Ranchi',    '0651-2460011', 3200.00, 80,  30, 'WiFi, AC, Restaurant, Bar, Gym, Pool'),
('Hotel Yuvraj',            'Main Road, Ranchi',            'Ranchi',    '0651-2331122', 1800.00, 40,  20, 'WiFi, AC, Restaurant, Parking'),
('Hotel Chanakya BNR',      'Station Road, Dhanbad',        'Dhanbad',   '0326-2300011', 2200.00, 55,  35, 'WiFi, AC, Restaurant, Parking'),
('Hotel Natraj',            'Bank More, Dhanbad',           'Dhanbad',   '0326-2310022', 1500.00, 30,  18, 'WiFi, AC, Parking'),
('Hotel Deoghar Inn',       'Tower Chowk, Deoghar',         'Deoghar',   '06432-222011', 1200.00, 35,  25, 'WiFi, AC, Restaurant'),
('Netarhat Forest Retreat', 'Near Viewpoint, Netarhat',     'Latehar',   '9431100001',   3500.00, 20,  12, 'WiFi, Restaurant, Bonfire, Nature Walks'),
('Hotel Hazaribagh Lake',   'Near Lake, Hazaribagh',        'Hazaribagh','06546-222033', 1800.00, 45,  30, 'WiFi, AC, Restaurant, Lake View'),
('Hotel Bokaro Steel',      'City Centre, Bokaro',          'Bokaro',    '06542-233011', 2000.00, 50,  28, 'WiFi, AC, Restaurant, Gym'),
('Betla Eco Resort',        'Near Betla Gate, Latehar',     'Latehar',   '9431200002',   2800.00, 25,  15, 'WiFi, Restaurant, Safari Booking, Nature Trails');

-- Events
INSERT INTO events (name, description, location, district, start_date, end_date, category) VALUES
('Sarhul Festival',         'Spring festival celebrating nature worship with Sal flowers, tribal dance and music.',         'Ranchi',               'Ranchi',    '2025-03-28', '2025-03-30', 'FESTIVAL'),
('Karma Festival',          'Tribal festival worshipping the Karma tree for prosperity and good harvest.',                  'Across Jharkhand',     'Ranchi',    '2025-09-05', '2025-09-06', 'FESTIVAL'),
('Tusu Parab',              'Winter harvest festival celebrated by Kurmi and Mahato communities with songs.',               'Purulia Border',       'Bokaro',    '2025-01-14', '2025-01-15', 'FESTIVAL'),
('Jharkhand Mahotsav',      'State cultural festival showcasing tribal art, dance, music and handicrafts.',                 'Ranchi',               'Ranchi',    '2025-11-15', '2025-11-20', 'CULTURAL'),
('Shravan Mela Deoghar',    'Massive annual pilgrimage fair at Baidyanath Dham during the holy month of Shravan.',          'Deoghar',              'Deoghar',   '2025-07-10', '2025-08-08', 'FESTIVAL'),
('Betla Eco Tourism Fair',  'Eco-tourism fair promoting wildlife conservation and forest culture of Jharkhand.',             'Betla National Park',  'Latehar',   '2025-02-10', '2025-02-12', 'ECO'),
('Tribal Dance Festival',   'Celebration of Jharkhand tribal dances - Chhau, Jhumair, Paika and Natua.',                   'Jamshedpur',           'East Singhbhum', '2025-04-05', '2025-04-07', 'CULTURAL'),
('Ranchi Flower Show',      'Annual flower show at Ranchi Horticultural Garden with rare Jharkhand flora.',                 'Ranchi',               'Ranchi',    '2025-02-20', '2025-02-25', 'ECO'),
('Manda Festival',          'Fire-walking festival observed by Kurmi community as a mark of devotion.',                    'Hazaribagh',           'Hazaribagh','2025-04-13', '2025-04-14', 'FESTIVAL'),
('Jawa Festival',           'Tribal festival where young girls worship nature and pray for good husbands.',                 'Across Jharkhand',     'Ranchi',    '2025-08-15', '2025-08-16', 'CULTURAL');

-- Transport
INSERT INTO transports (type, source, destination, operator_name, contact_number, fare, schedule) VALUES
('BUS',   'Ranchi',     'Deoghar',       'JSRTC',                 '0651-2460100', 280.00,  'Daily 6:00 AM, 10:00 AM, 2:00 PM'),
('BUS',   'Ranchi',     'Jamshedpur',    'JSRTC',                 '0651-2460100', 220.00,  'Daily 7:00 AM, 11:00 AM, 3:00 PM'),
('BUS',   'Ranchi',     'Dhanbad',       'JSRTC',                 '0651-2460100', 200.00,  'Daily 6:30 AM, 12:00 PM, 5:00 PM'),
('BUS',   'Ranchi',     'Hazaribagh',    'JSRTC',                 '0651-2460100', 120.00,  'Daily 8:00 AM, 1:00 PM, 6:00 PM'),
('BUS',   'Ranchi',     'Netarhat',      'JSRTC',                 '0651-2460100', 180.00,  'Daily 7:00 AM, 1:00 PM'),
('TRAIN', 'Ranchi',     'Deoghar',       'Indian Railways',       '139',          350.00,  'Ranchi-Patna Express: 6:15 AM daily'),
('TRAIN', 'Ranchi',     'Jamshedpur',    'Indian Railways',       '139',          180.00,  'Howrah-Ranchi Express: 5:45 AM daily'),
('TRAIN', 'Ranchi',     'Dhanbad',       'Indian Railways',       '139',          220.00,  'Ranchi-Dhanbad Intercity: 7:00 AM daily'),
('CAB',   'Ranchi',     'Betla',         'Jharkhand Cab Service', '9431000001',   1800.00, 'On demand, 24x7'),
('CAB',   'Ranchi',     'Netarhat',      'Jharkhand Cab Service', '9431000001',   1500.00, 'On demand, 24x7'),
('CAB',   'Ranchi',     'Deoghar',       'Ola/Uber Jharkhand',    '9431000002',   2200.00, 'On demand, 24x7'),
('CAB',   'Jamshedpur', 'Ranchi',        'Ola/Uber Jharkhand',    '9431000002',   2000.00, 'On demand, 24x7'),
('AUTO',  'Ranchi',     'Pahari Mandir', 'Local Auto Stand',      '9431000003',   80.00,   'Available 6:00 AM - 9:00 PM'),
('BUS',   'Dhanbad',    'Hazaribagh',    'JSRTC',                 '0651-2460100', 100.00,  'Daily 8:00 AM, 12:00 PM, 4:00 PM'),
('TRAIN', 'Dhanbad',    'Jamshedpur',    'Indian Railways',       '139',          150.00,  'Multiple trains daily');

-- Emergency Contacts
INSERT INTO emergency_contacts (name, phone, type, district, address) VALUES
('Ranchi Police Control Room',          '0651-2210011', 'POLICE',          'Ranchi',         'Police Headquarters, Doranda, Ranchi'),
('Dhanbad Police Control Room',         '0326-2300100', 'POLICE',          'Dhanbad',        'SP Office, Dhanbad'),
('Deoghar Police Station',              '06432-222100', 'POLICE',          'Deoghar',        'Deoghar Town Police Station'),
('Jamshedpur Police Control Room',      '0657-2220100', 'POLICE',          'East Singhbhum', 'SP Office, Jamshedpur'),
('Hazaribagh Police Control Room',      '06546-222100', 'POLICE',          'Hazaribagh',     'SP Office, Hazaribagh'),
('RIMS Hospital Ranchi',                '0651-2542100', 'HOSPITAL',        'Ranchi',         'Bariatu Road, Ranchi'),
('Rajendra Institute of Medical Sciences','0651-2542100','HOSPITAL',       'Ranchi',         'Bariatu, Ranchi'),
('Dhanbad District Hospital',           '0326-2310200', 'HOSPITAL',        'Dhanbad',        'Bank More, Dhanbad'),
('Deoghar Sadar Hospital',              '06432-222200', 'HOSPITAL',        'Deoghar',        'Deoghar Town'),
('MGM Medical College Jamshedpur',      '0657-2430200', 'HOSPITAL',        'East Singhbhum', 'Sakchi, Jamshedpur'),
('Hazaribagh Sadar Hospital',           '06546-222200', 'HOSPITAL',        'Hazaribagh',     'Hazaribagh Town'),
('Ranchi Fire Station',                 '0651-2210101', 'FIRE',            'Ranchi',         'Main Road, Ranchi'),
('Dhanbad Fire Station',                '0326-2300101', 'FIRE',            'Dhanbad',        'Dhanbad Town'),
('Jharkhand Tourist Helpline',          '1800-345-6100', 'TOURIST_HELPLINE','Ranchi',        'Tourism Bhawan, Ranchi (Toll Free)'),
('Jharkhand Tourism Office Ranchi',     '0651-2490070', 'TOURIST_HELPLINE','Ranchi',         'Paryatan Bhawan, Doranda, Ranchi'),
('Tourist Helpline Deoghar',            '06432-222300', 'TOURIST_HELPLINE','Deoghar',        'Near Baidyanath Temple, Deoghar'),
('Tourist Helpline Netarhat',           '9431100099',   'TOURIST_HELPLINE','Latehar',        'Netarhat Forest Rest House'),
('National Emergency',                  '112',          'POLICE',          'Jharkhand',      'All Districts - National Emergency Number'),
('Ambulance',                           '108',          'HOSPITAL',        'Jharkhand',      'All Districts - Free Ambulance Service'),
('Fire Emergency',                      '101',          'FIRE',            'Jharkhand',      'All Districts - Fire Emergency');

-- Sample Bookings
INSERT INTO bookings (user_id, type, reference_id, check_in, check_out, guests, total_amount, status) VALUES
(2, 'HOTEL',     1, '2025-02-10', '2025-02-12', 2, 5000.00,  'CONFIRMED'),
(2, 'HOTEL',     7, '2025-03-15', '2025-03-17', 2, 7000.00,  'PENDING'),
(3, 'HOTEL',     2, '2025-01-20', '2025-01-22', 3, 6400.00,  'CONFIRMED'),
(3, 'EVENT',     5, '2025-07-10', '2025-07-10', 4, 0.00,     'CONFIRMED'),
(4, 'TRANSPORT', 9, '2025-02-05', '2025-02-05', 2, 1800.00,  'CONFIRMED'),
(2, 'EVENT',     1, '2025-03-28', '2025-03-28', 3, 0.00,     'PENDING');


-- ============================================================
-- VERIFY DATA
-- ============================================================
SELECT 'users'              AS `table`, COUNT(*) AS count FROM users
UNION ALL
SELECT 'tourist_places',    COUNT(*) FROM tourist_places
UNION ALL
SELECT 'reviews',           COUNT(*) FROM reviews
UNION ALL
SELECT 'hotels',            COUNT(*) FROM hotels
UNION ALL
SELECT 'events',            COUNT(*) FROM events
UNION ALL
SELECT 'transports',        COUNT(*) FROM transports
UNION ALL
SELECT 'emergency_contacts',COUNT(*) FROM emergency_contacts
UNION ALL
SELECT 'bookings',          COUNT(*) FROM bookings;

	SELECT * FROM bookings;
  
 