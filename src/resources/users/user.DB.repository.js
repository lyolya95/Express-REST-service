const User = require('./user.model');
const { hashPassword } = require('../../utils/hashHelper/hashHelper');
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

const create = async user => {
  const { name, login, password } = user;
  const hash = await hashPassword(password);

  return await User.create(user, {
    name,
    login,
    password: hash
  });
};

const update = async (id, user) => {
  const { name, login, password } = user;
  const hash = await hashPassword(password);
  const updateUser = await User.updateOne(
    { id },
    { name, login, password: hash }
  );

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

const getByUserLogin = async login => User.findOne({ login });

module.exports = { getAll, getById, create, update, deleted, getByUserLogin };
