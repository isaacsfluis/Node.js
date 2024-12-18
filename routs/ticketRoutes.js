import express from 'express'; // frawor de usuario
import User from '../models/Ticket.js'
import Ticket from '../models/Ticket.js';
import admin from '../middlewares/admin.js';
import auth from '../middlewares/auth.js';
import buildfilter from '../middlewares/filter.js';
import pagination from '../middlewares/pagination.js';
import ticketSchema from '../validations/ticketValidation.js';


const router = express.Router(); /// crear un nuevo router

//para traer todos los tikets
// get api/tickets?page=1&pagesize=10
router.get('/', buildfilter, pagination(Ticket), async (req, res)  => {
    res.status(200).json(req.paginatedResults)
});

//crear un nuevo ticket
router.post('/', auth, async (req, res) => {

    const {error} = ticketSchema.validate(req.body);

    if (error){
        return res.status(400).json({mesage: error.details[0].message})
    }

    let ticket;
    ticket = new Ticket({ /// aqui creo el objeto'ticket' y luego salvar en el try
        user: req.user._id,
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

        ticket = await Ticket.findOne({ id: req.params.id })

        if (!ticket) return res.status(404).json('ticket already registered.')
        res.status(200).json({ ticket: ticket })

    } catch (error) {
        res.status(500).json({ mesage: "Server Error" + error.mesage })
    }
});

// Actualizar un ticket usando el id (UUID)
router.put('/:id', auth, async (req, res) => {
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
router.delete('/:id', [auth, admin,], async (req, res) => {
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
