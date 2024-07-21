import restaurantUsersModel from './models/restaurantUsers.model.js';

export default class RestaurantUsersManager {

    createLink(userId,restaurantId){
        return restaurantUsersModel.create({userId,restaurantId});
    }
    deleteLink(userId,restaurantId){
        return restaurantUsersModel.deleteOne({userId,restaurantId});
    }
    getRestaurantsByUserId(userId) {
        return restaurantUsersModel.find({userId}).populate('restaurantId');
    }
    getUsersByRestaurantId(restaurantId){
        return restaurantUsersModel.find({restaurantId}).populate('userId');
    }
}