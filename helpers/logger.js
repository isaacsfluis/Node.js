import winston from 'winston';

// Configuración del logger
const logger = winston.createLogger({
    level: 'error', // Nivel de logging
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({ format: winston.format.simple() }) // También podemos ver los logs en la consola
    ],
});

export default logger;
