const express = require('express');

const blogsController = require('../controller/blogs');

const router = express.Router();

router.get('/',blogsController.getBlogs);

router.get('/:id', blogsController.getbyid);

router.post('/update/:id', blogsController.update);

router.post('/delete/:id', blogsController.deleteid);

router.post('/',blogsController.createNew);

module.exports = router;