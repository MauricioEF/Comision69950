import usersModel from "../models/users.model.js";

export default class UsersDao {
    
    get(){
        return usersModel.find({});
    }
    
    getOne(params){
        return usersModel.findOne(params)
    }

    create(user){
        return usersModel.create(user);
    }

    update(id,user){
        return usersModel.findByIdAndUpdate(id,{set:user});
    }

    delete(id){
        return usersModel.deleteOne({_id:id});
    }
}