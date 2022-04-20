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

  render = () => `
    <div class="product_card">
      <h3 class="product_title">${this.title}</h3>
      <p class="product_price">${this.price}$</p>
      <button class="product_button">Добавить</button>
    </div>
  `
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods = () => new Promise(resolve => resolve(
    makeGETRequest(`${API_URL}/catalogData.json`).then(res => this.goods = JSON.parse(res))
  ))

  render = () => new Promise(resolve => {
    let listHtml = '';
    this.goods.forEach(({ product_name, price }) => {
      const goodItem = new GoodsItem(product_name, price);
      listHtml += goodItem.render();
    });
    resolve(document.querySelector('.products').innerHTML = listHtml);
  })

  getSumPrice() {
    console.log(this.goods.reduce((sum, { price }) => sum + price, 0))
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

const list = new GoodsList();

list.fetchGoods()
  .then(() => list.render()
    .then(() => document.querySelectorAll('.product_button').forEach(item =>
      item.addEventListener('click', () => makeGETRequest(`${API_URL}/addToBasket.json?id=1`))
    ))
  );

list.getSumPrice()

// Homework 4

const useRegExp = () => {
  const regExp = /^'|(\s)'|'(\s)|'$/g;
  const test = `testtesttest ' testtest ' test' testtest'' 
    testtesttest ' test ' '' ' test'test aren't`
  console.log(test.replace(regExp, '$1"$2'))
}
useRegExp()


const form = document.querySelector('form');
const errorText = document.getElementsByClassName('error-text');
const inputArea = document.getElementsByClassName('form-box__area');
const btnSubmit = form.elements.submitButton;

const clearErrorText = () => {
  for (let n = 0; n < errorText.length; n++) {
    errorText[n].innerText = ' ';
  }
};

const clearErrors = () => {
  for (let n = 0; n < inputArea.length; n++) {
    let classList = inputArea[n].classList;

    clearErrorText();
    if (classList.contains('input_error')) {
      classList.remove('input_error');
      classList.remove('p_error');
    }
  }
};

const phoneValidation = phone => {
  let regexp = /^\+\d\(\d{3}\)\d{3}-\d{4}$/;

  if (phone.value === '') {
    errorText[2].innerText = 'Заполните поле!';
    return false;
  }
  if (phone.value.match(regexp)) {
    return true;
  }
  errorText[2].innerText = 'Телефон введите в формате +7(000)000-0000';
  phone.classList.add('input_error');
  phone.classList.add('p_error');
  phone.focus();
};

const mailValidation = (mail) => {
  let regexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

  if (mail.value === '') {
    errorText[1].innerText = 'Заполните поле!';
    return false;
  }

  if (mail.value.match(regexp)) {
    return true;
  }

  errorText[1].innerText = 'Email может содержать латинские буквы и (@, . - _)';
  mail.classList.add('input_error');
  mail.classList.add('p_error');
  mail.focus();
};

const nameValidation = (name) => {
  let regexp = /^[a-zа-я ]+$/i;

  if (name.value === '') {
    errorText[0].innerText = 'Заполните поле!';
    return false;
  }
  if (name.value.match(regexp)) {
    return true;
  }
  errorText[0].innerText = 'Имя может содержать только буквы и пробел';
  name.classList.add('input_error');
  name.classList.add('p_error');
  name.focus();
};

const formValidation = e => {
  e.preventDefault();

  clearErrors();

  let name = form.elements.name;
  let mail = form.elements.email;
  let number = form.elements.number;
  let result = true;

  if (!nameValidation(name)) {
    result = false;
  }

  if (!mailValidation(mail)) {
    result = false;
  }

  if (!phoneValidation(number)) {
    result = false;
  }

  if (!result) {
    document.getElementById('form-box__area__headline').innerText = 'Данные не приняты!'
  } else {
    document.getElementById('form-box__area__headline').innerText = 'Спасибо! Ваши данные приняты!'
  }

  return result;
};

btnSubmit.addEventListener('click', e => formValidation(e))