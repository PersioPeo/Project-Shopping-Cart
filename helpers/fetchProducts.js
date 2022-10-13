const fetchProducts = async (QUERY) => {
  try {
    const url = await `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
    const pegarUrl = await fetch(url);
    const promes = pegarUrl.json();
    const promessaJson = await promes;
    const { results } = promessaJson;
     return results;
  } catch (error) {
    return new Error('You must provide an url');
  } 
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
