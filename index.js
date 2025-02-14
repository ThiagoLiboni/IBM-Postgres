import express from 'express'
import startServer from "./config/server.js"
import routesClient from './routes/ClientRoutes/routes.js';
import routesUser from './routes/UserRoutes/routes.js';
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json());

app.use('/api',routesClient)
app.use('/api',routesUser)

startServer(app);

