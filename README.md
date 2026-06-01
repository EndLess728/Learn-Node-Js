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
│  ├─ db/
│  │  ├─ knex.js                 # Database connection
│  │  └─ migrations/             # SQL schema migrations
│  ├─ routes/
│  │  ├─ index.js               # Route aggregator
│  │  └─ health.routes.js       # Health check route
│  │  └─ users.routes.js        # User CRUD routes
│  ├─ controllers/
│  │  └─ health.controller.js   # Controller logic
│  │  └─ users.controller.js    # User CRUD controllers
│  ├─ services/
│  │  └─ health.service.js      # Business logic layer
│  │  └─ users.service.js       # MySQL user CRUD logic
│  ├─ middlewares/
│  │  └─ error.middleware.js    # Global error handling
│  └─ utils/
│     └─ api-response.js        # Shared response helper
├─ docs/
│  └─ learning-path.md          # Suggested topic roadmap
├─ knexfile.js
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

3. Create MySQL database:

   - Database name: `learning_node`
   - Default connection in `.env.example`:
     `mysql://root:password@localhost:3306/learning_node`

   Install MySQL (one time):

   ```bash
   brew install mysql
   ```

   Start MySQL service:

   ```bash
   npm run db:up
   ```

   Create DB user and database (first time only):

   ```bash
   mysql -u root -e "CREATE DATABASE IF NOT EXISTS learning_node;"
   mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'password'; FLUSH PRIVILEGES;"
   ```

4. Run migrations:

   ```bash
   npm run db:migrate
   ```

5. Start in dev mode:

   ```bash
   npm run dev
   ```

6. Test endpoint:

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

Example fetch users:

```bash
curl http://localhost:5001/api/users
```

## Common DB Error

If you get `ECONNREFUSED` during `npm run db:migrate`, your app cannot reach MySQL.

Quick fix:

1. Start DB: `npm run db:up`
2. Ensure DB exists: `mysql -u root -e "CREATE DATABASE IF NOT EXISTS learning_node;"`
3. Ensure `.env` has:
   `DATABASE_URL=mysql://root:password@localhost:3306/learning_node`
4. Run migration again: `npm run db:migrate`

## Why this structure?

- Familiar separation similar to React Native feature layers.
- Clear distinction between routes, controllers, and services.
- Easy to scale from a small learning app to production patterns.
