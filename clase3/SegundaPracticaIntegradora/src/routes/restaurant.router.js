import { Router } from "express";
import { dishesService, restaurantsService, restaurantUsersService, usersService } from "../managers/index.js";
import { makeid } from "../utils.js";
import AuthService from "../services/AuthService.js";



const router = Router();

router.get('/',async (req,res)=>{
    const restaurants = await restaurantsService.getRestaurants();
    res.send({status:"success",payload:restaurants});
})

router.post('/',async(req,res)=>{
    const {name,address,slogan,category,adminFirstName,adminLastName,adminEmail,adminPassword} = req.body;

    if(!name||!adminEmail){
        return res.status(400).send({status:"error",error:"Incomplete values"})
    }
    const user = await usersService.getUserByEmail(adminEmail);
    if(user){
        return res.status(400).send({status:"error",error:"User already exists"});
    }

    const newRestaurant = {
        name:name,
        address:address||"Sin especificar",
        slogan: slogan,
        category,
        slug: `${name.replaceAll(' ','_')}_${makeid(4)}`
    }

    const mandatoryWater = await dishesService.createDish({
        title:"Agua",
        description:"Siempre gratis en establecimiento",
        price:0,
        active:true,
        slug:`${name}_mandatorywater`
    })
    newRestaurant.menu = [
        mandatoryWater._id
    ]

    const restaurantResult = await restaurantsService.createRestaurant(newRestaurant);

    //Una vez creado el restaurante, voy a crear el usuario
    
    const authService = new AuthService();
    const hashedPassword = await authService.hashPassword(adminPassword);
    const newUser = {
        firstName:adminFirstName,
        lastName:adminLastName,
        email:adminEmail,
        password:hashedPassword,
        role:'admin'
    }
    const userResult = await usersService.createUser(newUser);

    //Ya teniendo el Id del restaurant, y el Id del usuario, los conectamos.

    const linkResult = await restaurantUsersService.createLink(userResult._id,restaurantResult._id)

    return res.send({status:"success",message:"Restaurant and users created",payload:{
        userId:userResult._id,
        restaurantId:restaurantResult._id
    }})
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