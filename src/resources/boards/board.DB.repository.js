const Board = require('./board.model');
const Task = require('../tasks/task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'user';

const getAll = async () => Board.find({});

const getById = async id => {
  const board = await Board.findById(id);

  if (!board) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return board;
};

const create = async board => Board.create(board);

const update = async (id, board) => {
  const updateBoard = await Board.findByIdAndUpdate(id, board, { new: true });

  if (!updateBoard) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return updateBoard;
};

const deleted = async id => {
  const board = await Board.findByIdAndDelete(id);

  if (!board) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  await Task.deleteMany({ boardId: id });
  return true;
};

module.exports = { getAll, getById, create, update, deleted };
