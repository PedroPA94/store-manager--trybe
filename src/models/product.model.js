const conn = require('./connection');

const findAll = async () => {
  const [products] = await conn.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );

  return products;
};

const findById = async (id) => {
  const [[product]] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return product;
};

const insert = async (productName) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [productName],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};