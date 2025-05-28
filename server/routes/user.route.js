const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const postController = require('../controllers/post.controller');

router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getUser);
router.get('/:userId/posts', postController.getPostsByUserId);
router.get('/all', userController.getAllUsers);

module.exports = router;
