import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    res.render('Home');
})

router.get('/login',(req,res)=>{
    res.render('Login');
})

router.get('/register',(req,res)=>{
    res.render('Register');
})

export default router;