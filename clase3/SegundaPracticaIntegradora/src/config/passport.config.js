import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { restaurantUsersService, usersService } from "../managers/index.js";
import AuthService from "../services/AuthService.js";

const initializePassportConfig = () =>{
    
    passport.use('login',new LocalStrategy(
        {usernameField:'email'},
        async(email,password,done)=>{
            try{
                const user = await usersService.getUserByEmail(email);
                if(!user){
                    return done(null,false,{message:"Incorrect credentials"});
                }
                const authService = new AuthService();
                const isValidPassword = authService.validatePassword(password,user.password);
                if(!isValidPassword){
                    return done(null,false,{message:"Incorrect credentials"});
                }
                return done(null,user._id);
            }catch(error){
                return done(error);
            }
        }
    ))

    passport.serializeUser((userId,done)=>{
        return done(null,userId);
    })

    passport.deserializeUser(async(userId,done)=>{
        const user = await usersService.getUserById(userId);
        //También necesito obtener el id de la relación correspondiente.
        const restaurants = await restaurantUsersService.getRestaurantsByUserId(userId)
        const restaurantIds = restaurants.map(item=>item.restaurantId._id);
        console.log(restaurantIds);
        const session = {
            name: `${user.firstName} ${user.lastName}`,
            role:user.role,
            userId:user._id,
            restaurants:restaurantIds
        }
        return done(null,session);
    })
}

export default initializePassportConfig;