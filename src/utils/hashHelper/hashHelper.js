const bcrypt = require('bcrypt');
const { SALT_ROUND } = require('../../common/config');

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(Number(SALT_ROUND));
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const checkPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPassword,
  checkPassword
};
