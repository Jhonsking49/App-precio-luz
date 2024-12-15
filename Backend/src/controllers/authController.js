import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            return res.status(400).json({ 
                error: 'Las contraseñas no coinciden' 
            });
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Formato de email inválido' 
            });
        }

        // Crear usuario
        await User.create(email, password);

        res.status(201).json({ 
            message: 'Usuario registrado correctamente' 
        });

    } catch (error) {
        if (error.message === 'El email ya está registrado') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ 
            error: 'Error al registrar usuario' 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ 
                error: 'Email o contraseña incorrectos' 
            });
        }

        // Validar contraseña
        const isValid = await User.validatePassword(user, password);
        if (!isValid) {
            return res.status(401).json({ 
                error: 'Email o contraseña incorrectos' 
            });
        }

        // Generar token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ 
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ 
            error: 'Error al iniciar sesión' 
        });
    }
};