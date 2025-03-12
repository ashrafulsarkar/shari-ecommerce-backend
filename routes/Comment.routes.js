const express = require('express');
const router = express.Router();

const commentController = require('../controller/comment.controller');


router.get('/:blogId', commentController.getCommentByBlogId);
router.post('/store', commentController.createComment);

module.exports = router;