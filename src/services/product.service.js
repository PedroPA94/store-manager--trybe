const { productModel } = require('../models');
const { validateId, validateProductName } = require('./validations/validationsInputs');

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

const createProduct = async (productName) => {
  const validation = validateProductName(productName);
  if (validation.type) return validation;

  const newProductId = await productModel.insert(productName);
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};