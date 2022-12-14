const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const { newSaleBadProductId, badResponseNoProductId, newSaleBadQuantity, badResponseInvalidQuantity, newSaleValid, goodResponseNewSale, newSaleValidReturn, goodResponseAllSales, allSales, badResponseNoSaleId, goodResponseSaleById, saleById } = require('./mocks/sale.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('A camada de controller de sales:', function () {

  describe('Testando inserção de vendas:', function () {
    it('Falha com status 404 ao tentar inserir uma venda com id de produto inválido', async function () {
      const res = {};
      const req = { body: newSaleBadProductId };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'addNewSale').resolves(badResponseNoProductId);

      await saleController.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Falha com status 422 ao tentar inserir uma venda com quantidade menor do que 1', async function () {
      const res = {};
      const req = { body: newSaleBadQuantity };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'addNewSale').resolves(badResponseInvalidQuantity);

      await saleController.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Retorna corretamente com nova venda válida', async function () {
      const res = {};
      const req = { body: newSaleValid };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'addNewSale').resolves(goodResponseNewSale);

      await saleController.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSaleValidReturn);
    });
  });
  
  describe('Testando listagem de vendas:', function () {
    it('Responde com status 200 e todas as vendas', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'getAllSales').resolves(goodResponseAllSales);

      await saleController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });

    it('Falha com erro 404 e mensagem correta para id não existente', async function () {
      const res = {};
      const req = { params: { id: 999 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'getSaleById').resolves(badResponseNoSaleId);

      await saleController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Retorna com satus 200 e vendas com o id correto', async function () {
      const res = {};
      const req = { params: { id: 1 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'getSaleById').resolves(goodResponseSaleById);

      await saleController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleById);
    });
  });

  describe('Testando deleção de uma venda:', function () {
    it('Falha e responde com erro 422 para id inválido', async function () {
      const res = {};
      const req = { params: { id: 0 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('Falha e responde com erro 404 para id inexistente', async function () {
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'deleteSale').resolves(badResponseNoSaleId);

      await saleController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Deleta corretamente um produto com id válido', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      sinon.stub(saleService, 'deleteSale').resolves({ type: null, message: '' });

      await saleController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.called;
    });
  });

  describe('Testando atualização de uma venda:', function () {
    it('Falha com status 404 ao tentar inserir uma venda com id de produto inválido', async function () {
      const res = {};
      const req = { body: newSaleBadProductId, params: { id: 1 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'updateSale').resolves(badResponseNoProductId);

      await saleController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Falha com status 422 ao tentar inserir uma venda com quantidade menor do que 1', async function () {
      const res = {};
      const req = { body: newSaleBadQuantity, params: { id: 1 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'updateSale').resolves(badResponseInvalidQuantity);

      await saleController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Retorna corretamente com nova venda válida', async function () {
      const res = {};
      const req = { body: newSaleValid, params: { id: 1 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'updateSale').resolves(goodResponseNewSale);

      await saleController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newSaleValidReturn);
    });
  });

  afterEach(sinon.restore);
});