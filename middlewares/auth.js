import jwt from 'jsonwebtoken';

//se puede llamar de cualquier forma pero se recomienda que se llamar de la misma forma que el archivo
export default function auth(req,res,next){
    const token  = req.header('Authorization').replace('Bearer ',"");
    //si token no existe
    if (!token) return next(new Error('Access denied. No token provided'));

    try {
        const verified = jwt.verify(token,process.env.JWR_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        next(new Error('Access denied. Invalid token'));
    }
}