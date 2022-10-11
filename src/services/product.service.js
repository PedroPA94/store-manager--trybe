const { productModel } = require('../models');
const { validateId } = require('./validations/validationsInputs');

const getAllProducts = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const validation = validateId(id);
  if (validation.type) return validation;

  const product = await productModel.findById(id);

  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getAllProducts,
  getProductById,
};