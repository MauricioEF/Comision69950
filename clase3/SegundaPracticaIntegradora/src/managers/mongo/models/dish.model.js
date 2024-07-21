import mongoose from 'mongoose';

const collection = "Dishes";

const schema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description: {
        type:String,
        require:true
    },
    price: {
        type:Number,
        required:true
    },
    slug: {
        type:String,
        required:true,
    },
    active: {
        type:Boolean,
        default:true
    },
    restaurant: {
        type:mongoose.SchemaTypes.ObjectId
    }
},{timestamps:true})

const dishesModel = mongoose.model(collection,schema);

export default dishesModel;