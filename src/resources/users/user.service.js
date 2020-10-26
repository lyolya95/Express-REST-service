const usersRepo = require('./user.DB.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

const deleted = id => usersRepo.deleted(id);

module.exports = { getAll, getById, create, update, deleted };
