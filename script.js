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

  fetchGoods() {
    this.goods = [
      {
        title: 'Computer peripherals',
        price: 100
      },
      {
        title: 'Toaster',
        price: 20
      },
      {
        title: 'Printer',
        price: 50
      },
      {
        title: 'Laptop',
        price: 150
      },
      {
        title: 'Scanner',
        price: 40
      },
      {
        title: 'Office furniture',
        price: 60
      },
      {
        title: 'Fridge',
        price: 80
      },
    ];
  }

  render() {
    let listHtml = '';
    this.goods.forEach(({ title, price }) => {
      const goodItem = new GoodsItem(title, price);
      listHtml += goodItem.render();
    });
    document.querySelector('.products').innerHTML = listHtml;
  }

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
  }

  removeCart() {
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
list.fetchGoods();
list.render();
list.getSumPrice()

class Hamburger {
  constructor(size, stuffing) {
    this.size = size; //big, small
    this.stuffing = stuffing; //cheese, potato, salad
    this.topping = []; //spice, mayo
  }

  addTopping(topping) {
    if (this.topping.includes(topping)) return;
    this.topping.push(topping)
  }

  removeTopping = topping => this.topping = this.topping.filter(item => item !== topping)

  getToppings = () => this.topping.forEach((item, n) => alert(`Hamburger topping №${n+1} - ${item}`))

  getSize = () => alert(`Hamburger size - ${this.size}`)

  getStuffing = () => alert(`Hamburger stuff - ${this.stuffing}`)

  calculatePrice() {
    const sizeCost = this.size === 'big' ? 100 : 50;
    let stuffingCost;
    switch (this.stuffing) {
      case 'potato': {
        stuffingCost = 15;
        break;
      }
      case 'cheese': {
        stuffingCost = 10;
        break;
      }
      case 'salad': {
        stuffingCost = 20;
        break;
      }
      default: {
        return;
      }
    }
    const toppingCost = this.topping.reduce((sum, current) => {
      if (current === 'spice') {
        return sum + 15
      } else if (current === 'mayo') {
        return sum + 20
      }
    }, 0)
    return alert(`Hamburger cost - ${sizeCost + toppingCost + stuffingCost}rub`);
  }

  calculateCalories() {
    const sizeCalories = this.size === 'big' ? 40 : 20;
    let stuffingCalories;
    switch (this.stuffing) {
      case 'potato': {
        stuffingCalories = 15;
        break;
      }
      case 'cheese': {
        stuffingCalories = 10;
        break;
      }
      case 'salad': {
        stuffingCalories = 20;
        break;
      }
      default: {
        return;
      }
    }
    const toppingCalories = this.topping.reduce((sum, current) => {
      if (current === 'spice') {
        return sum
      } else if (current === 'mayo') {
        return sum + 5
      }
    }, 0)
    return alert(`Calories in hamburger - ${sizeCalories + toppingCalories + stuffingCalories}cal`);
  }
}
