import request from "supertest";
import mongoose from "mongoose";
import app from '../app.js';
import server from '../server.js';
import User from "../models/User.js";

describe('User API Login', () => {

    beforeAll(async () => {
        await User.deleteMany(); // Limpia la colección de usuarios antes de las pruebas
        const response = await request(app)
            .post('/api/users/signup')
            .send({
                name: 'Test User',
                email: 'test1@gmail.com',
                password: '123456789',
                role: 'user'
            });
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Cierra la conexión con MongoDB
        server.close(); // Cierra el servidor después de las pruebas
        //setTimeout(() => process.exit(0), 1000); // Forzar el cierre después de 1 segundo
    });

    test('Login a user', async () => { // Cambiado a "test" en minúsculas

        const testlogin = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test1@gmail.com',
                password: '123456789',
            });

        console.log(testlogin.headers); // Para ver el contenido de los headers

        expect(testlogin.status).toBe(200);
        // Verifica si el token está presente en los headers
        expect(testlogin.headers).toHaveProperty('authorization');
        expect(testlogin.headers.authorization).toBeTruthy(); // Verifica que haya un token en el header
    });
});
