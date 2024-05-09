import { SuspendAccount } from "../entity/SuspendAccount";



export class SuspendAccountController{

    constructor(){

    };


    async pushSuspend(accountDocRef,accountID)
    {
        const suspender = new SuspendAccount();
        const result = await suspender.suspendActiveAccount(accountDocRef,accountID);
        return result;
    }


}