const DB = {
  users: [],
  boards: [],
  tasks: []
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
  DB.tasks.filter(el => el.userId === id).forEach(el => (el.userId = null));
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

const deletedTask = async (idBoard, idTask) => {
  const idxTask = DB.tasks.findIndex(
    item => item.id === idTask && item.boardId === idBoard
  );
  if (idxTask >= 0) {
    return DB.tasks.splice(idxTask, 1);
  }
  return false;
};

const deleteTasksInBoard = async idBoard => {
  let foundIdx = DB.tasks.findIndex(el => el.boardId === idBoard);
  while (foundIdx > -1) {
    DB.tasks.splice(foundIdx, 1);
    foundIdx = DB.tasks.findIndex(el => el.boardId === idBoard);
  }
};

const deletedBoard = async id => {
  const idxBoard = DB.boards.findIndex(item => item.id === id);
  if (idxBoard >= 0) {
    await deleteTasksInBoard(id);
    return DB.boards.splice(idxBoard, 1);
  }

  return false;
};

const getAllTasks = async () => [...DB.tasks];

const getTask = async (idBoard, idTask) => {
  return DB.tasks.find(i => i.id === idTask && i.boardId === idBoard);
};

const createTask = async task => {
  DB.tasks.push(task);
  return getTask(task.boardId, task.id);
};

const updateTask = async (id, task) => {
  const filter = DB.tasks.filter(i => i.id === id)[0];
  const idx = DB.tasks.indexOf(filter);
  const keys = Object.keys(task);
  keys.forEach(key => {
    filter[key] = task[key];
  });
  return (DB.tasks[idx] = filter);
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
  deletedBoard,
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deletedTask
};
