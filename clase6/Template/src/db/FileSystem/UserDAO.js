import fs from 'fs';

export default class UserFileDataSource{
    constructor(){

    }

    readFile() {

    }
    getUsers(){
        return  this.readFile(this.path);
    }

    getUserById(userId){
        return usersModel.findById(userId)
    }
    getUserByEmail(userEmail){
        return usersModel.findOne({email:userEmail});
    }
    createUser(user){
        return usersModel.create(user);
    }
}