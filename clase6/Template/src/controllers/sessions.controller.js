import jwt from 'jsonwebtoken';
import UserDTOSession from '../dto/user/UserDTOSession.js';

const register = (req,res)=>{
    res.sendSuccess("Registered"); 
}

const login = (req,res)=>{
    console.log(req.user);
    //Para JWT, ahora yo tengo la responsabilidad de generar mi propia sesión.
    const sessionUser = new UserDTOSession(req.user);
    const token = jwt.sign(sessionUser,'secretitoshhhhh',{expiresIn:'1d'});
    res.cookie('tokencito',token).send({status:"success",message:"logged in"});
}

export default {
    login,
    register
}