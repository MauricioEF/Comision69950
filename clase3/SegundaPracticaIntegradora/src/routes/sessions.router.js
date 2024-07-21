import { Router } from "express";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail',failureMessage:true}),(req,res)=>{
    res.send({status:"success",message:"Logged in"});
})

sessionsRouter.get('/loginFail',(req,res)=>{
    console.log(req.session);
    res.status(401).send({status:"error",error:"Error en login"})
})

sessionsRouter.get('/current',(req,res)=>{
    console.log(req.user);
    res.send(req.user);
})

export default sessionsRouter;