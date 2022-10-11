const allProductsFromService = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const okResponseAllProducts = {
  type: null,
  message: allProductsFromService,
};

const badResponseNoProductId = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
};

const badResponseInvalidId = {
  type: 'INVALID_VALUE',
  message: '"id" must be a number',
};

const okResponseProductById = {
  type: null,
  message: allProductsFromService[0]
};

module.exports = {
  allProductsFromService,
  okResponseAllProducts,
  badResponseNoProductId,
  badResponseInvalidId,
  okResponseProductById,
}