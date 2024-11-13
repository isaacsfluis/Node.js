import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

// connet to the local database.

mongoose.connect('mongodb://localhost:/ticketing-db')
    .then(()=> console.log('💾 Connect to DB '))
    .catch(()=> console.log('💥 Failed to connect to Mongo DB', err))

const user = [
    {name: 'user', role: 'user', email:'user@gmail.com',password: '123456789'},
    {name: 'admin', role: 'admin', email:'admin@gmail.com',password: '123456789'},
];
const status = ['open','closed'];
const priorites = ['high','medium','low'];

//create ticketing

async function delateCollections() {
    await User.deleteMany({})
    console.log('La coleccion de user a sido borrada 👌')
    await Ticket.deleteMany({})
    console.log('La coleccion de ticket a sido borrada 👌')
    
}

async function createUser() {
    for (const userData of user) {
        const user = new User(userData)
        await user.save()
    };
};

async function createTicket() {
    const user = await User.find({})

    for(let i=0; i<15; i++){
        const ticket = new Ticket({
            title: `Ticket # ${i}`,
            description: `Solicitud # ${i}`,
            status: status[Math.floor(Math.random()* status.length)],
            priorites: priorites[Math.floor(Math.random()* priorites.length)],
            user: user[Math.floor(Math.random()* user.length)].id,
        });

        await ticket.save();
    };
};

async function populateDB() {
    await delateCollections();
    await createUser();
    await createTicket();
    console.log('🚀 Database populated');
    mongoose.disconnect();
    
}

populateDB()