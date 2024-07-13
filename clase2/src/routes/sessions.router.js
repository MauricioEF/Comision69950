import { Router } from "express";

import { usersService } from "../managers/index.js";

//Un router de session se suele utilizar para operaciones concernientes a la sesión del usuario como:
// Registro, Login, ThirdPartyAuth, Current (Acceder a la info de la sesión actual);

const sessionsRouter = Router();

sessionsRouter.post('/register',async(req,res)=>{
    const {firstName,lastName,email,birthDate,password} = req.body;
    if(!firstName||!lastName||!email||!password){
        return res.status(400).send({status:"error",error:"Incomplete values"});
    }
    const user = await usersService.getUserByEmail(email);
    if(user){
        return res.status(400).send({status:"error",error:"User already exists"})
    };
    let parsedDate;
    if(birthDate){
        parsedDate = new Date(birthDate).toISOString();
    }
    const newUser = {
        firstName,
        lastName,
        email,
        birthDate:parsedDate,
        password
    }
    const result = await usersService.createUser(newUser);
    res.send({status:"success",message:"Registered"})
})

sessionsRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(400).send({status:"error",error:"Incomplete values"});
    }
    const user = await usersService.getUserByEmail(email);
    if(!user){
        return res.status(400).send({status:"error",error:"Incorrect credentials"})
    };
    const isValidPassword = user.password === password;
    if(!isValidPassword){
        return res.status(400).send({status:"error",error:"Incorrect credentials"})
    }
    //FINALMENTE, le creo una sesión.
    req.session.user = {
        name:`${user.firstName} ${user.lastName}`,
        role:user.role
    }
    res.send({status:"success",message:"logged in"});
})

sessionsRouter.get('/logout',async(req,res)=>{
    console.log("Ok");
    req.session.destroy(error=>{
        if(error) return res.status(500).send({status:"error",error:"Couldn't close session"})
            res.redirect('/login')
        })
})

export default sessionsRouter;