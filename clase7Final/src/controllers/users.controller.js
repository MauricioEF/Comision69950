import MailingService from "../services/MailingService.js";
import { usersService } from "../services/repositories.js";

const getUsers = async(req,res)=>{
    const users = await usersService.getUsers();
    
    res.send({status:"success",payload:users})
}

const getUserById = async(req,res)=>{
    res.send("GET By Id a users");
}

const createUser = async(req,res)=>{
    const {firstName,lastName,email} = req.body;
    if(!firstName||!lastName||!email){
        return res.status(400).send({status:"error",error:"Incomplete values"})
    }
    const newUser = {
        firstName,
        lastName,
        email
    }
    const mailingService = new MailingService();
    const mailResult = mailingService.sendMail({
        from:'Yo mismito <>',
        to:[email],
        html:`
        <div>
            <h1 style="color:yellow;">Hola, ${firstName}. Gracias por tu interés</h1>
            <p>Agradecería mucho que te tomes un tiempo para leer mi CV</p>
            <p>El cual encontrarás adjunto ;)</p>
            <p>Adicional, mi foto de CV puede variar a mi look actual, soy éste:</p>
            <img src="cid:perfil"/>
            <p>¡Espero podamos trabajar juntos pronto! Saludos.</p>
        </div>
        `,
        attachments: [
            {
                filename:'perfile.jpg',
                path:'./src/docs/perritoDeprimido.jpg',
                cid:'perfil'
            },
            {
                filename:"CV_actualizado.pdf", //Así le va a llegar en el correo,
                path:'./src/docs/cv.pdf'
            }
        ]
    })
    const result = await usersService.createUser(newUser);
    res.status(201).send({status:"success",payload:result._id})
}

const updateUser = async(req,res)=>{
    res.send("PUT O PATCH a users");
}

const deleteUser = async(req,res)=>{
    res.send("DELET a users");
}

export default {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser
}