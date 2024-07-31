const express = require('express');

const blogsController = require('../controller/educations');

const router = express.Router();

router.get('/',blogsController.getEducations);

router.get('/:id', blogsController.getbyid);

router.post('/update/:id', blogsController.update);

router.post('/delete/:id', blogsController.deleteid);

router.post('/',blogsController.createNew);

module.exports = router;