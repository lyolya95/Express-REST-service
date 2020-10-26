const User = require('./user.model');
const Task = require('../tasks/task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'user';

const getAll = async () => User.find({});

const getById = async id => {
  const user = await User.findById(id);

  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return user;
};

const create = async user => User.create(user);

const update = async (id, user) => {
  const updateUser = await User.updateOne({ _id: id }, user);

  if (!updateUser) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return updateUser;
};

const deleted = async id => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  await Task.updateMany({ userId: id }, { userId: null });
  return true;
};

module.exports = { getAll, getById, create, update, deleted };
