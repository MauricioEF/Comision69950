import RestaurantManager from "./mongo/RestaurantManager.js";
import DishManager from "./mongo/DishManager.js";
import UserManager from './mongo/UserManager.js';
import RestaurantUsersManager from "./mongo/RestaurantUsersManager.js";

export const restaurantsService = new RestaurantManager();
export const dishesService = new DishManager();
export const usersService = new UserManager();
export const restaurantUsersService = new RestaurantUsersManager();