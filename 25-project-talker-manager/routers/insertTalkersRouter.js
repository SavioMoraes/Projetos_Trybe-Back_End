const express = require('express');

const fs = require('fs').promises;

const router = express.Router();
// const { readContentFile } = require('../helpers/useFile');
const {
  validationToken,
  validationName, 
  validationAge, 
  validationTalk,
  validationWatched,
  validationRate } = require('../middlewares/validateNewTalker');

const PATH_FILE = './talker.json';

router.post(
  '/', 
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatched,
  validationRate,
  async (req, res) => {
    try {
      const { name, age, talk } = req.body;
      
      const talkers = JSON.parse(await fs.readFile(PATH_FILE, 'utf-8'));
      const newTalker = { id: talkers.length + 1, name, age, talk };
      talkers.push(newTalker);
      
      await fs.writeFile(PATH_FILE, JSON.stringify(talkers));
      
      return res.status(201).json(newTalker);
    } catch (error) {
      return ({ message: error.message, code: error.code });
    }
  },
);
  
module.exports = router;
