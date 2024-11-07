import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router();

// POST api/users/signup
router.post('/signup', async (req, res) => {

    let user;
    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.')
// Usamos el operador ternario para devolver la respuesta si el usuario ya existe
// return user ? res.status(400).send('User already registered.') : null;

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    });

    try {
        await user.save();

        const token = jwt.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWR_SECRET,
            { expiresIn: '1h', }
        );

        res.header('Authorization', token).send({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        })
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
});


// POST api/users/login
router.post('/login', async (req, res) => {
    let user 
    user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Invalid email or password');

    let validPassword
    validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password');


    /// si todo es correcto utilizamos la craecion del token

    const token = jwt.sign({
        _id: user._id,
        role: user.role,
    }, process.env.JWR_SECRET,
        { expiresIn: '1h', }
    );

    res.header("Authorization", token).send(token);
});

export default router