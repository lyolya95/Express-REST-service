const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getById = (idBoard, idTask) => tasksRepo.getById(idBoard, idTask);

const create = task => tasksRepo.create(task);

const update = (id, user) => tasksRepo.update(id, user);

const deleted = (idBoard, idTask) => tasksRepo.deleted(idBoard, idTask);

module.exports = { getAll, getById, create, update, deleted };
