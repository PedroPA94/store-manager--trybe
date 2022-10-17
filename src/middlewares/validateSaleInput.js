module.exports = async (req, res, next) => {
  const newSale = req.body;

  const noProductIdField = newSale
    .some((item) => item.productId === undefined);
  
  if (noProductIdField) return res.status(400).json({ message: '"productId" is required' });

  const noQuantityField = newSale
    .some((item) => item.quantity === undefined);

  if (noQuantityField) return res.status(400).json({ message: '"quantity" is required' });

  next();
};