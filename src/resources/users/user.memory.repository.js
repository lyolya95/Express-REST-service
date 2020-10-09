const DB = require('../../common/dataBase');

const getAll = async () => DB.getAllUsers();

const getById = async id => DB.getUser(id);

const create = async user => DB.createUser(user);

const update = async (id, user) => DB.updateUser(id, user);

const deleted = async id => DB.deletedUser(id);

module.exports = { getAll, getById, create, update, deleted };
