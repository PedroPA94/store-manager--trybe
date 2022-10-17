const { saleModel, saleProductModel } = require('../models');
const {
  validateNewSale,
  validateId,
  validateSaleUpdate,
} = require('./validations/validationsInputs');

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

const deleteSale = async (id) => {
  const validation = validateId(id);
  if (validation.type) return validation;

  const affectedRows = await saleModel.remove(id);
  if (affectedRows > 0) return { type: null, message: '' };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const updateSale = async (id, saleToUpdate) => {
  const validation = await validateSaleUpdate(id, saleToUpdate);
  if (validation.type) return validation;

  const updatingSale = saleToUpdate.map(
    async ({ productId, quantity }) => saleProductModel.update({ saleId: id, productId, quantity }),
  );
  await Promise.all(updatingSale);

  const updatedSale = { saleId: id, itemsUpdated: saleToUpdate };

  return { type: null, message: updatedSale };
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};