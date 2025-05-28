const { User, Sequelize } = require('../models');

exports.createUser = async (username, email, password) => {
	const existingUser = await User.findOne({
		where: {
			[Sequelize.Op.or]: [{ username }, { email }],
		},
	});
	if (existingUser) {
		throw new Error('Пользователь с таким именем или email уже существует.');
	}

	const user = await User.create({ username, email, password });

	return user;
};

exports.deleteUser = async (id) => {
	const user = await User.findByPk(id);
	if (!user) {
		throw new Error('Пользователь не найден.');
	}
	await user.destroy();
};

exports.getUser = async (username) => {
	const user = await User.findOne({
		where: {
			username,
		},
	});
	if (!user) {
		throw new Error('Пользователь не найден.');
	}
	return { username: user.username, email: user.email, id: user.id };
};

exports.getAllUsers = async () => {
	const users = await User.findAll({
		attributes: ['id', 'username', 'email'],
	});
	if (!users || users.length === 0) {
		throw new Error('Пользователи не найдены.');
	}
	return users;
}