const validationName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validationAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  
  next();
};

const validationTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    
    next();
  };
  
const validationWatched = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  
  const validationDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  if (!watchedAt) {
    return res.status(400).json({  
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  
  if (!validationDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};
  
const validationRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (!rate && rate !== 0) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  
  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  next();
};

const validationToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization !== '7mqaVRXJSp886CGr') {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = { 
  validationName, 
  validationAge, 
  validationTalk, 
  validationWatched,
  validationRate, 
  validationToken,
}; 