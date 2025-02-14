import User from "../models/User.js"
import crypto from 'node:crypto';

export const createUser = async (req, res) => {
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

    } catch (error) {
        console.error('Erro ao criar usuário', error)
        return res.status(500).json({ error: 'Não foi possivel criar o usuário' });
    }
}
export const updateUser = async (req, res) => {
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
            return res.status(404).json({ error: 'usuário não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Não foi possivel atualizar o usuário' });
    }
}
export const deleteUser = async (req, res)=>{
    try{
        const {id} = req.params;
        const userDeleted = await User.destroy(
            {
                where: {id: id}
            }
        )
        if (userDeleted === 0) {
            return res.status(404).json({error: 'usuário não encontrado.'});
        } else {
            console.log('usuário deletado com sucesso');
            return res.status(204).send();
        }
    
    } catch (error) {
        console.error('Erro ao deletar usuário', error);
        return res.status(500).json({error: 'Não foi possivel deletar o usuário.'});
    }
}
export const getUser = async (req, res)=>{
    try{
        const {id} =  req.params
        const user = await User.findOne(
            {
                where: {id:id}
            }
        )
        if(!user){
           return res.status(400).json({error: 'nenhum usuário encontrado'})
        }else{
           return res.status(200).json(user)
        }
    }
    catch(error){
        console.error('Não foi possivel encontrar o usuário', error)
        return res.status(500).json({erro:'Não foi possivel buscar os usuário'})
    }
}
export const getAllUsers = async (req, res)=>{
    try{
        const filter = req.body
        const data =  await User.getAll(filter)

        if(data){
           return res.status(200).json(data)
        }
    }
    catch(error){
       return res.status(500).json({error:'Não foi possivel buscar usuários'})
    }
}
