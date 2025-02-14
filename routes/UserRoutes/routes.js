import express from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../../src/controllers/userController.js';

const route = express.Router();

route.post('/createUser', createUser);
route.put('/updateUser/:id', updateUser);
route.delete('/deleteUser/:id', deleteUser);
route.get('/users/:id', getUser);
route.get('/users', getAllUsers);

export default route;