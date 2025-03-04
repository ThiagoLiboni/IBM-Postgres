import Client from "../models/Client.js"
import { clientRequeriments } from "../utils/contracts.js"

export const createClient = async (req, res, next) => {
    try {
        const id = await createNextId()
        const data = req.body
        const userToCreated = {
            id: id,
            ...clientRequeriments(data)
        }
        console.log(userToCreated)

        const user = await Client.create(userToCreated)
        if(user){
           return res.status(201).json(user)
        }

    } catch (err) {
        console.error('Error to create a new client', err)
        next(err)
    }
}
export const updateClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updates = {
            ...clientRequeriments(data)
        }
        const updatedUser = await Client.update(updates,
        {
            where:{id: id}
        });

        if (!updatedUser) {
            return res.status(404).json({ error: 'Client not found to update' });
        }
        return res.status(204);

    } catch (err) {
        console.error('Error to update', err);
        next(err)
    }
}
export const deleteClient = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const userDeleted = await Client.destroy(
            {
                where: {id: id}
            }
        )
        if (userDeleted === 0) {
            return res.status(404).json({error: 'Client not found to delete.'});
        } else {
            console.log('deleted with successful');
            return res.status(204);
        }
    
    } catch (err) {
        console.error('Error to delete', err);
        next(err)
    }
}
export const getClient = async (req, res, next)=>{
    try{
        const filter =  req.body || req.params
        const user = await Client.findOne({
            
            where: filter
        })
        if(!user){
            return res.status(404).json({error: 'Client not found'})
        }else{
            return res.status(200).json(user)
        }
    }
    catch(err){
        console.error('Unable to find the customer', err)
        next(err)
    }
}
export const getAllClients = async (req, res, next)=>{
    try{
        const filter = req.body || req.params
        const data =  await Client.getAll({
           
            where: filter
        })

        if(data){
        return res.status(200).json(data)
        }
    }
    catch(error){
        console.error('Unable to find all customers', err)
        next(err)    }
}
export const createNextId = async ()=>{
    try{
        const lastId = await Client.findOne({
            order: [
                ['id', 'DESC']
            ]
        })
        const yearNow = new Date().getFullYear().toString().slice(-2)
        const version_app = "1"
        let newId;

        if(lastId && lastId.id){
            const suffixId = parseInt(lastId.id.toString().slice(2)) + 1;
            newId = yearNow + suffixId.toString()
        }else{
            newId = `${version_app+yearNow}01`
        }
        if(newId!=undefined){
            const newIdParsed = parseInt(newId)
            return newIdParsed;
        }
    }catch(err){
        console.error('Error to create a new id',err)
    }
}