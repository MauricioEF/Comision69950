import PresentUserDTO from "../dto/user/PresentUserDTO.js";
import { usersService } from "../services/services.js";

const getUsers = async(req,res)=>{
    const users = await usersService.getUsers();
    const parsedUsers = users.map(user=>new PresentUserDTO(user))
    console.log(parsedUsers)
    res.sendSuccessWithPayload({users:parsedUsers});
}

export default {
    getUsers
}