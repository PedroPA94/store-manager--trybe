const sinon = require('sinon');
const { expect } = require('chai');
const { saleProductModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allSales, saleById } = require('./mocks/sale_product.model.mock');

describe('A camada de model de sales_products:', function () {
  it('Insere corretamente uma nova venda e produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const newEntry = {
      productId: 1,
      saleId: 1,
      quantity: 2,
    }
    const result = await saleProductModel.insert(newEntry);
    expect(result).to.be.equal(42);
  });

  it('Lista corretamente todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const result = await saleProductModel.findAll();
    expect(result).to.be.deep.equal(allSales);
  });

  it('Retorna corretamente uma venda pelo seu id', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);
    const result = await saleProductModel.findById(1);
    expect(result).to.be.deep.equal(saleById);
  });

  afterEach(sinon.restore);
});