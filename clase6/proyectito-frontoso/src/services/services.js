import AxiosClient from "./AxiosClient";
import UsersService from "./UsersService";


export const usersService = new UsersService(new AxiosClient());