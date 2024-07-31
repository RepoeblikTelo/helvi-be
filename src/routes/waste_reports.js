const express = require('express');

const waste_reportsController = require('../controller/waste_reports');

const router = express.Router();

router.post('/',waste_reportsController.createNew);
router.post('/update/:id',waste_reportsController.update);
router.post('/delete/:id',waste_reportsController.deleteid);

router.get('/',waste_reportsController.getwastereports);
router.get('/:id',waste_reportsController.getbyid);

module.exports = router;