import { SavedNewProperty } from "../entity/SavedNewProperty";


export class SavedNewPropertyController{

    constructor(authUser)
    {
        this.authUser = authUser;
    }


    async collectSavedProperty()
    {
        try{
            const mySave = new SavedNewProperty();
            const response = await mySave.fetchNewSavedProperty(this.authUser);
            return response;

        }

        catch(err)
        {
            console.error(err);
        }
    
    }



}