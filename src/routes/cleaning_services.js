const express = require('express');

const cleaning_servicesController = require('../controller/cleaning_services');

const router = express.Router();

router.post('/',cleaning_servicesController.createNew);
router.post('/delete/:id',cleaning_servicesController.deleteid);
router.post('/update/:id',cleaning_servicesController.update);
router.get('/',cleaning_servicesController.getcleaningservices);
router.get('/:id',cleaning_servicesController.getbyid);


module.exports = router;