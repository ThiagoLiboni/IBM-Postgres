import express from 'express';
import { createClient, deleteClient, getAllClients, getClient, updateClient } from '../../src/controllers/clientController.js';

const route = express.Router();

route.post('/createClient', createClient);
route.put('/updateClient/:id', updateClient);
route.delete('/deleteClient/:id', deleteClient);
route.get('/clients/:id', getClient);
route.get('/clients', getAllClients);

export default route;