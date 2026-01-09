# Orderhandling Backend - Projektuppgift
Detta är ett backend-API byggt med Node.js, Hapi och MongoDB.
Projektet är byggt som ett fristående backend som konsumeras av en separat frontend.

## Tekniker och verktyg
Projektet är uppbyggt med följande tekniker och bibliotek:

- **Node.js** – JavaScript-runtime
- **Hapi** – Ramverk för server och routing
- **MongoDB** – NoSQL-databas
- **Mongoose** – ODM (Object Data Modeling) för MongoDB
- **JWT (JSON Web Tokens)** – Autentisering
- **@hapi/cookie** – Cookie-baserad sessionshantering
- **bcrypt** – Hashning av lösenord
- **Joi** – Validering av inkommande data
- **dotenv** – Hantering av miljövariabler
- **nodemon** – Automatisk omstart vid kodändringar (utveckling)

## Installation och uppstart
1. Klona projektet
2. Installera beroenden: npm install
3. Skapa .env-fil med följande innehåll:
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/orderhandling
   JWT_SECRET=your_jwt_secret_here
   COOKIE_PASSWORD=your_cookie_password_here

Notering:
- COOKIE_PASSWORD måste vara minst 32 tecken långt (krav från @hapi/cookie).
- MongoDB måste vara installerat och igång lokalt, eller peka mot en extern instans.

## Starta servern
- För utveckling: npm run dev
- För produktion: npm run start
- Servern startar på: http://localhost:3000


## API Endpoints

### Authentication routes
| Method | Endpoint      | Description                    | Auth |
|--------|--------------|--------------------------------|------|
| POST   | /auth/login  | Loggar in användare            | No   |
| GET    | /auth/me     | Hämtar inloggad användare      | Yes  |
| POST   | /auth/logout | Loggar ut användare            | No   |

### User routes
| Method | Endpoint        | Description              | Auth        |
|--------|-----------------|--------------------------|-------------|
| GET    | /users          | Hämtar alla users        | Yes         |
| GET    | /users/{id}     | Hämtar user via id       | Yes         |
| POST   | /users          | Skapar ny user           | Yes (Admin) |
| DELETE | /users/{id}     | Tar bort user            | Yes (Admin) |

### Product routes
| Method | Endpoint            | Description                  | Auth |
|--------|---------------------|------------------------------|------|
| GET    | /products           | Hämtar alla produkter        | Yes  |
| GET    | /products/{id}      | Hämtar produkt via id        | Yes  |
| POST   | /products           | Skapar ny produkt            | Yes  |
| PUT    | /products/{id}      | Uppdaterar produkt           | Yes  |
| DELETE | /products/{id}      | Tar bort produkt             | Yes  |