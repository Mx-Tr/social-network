const { Post, User, Sequelize } = require('../models');

exports.createPost = async (title, content, userId) => {
	const user = await User.findByPk(userId);

	if (!title || !content) {
		throw new Error('Название и содержание обязательны');
	}
	if (!userId) throw new Error('Пользователь не указан');
	if (!user) throw new Error('Пользователь не найден');

	const post = await Post.create({ title, content, userId });
	return post;
};

exports.deletePost = async (id) => {
	const post = await Post.findByPk(id);

	if (!post) throw new Error('Пост не найден');

	await post.destroy();
};

exports.getPostsByUserId = async (userId) => {
	const posts = await Post.findAll({
		where: {
			userId,
		},
		include: [{association: 'author'}]
	})
	if (posts.length === 0) {
		return []
		// throw new Error('Посты не найдены для данного пользователя');
	}
	return posts;
}

exports.getAllPosts = async () => {
	const posts = await Post.findAll({
		include: [{association: 'author'}],
		order: [['createdAt', 'DESC']],
	});

	if (posts.length === 0) {
		throw new Error('Посты не найдены');
	}
	return posts;
}