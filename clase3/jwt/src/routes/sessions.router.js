import { Router } from "express";
import jwt from 'jsonwebtoken';

import AuthService from "../services/AuthService.js";
import { usersService } from "../managers/index.js";


const sessionsRouter = Router();

sessionsRouter.post('/register',async(req,res)=>{
    const {firstName,email,password} = req.body;
    
    const authService = new AuthService();
    const hashedPassword = await authService.hashPassword(password);
    const newUser ={
        firstName,
        email,
        password:hashedPassword
    };
    const result = await usersService.createUser(newUser);
    res.sendStatus(201);
})

sessionsRouter.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = await usersService.getUserByEmail(email);
    const authService = new AuthService();
    const isValidPassword = await authService.validatePassword(password,user.password);
    if(!isValidPassword) {
        return res.send("Invalid credentials");
    }
    //Hasta aquí ya nos logueamos, creamos el objeto de session

    const userSession = { 
        id:user._id,
        name:user.firstName,
        role:user.role
    }
    //creamos el primer token del usuario :) 
    const userToken = jwt.sign(userSession,'CoderSecret:)',{expiresIn:"1d"})
    console.log(userToken);
    res.cookie('tokencito',userToken).sendStatus(204);
})

sessionsRouter.get('/current',(req,res)=>{
    const cookie = req.cookies['tokencito'];
    if(!cookie){
        return res.status(401).send({status:"error",error:"Logueate :)"})
    }
    try{
        const user = jwt.verify(cookie,'CoderSecret:)');
        console.log(user);
        return res.send(user);
    }catch(error){
        console.log(error);
        res.send(error);
    }

});

export default sessionsRouter;