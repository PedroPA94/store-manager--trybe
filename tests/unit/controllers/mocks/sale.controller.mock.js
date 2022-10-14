const { getAllSales } = require("../../../../src/services/sale.service");

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
]

const badResponseNoProductId = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
};

const badResponseInvalidQuantity = {
  type: 'INVALID_VALUE',
  message: '"quantity" must be greater than or equal to 1',
};

const goodResponseNewSale = {
  type: null,
  message: newSaleValidReturn,
};

const goodResponseAllSales = {
  type: null,
  message: allSales,
};

const goodResponseSaleById = {
  type: null,
  message: saleById,
};

const badResponseNoSaleId = {
  type: 'SALE_NOT_FOUND',
  message: 'Sale not found',
};

module.exports = {
  badResponseNoProductId,
  badResponseInvalidQuantity,
  newSaleBadProductId,
  newSaleBadQuantity,
  newSaleValid,
  newSaleValidReturn,
  goodResponseNewSale,
  allSales,
  saleById,
  goodResponseAllSales,
  badResponseNoSaleId,
  goodResponseSaleById,
};
