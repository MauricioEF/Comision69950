import usersModel from "./models/user.model.js";

export default class UserManager {

    createUser(user) {
        return usersModel.create(user);
    }

    getUserByEmail(email){
        return usersModel.findOne({email});
    }

    getUserById(userId) {
        return usersModel.findById(userId);
    }
}