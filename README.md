# Classic Tailor Shop

A full-stack web application for **Classic Tailor**, a men's tailoring business in NG Halli, Bengaluru. The site showcases services and lets customers track orders by phone number, while shop staff use a protected admin dashboard to manage customers, measurements, and orders.

## Features

### Public website
- **Landing page** with hero, about, services, FAQ, gallery, and contact sections
- **Order tracking** — customers enter their phone number to view order status and delivery dates
- Responsive layout with smooth scrolling navigation

### Admin dashboard
- **Authentication** — JWT-based login with optional “Remember Me”
- **Customer management** — add, list, update, and delete customers
- **Measurements** — store shirt and pant measurements per customer
- **Order management** — create orders, update status, track payment, and delete orders
- **Dashboard summary** — quick counts of total customers and orders

## Tech stack

| Layer      | Technologies |
|-----------|--------------|
| Frontend  | React 18, React Router, Tailwind CSS, Axios, Framer Motion |
| Backend   | Node.js, Express 5, MongoDB (Mongoose) |
| Auth      | JWT, bcrypt |
| Deployment| Backend hosted on [Render](https://classic-tailor-shop-front.onrender.com/) |

## Project structure

```
classic_tailor_shop/
├── backend/                 # Express API server
│   ├── controllers/         # Route handlers
│   ├── db/                  # MongoDB connection
│   ├── middleware/          # JWT auth middleware
│   ├── models/              # Mongoose schemas (User, Customer, Order, Measurement)
│   ├── routes/              # API routes
│   └── index.js             # Server entry point
├── frontend/                # React client (Create React App)
│   ├── public/
│   └── src/
│       ├── components/      # Navbar, Login, Admin dashboard components
│       ├── sections/        # Home page sections (Hero, About, Track Order, etc.)
│       └── utils/           # Auth helpers
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## Getting started

### 1. Clone the repository

```bash
git clone <repository-url>
cd classic_tailor_shop
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGODB_URL=mongodb://127.0.0.1:27017/classic_tailor_shop
JWT_KEY=your_secure_jwt_secret_here
```

Start the API server:

```bash
npm start
```

The server runs on `http://localhost:5000` by default. Verify it with:

```bash
curl http://localhost:5000/ping
```

### 3. Frontend setup

In a separate terminal:

```bash
cd frontend
npm install
npm start
```

The React app opens at `http://localhost:3000`.

> **Note:** The frontend currently points to the production API at `https://classic-tailor-shop-backend.onrender.com`. For local development, update the API base URL in the frontend components (e.g. `Login.jsx`, `TrackOrder.jsx`, and files under `components/dashboard/`) to `http://localhost:5000`, or introduce a shared config / environment variable such as `REACT_APP_API_URL`.

### 4. Create an admin user

There is no public registration endpoint. Add an admin user directly in MongoDB with a bcrypt-hashed password, or use a local seed script. Example document in the `users` collection:

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "<bcrypt-hashed-password>"
}
```

Then log in at `/login` and access the dashboard at `/admin-dashboard`.

## API reference

Base URL (production): `https://classic-tailor-shop-backend.onrender.com`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/ping` | No | Health check |
| POST | `/api/auth/login` | No | Admin login |
| GET | `/api/customer` | Yes | List all customers |
| POST | `/api/customer/add` | Yes | Add a customer |
| GET | `/api/customer/:id` | Yes | Get customer by ID |
| PUT | `/api/customer/:id` | Yes | Update customer |
| DELETE | `/api/customer/:id` | Yes | Delete customer |
| GET | `/api/measurements/:id` | Yes | Get measurements for a customer |
| POST | `/api/measurements/:id` | Yes | Save/update measurements |
| DELETE | `/api/measurements/:id` | Yes | Delete measurements |
| GET | `/api/orders` | Yes | List all orders |
| POST | `/api/orders` | Yes | Create an order |
| PUT | `/api/orders/:id` | Yes | Update an order |
| DELETE | `/api/orders/:id` | Yes | Delete an order |
| GET | `/api/orders/track/:phone` | No | Track orders by customer phone |

Protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <jwt_token>
```

### Order statuses

- `Not Stitched`
- `In Progress`
- `Stitched`
- `Delivered`

## Scripts

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `npm start` | Start server with nodemon |

### Frontend (`frontend/`)

| Command | Description |
|---------|-------------|
| `npm start` | Run development server |
| `npm run build` | Production build |
| `npm test` | Run tests |

## Contact

**Classic Tailor**  
NG Halli, near 8th Mile, Gangodanahalli Main Road  
Bengaluru, Karnataka

- Phone: +91 77951 96984  
- Email: nagarajn2166@gmail.com  
- Instagram: [@classic_mens_tailoring](https://www.instagram.com/classic_mens_tailoring)

## License

This project is for Classic Tailor Shop. All rights reserved.
