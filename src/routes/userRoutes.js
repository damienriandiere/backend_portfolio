const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const express = require('express');

const UserRoutes = express.Router();

UserRoutes.post('/', authMiddleware, userController.createUser);
UserRoutes.delete('/', authMiddleware, userController.deleteUser);

module.exports = UserRoutes;