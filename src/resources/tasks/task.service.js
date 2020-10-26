const tasksRepo = require('./task.DB.repository');

const getAll = id => tasksRepo.getAll(id);

const getById = (idBoard, idTask) => tasksRepo.getById(idBoard, idTask);

const create = task => tasksRepo.create(task);

const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

const deleted = (idBoard, idTask) => tasksRepo.deleted(idBoard, idTask);

module.exports = { getAll, getById, create, update, deleted };
