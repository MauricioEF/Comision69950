import { Router } from "express";

const router = Router();

router.get('/cookie',(req,res)=>{
    res.cookie('cookiefeliz',5).send("Cookie feliz :)");
})

router.get('/cookievalue',(req,res)=>{
    console.log(req.signedCookies);
    res.send(req.cookies);
})

router.get('/cookieMortal',(req,res)=>{ //La cookie que yo setee aquí, va a poder morir
    res.cookie('cookieEnferma',":(",{maxAge:1000*10}).send("Cookie mortal seteada");
})

router.get('/cookieuserlogin',(req,res)=>{
    const user = {
        firstName:'Daniel',
        lastName:'Olarte',
        role:"user"
    }
    //Supongamos que hizo log in
    res.cookie('user',user,{signed:true}).send('Logueado');
})

router.get('/cookieuserlogout',(req,res)=>{
    res.clearCookie('user').send("Deslogueado :(");
})

export default router;