const Task = require('./task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'task';

const getAll = async boardId => {
  const tasks = await Task.find({ boardId });

  if (!tasks[0]) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { boardId });
  }
  return tasks;
};

const getById = async id => {
  const task = await Task.findById(id);

  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
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

const deleted = async (boardId, id) => {
  const task = await Task.deleteOne({ boardId, _id: id });

  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return task;
};

module.exports = { getAll, getById, create, update, deleted };
