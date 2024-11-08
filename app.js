// lo voy a realacionar todo lo relacionado a express
import 'dotenv/config';  // Importa variables de entorno
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import userRoutes from './routs/usersRoutes.js'
import ticketRoutes from './routs/ticketRoutes.js';

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
app.get("/ping", (req, res) => {
    res.status(200).send("pong");
});

app.use('/api/users', userRoutes)
app.use('/api/tickets', ticketRoutes)

export default app;  // Exporta la aplicación configurada para usarla en el servidor
