const fetchItem = async (id) => {
  
  try {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const resp = await fetch(url);
    const data = resp.json();
    return data;
} catch (error) {
    return new Error('You must provide an url');
}  
}; 

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };  
}
