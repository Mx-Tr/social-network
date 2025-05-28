const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller')

router.post('/', postController.createPost)
router.delete('/:id', postController.deletePost)
router.get('/fetchAll', postController.getAllPosts)

module.exports = router;