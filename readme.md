# Sports Center — Full Stack E-Commerce App

A full-stack sports equipment e-commerce application built with **Spring Boot 3** (Java 21) on the backend and **React 18 + TypeScript** on the frontend.

**Live Demo:** [sports-centre.vercel.app](https://sports-centre.vercel.app) &nbsp;|&nbsp; **API:** [sports-centre.onrender.com](https://sports-centre.onrender.com)

---

## Tech Stack

### Backend
| | |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3.2.3 |
| Security | Spring Security + JWT (JJWT 0.11.5) |
| Database | MySQL 8 (products, orders) |
| Cache / Basket | Redis |
| ORM | Spring Data JPA + Hibernate |
| Mapping | MapStruct |
| API Docs | SpringDoc OpenAPI (Swagger UI) |
| Build | Maven |
| Container | Docker (multi-stage build) |

### Frontend
| | |
|---|---|
| Language | TypeScript |
| Framework | React 18 + Vite |
| UI Library | Material UI v5 |
| State | Redux Toolkit |
| Routing | React Router v6 |
| Forms | React Hook Form + Yup |
| HTTP | Axios |
| Notifications | React Toastify |

---

## Features

- **Product catalogue** — paginated, filterable by brand & type, searchable by keyword, sortable A–Z / Z–A
- **Basket** — localStorage-first with Redis sync, persistent across sessions
- **Authentication** — JWT login & register, token attached to every request
- **Checkout** — multi-step form (shipping address → review → payment), creates order in MySQL
- **Orders** — view all past orders with date, total and status
- **Dark / Light mode** toggle
- **Responsive** — works on mobile, tablet and desktop
- **Home page** — auto-sliding hero banner, category cards, brand showcase, CTA section
- **Contact page** — enquiry form, store info cards, embedded map

---

## Project Structure

```
sports-centre/
├── src/                          # Spring Boot backend
│   └── main/java/com/ecommerce/sportscenter/
│       ├── config/               # Security, CORS, user config
│       ├── controller/           # REST controllers
│       ├── entity/               # JPA + Redis entities
│       ├── model/                # DTOs / response objects
│       ├── repository/           # Spring Data repositories
│       ├── security/             # JWT filter, helper, entry point
│       └── service/              # Business logic
├── src/main/resources/
│   ├── application.yaml          # Local config
│   └── application-prod.yaml     # Production config (reads env vars)
├── client/                       # React frontend
│   ├── src/
│   │   ├── app/                  # Axios, layout, store, router, models
│   │   └── features/             # account, basket, catalog, checkout, orders, home, contact
│   ├── .env.example              # Environment variable template
│   └── vercel.json               # SPA rewrite rule for Vercel
├── docker/
│   └── docker-compose.yml        # MySQL + Redis for local dev
└── Dockerfile                    # Multi-stage production build
```

---

## Getting Started (Local)

### Prerequisites
- Java 21
- Node.js 18+
- Docker Desktop

### 1. Start MySQL and Redis

```bash
cd docker
docker-compose up -d
```

This spins up MySQL on port `3306` and Redis on port `6379`, and seeds the database with products.

### 2. Run the backend

```bash
./mvnw spring-boot:run
```

Backend starts on **http://localhost:8081**  
Swagger UI available at **http://localhost:8081/swagger-ui/index.html**

### 3. Run the frontend

```bash
cd client
npm install
npm run dev
```

Frontend starts on **http://localhost:3000**

### Default login credentials

```
Username: rahul
Password: Password
```

---

## Environment Variables

### Frontend (`client/.env.development`)

```env
VITE_API_BASE_URL=http://localhost:8081/api/
```

Copy `client/.env.example` to get started.

### Backend (`application-prod.yaml` / Render)

| Variable | Description |
|---|---|
| `SPRING_PROFILES_ACTIVE` | Set to `prod` in production |
| `MYSQL_URL` | JDBC connection string |
| `MYSQL_USER` | Database username |
| `MYSQL_PASSWORD` | Database password |
| `REDIS_URL` | Redis connection URL |
| `JWT_SECRET` | Secret key for signing JWTs |
| `FRONTEND_URL` | Your Vercel frontend URL (for CORS) |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Login, returns JWT |
| `POST` | `/api/auth/register` | Register new user |
| `GET` | `/api/products` | List products (page, size, brandId, typeId, keyword, sort, order) |
| `GET` | `/api/products/{id}` | Get product by ID |
| `GET` | `/api/products/brands` | List all brands |
| `GET` | `/api/products/types` | List all types |
| `GET` | `/api/baskets/{id}` | Get basket by ID |
| `POST` | `/api/baskets` | Create / update basket |
| `DELETE` | `/api/baskets/{id}` | Delete basket |
| `GET` | `/api/orders` | List all orders |
| `GET` | `/api/orders/{id}` | Get order by ID |
| `POST` | `/api/orders` | Create order from basket |
| `DELETE` | `/api/orders/{id}` | Delete order |

---

## Deployment

### Frontend → Vercel

1. Import repo at [vercel.com](https://vercel.com)
2. Set **Root Directory** to `client`, framework to **Vite**
3. Add env variable: `VITE_API_BASE_URL=https://your-render-url.onrender.com/api/`
4. Deploy

### Backend → Render

1. New **Web Service** → connect repo → set environment to **Docker**
2. Add all environment variables listed above
3. Deploy — Render builds from the `Dockerfile` at the repo root

---

## Author

**Omkar** — [github.com/omkard0212](https://github.com/omkard0212)
