const conn = require('./connection');

const insert = async (newSale) => {
  const [{ insertId }] = await conn.execute(
    `INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity)
     VALUES (?, ?, ?)`,
    [newSale.productId, newSale.saleId, newSale.quantity],
  );

  return insertId;
};

module.exports = {
  insert,
};