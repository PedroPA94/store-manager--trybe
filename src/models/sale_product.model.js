const camelize = require('camelize');
const conn = require('./connection');

const insert = async (newSale) => {
  const [{ insertId }] = await conn.execute(
    `INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity)
     VALUES (?, ?, ?)`,
    [newSale.productId, newSale.saleId, newSale.quantity],
  );

  return insertId;
};

const findAll = async () => {
  const [sales] = await conn.execute(
    `SELECT sp.*, s.date
       FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
      ORDER BY sp.sale_id ASC, sp.product_id ASC`,
  );

  return camelize(sales);
};

const findById = async (id) => {
  const [sale] = await conn.execute(
    `SELECT sp.product_id, sp.quantity, s.date
       FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
      WHERE sp.sale_id = ?
      ORDER BY sp.sale_id ASC, sp.product_id ASC`,
    [id],
  );

  return camelize(sale);
};

const update = async ({ saleId, productId, quantity }) => {
  const [{ affectedRows }] = await conn.execute(
    `UPDATE StoreManager.sales_products
        SET quantity = ?
      WHERE sale_id = ? AND product_id = ?`,
    [quantity, saleId, productId],
  );

  return affectedRows;
};

module.exports = {
  insert,
  findAll,
  findById,
  update,
};