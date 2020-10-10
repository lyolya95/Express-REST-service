const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [{ id: uuid(), title: 'TITLE_BOARD', order: 1 }]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
