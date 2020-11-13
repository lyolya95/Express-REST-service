const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
const logger = require('./config/logger');
const User = require('./resources/users/user.model');

const users = [new User({ name: 'admin', password: 'admin', login: 'admin' })];

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () => logger.error('MongoDB connection error:'));
db.once('open', () => {
  users.forEach(user => user.save());
  logger.info('Successfully connect to DB');
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
