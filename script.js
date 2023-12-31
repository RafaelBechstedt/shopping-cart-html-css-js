const cartItems = document.querySelector('.cart__items');

const somaItens = () => {
  const itens = document.querySelectorAll('.cart__item');
  let soma = 0;
  itens.forEach((item) => {
    soma += Number(item.textContent.split('$')[1]);
  });
  return soma;
};

const totalPrice = () => {
 document.querySelector('.total-price').innerText = somaItens();
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
  totalPrice();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const productListing = async () => {
  const data = await fetchProducts('computador');
  const { results } = data;
  results.forEach((result) => {
    const productObject = {
      sku: result.id,
      name: result.title,
      image: result.thumbnail,
    };
    const productItemElement = createProductItemElement(productObject);
    document.querySelector('.items').appendChild(productItemElement);
  });
};

const addProductToCart = async (item) => {
  const itemId = getSkuFromProductItem(item.target.parentNode);
  const itemObject = await fetchItem(itemId);
  const { id: sku, title: name, price: salePrice } = itemObject;
  cartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
  saveCartItems(cartItems.innerHTML);
  totalPrice();
};

const buttonItem = async () => {
  const getButtons = document.querySelectorAll('.item__add');
  getButtons.forEach((button) => {
    button.addEventListener('click', addProductToCart);
  });
};

const clearCart = () => {
  cartItems.innerHTML = '';
  saveCartItems(cartItems.innerHTML);
  totalPrice();
};

const buttonClearCart = () => {
  document.querySelector('.empty-cart').addEventListener('click', clearCart);
  saveCartItems(cartItems.innerHTML);
};

const addLoadingText = () => {
  const getTextSection = document.querySelector('.items');
  const text = document.createElement('h1');
  text.textContent = 'carregando...';
  text.classList.add('loading');
  getTextSection.appendChild(text);
};

const removeLoadingText = () => {
  document.querySelector('.loading').remove();
};

window.onload = async () => {
  addLoadingText();
  await productListing();
  removeLoadingText();
  buttonItem();
  buttonClearCart();
};
