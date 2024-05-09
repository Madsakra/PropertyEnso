import { AdminCreateProfile } from "../entity/AdminCreateProfile";



export class AdminCreateProfileController{

    constructor()
    {

    }

    async pushCreateProfile(email,role,description)
    {
        const creator = new AdminCreateProfile();
        const result = await creator.createProfileInDB(email,role,description);
        return result;
    }


}