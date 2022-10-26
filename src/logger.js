import winston from 'winston';

export default winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // TODO: Configure logger transport for production
    new winston.transports.Console({ format: winston.format.simple() })
  ],
});
