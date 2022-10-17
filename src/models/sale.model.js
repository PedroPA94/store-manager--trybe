const conn = require('./connection');

const insert = async () => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  
  return insertId;
};

const remove = async (id) => {
  const [{ affectedRows }] = await conn.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return affectedRows;
};

module.exports = {
  insert,
  remove,
};