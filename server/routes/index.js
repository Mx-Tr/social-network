const express = require('express');

const usersRoute = require('./user.route');
const postsRoute = require('./post.route');

const router = express.Router();

router.use('/users', usersRoute)
router.use('/posts', postsRoute)

module.exports = router;