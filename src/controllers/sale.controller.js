const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const addNewSale = async (req, res) => {
  const newSale = req.body;
  const { type, message } = await saleService.addNewSale(newSale);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const { type, message } = await saleService.getAllSales();

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleService.deleteSale(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).end();
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
  deleteSale,
};