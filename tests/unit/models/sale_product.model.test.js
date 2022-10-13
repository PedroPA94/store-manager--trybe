const sinon = require('sinon');
const { expect } = require('chai');
const { saleProductModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

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

  afterEach(sinon.restore);
});