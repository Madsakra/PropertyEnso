import { SavedNewProperty } from "../entity/SavedNewProperty";


export class SavedNewPropertyController{

    constructor()
    {
        
    }


    async collectSavedProperty(uid,profileID)
    {
        try{
            const mySave = new SavedNewProperty();
            const response = await mySave.fetchNewSavedProperty(uid,profileID);
            return response;

        }

        catch(err)
        {
            console.error(err);
        }
    
    }



}