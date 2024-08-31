import UserRepository from "../repositories/UserRepository.js";
import PersistenceFactory from "../db/factory.js";

import config from "../config/config.js";

const factory = new PersistenceFactory();
const loadedEntities = await factory.selectPersistence(config.app.PERSISTENCE)

export const usersService = new UserRepository(loadedEntities.UsersDAO);