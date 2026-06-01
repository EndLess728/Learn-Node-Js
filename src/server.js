const app = require('./app');
const env = require('./config/env');

const server = app.listen(env.port, () => {
  console.log(`[server] Running on http://localhost:${env.port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`[server] Port ${env.port} is already in use.`);
    console.error('[server] Set another PORT in .env and restart. Example: PORT=5002');
    process.exit(1);
  }

  console.error('[server] Failed to start server:', error.message);
  process.exit(1);
});
