const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;
app.use(bodyParser.json());

const Product = require('./controllers/ProductsController');
const Sale = require('./controllers/SalesController');

const {
  validationName, 
  validationQuantity 
} = require('./middlewares/validates');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Product.getAll);
app.get('/products/:id', Product.getById);

app.post(
  '/products', 
  validationName,
  validationQuantity,
  Product.create,
);

app.put(
  '/products/:id', 
  validationName,
  validationQuantity,
  Product.update,
);

app.delete('/products/:id', Product.exclude);

app.get('/sales', Sale.getAll);
app.get('/sales/:id', Sale.getById);

app.post(
  '/sales',
  Sale.create,
);

app.put('/sales/:id', Sale.update);

app.listen(PORT, () => console.log(`Servidor roda aui -> ${PORT}`));
