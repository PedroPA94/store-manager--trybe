const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { allProductsFromService, okResponseAllProducts, badResponseNoProductId, okResponseProductById, badResponseInvalidId, okResponseNewProduct, okResponseUpdatedProduct } = require('./mocks/product.controller.mock');

describe('A camada controller de products:', function () {

  describe('Testando listagem de produtos:', function () {
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
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Falha com status 422 para id inválido', async function () {
      sinon.stub(productService, 'getProductById').resolves(badResponseInvalidId);
      const res = {};
      const req = { params: { id: 0 } };

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
  });

  describe('Testando inserção de novo produto:', function () {
    it('Falha ao tentar inserir produto com nome inválido', async function () {
      const res = {};
      const req = { body: { name: 'Erro' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('Insere corretamente com nome válido', async function () {
      sinon.stub(productService, 'createProduct').resolves(okResponseNewProduct);
      const res = {};
      const req = { body: { name: 'Special product' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 42,
        name: 'Special product'
      });
    });
  });

  describe('Testando atualização de um produto', function () {
    it('Falha e responde com erro 422 para id inválido', async function () {
      const res = {};
      const req = { params: { id: 0 }, body: { name: 'Teste' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('Falha e responde com erro 422 para nome inválido', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: 'Erro' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('Falha e responde com erro 404 para id inexistente', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: 'Erro' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'updateProduct').resolves(badResponseNoProductId);

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Responde corretamente para produto atualizado', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: 'Teste' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'updateProduct').resolves(okResponseUpdatedProduct);

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
          id: 1,
          name: 'Teste'
      });
    });
  });

  afterEach(sinon.restore);
});