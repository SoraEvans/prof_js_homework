const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
    visibleCart: false,
    visibleAlert: false,
    carts: []
  },
  methods: {
    makeGETRequest(url) {
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
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send();
      })
    },
    makePOSTRequest(url, data) {
      return new Promise(resolve => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            console.log('xhr.responseText', xhr.responseText)
            resolve(xhr.responseText);
          }
        }
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(data);
      })
    },
    updateCart() {
      this.makeGETRequest('/cartData')
        .then(r => {
          this.carts = JSON.parse(r);
        });
    }
  },
  mounted() {
    this.makeGETRequest(`/catalogData`)
      .then(r => {
        this.goods = JSON.parse(r).map(item => {
          return {...item, id: Math.floor(Math.random() * (1 - 10000)) + 10000 }
        });
        this.filteredGoods = this.goods;
        this.updateCart();
      })
      .catch(() => this.visibleAlert = true);
  }
});

Vue.component('goods-list', {
  props: ['goods', 'alert'],
  template: `
    <div class="goods-list">
      <slot></slot>
      <p v-if="!alert && !goods.length">Нет данных</p>
      <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>
  `
});

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
      <button @click="addToCart">Add product</button>
    </div>
  `,
  methods: {
    addToCart() {
      app.goods.forEach((item) => {
        if (this.good.id === item.id) {
          this.good.id = Math.floor(Math.random() * (1 - 10000)) + 10000
          app.makePOSTRequest('/addToCart', JSON.stringify(this.good))
            .then(() => app.updateCart());
        }
      });
    }
  }
});

Vue.component('cart-list', {
  props: ['carts'],
  template: `
    <div class="cart-list">
      <h3>Cart List</h3>
      <cart-item v-for="cart in carts" :cart="cart"></cart-item>
    </div>
  `
})

Vue.component('cart-item', {
  props: ['cart'],
  template: `
    <div class="goods-item">
      <h3>{{ cart.product_name }}</h3>
      <p>{{ cart.price }}</p>
      <button :id="cart.id" @click="removeToCart">&times;</button>
    </div>
  `,
  methods: {
    removeToCart(event) {
      let getIdElement;
      app.carts.forEach(function (item, i) {
        let thisId = item.id;
        if (+event.target.id === thisId) {
          getIdElement = i;
        }
      });
      app.carts.splice(getIdElement, 1);
      app.makePOSTRequest('/updateCart', JSON.stringify(app.carts))
        .then(() => app.updateCart());
    }
  }
});

Vue.component('data-alert', {
  template: `
    <h3>Не удалось загрузить данные</h3>
  `
})

Vue.component('header-vue', {
  props: ['searchValue', 'goods'],
  template: `
    <div>
      <input type="text" class="goods-search" v-model="contentValue" />
      <button class="search-button" type="button" @click='filterGoods'>Искать</button>
      <button class="cart-button" type="button" @click="handleCart">Корзина</button>
    </div>
  `,
  data() {
    return {
      contentValue: this.searchValue,
      filterGoods: () => {
        if (this.contentValue) {
          app.filteredGoods = this.goods.filter(item => item.product_name === this.contentValue)
        } else {
          app.filteredGoods = this.goods
        }
      },
    }
  },
  methods: {
    handleCart: () => app.visibleCart = !app.visibleCart
  },
});