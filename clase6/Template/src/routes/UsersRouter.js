import usersController from '../controllers/users.controller.js';
import BaseRouter from './BaseRouter.js';

class UsersRouter extends BaseRouter {
    init(){
        this.get('/',['PUBLIC'],usersController.getUsers)
    }
}

const usersRouter = new UsersRouter();

export default usersRouter.getRouter();