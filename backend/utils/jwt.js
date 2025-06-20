const jwt = require('jsonwebtoken');

//declaring .env variables
const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: 3 * 24 * 60 * 60 });
};

module.exports = createToken;