import mongoose from "mongoose"

import config from "../config/config.js"
export default class PersistenceFactory {
    async selectPersistence(persistence) {
        switch(persistence) {
            case "FILESYSTEM":{
                const {default: FileSystemUsersDAO} = await import('./FileSystem/UserDAO.js');
                return {
                    UsersDAO: new FileSystemUsersDAO()
                }
            }
            case "MONGO":
            default: {
                const connection = mongoose.connect(config.mongo.URL);
                const {default: MongoUsersDAO} = await import('./UserDAO.js');
                return  {
                    UsersDAO:new MongoUsersDAO()
                }
            }
        }
    }
}