import dotenv from 'dotenv';

dotenv.config();

export const API_PRICES= process.env.API_PRICES;
export const DATABASE_PATH = process.env.DATABASE_PATH || "./database/dbLuz.sqlite";
export const PORT = process.env.PORT || 3000;