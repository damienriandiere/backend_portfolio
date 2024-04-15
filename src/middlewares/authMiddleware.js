const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

function authMiddleware(req, res, next) {
	let token = req.headers.authorization;
	const accessKey = process.env.ACCESS_KEY_SECRET;

	if (!token) {
		logger.error('Token not found');
		return res.status(401).json({ message: 'Token not found' });
	}

	token = token.split(' ')[1];

	jwt.verify(token, accessKey, async (err, user) => {
		if (err) {
			logger.error('Invalid token' + err.message);
			return res.status(403).json({ message: 'Invalid token' + err.message });
		}

		req.user = user;
		next();
	});
}

module.exports = authMiddleware;