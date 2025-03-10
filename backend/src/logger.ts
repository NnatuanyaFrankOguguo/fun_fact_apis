import { createLogger, format, transports } from 'winston';
import path from 'path';

//defining the log file path

const logFilePath = path.join(__dirname, '../logs/app.log');

const logger = createLogger({
    level: 'info', //Adjust log level as needed (e.g., debug, info, warn, error)
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        //Customizing log message format here
        format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
    ),
    transports: [
        new transports.File({ filename: logFilePath, level: 'info' }),
        new transports.Console({ level: 'debug' })
    ]
})

export default logger;