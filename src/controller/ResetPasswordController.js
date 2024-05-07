import { ResetPassword } from "../entity/ResetPassword";



export class ResetPasswordController{

    constructor()
    {


    }


    async pushReset(accountID,profileID)
    {
        const resetter = new ResetPassword();
        const result = resetter.resetPasswordNow(accountID,profileID)
        return result;
    }



}