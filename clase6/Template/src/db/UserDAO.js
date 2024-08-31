import UserDTOSearchMongo from "../dto/user/UserDTOSearchMongo.js";
import usersModel from "./models/user.model.js";


export default class UserDAO{

    get(){
        return usersModel.find();
    }

    getOne(params) {
        const parsedUserParams = new UserDTOSearchMongo(params);
        return usersModel.findOne(parsedUserParams);
    }

    getByEmail(userEmail){
        return usersModel.findOne({email:userEmail});
    }

    getById(userId){
        return usersModel.findById(userId)
    }
    create(user){
        return usersModel.create(user);
    }
}