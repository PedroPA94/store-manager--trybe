const express = require('express');
const { productController } = require('../controllers');
const validateProductNameInput = require('../middlewares/validateProductNameInput');

const router = express.Router();

router.get('/search', productController.queryProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateProductNameInput, productController.createProduct);
router.put('/:id', validateProductNameInput, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;