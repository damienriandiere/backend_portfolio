const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');


function createTokens(user) {
    const accessKey = process.env.ACCESS_KEY_SECRET;
    const refreshKey = process.env.REFRESH_KEY_SECRET;

	console.log(accessKey, refreshKey)

    const accessToken = jwt.sign({ user }, accessKey, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ user }, refreshKey, { expiresIn: '2h' });

    return { accessToken, refreshToken };
}

async function hashPassword(password) {
	const salt = await bcrypt.genSalt(10);
	logger.info('Salt generated');

	const hashedPassword = await bcrypt.hash(password, salt);
	logger.info('Password hashed');

	return hashedPassword;
}

async function comparePassword(candidatePassword, userPassword) {
	const isMatch = await bcrypt.compare(candidatePassword, userPassword);

	return isMatch;
}

module.exports = {
	createTokens,
	hashPassword,
	comparePassword
};