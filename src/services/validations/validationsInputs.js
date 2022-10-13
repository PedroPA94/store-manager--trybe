const { productModel } = require('../../models');
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

module.exports = {
  validateId,
  validateProductName,
  validateNewSale,
};