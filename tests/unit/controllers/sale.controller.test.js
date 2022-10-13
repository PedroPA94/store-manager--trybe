const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const { newSaleBadProductId, badResponseNoProductId, newSaleBadQuantity, badResponseInvalidQuantity, newSaleValid, goodResponse, newSaleValidReturn } = require('./mocks/sale.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('A camada de controller de sales:', function () {
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

    sinon.stub(saleService, 'addNewSale').resolves(goodResponse);

    await saleController.addNewSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSaleValidReturn);
  });

  afterEach(sinon.restore);
});