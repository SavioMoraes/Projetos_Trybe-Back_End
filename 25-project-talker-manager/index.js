const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const talkersRouter = require('./routers/talkersRouter');
const userRouter = require('./routers/userRouter');
const insertTalkersRouter = require('./routers/insertTalkersRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const {
  validationToken,
  validationName, 
  validationAge, 
  validationTalk,
  validationWatched,
  validationRate } = require('./middlewares/validateNewTalker');

const PATH_FILE = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 07:
app.get(
  '/talker/search',
  validationToken,
  async (req, res) => {
    try {
      const { searchTerm } = req.query;
      const talkers = JSON.parse(await fs.readFile(PATH_FILE, 'utf-8'));
      const filteredTalker = talkers.filter((r) => r.name.includes(searchTerm));
      
      if (!searchTerm) {
        return res.status(200).json(talkers);
      }

      return res.status(200).json(filteredTalker);
    } catch (error) {
      return ({ message: error.message, code: error.code });
    }
  },
);

// Requisito 01:
app.use('/talker', talkersRouter);

// Requisito 02:
app.use('/talker/:id', talkersRouter);

// Requisito 03:
app.use('/login', userRouter);

// Requisito 04:
app.use('/talker', insertTalkersRouter);

// Requisito 05;
app.put(
  '/talker/:id', 
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatched,
  validationRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    try {
      const talkers = JSON.parse(await fs.readFile(PATH_FILE, 'utf-8'));
      const talker = talkers.findIndex((r) => r.id === Number(id));
      const selectedTalker = { name, age, talk, id: Number(id) };
      if (talker === -1) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
      talkers[talker] = selectedTalker;
      await fs.writeFile(PATH_FILE, JSON.stringify(talkers));    
      return res.status(200).json(talkers[talker]);  
    } catch (error) {
      return ({ message: error.message, code: error.code });
    }
  },
);

// Requisito 06:
app.delete(
  '/talker/:id',
  validationToken,
  async (req, res) => {
    const { id } = req.params;
    try {
      const talkers = JSON.parse(await fs.readFile(PATH_FILE, 'utf-8'));
      const talker = talkers.findIndex((r) => r.id === Number(id));
      
      if (talker === -1) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }

      talkers.splice(talker, 1);
      await fs.writeFile(PATH_FILE, JSON.stringify(talkers));    
      return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });  
    } catch (error) {
      return ({ message: error.message, code: error.code });
    }
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
