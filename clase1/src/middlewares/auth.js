
const authMiddleware = (req,res,next) =>{
    if(!req.session.user){//El usuario ni siquiera está logueado
        return res.status(401).send({status:"error",error:"Not logged"});
    }
    if(req.session.user.role==="admin"){//Sí conozco al usuario, pero el rol no coincide.
        return res.status(403).send({status:"error",error:"No tienes permisos para visitar este endpoint"})
    }
    next();
}

export default authMiddleware