import { AdminCreateAC } from "../entity/AdminCreateAc";

export class AdminCreateAcController{

    constructor()
    {

    }

    async pushCreate(email,password,phoneNumber)
    {
        const myCreator = new AdminCreateAC();
        const result = await myCreator.createAccount(email,password,phoneNumber);
    
        return result;
    }

    // to delete
    async makeChange()
    {
        const mychange = new AdminCreateAC();
        await mychange.makeChanges();
    }


}