const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = user => boardsRepo.create(user);

const update = (id, user) => boardsRepo.update(id, user);

const deleted = id => boardsRepo.deleted(id);

module.exports = { getAll, getById, create, update, deleted };
