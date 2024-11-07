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

// Actualizar un ticket usando el id (UUID)
router.put('/:id', async (req, res) => {
    const updates = req.body;

    try {
        let ticket = await Ticket.findOneAndUpdate(
            { id: req.params.id },  // Buscar el ticket por el campo 'id' (UUID)
            updates,                 // Actualizar con los nuevos datos
            { new: true }            // Devuelve el ticket actualizado
        );

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ ticket: ticket });
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error.message });
    }
});

//para borrar 
router.delete('/:id', async (req, res) => { 
    try {
        let ticket;
        // Usar el campo 'id' en lugar de '_id' para buscar y eliminar el ticket
        ticket = await Ticket.findOneAndDelete({ id: req.params.id });

        // Si no se encuentra el ticket, se responde con un mensaje adecuado
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Si el ticket se elimina con éxito, se devuelve la información del ticket eliminado
        res.status(200).json({ ticket: ticket }); 
    } catch (error) {
        // Capturar y manejar cualquier error
        res.status(500).json({ message: "Server Error: " + error.message });
    }
});



export default router;
