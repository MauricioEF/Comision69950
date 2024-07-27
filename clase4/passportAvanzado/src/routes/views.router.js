import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    res.render('Home');
})

router.get('/register',(req,res)=>{
    res.render('Register');
})

router.get('/login',(req,res)=>{
    res.render('Login');
})

router.get('/profile',(req,res)=>{
    if(!req.user){
        return res.redirect('/login')
    }
    res.render('Profile',{
        user:req.user
    })
})

export default router;