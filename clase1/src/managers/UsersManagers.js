import usersModel from "./models/user.model.js";


export default class UsersManager {

    getUsers() {
        return usersModel.find();
    }

    getUserById(userId){
        return usersModel.findOne({_id:userId});
    }

    createUser(user) {
        return usersModel.create(user)
    }

    updateUser(userId,user) {
        return usersModel.updateOne({_id:userId},{$set:user})
    }
}