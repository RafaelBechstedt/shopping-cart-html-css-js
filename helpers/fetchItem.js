const fetchItem = async (item) => {
  try {
    if (!item) throw new Error('You must provide an url');
    const url = `https://api.mercadolibre.com/items/${item}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
