const newSaleBadProductId = [
  {
    productId: 999,
    quantity: 1,
  }
];

const newSaleBadQuantity = [
  {
    productId: 1,
    quantity: 0,
  }
];

const newSaleValid = [
  {
    productId: 1,
    quantity: 1,
  }
];

const newSaleValidReturn = {
  id: 42,
  itemsSold: newSaleValid,
}

const badResponseNoProductId = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
};

const badResponseInvalidQuantity = {
  type: 'INVALID_VALUE',
  message: '"quantity" must be greater than or equal to 1',
};

const goodResponse = {
  type: null,
  message: newSaleValidReturn,
}

module.exports = {
  badResponseNoProductId,
  badResponseInvalidQuantity,
  newSaleBadProductId,
  newSaleBadQuantity,
  newSaleValid,
  newSaleValidReturn,
  goodResponse,
}
