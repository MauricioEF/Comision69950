import { Router } from "express";
import { usersService } from "../managers/managers.js";

const router = Router();

router.get('/',async(req,res)=>{
    const result = await usersService.getUsers();

    res.send({status:"success",payload:result});
})

router.post('/',async(req,res)=>{
    const {firstName,lastName,email,bankAccount} = req.body;
    //Validamos
    if(!firstName||!lastName||!email){
        res.status(400).send({status:"error",error:"Incomplete values"});
    }
    //Creamos el newUser
    const newUser = {
        firstName,
        lastName,
        email,
        bankAccount,
        cards:[]
    }
    //Insertamos newUser
    const result = await usersService.createUser(newUser);
    res.send({status:"success",payload:result})
})

router.post('/:uid/cards',async(req,res)=>{
    const {uid} = req.params;
    const {number,type} = req.body;
    //¿El usuario existe?
    const user = await usersService.getUserById(uid);
    if(!user){
        return res.status(400).send({status:"error",error:"User doesn't exist"})
    }
    //Hasta aquí, el usuario ya existe.
    //Aquí yo recomendaría una validación (no la hago por tiempo) para corroborar si la tarjeta ya existe.
    const newCard = {
        number,
        type
    }
    user.cards.push(newCard);
    const result = await usersService.updateUser(uid,user);
    res.send({status:"success",payload:result})
})

export default router;