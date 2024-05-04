import { CreateAccount } from "../entity/CreateAccount";


export class CreateAccountController{



    constructor()
    {

    }


    async pushCreation(email,password)
    {
        try{

            const creator = new CreateAccount();
            const result = await creator.createAccountInDB(email,password)
            return result
        }

        catch(err)
        {
            console.log(err);
        }
      

        
       
    }






}