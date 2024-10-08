import jwt from 'jsonwebtoken';

import { passportCall } from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";
import sessionsController from '../controllers/sessions.controller.js';

class SessionsRouter extends BaseRouter {
    init(){
        this.post('/register',['PUBLIC'],passportCall('register'),sessionsController.register)
        this.post('/login',['PUBLIC'],passportCall('login'),sessionsController.login)
    }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();