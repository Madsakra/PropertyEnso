import {Authenticator} from '../entity/Authenticator'


export class UserAuthenticator{
    
    // STATES FROM REACT WILL BE PASSED INTO THE CONSTRUCTOR FOR USE LATER
    constructor()
    {

    }


     async signInWithGoogleMeth(){
        
            //call entity
            try
            {
                var myAuth = new Authenticator();
                const result = await myAuth.googleSignIn();
                // set the auth obj to useState in react
              
                return result;
            }


            catch(error)
            {
                throw (error);
            };
        
     }

    async signInNormal(email,password)
    {
        // call entity
        try
        {
            var myAuth = new Authenticator();
            const result = await myAuth.normalSignIn(email,password);
            // set the auth obj to useState in react
            return result;

        }
        catch(error)
        {
            throw(error);
        }

    }



    async createNewUser(email,password)
    {
        try{
            // CALL ENTITY
            var myAuth = new Authenticator();
            const result = await myAuth.createUser(email,password) ;
            // ENTITY RETURN BOOL
            return result;

        }

        catch(error)
        {
            throw (error);
        }
    }





    async customSignOut()
    {
        try{
            var myAuth = new Authenticator();
            const result = await myAuth.logOff()
            return result;
        }
        catch(error)
        {
            throw (error);
        }
    
    };
    
};