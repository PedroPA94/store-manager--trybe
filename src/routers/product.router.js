const express = require('express');
const { productController } = require('../controllers');
const validateProductNameInput = require('../middlewares/validateProductNameInput');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateProductNameInput, productController.createProduct);
router.put('/:id', validateProductNameInput, productController.updateProduct);

module.exports = router;