const DB = {
  users: [],
  boards: [],
  tasks: []
};
const getAllUsers = async () => [...DB.users];

const getUser = async id => DB.users.find(item => item.id === id);

const createUser = async user => {
  DB.users.push(user);
  return getUser(user.id);
};

const updateUser = async (id, user) => {
  const userFilter = DB.users.find(item => item.id === id);
  const idxUser = DB.users.indexOf(userFilter);
  const keys = Object.keys(user);
  keys.forEach(key => {
    userFilter[key] = user[key];
  });
  return (DB.users[idxUser] = userFilter);
};

const deletedUser = async id => {
  const user = DB.users.find(item => item.id === id);
  const idxUser = DB.users.indexOf(user);
  DB.tasks = DB.tasks.map(task => {
    if (task.userId === id) {
      return {
        ...task,
        userId: null
      };
    }
    return task;
  });
  return DB.users.splice(idxUser, 1);
};

const getAllBoards = async () => [...DB.boards];

const getBoard = async id => {
  const board = DB.boards.find(item => item.id === id);
  if (board === undefined) {
    throw new Error('Not found');
  }
  return board;
};

const createBoard = async board => {
  DB.boards.push(board);
  return getBoard(board.id);
};

const updateBoard = async (id, board) => {
  const filter = DB.boards.find(item => item.id === id);
  const idx = DB.users.indexOf(filter);
  const keys = Object.keys(board);
  keys.forEach(key => {
    filter[key] = board[key];
  });
  return (DB.users[idx] = filter);
};

const deleteTasksInBoard = async idBoard => {
  let idx = DB.tasks.findIndex(item => item.boardId === idBoard);
  while (idx > -1) {
    DB.tasks.splice(idx, 1);
    idx = DB.tasks.findIndex(item => item.boardId === idBoard);
  }
};

const deletedBoard = async id => {
  const boardIndex = DB.boards.findIndex(board => board.id === id);
  deleteTasksInBoard(id);
  if (boardIndex === -1) {
    throw new Error("Thsi board doesn't exists");
  }
  DB.boards = DB.boards.filter(board => board.id !== id);
};

const getAllTasks = async () => [...DB.tasks];

const getTask = async (idBoard, idTask) => {
  const task = DB.tasks.find(i => i.id === idTask && i.boardId === idBoard);
  if (task === undefined) {
    throw new Error('Not find');
  }
  return task;
};

const createTask = async task => {
  DB.tasks.push(task);
  return getTask(task.boardId, task.id);
};

const updateTask = async (id, task) => {
  const filter = DB.tasks.find(i => i.id === id);
  const idx = DB.tasks.indexOf(filter);
  const keys = Object.keys(task);
  keys.forEach(key => {
    filter[key] = task[key];
  });
  return (DB.tasks[idx] = filter);
};

const deletedTask = async (idBoard, idTask) => {
  const taskIndex = DB.tasks.findIndex(
    task => task.id === idTask && task.boardId === idBoard
  );
  if (taskIndex === -1) {
    throw new Error("Thsi board doesn't exists");
  }
  DB.tasks = DB.tasks.filter(task => task.id !== idTask);
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
