import { CheckSellerExist } from "../entity/CheckSellerExist";

export class CheckSellerExistController{



    constructor()
    {

    }

    async pushEmailForCheck(email)
    {

        const myChecker = new CheckSellerExist();
        const response = await myChecker.doesSellerExist(email);
        return response;


    }




}