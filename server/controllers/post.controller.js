const postService = require('../services/post.service');

exports.createPost = async (req, res) => {
	const { title, content, userId } = req.body;

	try {
		const post = await postService.createPost(title, content, userId);

		res.json(post);
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
};

exports.deletePost = async (req, res) => {
	const { id } = req.params;

	try {
		await postService.deletePost(id);

		res.json({ message: 'Пост успешно удален.' });
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
};

exports.getPostsByUserId = async (req, res) => {
	const {userId} = req.params;
	try {
		const posts = await postService.getPostsByUserId(userId)
		// if (posts.length === 0) {
		// 	return res.status(404).json({ error: 'Посты не найдены для данного пользователя' });
		// }	
		res.json({posts})
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
}

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await postService.getAllPosts();

		res.json({ posts });
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
}