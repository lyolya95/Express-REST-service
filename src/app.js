const { NOT_FOUND } = require('http-status-codes');

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const { createError } = require('http-errors');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const morgan = require('morgan');
const winston = require('./config/winston');
const errorHandler = require('./errors/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

process.on('uncaughtException', error => {
  winston.error(`captured error: ${error.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  winston.error(`unhandled rejection detected: ${reason.message}`);
  // eslint-disable-next-line no-process-exit
  // process.exit(1);
});

morgan.token('body', res => {
  const { body, query } = res;
  return `BODY: ${JSON.stringify(body)}, QUERY PARAMETERS: ${JSON.stringify(
    query
  )}`;
});

app.use(
  morgan('METHOD: :method URL: :url :body :response-time', {
    stream: winston.stream
  })
);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    winston.info('Required empty');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use(errorHandler);

module.exports = app;
