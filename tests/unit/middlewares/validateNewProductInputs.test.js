const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateNewProductInputs = require('../../../src/middlewares/validateNewProductInputs');

const { expect } = chai;
chai.use(sinonChai);

describe('O middleware de vaidação do nome do produto:', function () {
  it('Falha ao tentar criar um produto sem nome', async function () {
    const res = {};
    const req = {
      body: {},
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateNewProductInputs(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
});