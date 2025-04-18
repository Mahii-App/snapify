import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'info', // default log level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // adds timestamp to logs
    format.errors({ stack: true }), // includes stack trace in error logs
    format.json() // log messages will be in JSON format
  ),
  transports: [
    // Logs for error level messages will be stored in error.log
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Logs for all messages (info and above) will be stored in combined.log
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

// If not in production, add console transport to output to console (colorized)
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()), // colorizes the console output
    })
  );
}

export default logger;
