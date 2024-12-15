import { getDatabase } from './database.js';
import bcrypt from 'bcrypt';

export class User {
    static async create(email, password) {
        const db = getDatabase();
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            return new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO users (email, password) VALUES (?, ?)',
                    [email, hashedPassword],
                    function(err) {
                        if (err) {
                            if (err.message.includes('UNIQUE constraint failed')) {
                                reject(new Error('El email ya está registrado'));
                            }
                            reject(err);
                        }
                        resolve(this.lastID);
                    }
                );
            });
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        const db = getDatabase();
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                }
            );
        });
    }

    static async validatePassword(user, password) {
        return await bcrypt.compare(password, user.password);
    }
}
