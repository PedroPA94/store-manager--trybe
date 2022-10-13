const newSaleInvalidProductId = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 999,
    quantity: 1,
  },
];

const newSaleInvalidQuantity = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 999,
    quantity: 0,
  },
];

const newValidSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 2,
  },
];

module.exports = {
  newSaleInvalidProductId,
  newSaleInvalidQuantity,
  newValidSale,
};