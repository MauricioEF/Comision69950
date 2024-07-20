import { Router } from "express";
import { dishesService } from "../managers/index.js";
import { makeid } from "../utils.js";


const dishesRouter = Router();
const DISH_FEE = 1.05;

dishesRouter.get('/:did',async(req,res)=>{
    const {did} = req.params;
    const result = await dishesService.getDishById(did);
    if(!result) {
        return res.status(404).send({status:"error",error:"Dish not found"});
    }
    res.send({status:"success",payload:result});
})

dishesRouter.post('/',async(req,res)=>{
    const {title, description, price, restaurant} = req.body;
    if(!title||!description||!price||!restaurant){
        res.status(400).send({status:"error",error:"Incomplete values"});
    }
    const newDish = {
        title,
        description,
        price: price*DISH_FEE,
        restaurant,
        slug:`${title.replaceAll(' ','_')}_${makeid(4)}`
    }
    const result = await dishesService.createDish(newDish);
    res.send({status:"success",payload:result._id});
})


export default dishesRouter;