import jwt from 'jsonwebtoken';

export const generateToken = (payload) =>  {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN ?? '1h', 
    });
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(!token){
        return res.status(401).json({
            error: 'Acesso negado. Token não informado.'
        });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        const message = err.name === 'TokenExpiredError' 
        ? 'Token expirado' : 'Token Invalido';
        
        return res.status(403).json({ error: message });
    }

}