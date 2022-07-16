require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Testa se fetchProducts com argumento "computador" chama fetch', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa se fetchProducts com argumento "computador" utiliza endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Testa se fetchProducts com argumento "computador "é uma estrutura de dados igual ao objeto computadorSearch', () => {
    expect(fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('Testa se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem "You must provide an url"', () => {
    expect(fetchProducts()).toEqual(new Error('You must provide an url'));
  });

});