import { LogOut } from "../entity/LogOut";

export class LogOutController{

    LogOutController()
    {
        
    }



    async customSignOut()
    {
        try{
            var myLogOut = new LogOut();
            const result = await myLogOut.logOff()
            return result;
        }
        catch(error)
        {
            throw (error);
        }
    
    };

}