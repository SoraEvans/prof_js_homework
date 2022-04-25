const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
    visibleCart: false
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
    handleCart() {
      this.visibleCart = !this.visibleCart
    },
    filterGoods() {
      if (this.searchLine) {
        this.filteredGoods = this.goods.filter(item => item.product_name === this.searchLine)
      } else {
        this.filteredGoods = this.goods
      }
    },
  },
  mounted() {
    this.makeGETRequest(`${this.API_URL}/catalogData.json`).then(r => {
      this.goods = JSON.parse(r);
      this.filteredGoods = JSON.parse(r);
    });
  }
});
