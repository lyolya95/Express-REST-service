const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const fs = require('fs');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const morgan = require('morgan');

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

morgan.token('body', res => {
  const { body, params } = res;
  return `BODY: ${JSON.stringify(body)}, QUERY PARAMETERS: ${JSON.stringify(
    params
  )}`;
});

app.use(morgan('METHOD: :method URL: :url :body :response-time :req[header]'));

app.use(
  morgan('METHOD: :method URL: :url :body :response-time :req[header]', {
    stream: fs.createWriteStream(path.join(__dirname, './logs/access.log'), {
      flags: 'a'
    })
  })
);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

module.exports = app;
