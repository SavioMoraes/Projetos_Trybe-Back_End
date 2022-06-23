const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const directory = path.join(__dirname, '../uploads');

app.use(express.static(directory));

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, directory),
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`); 
  },
});

const upload = multer({ storage });

const User = require('../controller/usersController');
const {
  validateParams,
  verifyEmail,
  emailExists,
} = require('../middlewares/validateUser');

const Login = require('../controller/login');
const {
  validateUser,
  validateEmailAndPassword,
} = require('../middlewares/validateLogin');

const Recipe = require('../controller/recipesController');
const {
  validateJWT,
} = require('./auth/validateJWT');

app.post(
  '/users',
  validateParams,
  verifyEmail,
  emailExists,
  User.createUser, 
);

app.post(
  '/login',
  validateUser,
  validateEmailAndPassword,
  Login,
);

app.post(
  '/recipes',
  validateJWT,
  Recipe.createRecipe,
);

app.get(
  '/recipes/:id',
  Recipe.getRecipeById,
);
  
app.get(
  '/recipes',
  Recipe.getAllRecipes,
);

// app.get('/images/:id.jpeg', Image.uploadImage);

app.put(
  '/recipes/:id/image',
  validateJWT,
  upload.single('image'),
  Recipe.updateRecipeWithImage,
);

app.put(
  '/recipes/:id',
  validateJWT,
  Recipe.updateRecipe,
);

app.delete(
  '/recipes/:id',
  validateJWT,
  Recipe.excludeRecipe,
);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
