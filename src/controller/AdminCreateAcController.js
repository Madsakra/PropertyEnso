import { AdminCreateAC } from "../entity/AdminCreateAc";

export class AdminCreateAcController{

    constructor()
    {

    }

    async pushCreate(email,password,userName)
    {
        const myCreator = new AdminCreateAC();
        const result = await myCreator.createAccount(email,password,userName);
    
        return result;
    }




}