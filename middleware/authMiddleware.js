const JWT = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta_aqui';

function authMiddleware(req, res, next) {
   const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({mensaje: 'Acceso denegado. Token no proporcionado.'});
    }

    JWT.verify(token,SECRET_KEY,(err, user)=> {
        if(err){
            return res.status(403).json({mensaje: 'Token inválido.'});
        }
        req.user = user;
        next();
    });
    
}

module.exports = authMiddleware;
