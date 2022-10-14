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

const saleById = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-10-14T18:05:13.000Z"
  },
  {
    "productId": 1,
    "quantity": 10,
    "date": "2022-10-14T18:05:13.000Z"
  },
];

const allSales = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-10-14T18:05:13.000Z"
  },
  {
    "productId": 1,
    "quantity": 10,
    "date": "2022-10-14T18:05:13.000Z"
  },
  {
    "productId": 2,
    "quantity": 15,
    "date": "2022-10-14T18:05:13.000Z"
  },
];

module.exports = {
  newSaleInvalidProductId,
  newSaleInvalidQuantity,
  newValidSale,
  saleById,
  allSales,
};