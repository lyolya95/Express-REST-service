const DB = require('../../common/dataBase');

const getAll = async () => DB.getAllTasks();

const getById = async (idBoard, idTask) => DB.getTask(idBoard, idTask);

const create = async task => DB.createTask(task);

const update = async (id, task) => DB.updateTask(id, task);

const deleted = async id => DB.deletedTask(id);

module.exports = { getAll, getById, create, update, deleted };
