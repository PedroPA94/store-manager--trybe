const express = require('express');
const { saleController } = require('../controllers');
const validateSaleInput = require('../middlewares/validateSaleInput');

const router = express.Router();

router.post('/', validateSaleInput, saleController.addNewSale);
router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.delete('/:id', saleController.deleteSale);
router.put('/:id', validateSaleInput, saleController.updateSale);

module.exports = router;