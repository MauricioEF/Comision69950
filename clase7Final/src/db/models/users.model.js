import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String
})

const usersModel = mongoose.model(collection,schema);

export default usersModel;