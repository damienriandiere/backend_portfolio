const logger = require('../utils/logger');
const userModel = require('../models/userModel');

async function getUserProfile(userId) {
	const user = await userModel.findById(userId);

	if (!user) {
		logger.error('User not found !');
		throw new Error('User not found !');
	} else {
		logger.info('User found !');
		return { id: user._id, name: user.name, email: user.email };
	}
}

async function createUser(name, email, password, admin) {
	try {
		const newUser = new userModel({
			name: name,
			email : email,
			password : password,
			admin: admin
		});
		await newUser.save();
		console.log('User successful created.');
		logger.info('User successful created.');
	} catch (error) {
		logger.error('Erreur durant la création d\'un user : ', error);
	}
}

async function deleteUser(userId) {
	const user = await userModel.findById(userId);

	if (!user) {
		logger.error('User not found !');
		throw new Error('User not found !');
	} else {
		await userModel.deleteOne({ _id: userId });
		logger.info('User deleted !');
		return { message: 'User deleted !' };
	}
}

module.exports = {
	getUserProfile,
	createUser,
	deleteUser
};