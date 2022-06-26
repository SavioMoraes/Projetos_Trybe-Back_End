// Faça seu código aqui
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets/webchatSocket')(io);

app.use(express.static(`${__dirname}/views`));

const { getAllMessages } = require('./controllers/webchatController');

app.use(cors());

app.get('/', getAllMessages);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/webchat.ejs`);
});

http.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});