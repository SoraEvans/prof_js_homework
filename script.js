const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
  return new Promise(resolve => {
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(xhr.responseText);
      }
    }
    xhr.open('GET', url, true);
    xhr.send();
  });
}

class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `
      <div class="product_card">
        <h3 class="product_title">${this.title}</h3>
        <p class="product_price">${this.price}$</p>
        <button data-action="add" class="product_button">Добавить</button>
      </div>
    `
  }
}

class GoodsList {
  constructor(elem) {
    this.goods = [];
    elem.onclick = this.onClick.bind(this);
  }

  fetchGoods() {
    return new Promise(resolve => resolve(
      makeGETRequest(`${API_URL}/catalogData.json`).then(res => this.goods = JSON.parse(res))
    ))
  }

  render() {
    let listHtml = '';
    this.goods.forEach(({ product_name, price }) => {
      const goodItem = new GoodsItem(product_name, price);
      listHtml += goodItem.render();
    });
    console.log('All price: ', this.getSumPrice())
    document.querySelector('.products').innerHTML = listHtml
  }

  add() {
    makeGETRequest(`${API_URL}/addToBasket.json?id=1`);
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action]();
    }
  }

  getSumPrice() {
    return this.goods.reduce((sum, { price }) => sum + price, 0)
  }
}

class CartItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  render = () => `
    <div class="cart_product_card">
      <h3 class="cart_product_title">${this.title}</h3>
      <p class="cart_product_price">${this.price}$</p>
      <button class="cart_product_button">Удалить</button>
    </div>
  `;
}

class CartList {
  constructor() {
    this.carts = [];
  }

  fetchCarts() {
    makeGETRequest(`${API_URL}/getBasket.json`).then(res => console.log(res))
  }

  removeCart() {
    makeGETRequest(`${API_URL}/deleteFromBasket.json`).then(res => console.log(res))
  }

  render() {
    let listHtml = '';
    this.carts.forEach(({ title, price }) => {
      const item = new CartItem(title, price);
      listHtml += item.render();
    });
    document.querySelector('.cart-list').innerHTML = listHtml;
  }
}

const elem = document.querySelector('.products')

const list = new GoodsList(elem);

list.fetchGoods().then(() => list.render());
