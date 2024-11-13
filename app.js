// lo voy a realacionar todo lo relacionado a express
import 'dotenv/config';  // Importa variables de entorno
import express from 'express';

//Base de datos
import mongoose from 'mongoose';

//rutas
import userRoutes from './routs/usersRoutes.js'
import ticketRoutes from './routs/ticketRoutes.js';

//middleware
import error from './middlewares/error.js';
import morgan from 'morgan'; //registro de solicitudes HTTP
import limiter from './helpers/rateLimit.js';

// dependencias de despligue
import helmet from 'helmet';
import cors from "cors";
import compression from 'compression';

const app = express();
// Si el entorno es de producción, se conecta a MongoDB Atlas.
const DB_URL = process.env.NODE_ENV === 'test'
    ? "mongodb://localhost:27017/ticketing-db-test"  // Para pruebas
    : process.env.NODE_ENV === 'prod' 
    ? process.env.DB_URL  // Para producción, usa la URL de MongoDB Atlas configurada en .env
    : "mongodb://localhost:27017/ticketing-db";  // Para desarrollo, sigue usando la base de datos local

//promesa
mongoose.connect(DB_URL)
    .then(() => console.log(`Connect to DB: ${DB_URL}`))// un callback que diga que se ha conectado a la BD
    .catch(err => console.log('Failed to connect to MongoDB', err.message))
    
// Middlewares
app.use(morgan('dev'));  // Logger de solicitudes HTTP
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === 'prod') {
    app.use(compression());
    app.use(limiter); //middleware para el numero de peticiones
}

app.use(express.json()); // Parseo de JSON en el body de las solicitudes

// Rutas
app.get("/ping", (req, res) => { res.status(200).send("pong"); });
app.get("/", (req, res) => { res.status(200).send("Exitoso"); });

//Rutas de error
app.get('/test-error', (req, res, next) => {
    const error = new Error('¡Esto es un error de prueba!');
    next(error);  // Pasar el error al middleware de error
});

app.get('/test-error-400', (req, res, next) => {
    const error = new Error("¡Este es un error 400!");
    error.status = 400;
    next(error);
});


// Rutas de generacion de la APP
app.use('/api/users', userRoutes)
app.use('/api/tickets', ticketRoutes)

app.use(error);



export default app;  // Exporta la aplicación configurada para usarla en el servidor
