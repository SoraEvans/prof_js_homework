const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
    visibleCart: false,
    visibleAlert: false
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
        xhr.send();
      })
    },
  },
  mounted() {
    this.makeGETRequest(`${this.API_URL}/catalogData.json`)
      .then(r => {
        this.goods = JSON.parse(r);
        this.filteredGoods = JSON.parse(r);
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
    </div>
  `
});

Vue.component('cart-list', {
  template: `
    <div class="cart-list">
      <div class="cart-item">
        <h3>~~~Cart block~~~</h3>
      </div>
    </div>
  `
})

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