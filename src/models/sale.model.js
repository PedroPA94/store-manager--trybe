const conn = require('./connection');

const insert = async () => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  
  return insertId;
};

module.exports = {
  insert,
};