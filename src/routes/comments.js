const express = require('express');

const commentController = require('../controller/comments');

const router = express.Router();

router.post('/' ,commentController.createNew);



module.exports = router;