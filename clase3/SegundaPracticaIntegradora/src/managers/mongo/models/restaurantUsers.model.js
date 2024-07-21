import mongoose from "mongoose";

const collection = "RestaurantUsers";

const schema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users'
    },
    restaurantId: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Restaurants'
    }
},{timestamps:true})

const restaurantUsersModel = mongoose.model(collection,schema);

export default restaurantUsersModel;