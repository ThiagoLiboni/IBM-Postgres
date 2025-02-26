import User from "../models/User.js"
import crypto from 'node:crypto';

export const createUser = async (req, res, next) => {
    try {
        const data = req.body
        const userToCreated = {
            id: crypto.randomUUID(),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            brokerName: data.brokerName,
            brokerCity: data.brokerCity,
            brokerState: data.brokerState,
            brokerPhone: data.brokerPhone
        }
        console.log(userToCreated)

        const user = await User.create(userToCreated)
        if(user){
            return res.status(201).json(user)
        }

    } catch (err) {
        console.error('Error to create a new user', err)
        next(err)
    }
}
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedUser = await User.update(id, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            contato: data.cel,
            brokerNamee: data.bName,
            brokeCity: data.brokerCity,
            brokerState: data.brokerState,
            brokerPhone: data.brokerPhone
        });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(204).send();
    } catch (err) {
        console.error('Unable to update the registration',err);
        next(err)
    }
}
export const deleteUser = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const userDeleted = await User.destroy(
            {
                where: {id: id}
            }
        )
        if (userDeleted === 0) {
            return res.status(404).json({error: 'User not found.'});
        } else {
            console.log('User deleted with successful');
            return res.status(204).send();
        }
    
    } catch (error) {
        console.error('Error to delete the user', error);
        next()
    }
}
export const getUser = async (req, res, next)=>{
    try{
        const {id} =  req.params
        const user = await User.findOne(
            {
                where: {id:id}
            }
        )
        if(!user){
           return res.status(400).json({error: 'Not found user'})
        }else{
           return res.status(200).json(user)
        }
    }
    catch(err){
        console.error('Unable to find the user', err)
        next(err)
    }
}
export const getAllUsers = async (req, res, next)=>{
    try{
        const filter = req.body
        const data =  await User.getAll(filter)

        if(data){
           return res.status(200).json(data)
        }
    }
    catch(err){
        console.error('Unable to find all users', err)
        next(err)
    }
}
