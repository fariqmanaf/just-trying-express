const express = require('express');
const router = express.Router();

const { registerService, loginService, logoutService } = require('../auth/auth.service');
const { registerValidator, loginValidator } = require('./auth.validator');
const authMiddleware = require('../../middleware/auth');

router.post('/register', registerValidator, registerService);
router.post('/login', loginValidator, loginService);
router.get('/logout', authMiddleware, logoutService);

module.exports = router;