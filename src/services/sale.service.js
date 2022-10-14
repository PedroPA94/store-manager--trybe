const { saleModel, saleProductModel } = require('../models');
const { validateNewSale, validateId } = require('./validations/validationsInputs');

const addNewSale = async (newSale) => {
  const error = await validateNewSale(newSale);
  if (error.type) return error;

  const saleId = await saleModel.insert();

  const addingSales = newSale.map(
    async ({ productId, quantity }) => saleProductModel.insert({ saleId, productId, quantity }),
  );
  await Promise.all(addingSales);

  const addedSale = { id: saleId, itemsSold: newSale };

  return { type: null, message: addedSale };
};

const getAllSales = async () => {
  const sales = await saleProductModel.findAll();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const validation = validateId(id);
  if (validation.type) return validation;

  const sale = await saleProductModel.findById(id);
  if (sale.length >= 1) return { type: null, message: sale };

  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
};