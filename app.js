// lo voy a realacionar todo lo relacionado a express
import 'dotenv/config';  // Importa variables de entorno
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import userRoutes from './routs/usersRoutes.js'
import ticketRoutes from './routs/ticketRoutes.js';
import error from './middlewares/error.js';

const app = express();
const DB_URL = process.env.NODE_ENV === 'test'
    ? "mongodb://localhost:27017/ticketing-db-test"
    : process.env.DB_URL || "mongodb://localhost:27017/ticketing-db";


//promesa
mongoose.connect(DB_URL)
.then(()=> console.log(`Connect to DB: ${DB_URL}`))// un callback que diga que se ha conectado a la BD
.catch(err => console.log('Failed to connect to MongoDB', err))

// Middlewares
app.use(morgan('dev'));  // Logger de solicitudes HTTP
app.use(express.json()); // Parseo de JSON en el body de las solicitudes

// Rutas
app.get("/ping", (req, res) => {res.status(200).send("pong");});

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
