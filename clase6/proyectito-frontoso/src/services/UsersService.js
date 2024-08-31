import { getBaseHeaders } from "../utils/http";


const USERS_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_USERS_ENDPOINT}`;

export default class UsersService {
    constructor(client){
        this.client = client;
    }
    getUsers = (controller) => {
        const requestInfo = {url:`${USERS_ENDPOINT}`,config:{...getBaseHeaders(),controller}};
        return this.client.makeGetRequest(requestInfo);
    }
}