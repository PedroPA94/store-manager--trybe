const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { allProductsFromModel } = require('./mocks/product.service.mock');

describe('A camada service de products:', function () {
  it('Lista corretamente todos os produtos', async function () {
    sinon.stub(productModel, 'findAll').resolves(allProductsFromModel);
    const result = await productService.getAllProducts();
    expect(result.message).to.be.deep.equal(allProductsFromModel);
  });

  it('Falha quando tenta listar produto com id inexistente', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    const error = await productService.getProductById(999);
    expect(error.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(error.message).to.be.equal('Product not found');
  });

  it('Falha se id passado não for válido', async function () {
    const error = await productService.getProductById(0);
    expect(error.type).to.be.equal('INVALID_VALUE');
    expect(error.message).to.be.equal('"id" must be a number');
  });

  it('Lista corretamente um produto com id correto', async function () {
    sinon.stub(productModel, 'findById').resolves(allProductsFromModel[0]);
    const result = await productService.getProductById(1);
    expect(result.message).to.be.deep.equal(allProductsFromModel[0]);
  });

  afterEach(sinon.restore);
});