const express = require('express');
const { saleController } = require('../controllers');
const validateNewSaleInput = require('../middlewares/validateNewSaleInput');

const router = express.Router();

router.post('/', validateNewSaleInput, saleController.addNewSale);

module.exports = router;