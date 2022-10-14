const sinon = require('sinon');
const { expect } = require('chai');
const { productModel, saleModel, saleProductModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const { newSaleInvalidProductId, newSaleInvalidQuantity, newValidSale, saleById, allSales } = require('./mocks/sale.service.mock');

describe('A camada de service de sales:', function () {

  describe('Testando inserção de nova venda:', function () {
    it('Falha ao tentar inserir venda de produto inexistente', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const error = await saleService.addNewSale(newSaleInvalidProductId);
      expect(error.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(error.message).to.be.equal('Product not found');
    });

    it('Falha ao tentar inserir venda com quantidade menor do que 1', async function () {
      sinon.stub(productModel, 'findById').resolves({});
      const error = await saleService.addNewSale(newSaleInvalidQuantity);
      expect(error.type).to.be.equal('INVALID_VALUE');
      expect(error.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });

    it('Cadastra corretamente uma nova venda com os dados corretos', async function () {
      sinon.stub(productModel, 'findById').resolves({});
      sinon.stub(saleModel, 'insert').resolves(42);
      sinon.stub(saleProductModel, 'insert').resolves();
      const expected = {
        id: 42,
        itemsSold: newValidSale,
      }
      const result = await saleService.addNewSale(newValidSale);
      expect(result.message).to.be.deep.equal(expected);
    });
  });

  describe('Testando listagem de vendas:', function () {
    it('Falha ao tentar passar id inválido', async function () {
      const error = await saleService.getSaleById(0);
      expect(error.type).to.be.equal('INVALID_VALUE');
      expect(error.message).to.be.equal('"id" must be a number');
    });

    it('Falha ao tentar acessar venda com id inexistente', async function () {
      sinon.stub(saleProductModel, 'findById').resolves([]);
      const error = await saleService.getSaleById(999);
      expect(error.type).to.be.equal('SALE_NOT_FOUND');
      expect(error.message).to.be.equal('Sale not found');
    });

    it('Retorna corretamente uma venda pelo seu id', async function () {
      sinon.stub(saleProductModel, 'findById').resolves(saleById);
      const result = await saleService.getSaleById(1);
      expect(result.message).to.be.deep.equal(saleById);
    });

    it('Retorna corretamente a lista de todas as vendas', async function () {
      sinon.stub(saleProductModel, 'findAll').resolves(allSales);
      const result = await saleService.getAllSales();
      expect(result.message).to.be.deep.equal(allSales);
    });

  });
  
  afterEach(sinon.restore);
});