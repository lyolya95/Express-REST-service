const DB = require('../../common/dataBase');

const getAll = async () => DB.getAllBoards();

const getById = async id => DB.getBoard(id);

const create = async board => DB.createBoard(board);

const update = async (id, board) => DB.updateBoard(id, board);

const deleted = async id => DB.deletedBoard(id);

module.exports = { getAll, getById, create, update, deleted };
