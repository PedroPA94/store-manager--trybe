const { productModel } = require('../models');
const {
  validateId,
  validateProductName,
  validateProductUpdate,
} = require('./validations/validationsInputs');

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

const updateProduct = async (id, productName) => {
  const validation = await validateProductUpdate(id, productName);
  if (validation.type) return validation;

  const updatedProduct = { id, name: productName };
  await productModel.update(updatedProduct);

  return { type: null, message: updatedProduct };
};

const deleteProduct = async (id) => {
  const validation = validateId(id);
  if (validation.type) return validation;

  const affectedRows = await productModel.remove(id);
  if (affectedRows > 0) return { type: null, message: '' };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const queryProduct = async (queryTerm) => {
  const queryResult = await productModel.query(queryTerm);
  return { type: null, message: queryResult };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  queryProduct,
};