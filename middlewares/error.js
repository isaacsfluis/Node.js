import logger from "../helpers/logger.js";

export default function error(err, req, res, next) {
    // Registrar el error en el archivo de log
    logger.error(err.message, { metadata: err });

    // Enviar respuesta con el error
    res.status(500).json({
        message: 'Something went wrong',
        //error: err.message,
    });
}



