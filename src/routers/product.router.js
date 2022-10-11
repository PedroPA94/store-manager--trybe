const express = require('express');
const { productController } = require('../controllers');
const validateNewProductInputs = require('../middlewares/validateNewProductInputs');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateNewProductInputs, productController.createProduct);

module.exports = router;