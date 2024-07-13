import RestaurantManager from "./mongo/RestaurantManager.js";
import DishManager from "./mongo/DishManager.js";

export const restaurantsService = new RestaurantManager();
export const dishesService = new DishManager();