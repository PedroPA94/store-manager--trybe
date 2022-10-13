const { saleModel, saleProductModel } = require('../models');
const { validateNewSale } = require('./validations/validationsInputs');

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

module.exports = {
  addNewSale,
};