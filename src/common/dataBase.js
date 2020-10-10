const DB = {
  users: [],
  boards: []
};
const getAllUsers = async () => [...DB.users];

const getUser = async id => DB.users.filter(item => item.id === id)[0];

const createUser = async user => {
  DB.users.push(user);
  return getUser(user.id);
};

const updateUser = async (id, user) => {
  const userFilter = DB.users.filter(item => item.id === id)[0];
  const idxUser = DB.users.indexOf(userFilter);
  const keys = Object.keys(user);
  keys.forEach(key => {
    userFilter[key] = user[key];
  });
  return (DB.users[idxUser] = userFilter);
};

const deletedUser = async id => {
  const user = DB.users.filter(item => item.id === id)[0];
  const idxUser = DB.users.indexOf(user);
  return DB.users.splice(idxUser, 1);
};

const getAllBoards = async () => [...DB.boards];

const getBoard = async id => DB.boards.filter(item => item.id === id)[0];

const createBoard = async board => {
  DB.boards.push(board);
  return getBoard(board.id);
};

const updateBoard = async (id, board) => {
  const filter = DB.boards.filter(item => item.id === id)[0];
  const idx = DB.users.indexOf(filter);
  const keys = Object.keys(board);
  keys.forEach(key => {
    filter[key] = board[key];
  });
  return (DB.users[idx] = filter);
};

const deletedBoard = async id => {
  const board = DB.boards.filter(item => item.id === id)[0];
  const idx = DB.boards.indexOf(board);
  return DB.boards.splice(idx, 1);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deletedUser,
  updateUser,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deletedBoard
};
