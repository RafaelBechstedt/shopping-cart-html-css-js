const fetchProducts = async (product) => {
  try {
    if (!product) throw new Error('You must provide an url');
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
