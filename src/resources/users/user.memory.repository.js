const DB = require('../../common/dataBase');

const getAll = async () => DB;

const getById = async id => DB.filter(item => item.id === id)[0];

const create = async user => {
  DB.push(user);
  return getById(user.id);
};

module.exports = { getAll, getById, create };
