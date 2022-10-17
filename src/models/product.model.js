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

const update = async (updatedProduct) => {
  const [{ affectedRows }] = await conn.execute(
    `UPDATE StoreManager.products
        SET name = ?
      WHERE id = ?`,
    [updatedProduct.name, updatedProduct.id],
  );

  return affectedRows;
};

const remove = async (id) => {
  const [{ affectedRows }] = await conn.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
);

  return affectedRows;
};

const query = async (queryTerm) => {
  const [products] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE CONCAT("%", ?, "%")',
    [queryTerm],
  );

  return products;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
  query,
};