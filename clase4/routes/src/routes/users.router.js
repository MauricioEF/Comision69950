import { Router } from "express";

const usersRouter = Router();

usersRouter.param('uid',async(req,res,next,uid)=>{
    //Puedo aprovechar aquí para buscarlo de una vez en la DB
    const user = await usersServices.getUserById(uid);
    if(!user) return res.status(404).send({status:"error",error:"user not found"});
    req.searchedUser = user;
})
export default usersRouter;