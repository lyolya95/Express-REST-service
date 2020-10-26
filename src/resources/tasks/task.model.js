const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: {
      type: String || null,
      default: null
    },
    boardId: {
      type: String || null,
      default: null
    },
    columnId: {
      type: String || null,
      default: null
    }
  },
  {
    versionKey: false
  }
);

Task.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = mongoose.model('tasks', Task);
