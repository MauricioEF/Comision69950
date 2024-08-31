import UsersDao from "../db/dao/UsersDao.js";
import UserRepository from "../repositories/UserRepository.js";

export const usersService = new UserRepository(new UsersDao());