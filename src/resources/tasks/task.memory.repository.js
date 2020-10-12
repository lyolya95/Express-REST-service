const DB = require('../../common/dataBase');

const getAll = async () => DB.getAllTasks();

const getById = async (idBoard, idTask) => {
  const task = DB.getTask(idBoard, idTask);
  if (!task) {
    throw new Error(`The task with id: ${idTask} not found`);
  }
  return task;
};

const create = async task => DB.createTask(task);

const update = async (id, task) => DB.updateTask(id, task);

const deleted = async (idBoard, idTask) => DB.deletedTask(idBoard, idTask);

module.exports = { getAll, getById, create, update, deleted };
