const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateSaleInput = require('../../../src/middlewares/validateSaleInput');

const { expect } = chai;
chai.use(sinonChai);

describe('O middleware de validação de nova venda:', function () {
  it('Falha ao tentar inserir uma venda sem id de produto', async function () {
    const res = {};
    const req = { body: [{}] };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateSaleInput(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Falha ao tentar inserir uma venda sem quantidade', async function () {
    const res = {};
    const req = { body: [{ productId: 1 }] };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateSaleInput(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  afterEach(sinon.restore);
});