import express from 'express'; // frawor de usuario
import User from '../models/Ticket.js'
import Ticket from '../models/Ticket.js';

const router = express.Router(); /// crear un nuevo router

//para traer todos los tikets
router.get('/', async (req, res) => {
    try {
        let tickets
        tickets = await Ticket.find({})// que va a la base de datos de mongus y trae todos 
        res.status(200).json({ tickets: tickets })
    } catch (error) {
        res.status(500).send({ mesage: "Server Error" + error.mesage })
    }
});

//crear una nueva ruta
router.post('/', async (req, res) => {
    let ticket;
    ticket = new User({ /// aqui creo el objeto'ticket' y luego salvar en el try
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
    });
    try {// salvamos el ticket creado en la base de datos
        const newTicket = await ticket.save();//este es el comando que salva en la BD// utilizamos promesas por ser una operacion bloqueante
        res.status(201).json({ ticket: newTicket })

    } catch (error) {
        res.status(500).json('Something went wrong')
    }
});

// para traer con un parametro un tiquet solo 1 
router.get('/:id', async (req, res) => {
    try {
        let ticket;
       // ticket = await Ticket.findById(req.params.id);// esta es una operacion en la BD

       ticket = await Ticket.findOne({id: req.params.id})

        if (!ticket) return res.status(404).json('ticket already registered.')
        res.status(200).json({ ticket: ticket })

    } catch (error) {
        res.status(500).json({ mesage: "Server Error" + error.mesage })
    }
});

// para actualizar el ticket con parametro
router.put('/:id', async (req, res) => { 
    //guardar primero el contenido de la peticion

    const updates = req.body;

    try {
        let ticket;
        ticket = await Ticket.findByIdAndUpdate(req.params.id, updates,{new: true});// esta es una operacion en la BD este es un metodo de mongus pero si fuera otro tocaria  primero buscar actualizarlo y salvarlo
        if (!ticket) return res.status(404).json('ticket already registered.')
        res.status(200).json({ ticket: ticket })
    } catch (error) {
        res.status(500).json({ mesage: "Server Error" + error.mesage })
    }
});

//para borrar 
router.delete('/:id', async (req, res) => { 

    try {
        let ticket;
        ticket = await Ticket.findByIdAndDelete(req.params.id);// esta es una operacion en la BD 
        if (!ticket) return res.status(404).json('ticket already registered.')
        res.status(200).json({ ticket: ticket }) 
    } catch (error) {
        res.status(500).json({ mesage: "Server Error" + error.mesage })
    }
});

export default router;
