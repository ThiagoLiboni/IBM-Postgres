import express from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../../src/controllers/userController.js';
import { authorize } from '../../src/utils/middleware.js';

const route = express.Router();

route.post('/createUser', createUser);
route.put('/updateUser/:id', authorize, updateUser);
route.delete('/deleteUser/:id', authorize, deleteUser);
route.get('/user/:id', authorize, getUser);
route.get('/user', authorize, getUser);
route.get('/users', authorize, getAllUsers);

export default route;