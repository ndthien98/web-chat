const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const morgan = require('morgan')

const { printf, timestamp, combine } = format;
const myFormat = printf(
  info => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`,
);

const transport = new DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [transport, new transports.Console()],
});

const morganMiddleware = morgan('combined', {
  stream: {
    write: message => {
      logger.info(message);
    },
  },
})
const logRequest = (req, res, next) => {
  console.log('req body: ', req.body)
  console.log('req query: ', req.query)
  console.log('req param: ', req.params)
  next();
}
module.exports = [
  morganMiddleware,
  logRequest,
]