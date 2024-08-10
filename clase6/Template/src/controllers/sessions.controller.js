import jwt from 'jsonwebtoken';

const register = (req,res)=>{
    res.sendSuccess("Registered"); 
}

const login = (req,res)=>{
    console.log(req.user);
    //Para JWT, ahora yo tengo la responsabilidad de generar mi propia sesión.
    const sessionUser = {
        name:`${req.user.firstName} ${req.user.lastName}`,
        role:req.user.role,
        id:req.user._id
    }
    const token = jwt.sign(sessionUser,'secretitoshhhhh',{expiresIn:'1d'});
    res.cookie('tokencito',token).send({status:"success",message:"logged in"});
}

export default {
    login,
    register
}