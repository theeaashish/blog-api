import winston from 'winston';
import config from '../config';

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;

// define transports array to hold different logging transports
const transports: winston.transport[] = [];

// if the application is not running in production, add a console transport
if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // add colors to log
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }), // add timestamp to log
        align(), // align logs
        printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? `\n${JSON.stringify(meta)}`
            : '';

          return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
        }),
      ),
    }),
  );
}

// create a logger instance using winston
const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports,
  silent: config.NODE_ENV === 'test',
});

export { logger };
