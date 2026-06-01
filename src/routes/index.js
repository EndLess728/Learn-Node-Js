const express = require('express');
const healthRoutes = require('./health.routes');
const usersRoutes = require('./users.routes');

const router = express.Router();

router.use('/', healthRoutes);
router.use('/', usersRoutes);

module.exports = router;
