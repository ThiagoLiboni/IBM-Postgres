import express from 'express'
import startServer from "./config/server.js"
import routesClient from './routes/ClientRoutes/routes.js';
import routesUser from './routes/UserRoutes/routes.js';
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json());

app.use('/api/client',routesClient)
app.use('/api/user',routesUser)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


startServer(app);

