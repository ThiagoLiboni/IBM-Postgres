import dotenv from "dotenv"
dotenv.config()

export default {
    dialect: 'postgres',
    host: process.env.PHOST || '127.0.0.1', // Use apenas o IP ou hostname
    port: process.env.PDB_PORT || 5432, // Adicione a porta aqui
    username: process.env.PDB_USER,
    password: process.env.PDB_KEY,
    database: process.env.PDB_NAME

}
