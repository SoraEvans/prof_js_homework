const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('.'));

app.get('/catalogData', (req, res) => {
  fs.readFile('catalog.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.get('/cartData', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    res.send(data);
  });
});

app.listen(3000, function () {
  console.log('server is running on port 3000!');
});

app.post('/addToCart', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      cart.push(item);
      fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          fs.readFile('stats.json', 'utf8', (err, data) => {
            const actionList = JSON.parse(data);
            const elem = { action: 'added item', item_name: item['product_name'], time: new Date() };
            actionList.push(elem)
            fs.writeFile('stats.json', JSON.stringify(actionList), () => {});
          })
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.post('/updateCart', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    }
    const cart = req.body;
    fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        const deletedItem = JSON.parse(data).filter(e => cart.findIndex(i => i.id === e.id) === -1);
        fs.readFile('stats.json', 'utf8', (err, data) => {
          const actionList = JSON.parse(data);
          const elem = { action: 'removed item', item_name: deletedItem[0]['product_name'], time: new Date() };
          actionList.push(elem)
          fs.writeFile('stats.json', JSON.stringify(actionList), () => {});
        })
        res.send('{"result": 1}');
      }
    });
  });
});