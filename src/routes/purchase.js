const express = require('express');

const purchaseController = require('../controller/purchase');

const router = express.Router();

router.get('/all', purchaseController.getAllPurchase);
router.post('/', purchaseController.savePurchase);
router.post('/update/:purchaseId', purchaseController.updatePurchaseStatus);

module.exports = router;