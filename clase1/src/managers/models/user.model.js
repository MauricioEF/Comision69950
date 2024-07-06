import mongoose from "mongoose";

const collection = "Students";

const cardSubSchema = new mongoose.Schema({
    number:String,
    type:{
        type:String,
        enum:['debit','credit'],
        default:'debit'
    }
},{timestamps:true,_id:false})

const schema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    bankAccount:String,//Cuenta de Banco
    cards:[cardSubSchema]
    
},{timestamps:true})

const usersModel = mongoose.model(collection,schema);

export default usersModel;