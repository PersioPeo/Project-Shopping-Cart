require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('1 - Teste se fetchItem é uma função;', async () => {
    expect(typeof fetchItem).toEqual('function');
  });
  it('2 - Execute a função fetchItem com o argumento do item "MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  })
  it('3 - Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";', async () => {
    await fetchItem('MLB1615760527');
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('4 -Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto', async () => {
    const retornaItem = await fetchItem ('MLB1615760527');
    expect(retornaItem).toEqual(item);
  })
  it('5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect(await fetchItem ()).toEqual(new Error('You must provide an url'));
  })

});