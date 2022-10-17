const { productModel, saleProductModel } = require('../../models');
const { idSchema, nameSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateProductName = (productName) => {
  const { error } = nameSchema.validate(productName);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  }

  return { type: null, message: '' };
};

const validateNewSale = async (newSale) => {
  const checkProducts = newSale
    .map(async ({ productId }) => productModel.findById(productId));

  const invalidProducts = await (await Promise.all(checkProducts))
    .some((product) => product === undefined);

  if (invalidProducts) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const invalidQuantites = newSale.some(({ quantity }) => quantity < 1);

  if (invalidQuantites) {
    return { type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' };
  }

  return { type: null, message: '' };
};

const validateProductUpdate = async (id, productName) => {
  let error = validateId(id);
  if (error.type) return error;

  error = validateProductName(productName);
  if (error.type) return error;

  const validProduct = await productModel.findById(id);
  if (validProduct) return { type: null, message: '' };

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const validateSaleUpdate = async (id, saleToUpdate) => {
  let error = validateId(id);
  if (error.type) return error;

  error = await validateNewSale(saleToUpdate);
  if (error.type) return error;

  const validSale = await saleProductModel.findById(id);
  if (validSale.length >= 1) return { type: null, message: '' };

  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  validateId,
  validateProductName,
  validateNewSale,
  validateProductUpdate,
  validateSaleUpdate,
};