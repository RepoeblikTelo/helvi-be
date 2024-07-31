const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

router.get('/:userId/histories',userController.getUserPurchase);

module.exports = router;