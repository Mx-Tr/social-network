const userService = require('../services/user.service');

exports.createUser = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const user = await userService.createUser(username, email, password);

		res.json(user);
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		await userService.deleteUser(id);
		res.json({ message: 'Пользователь успешно удален.' });
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
};

exports.getUser = async (req, res) => {
	const { username } = req.query;

	try {
		const user = await userService.getUser(username);

		res.json(user);
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await userService.getAllUsers();
		res.json(users);
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
}