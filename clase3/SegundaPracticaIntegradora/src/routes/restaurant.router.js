import { Router } from "express";
import { dishesService, restaurantsService } from "../managers/index.js";
import { makeid } from "../utils.js";



const router = Router();

router.get('/',async (req,res)=>{
    const restaurants = await restaurantsService.getRestaurants();
    res.send({status:"success",payload:restaurants});
})

router.post('/',async(req,res)=>{
    const restaurant = req.body;
    if(!restaurant.name){
        return res.status(400).send({status:"error",error:"Incomplete values"})
    }
    const newRestaurant = {
        name:restaurant.name,
        address:restaurant.address||"Sin especificar",
        slogan: restaurant.slogan,
        slug: `${restaurant.name.replaceAll(' ','_')}_${makeid(4)}`
    }

    const mandatoryWater = await dishesService.createDish({
        title:"Agua",
        description:"Siempre gratis en establecimiento",
        price:0,
        active:true,
        slug:`${restaurant.name}_mandatorywater`
    })
    newRestaurant.menu = [
        mandatoryWater._id
    ]

    const result = await restaurantsService.createRestaurant(newRestaurant);
    return res.send({status:"success",message:"Restaurant created"})
})


router.post('/:rid/menu/:did',async(req,res)=>{
    const {rid,did} = req.params;

    //Existe el restaurante?
    const restaurant = await restaurantsService.getRestaurant({_id:rid});
    if(!restaurant){
        return res.status(400).send({status:"error",error:"Restaurant doesn't exist"});
    }
    //Hasta este punto el restaurante sí existe, perooooo ¿el platillo existe?
    const dish = await dishesService.getDishById(did);
    if(!dish){
        return res.status(400).send({status:"error",error:"Dish doesn't exist"});
    }

    const result = await restaurantsService.addDish(rid,did);
    res.send({status:"success",message:"Platillo agregado"})
})

router.delete('/:rid',async(req,res)=>{
    const {rid} = req.params;
    const result = await restaurantsService.deleteRestaurant(rid);
    res.send({status:"success",message:"Restaurante eliminado"})
})






export default router;