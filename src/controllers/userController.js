import User from "../models/User.js"
import * as crypto from 'crypto';
import { userRequirements } from "../utils/contracts.js";
import { Authenticate } from "auth-ibm-insurances";

export const createUser = async (req, res, next) => {
    try {
        const data = req.body
        const userToCreated = {
            id: crypto.randomUUID(),
            ...userRequirements(data)
        }
        const encrypt = new Authenticate()
        const enconded = await encrypt.encryptKey(userToCreated.password)
        if (enconded) {
            userToCreated.password = enconded
        }
        const user = await User.create(userToCreated)
        if (user) {
            const { password, ...userResponse } = user.toJSON()
            return res.status(201).json(userResponse)
        }

    } catch (err) {
        console.error('Error to create a new user', err)
        next(err)
    }
}
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const data = req.body;
        const updates = {
            ...userRequirements(data)
        }
        const updatedUser = await User.update(updates, {
            where: { id: id }
        });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(204).json(updateUser);
    } catch (err) {
        console.error('Unable to update the registration', err);
        next(err)
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const userDeleted = await User.destroy(
            {
                where: { id: id }
            }
        )
        if (userDeleted === 0) {
            return res.status(404).json({ error: 'User not found.' });
        } else {
            console.log('User deleted with successful');
            return res.status(204).send();
        }

    } catch (error) {
        console.error('Error to delete the user', error);
        next()
    }
}
export const getUser = async (req, res, next) => {
    try {
        const filter = req.query || req.params.id
        const user = await User.findOne(
            {
                where: filter
            }
        )
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        } else {
            return res.status(200).json(user)
        }
    }
    catch (err) {
        console.error('Unable to find the user', err)
        next(err)
    }
}
export const getAllUsers = async (req, res, next) => {
    try {
        const filter = req.query
        const data = await User.getAll(
            {
                where: filter
            })

        if (data) {
            return res.status(200).json(data)
        }
    }
    catch (err) {
        console.error('Unable to find all users', err)
        next(err)
    }
}
