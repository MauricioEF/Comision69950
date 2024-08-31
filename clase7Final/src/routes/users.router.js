import { Router } from "express";

import usersController from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get('/',usersController.getUsers);

usersRouter.get('/:uid',usersController.getUserById);

usersRouter.post('/', usersController.createUser);

usersRouter.patch('/:uid',usersController.updateUser );

usersRouter.put('/:uid', usersController.updateUser);

usersRouter.delete('/',usersController.deleteUser);



export default usersRouter;