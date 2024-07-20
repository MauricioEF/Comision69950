import dishesModel from "./models/dish.model.js";

export default class DishManager {
    getDishById(dishId){
        return dishesModel.findById(dishId);
    }
    createDish(dish){
        return dishesModel.create(dish);
    }
}