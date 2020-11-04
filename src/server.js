const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
const winston = require('./config/winston');
const User = require('./resources/users/user.model');

const users = [new User({ name: 'admin', password: 'admin', login: 'admin' })];

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () => winston.error('MongoDB connection error:'));
db.once('open', () => {
  users.forEach(user => user.save());
  winston.info('Successfully connect to DB');
  app.listen(PORT, () =>
    winston.info(`App is running on http://localhost:${PORT}`)
  );
});
