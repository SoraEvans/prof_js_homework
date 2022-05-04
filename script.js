const {
  addItemToCart,
  removeItem,
  handleVisibleCart,
  getData,
  updateCart
} = require("./module");

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
  mounted() {
    getData(`/catalogData`)
      .then(r => {
        this.goods = JSON.parse(r).map(item => {
          return {...item, id: Math.floor(Math.random() * (1 - 10000)) + 10000 }
        });
        this.filteredGoods = this.goods;
        updateCart(app);
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
      addItemToCart(app, this.good)
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
      <h3>{{ this.cartItem.product_name }}</h3>
      <p>{{ this.cartItem.price }}</p>
      <button :id="this.cartItem.id" @click="removeToCart">&times;</button>
    </div>
  `,
  methods: {
    removeToCart: (event) => removeItem(app, event)
  },
  data() {
    return {
      cartItem: this.cart
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
    handleCart: () => handleVisibleCart(app)
  },
});