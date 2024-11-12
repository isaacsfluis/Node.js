import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import server from "../server.js";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

describe('Tickets API', () => {
    let token;

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/users/signup')
            .send({
                name: 'Test User Ticket',
                email: 'userticket@gmail.com',
                password: '123456789',
                role: 'user'
            });

        token = response.headers.authorization;
    });

    beforeEach(async () => {
        await Ticket.deleteMany();
    });

    afterAll(async () => {
        // Cierra el servidor y la conexión a la base de datos
        await server.close();
        await mongoose.connection.close();
    });

    test('create a new Ticket', async () => {
        const response = await request(app)
            .post('/api/tickets')
            .set('Authorization', token)
            .send({
                title: 'Test Ticket',
                description: "Test tickets description",
                priority: 'high',
                status: 'open'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('ticket');
        expect(response.body.ticket).toHaveProperty('title', 'Test Ticket')
        expect(response.body.ticket).not.toHaveProperty('_id')
    });

    test('Get all ticket', async () => {
        const ticket1 = await Ticket.create({
            title: 'Tiket1',
            description: 'Tiket1 description',
            priority: 'medium'
        });
        await ticket1.save()

        const ticket2 = await Ticket.create({
            title: 'Tiket2',
            description: 'Tiket2 description'
        });
        await ticket2.save();

        const response = await request(app).get('/api/tickets')

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('results')

        expect(response.body.total).toBe(2)
        
        expect(response.body.currentPage).toBe(1)
        expect(response.body.results).toHaveLength(2)
        console.log(response.body.results)
        expect(response.body.results[0]).toHaveProperty('title', 'Tiket1')
        expect(response.body.results[0]).toHaveProperty('role')
        expect(response.body.results[1]).toHaveProperty('priority', 'low')
        expect(response.body.results[0]).not.toHaveProperty('_id')

    });
});