const express = require('express');
const { saleController } = require('../controllers');
const validateNewSaleInput = require('../middlewares/validateNewSaleInput');

const router = express.Router();

router.post('/', validateNewSaleInput, saleController.addNewSale);
router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);

module.exports = router;