import { AdminLogin } from "../entity/AdminLogin";



export class AdminLoginController{

  constructor()
  {
    
  }


    async signInWithGoogleMeth(){
        
        //call entity
        try
        {
            var myAuth = new AdminLogin();
            const result = await myAuth.googleSignIn();
            // set the auth obj to useState in react
          
            return result;
        }


        catch(error)
        {
            throw (error);
        };
    
 }
}