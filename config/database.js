import dotenv from "dotenv"
dotenv.config()

export default {
    dialect:'postgres',
    host:'postgres',
    username:`${process.env.DB_USER}`,
    password:`${process.env.DB_KEY}`,
    database:`${process.env.DB_NAME}`

}
