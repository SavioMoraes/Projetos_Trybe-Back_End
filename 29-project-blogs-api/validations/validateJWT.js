const jwt = require('jsonwebtoken');

const secret = '123456';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  // const regexToken = /(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/;
  // consulta regexToken: https://stackoverflow.com/questions/61802832/regex-to-match-jwt
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const id = jwt.verify(token, secret);
    req.user = id;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'Expired or invalid token' }); 
  }
  // if (regexToken.test(token) === false) {
    // return res.status(401).json({ message: 'Expired or invalid token' });
  // }
};

module.exports = {
  validateJWT,
};
