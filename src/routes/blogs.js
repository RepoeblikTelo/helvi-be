const express = require('express');

const blogsController = require('../controller/blogs');

const router = express.Router();

router.get('/',blogsController.getBlogs);

router.get('/:id', blogsController.getbyid);

router.post('/:id', blogsController.update);



module.exports = router;