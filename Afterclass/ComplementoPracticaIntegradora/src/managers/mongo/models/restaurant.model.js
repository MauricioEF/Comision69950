import mongoose from 'mongoose';

const collection = "Restaurants"

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:String,
    slogan:String,
    address:String,
    logo:String,
    slug:{
        type:String,
        unique:true
    },
    menu:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Dishes'
        }
    ],
    active:{
        type:Boolean,
        default:true
    }
})

schema.pre(['find','findOne','findById'],function(){
    this.populate('menu');
})

const restaurantModel = mongoose.model(collection,schema);

export default restaurantModel;