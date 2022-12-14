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

const okResponseNewProduct = {
  type: null,
  message: {
    id: 42,
    name: 'Special product',
  },
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

const okResponseUpdatedProduct = {
  type: null,
  message: {
    id: 1,
    name: 'Teste',
  },
};

module.exports = {
  allProductsFromService,
  okResponseAllProducts,
  okResponseNewProduct,
  badResponseNoProductId,
  badResponseInvalidId,
  okResponseProductById,
  okResponseUpdatedProduct,
}