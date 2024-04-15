const authController = require('../controllers/authController');
const express = require('express');

const AuthRoutes = express.Router();

AuthRoutes.post('/register', authController.register);
AuthRoutes.post('/login', authController.login);
AuthRoutes.post('/refresh', authController.refresh);

module.exports = AuthRoutes;