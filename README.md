# Smart Tourism Enablement Platform - Jharkhand

## Tech Stack
- **Frontend**: React.js (port 3000)
- **Backend**: Spring Boot 3 + Java 17 (port 8080)
- **Database**: MySQL

## Modules
| Module | Description |
|--------|-------------|
| User | Register, Login (JWT Auth) |
| Tourist Places | Eco & Cultural Heritage sites |
| Review | Ratings & comments on places |
| Hotel | Browse & book hotels |
| Event | Festivals & cultural events |
| Transport | Bus, Train, Cab options |
| Booking | Manage hotel/transport/event bookings |
| Emergency Contact | Police, Hospital, Helpline contacts |

## Setup

### Database
```sql
CREATE DATABASE jharkhand_tourism;
```

### Backend
1. Update `backend/src/main/resources/application.properties` with your MySQL password
2. Run:
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login → returns JWT |
| GET | /api/places | All tourist places |
| GET | /api/places/category/{cat} | Filter by ECO/CULTURAL/HERITAGE |
| GET | /api/hotels | All hotels |
| GET | /api/events | All events |
| GET | /api/transport/search?from=&to= | Search transport |
| GET | /api/emergency | Emergency contacts |
| POST | /api/bookings | Create booking |
| GET | /api/bookings/user/{id} | User's bookings |
| GET | /api/reviews/place/{id} | Reviews for a place |
| POST | /api/reviews | Add review |
