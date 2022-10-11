const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProductsFromDB } = require('./mocks/product.model.mock');

describe('A camada model de products:', function () {
  it('Retorna corretamente uma lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves(allProductsFromDB);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(allProductsFromDB);
  });

  it('Retorna corretamente um produto pelo seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProductsFromDB[0]]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(allProductsFromDB[0]);
  });

  afterEach(sinon.restore);
});