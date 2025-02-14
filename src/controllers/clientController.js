import Client from "../models/Client.js"
import crypto from 'node:crypto';

export const createClient = async (req, res) => {
    try {
        const id = await createNextId()
        const data = req.body
        const userToCreated = {
            id: id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            sellerId: data.sellerId
        }
        console.log(userToCreated)

        const user = await Client.create(userToCreated)
        if(user){
           return res.status(201).json(user)
        }

    } catch (error) {
        console.error('Erro ao registrar cliente', error)
        return res.status(500).json({ error: 'Não foi possivel registrar o cliente' });
    }
}
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updates = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber
        }
        const updatedUser = await Client.update(updates,
        {
            where:{id: id}
        });

        if (!updatedUser) {
            return res.status(404).json({ error: 'cliente não encontrado' });
        }
        return res.status(204).send();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Não foi possivel atualizar o cliente' });
    }
}
export const deleteClient = async (req, res)=>{
    try{
        const {id} = req.params;
        const userDeleted = await Client.destroy(
            {
                where: {id: id}
            }
        )
        if (userDeleted === 0) {
            return res.status(404).json({error: 'cliente não encontrado.'});
        } else {
            console.log('cliente deletado com sucesso');
            return res.status(204).send();
        }
    
    } catch (error) {
        console.error('Erro ao deletar cliente', error);
        return res.status(500).json({error: 'Não foi possivel deletar o cliente.'});
    }
}
export const getClient = async (req, res)=>{
    try{
        const filter =  req.body
        const user = await Client.findOne(filter)
        if(!user){
            return res.status(400).json({error: 'nenhum cliente encontrado'})
        }else{
            return res.status(200).json(user)
        }
    }
    catch(error){
        console.error('Não foi possivel encontrar o cliente', error)
        return res.status(500).json({erro:'Não foi possivel buscar o cliente'})
    }
}
export const getAllClients = async (req, res)=>{
    try{
        const filter = req.body
        const data =  await Client.getAll(filter)

        if(data){
        return res.status(200).json(data)
        }
    }
    catch(error){
        return res.status(500).json({error:'Não foi possivel buscar os clientes'})
    }
}
export const createNextId = async ()=>{
    try{
        const lastId = await Client.findOne({
            order: [
                ['id', 'DESC']
            ]
        })
        const yearNow = new Date().getFullYear().toString().slice(-2)
        let newId;

        if(lastId && lastId.id){
            const suffixId = parseInt(lastId.id.toString().slice(2)) + 1;
            newId = yearNow + suffixId.toString()
        }else{
            newId = `${yearNow}01`
        }
        if(newId!=undefined){
            const newIdParsed = parseInt(newId)
            return newIdParsed;
        }
    }catch(err){
        console.error('Error ao criar novo id',err)
    }
}