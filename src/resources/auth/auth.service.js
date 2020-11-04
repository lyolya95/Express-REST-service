const usersRepo = require('../users/user.DB.repository');
const jsonWebToken = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { checkPassword } = require('../../utils/hashHelper/hashHelper');

const signToken = async (login, password) => {
  const user = await usersRepo.getByUserLogin(login);

  const { password: hashedPassword } = user;

  const comparisonRes = checkPassword(password, hashedPassword);

  if (comparisonRes) {
    const { id } = user;
    const token = jsonWebToken.sign({ id, login }, JWT_SECRET_KEY, {
      expiresIn: '1h'
    });
    return token;
  }
};

module.exports = {
  signToken
};
