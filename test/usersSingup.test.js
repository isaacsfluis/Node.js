import request from "supertest";
import mongoose from "mongoose";
import app from '../app.js';
import server from '../server.js';
import User from "../models/User.js";

describe('User API', () => {
    beforeAll(async () => {
        await User.deleteMany(); // Limpia la colección de usuarios antes de las pruebas
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Cierra la conexión con MongoDB
        server.close(); // Cierra el servidor después de las pruebas
        //setTimeout(() => process.exit(0), 1000); // Forzar el cierre después de 1 segundo
    });

    test('create a new user', async () => { // Cambiado a "test" en minúsculas
        const response = await request(app) 
            .post('/api/users/signup')
            .send({
                name: 'Test User',
                email: 'test@gmail.com',
                password: '123456789',
                role: 'user'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
    });
});
