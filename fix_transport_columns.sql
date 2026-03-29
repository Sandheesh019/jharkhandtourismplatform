USE jharkhand_tourism;

-- Step 1: Drop and recreate transports table with correct columns
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

-- Step 2: Re-insert sample data
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

SELECT * FROM transports;
