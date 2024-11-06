// lo voy a realacionar todo lo relacionado a express
import 'dotenv/config';  // Importa variables de entorno
import express from 'express';
import morgan from 'morgan';

const app = express();

// Middlewares
app.use(morgan('dev'));  // Logger de solicitudes HTTP
app.use(express.json()); // Parseo de JSON en el body de las solicitudes

// Rutas
app.get("/", (req, res) => {
    res.status(200).send("Hello World, Luis!");
});

export default app;  // Exporta la aplicación configurada para usarla en el servidor
