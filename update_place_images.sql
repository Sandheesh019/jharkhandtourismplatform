USE jharkhand_tourism;

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Betla_National_Park.jpg/1280px-Betla_National_Park.jpg'
WHERE name = 'Betla National Park';

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hundru_Falls.jpg/1280px-Hundru_Falls.jpg'
WHERE name = 'Hundru Falls';

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Dassam_Falls.jpg/1280px-Dassam_Falls.jpg'
WHERE name = 'Dassam Falls';

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pahari_Mandir%2C_Ranchi.jpg/1280px-Pahari_Mandir%2C_Ranchi.jpg'
WHERE name = 'Pahari Mandir';

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Jagannath_Temple_Ranchi.jpg/1280px-Jagannath_Temple_Ranchi.jpg'
WHERE name = 'Jagannath Temple';

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Baidyanath_Temple.jpg/1280px-Baidyanath_Temple.jpg'
WHERE name = 'Deoghar Baidyanath Dham';

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Rajrappa_Temple.jpg/1280px-Rajrappa_Temple.jpg'
WHERE name = 'Rajrappa Temple';

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Netarhat_Sunset.jpg/1280px-Netarhat_Sunset.jpg'
WHERE name = 'Netarhat';

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Panchghagh_Falls.jpg/1280px-Panchghagh_Falls.jpg'
WHERE name = 'Panchghagh Falls';

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Hazaribagh_Wildlife_Sanctuary.jpg/1280px-Hazaribagh_Wildlife_Sanctuary.jpg'
WHERE name = 'Hazaribagh Wildlife Sanctuary';

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Topchanchi_Lake.jpg/1280px-Topchanchi_Lake.jpg'
WHERE name = 'Topchanchi Lake';

UPDATE tourist_places SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Macluskieganj.jpg/1280px-Macluskieganj.jpg'
WHERE name = 'Macluskieganj';

SELECT id, name, image_url FROM tourist_places;
