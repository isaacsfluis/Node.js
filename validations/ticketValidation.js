import joi  from "joi";

const ticketSchema = joi.object({
    user: joi.string().required(),
    title: joi.string().required().min(3),
    description: joi.string().required().min(5),
    priority: joi.string().valid('low','medium','high'),
    status: joi.string().valid('open','in-progress','closed')
});

export default ticketSchema;