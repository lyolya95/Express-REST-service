const tasksRepo = require('./task.DB.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = id => tasksRepo.getById(id);

const create = task => tasksRepo.create(task);

const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

const deleted = (boardId, id) => tasksRepo.deleted(boardId, id);

module.exports = { getAll, getById, create, update, deleted };
