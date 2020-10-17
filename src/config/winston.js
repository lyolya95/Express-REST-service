const winston = require('winston');

require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
  filename: `${__dirname}/../logs/application-%DATE%.log`,
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d'
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: `${__dirname}/../logs/error.log`,
      level: 'error'
    }),
    new winston.transports.File({
      name: 'info-file',
      filename: `${__dirname}/../logs/info.log`,
      level: 'info',
      handleExceptions: true,
      json: true,
      maxSize: 5242880,
      maxFiles: 1
    }),
    transport
  ],
  format: winston.format.combine(
    (winston.format.simple(),
    winston.format.printf(info => `${info.level}: ${info.message}`))
  ),
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
