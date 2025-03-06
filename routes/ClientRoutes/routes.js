import express from 'express';
import { createClient, deleteClient, getAllClients, getClient, updateClient } from '../../src/controllers/clientController.js';
import { authorize } from '../../src/utils/middleware.js';

const route = express.Router();

route.post('/createClient', authorize, createClient);
route.put('/updateClient/:id', authorize, updateClient);
route.delete('/deleteClient/:id', authorize, deleteClient);
route.get('/clients/:id', authorize, getClient);
route.get('/clients', authorize, getAllClients);

export default route;