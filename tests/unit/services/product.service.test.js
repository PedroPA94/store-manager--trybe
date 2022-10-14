const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { allProductsFromModel } = require('./mocks/product.service.mock');

describe('A camada service de products:', function () {

  describe('Testando a listagem de produtos:', function () {
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
  });

  describe('Testando a inserção de um novo produto:', function () {
    it('Falha ao tentar cadastrar produto com menos de 5 caracteres', async function () {
      const error = await productService.createProduct('Erro');
      expect(error.type).to.be.equal('INVALID_VALUE');
      expect(error.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('Cadastra corretamente com nome válido', async function () {
      sinon.stub(productModel, 'insert').resolves(42);
      sinon.stub(productModel, 'findById').resolves({
        id: 42,
        name: 'The answer',
      })
      const result = await productService.createProduct('The answer');
      expect(result.message).to.be.deep.equal({
        id: 42,
        name: 'The answer',
      });
    });
  });

  describe('Testando a atualização de um produto:', function () {
    it('Falha com id inválido', async function () {
      const error = await productService.updateProduct(0, 'Teste');
      expect(error.type).to.be.equal('INVALID_VALUE');
      expect(error.message).to.be.equal('"id" must be a number');
    });

    it('Falha caso o nome do produto tenha menos de 5 caracteres', async function () {
      const error = await productService.updateProduct(1, 'Erro');
      expect(error.type).to.be.equal('INVALID_VALUE');
      expect(error.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('Falha caso o produto não exista', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const error = await productService.updateProduct(999, 'Teste');
      expect(error.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(error.message).to.be.equal('Product not found');
    });

    it('Atualiza corretamente com id e name corretos', async function () {
      sinon.stub(productModel, 'findById').resolves(1);
      sinon.stub(productModel, 'update').resolves();
      const result = await productService.updateProduct(1, 'Teste');
      expect(result.message).to.be.deep.equal({ id: 1, name: 'Teste' });
    });
  });

  describe('Testando deleção de produto:', function () {
    it('Falha com id inválido', async function () {
      const error = await productService.deleteProduct(0);
      expect(error.type).to.be.equal('INVALID_VALUE');
      expect(error.message).to.be.equal('"id" must be a number');
    });

    it('Falha caso o produto não exista', async function () {
      sinon.stub(productModel, 'remove').resolves(0);
      const error = await productService.deleteProduct(999);
      expect(error.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(error.message).to.be.equal('Product not found');
    });

    it('Deleta corretamente um produto com id válido', async function () {
      sinon.stub(productModel, 'remove').resolves(1);
      const result = await productService.deleteProduct(1);
      expect(result.type).to.be.null;
      expect(result.message).to.be.equal('');
    });
  });

  afterEach(sinon.restore);
});