const Task = require('./task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'task';

const getAll = async id => Task.find({ boardId: id });

const getById = async (idBoard, idTask) => {
  const task = await Task.find({ id: idTask, boardId: idBoard });
  console.log(task);

  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { idTask });
  }

  return task;
};

const create = async task => Task.create(task);

const update = async (boardId, id, task) => {
  const updateTask = await Task.findOneAndUpdate({ boardId, _id: id }, task);

  if (!updateTask) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return updateTask;
};

const deleted = async (idBoard, idTask) => {
  const task = await Task.deleteOne({ _id: idTask, boardId: idBoard });

  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { idTask });
  }

  return task;
};

module.exports = { getAll, getById, create, update, deleted };
