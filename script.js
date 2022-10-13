const itemsDoCarrinho = document.querySelector('.cart__items'); // seleciona os itens do carrinho
const emptyCart = document.querySelector('.empty-cart'); // seleciona o botão de remover
const items = document.querySelector('.items'); // seleciona os items do site  
const sectionCarregando = document.createElement('section'); // cria uma tag section
sectionCarregando.className = 'loading'; // coloca o texto loading na section carregando
items.appendChild(sectionCarregando); // colaca section caregando dentro de item
const dadosDoCarrinho = document.getElementsByClassName('cart__item'); 
const cart = document.querySelector('.cart'); // seleciona a seção do items do carrinho
const sectionTotal = document.createElement('section'); // 
sectionTotal.className = 'total-price';
// fim das variaveis globais
cart.appendChild(sectionTotal);

const somarPreco = () => { // ref: de codigo com José cleiton Turma-19-C 
  const itemCarrinho = document.querySelectorAll('.cart__item');
  let total = 0;
  itemCarrinho.forEach((prod) => {
    const posicao = (prod.innerText.indexOf('| PRICE: $')) + 10;
    total += Number((prod.innerText.substr(posicao)));
  });

  return total;
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(itemsDoCarrinho.innerHTML);
  sectionTotal.innerText = somarPreco();
}
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// function getSkuFromProductItem(item) {
// return item.querySelector('span.item__sku').innerText;
// } 

const adicinaNoCarrinho = async () => { // adiciona no carrinho
  const listaDeItems = document.querySelectorAll('.item');
  listaDeItems.forEach((itemAtual) => {
    const btn = itemAtual.querySelector('.item__add');
    const id = itemAtual.querySelector('.item__sku').innerText;
    btn.addEventListener('click', async () => { 
      const dados = await fetchItem(id);
      const sku = dados.id;
      const name = dados.title;
      const salePrice = Number(dados.price);
      const objProdutos = { sku, name, salePrice };
      itemsDoCarrinho.appendChild(createCartItemElement(objProdutos)); // criando filho
      sectionTotal.innerText = somarPreco();      
      saveCartItems(itemsDoCarrinho.innerHTML);      
    });
  });
};

emptyCart.addEventListener('click', () => { 
  itemsDoCarrinho.innerHTML = '';
  localStorage.removeItem('cartItems');
});

const colocarProdutos = async () => {
  const dadosAColocar = await fetchProducts('computador');
    const pai = document.querySelector('.items');

  dadosAColocar.forEach((prod) =>
      pai.appendChild(
        createProductItemElement({ sku: prod.id, name: prod.title, image: prod.thumbnail }),
));
};

const apagaItemCarrinho = () => {
  for (let i = 0; i < dadosDoCarrinho.length; i += 1) {
    dadosDoCarrinho[i].addEventListener('click', (event) => {
      cartItemClickListener(event);
    });
  }
};

  itemsDoCarrinho.innerHTML = '';
window.onload = async () => {
  sectionCarregando.innerText = 'carregando...'; 
  await colocarProdutos();
  sectionCarregando.remove();
  await adicinaNoCarrinho();
  await getSavedCartItems();
  itemsDoCarrinho.innerHTML = getSavedCartItems();
  await apagaItemCarrinho();
  sectionTotal.innerText = somarPreco();
};