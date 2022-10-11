const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { allProductsFromService, okResponseAllProducts, badResponseNoProductId, okResponseProductById, badResponseInvalidId } = require('./mocks/product.controller.mock');

describe('A camada controller de products:', function () {
  it('Responde corretamente a requisição para listar produtos', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(okResponseAllProducts);
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsFromService);
  });

  it('Falha com status 404 para produto com id inexistente', async function () {
    sinon.stub(productService, 'getProductById').resolves(badResponseNoProductId);
    const res = {};
    const req = { params: { id: 999 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Falha com status 422 para id inválido', async function () {
    sinon.stub(productService, 'getProductById').resolves(badResponseInvalidId);
    const res = {};
    const req = { params: { id: 0 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
  });

  it('Responde corretamente com um id de produto existente', async function () {
    sinon.stub(productService, 'getProductById').resolves(okResponseProductById);
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsFromService[0]);
  });

  afterEach(sinon.restore);
});