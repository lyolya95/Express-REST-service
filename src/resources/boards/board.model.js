const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColumnsSchema = new Schema({
  title: String,
  order: Number
});

const Board = new Schema(
  {
    title: String,
    columns: [ColumnsSchema]
  },
  {
    versionKey: false
  }
);

Board.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = mongoose.model('boards', Board);
