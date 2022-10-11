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

module.exports = {
  findAll,
  findById,
};