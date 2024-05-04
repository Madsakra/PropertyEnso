import { CreateProfile } from "../entity/CreateProfile";


export class CreateProfileController{

    constructor()
    {

    }


    async writeNewProfile(newEmail,newType,newUserName,uid)
    {
        const profileCreator = new CreateProfile();
        // REQUEST FOR ACCOUNT DATA FROM ENTITY, FIRESTORE CLASS
        try{
            const result = await profileCreator.createNewProfile(newEmail,newType,newUserName,uid);
            return result;
        }
        catch(error)
        {
            throw(error);
        }
    }



}