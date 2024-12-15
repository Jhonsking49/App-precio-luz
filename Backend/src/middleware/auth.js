import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                error: 'No se proporcionó token de autenticación' 
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { 
            userId: decodedToken.userId, 
            email: decodedToken.email 
        };
        
        next();
    } catch (error) {
        res.status(401).json({ 
            error: 'Token inválido o expirado' 
        });
    }
};
