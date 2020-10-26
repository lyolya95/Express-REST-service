const boardsRepo = require('./board.DB.repository');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = board => boardsRepo.create(board);

const update = (id, board) => boardsRepo.update(id, board);

const deleted = id => boardsRepo.deleted(id);

module.exports = { getAll, getById, create, update, deleted };
