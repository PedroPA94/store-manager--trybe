const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProductsFromDB } = require('./mocks/product.model.mock');

describe('A camada model de products:', function () {
  it('Retorna corretamente uma lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDB]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(allProductsFromDB);
  });

  it('Retorna corretamente um produto pelo seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProductsFromDB[0]]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(allProductsFromDB[0]);
  });

  it('Insere corretamente um produto novo', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await productModel.insert('Definitive answer');
    expect(result).to.be.equal(42);
  });

  it('Atualiza corretamente um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productModel.update({ id: 1, name: 'Teste' });
    expect(result).to.be.equal(1);
  });

  it('Deleta corretamente um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productModel.remove(1);
    expect(result).to.be.equal(1);
  });

  afterEach(sinon.restore);
});