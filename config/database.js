import dotenv from "dotenv"
dotenv.config()

export default {
    dialect:'postgres',
    host:`${process.env.PHOST}`,
    username:`${process.env.PDB_USER}`,
    password:`${process.env.PDB_KEY}`,
    database:`${process.env.PDB_NAME}`

}
