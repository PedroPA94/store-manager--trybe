const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');

describe('A camada model de sales:', function () {
  it('Insere corretamente uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await saleModel.insert();
    expect(result).to.be.equal(42);
  });

  afterEach(sinon.restore);
});