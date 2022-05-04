(()=>{var t={662:(t,e,o)=>{"use strict";o.r(e),o.d(e,{addItemToCart:()=>n,getData:()=>i,handleVisibleCart:()=>s,postData:()=>a,removeItem:()=>r,updateCart:()=>d});const a=(t,e)=>new Promise((o=>{let a;window.XMLHttpRequest?a=new XMLHttpRequest:window.ActiveXObject&&(a=new ActiveXObject("Microsoft.XMLHTTP")),a.onreadystatechange=function(){4===a.readyState&&(console.log("xhr.responseText",a.responseText),o(a.responseText))},a.open("POST",t,!0),a.setRequestHeader("Content-Type","application/json; charset=UTF-8"),a.send(e)})),n=(t,e)=>{t.goods.forEach((o=>{e.id===o.id&&(e.id=Math.floor(-9999*Math.random())+1e4,a("/addToCart",JSON.stringify(e)).then((()=>d(t))))}))},r=(t,e)=>{let o;t.carts.forEach((function(t,a){let n=t.id;+e.target.id===n&&(o=a)})),t.carts.splice(o,1),a("/updateCart",JSON.stringify(t.carts)).then((()=>d(t)))},s=t=>t.visibleCart=!t.visibleCart,i=t=>new Promise((e=>{let o;window.XMLHttpRequest?o=new XMLHttpRequest:window.ActiveXObject&&(o=new ActiveXObject("Microsoft.XMLHTTP")),o.onreadystatechange=function(){4===o.readyState&&e(o.responseText)},o.open("GET",t,!0),o.setRequestHeader("Content-Type","application/json; charset=UTF-8"),o.send()})),d=t=>i("/cartData").then((e=>{t.carts=JSON.parse(e)}))}},e={};function o(a){var n=e[a];if(void 0!==n)return n.exports;var r=e[a]={exports:{}};return t[a](r,r.exports,o),r.exports}o.d=(t,e)=>{for(var a in e)o.o(e,a)&&!o.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{const{addItemToCart:t,removeItem:e,handleVisibleCart:a,getData:n,updateCart:r}=o(662),s=new Vue({el:"#app",data:{goods:[],filteredGoods:[],searchLine:"",API_URL:"https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses",visibleCart:!1,visibleAlert:!1,carts:[]},mounted(){n("/catalogData").then((t=>{this.goods=JSON.parse(t).map((t=>({...t,id:Math.floor(-9999*Math.random())+1e4}))),this.filteredGoods=this.goods,r(s)})).catch((()=>this.visibleAlert=!0))}});Vue.component("goods-list",{props:["goods","alert"],template:'\n    <div class="goods-list">\n      <slot></slot>\n      <p v-if="!alert && !goods.length">Нет данных</p>\n      <goods-item v-for="good in goods" :good="good"></goods-item>\n    </div>\n  '}),Vue.component("goods-item",{props:["good"],template:'\n    <div class="goods-item">\n      <h3>{{ good.product_name }}</h3>\n      <p>{{ good.price }}</p>\n      <button @click="addToCart">Add product</button>\n    </div>\n  ',methods:{addToCart(){t(s,this.good)}}}),Vue.component("cart-list",{props:["carts"],template:'\n    <div class="cart-list">\n      <h3>Cart List</h3>\n      <cart-item v-for="cart in carts" :cart="cart"></cart-item>\n    </div>\n  '}),Vue.component("cart-item",{props:["cart"],template:'\n    <div class="goods-item">\n      <h3>{{ this.cartItem.product_name }}</h3>\n      <p>{{ this.cartItem.price }}</p>\n      <button :id="this.cartItem.id" @click="removeToCart">&times;</button>\n    </div>\n  ',methods:{removeToCart:t=>e(s,t)},data(){return{cartItem:this.cart}}}),Vue.component("data-alert",{template:"\n    <h3>Не удалось загрузить данные</h3>\n  "}),Vue.component("header-vue",{props:["searchValue","goods"],template:'\n    <div>\n      <input type="text" class="goods-search" v-model="contentValue" />\n      <button class="search-button" type="button" @click=\'filterGoods\'>Искать</button>\n      <button class="cart-button" type="button" @click="handleCart">Корзина</button>\n    </div>\n  ',data(){return{contentValue:this.searchValue,filterGoods:()=>{this.contentValue?s.filteredGoods=this.goods.filter((t=>t.product_name===this.contentValue)):s.filteredGoods=this.goods}}},methods:{handleCart:()=>a(s)}})})()})();