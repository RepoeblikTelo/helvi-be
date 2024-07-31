const express = require('express');

const productController = require('../controller/products');
const upload = require('../middleware/multer');

const router = express.Router();

router.get('/',productController.getAllProducts);
router.get('/',productController.searchProduct);
router.get('/:productId', productController.getProduct);
router.post('/update/:productId', upload.single('image'), productController.updateProduct);
router.post('/', upload.single('image'), productController.addProduct);
router.delete('/:productId',productController.deleteProduct);

module.exports = router;