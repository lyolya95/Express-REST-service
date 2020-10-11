const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getById = (idBoard, idTask) => {
  const task = tasksRepo.getById(idBoard, idTask);
  if (!task) {
    throw new Error(`The task with id: ${idTask} not found`);
  }
  return task;
};

const create = task => tasksRepo.create(task);

const update = (id, user) => tasksRepo.update(id, user);

const deleted = id => tasksRepo.deleted(id);

module.exports = { getAll, getById, create, update, deleted };
