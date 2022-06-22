const express = require('express');

const fs = require('fs').promises;

const router = express.Router();

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
  try {
    const talkers = JSON.parse(await fs.readFile(PATH_FILE, 'utf-8'));
    
    if (talkers.length === 0) {
      return res.status(200).json([]);
    }
  
    return res.status(200).json(talkers);
  } catch (err) {
    return ({ message: err.message, code: err.code });
  }
});

router.get('/:id', async (req, res) => {  
  const talkers = JSON.parse(await fs.readFile(PATH_FILE, 'utf-8'));
  const { id } = req.params;
  const talker = talkers.find((item) => item.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(talker);
});

module.exports = router;
