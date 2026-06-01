# Node.js Learning Starter

This project is designed for someone coming from a React Native background and learning backend basics with Node.js.

## Project Structure

```
learning-node/
├─ src/
│  ├─ app.js                    # App setup (middleware + routes)
│  ├─ server.js                 # Server bootstrap
│  ├─ config/
│  │  └─ env.js                 # Environment variable config
│  ├─ routes/
│  │  ├─ index.js               # Route aggregator
│  │  └─ health.routes.js       # Health check route
│  │  └─ users.routes.js        # User CRUD routes
│  ├─ controllers/
│  │  └─ health.controller.js   # Controller logic
│  │  └─ users.controller.js    # User CRUD controllers
│  ├─ services/
│  │  └─ health.service.js      # Business logic layer
│  │  └─ users.service.js       # In-memory user CRUD logic
│  ├─ middlewares/
│  │  └─ error.middleware.js    # Global error handling
│  └─ utils/
│     └─ api-response.js        # Shared response helper
├─ docs/
│  └─ learning-path.md          # Suggested topic roadmap
├─ .env.example
├─ .gitignore
└─ package.json
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your env file:

   ```bash
   cp .env.example .env
   ```

3. Start in dev mode:

   ```bash
   npm run dev
   ```

4. Test endpoint:

   - `GET http://localhost:5001/api/health`

## CRUD Endpoints (Users)

- `GET http://localhost:5001/api/users`
- `GET http://localhost:5001/api/users/:id`
- `POST http://localhost:5001/api/users`
- `PATCH http://localhost:5001/api/users/:id`
- `DELETE http://localhost:5001/api/users/:id`

Example create payload:

```json
{
  "name": "Alex",
  "email": "alex@example.com"
}
```

## Why this structure?

- Familiar separation similar to React Native feature layers.
- Clear distinction between routes, controllers, and services.
- Easy to scale from a small learning app to production patterns.
