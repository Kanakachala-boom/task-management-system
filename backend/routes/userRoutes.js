const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Login / Register (combined)
router.post('/login', userController.loginUser);

module.exports = router;