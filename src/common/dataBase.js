const User = require('../resources/users/user.model');
const DB = [];

DB.push(new User(), new User(), new User());

const getAllUsers = async () => [...DB];

const getUser = async id => DB.filter(item => item.id === id)[0];

const createUser = async user => {
  DB.push(user);
  return getUser(user.id);
};

const updateUser = async (id, user) => {
  const userFilter = DB.filter(item => item.id === id)[0];
  const idxUser = DB.indexOf(userFilter);
  const keys = Object.keys(user);
  keys.forEach(key => {
    userFilter[key] = user[key];
  });
  return (DB[idxUser] = userFilter);
};

const deletedUser = async id => {
  const user = DB.filter(item => item.id === id)[0];
  const idxUser = DB.indexOf(user);
  return DB.splice(idxUser, 1);
};

module.exports = { getAllUsers, getUser, createUser, deletedUser, updateUser };
