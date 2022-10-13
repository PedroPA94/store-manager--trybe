const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const addNewSale = async (req, res) => {
  const newSale = req.body;
  const { type, message } = await saleService.addNewSale(newSale);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  addNewSale,
};