# Book Review API
---
## Project Setup Instructions

### 1. Open your IDE (e.g., IntelliJ IDEA, VSCode, WebStorm)

- Create a new Node.js project folder (e.g., `book-review-api`).
- Initialize npm with:
  npm init -y
- Install dependencies:
  npm install express mongoose dotenv cors jsonwebtoken bcryptjs nodemon

- Create necessary files and folders:
- `server.js` (entry point)
- `routes/` folder for API routes
- `controllers/` folder for business logic
- `models/` folder for MongoDB schemas
- `.env` file to store environment variables like your MongoDB connection URI and JWT secret

### 2. Environment Setup

- Create a `.env` file in the root directory with:
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/bookreviewdb
  JWT_SECRET=your_jwt_secret_key

- Make sure MongoDB is installed and running on your machine.

### 3. Run MongoDB

- Start your MongoDB service locally (e.g., `brew services start mongodb-community` on Mac or `mongod` command).
- Verify connection with a MongoDB client or shell.

---

## How to Run Locally

1. From the project root folder, run:
   npm run dev
2. This will start the server on port 5000 (or the port defined in `.env`).
3. You should see:
   Server is running on port 5000
   MongoDB connected

---

## Example API Requests Using curl

### Register a new user

curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "sakthi",
"email": "sakthipriyagece@email.com",
"password": "12345678"
}'

### Login user and get JWT token

curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
"email": "sakthipriyagece@email.com",
"password": "12345678"
}'
Response includes a token; save it for authenticated requests.

### Add a new book (Authenticated)

curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Clean Code","author":"Robert C. Martin","description":"A Handbook of Agile Software Craftsmanship","publishedYear":2008}'

### Get all books

curl http://localhost:5000/api/books

### Get book details by ID 

curl http://localhost:5000/api/books/BOOK_ID_HERE

### Submit a review for a book (Authenticated)

curl -X POST http://localhost:5000/api/books/BOOK_ID_HERE/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"rating":5,"comment":"Excellent book"}'

### Update your review (Authenticated)

curl -X PUT http://localhost:5000/api/reviews/REVIEW_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"rating":4,"comment":"Updated comment"}'

### Delete your review (Authenticated)

curl -X DELETE http://localhost:5000/api/reviews/REVIEW_ID_HERE \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

### Search books by title or author (partial, case-insensitive)

curl http://localhost:5000/api/books/search?q=clean