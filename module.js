export const postData = (url, data) => {
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
}

export const addItemToCart = (app, product) => {
  app.goods.forEach((item) => {
    if (product.id === item.id) {
      product.id = Math.floor(Math.random() * (1 - 10000)) + 10000
      postData('/addToCart', JSON.stringify(product))
        .then(() => updateCart(app));
    }
  });
}

export const removeItem = (app, event) => {
  let getIdElement;
  app.carts.forEach(function (item, i) {
    let thisId = item.id;
    if (+event.target.id === thisId) {
      getIdElement = i;
    }
  });
  app.carts.splice(getIdElement, 1);
  postData('/updateCart', JSON.stringify(app.carts))
    .then(() => updateCart(app));
}

export const handleVisibleCart = app => app.visibleCart = !app.visibleCart

export const getData = url => {
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
}

export const updateCart = app => getData('/cartData')
  .then(r => {
    app.carts = JSON.parse(r);
  });
