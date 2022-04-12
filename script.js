const item_list = [
  {
    title: 'Computer peripherals',
    price: '100$'
  },
  {
    title: 'Toaster',
    price: '20$'
  },
  {
    title: 'Printer',
    price: '50$'
  },
  {
    title: 'Laptop',
    price: '150$'
  },
  {
    title: 'Scanner',
    price: '40$'
  },
  {
    title: 'Office furniture',
    price: '60$'
  },
  {
    title: 'Fridge',
    price: '80$'
  },
]

const renderProduct = ({ title = 'default title', price = 'default price' }) => `
  <div class="product_card">
    <h3 class="product_title">${title}</h3>
    <p class="product_price">${price}</p>
    <button class="product_button">Добавить</button>
  </div>
`

const renderProducts = list =>
  document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('')

renderProducts(item_list)