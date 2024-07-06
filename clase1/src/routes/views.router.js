import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    res.render('Home');
})

router.get('/users',(req,res)=>{
    res.render("Users");
})

export default router;

 {
    
 }