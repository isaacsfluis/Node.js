import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15*16*1000, // esto es 15 minutos this is 15 minutos
    max: 100 // maximo de peticiones por IP
})

export default limiter